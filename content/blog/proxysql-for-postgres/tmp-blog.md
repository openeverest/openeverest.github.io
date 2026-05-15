Anyone who ever worked with MySQL knows what ProxySQL is. With 10m+ downloads on dockerhub and 100+ releases, ProxySQL became a de-facto standard for a lot of MySQL deployments. It is well known for its read-write split capabilities and as a result smart load balancing.

Since version 3 that had its alpha release in September 2024, ProxySQL added support for PostgreSQL (https://proxysql.com/blog/proxysql-expands-database-support-to-postgresql-in-version-3-0-0-alpha/). It is quite interesting not only from the technical perspective, but also to see if PostgreSQL community would start using mysql-first proxy as a replacement for well-established tools.

In this blog I would like to see how ProxySQL will work for PostgreSQL clusters deployed with OpenEverest. I’m curious to understand how hard would it be to configure manually and if it is something that can be automated without changing the underlying Operators code.

OpenEverest, ProxySQL and two smoking replicas
My goal is to test the concept. In OpenEverest v1 we deploy PostgreSQL clusters using Percona Operator. It has built-in pgBouncer as a connection pooler and a “proxy”. Adding ProxySQL in front of the PG cluster is either a manual process or a big architectural change. In V2 it will be simplified and pluggable. But now we will do it manually to verify the concept. 

Install the latest version of OpenEverest. Follow the quick start guide: https://openeverest.io/documentation/current/quick-install.html

Login into the WebUI and deploy your PostgreSQL cluster. For the sake of the experiment we will need at least 2 nodes.

IMAGE openeverest-pg-deploy.png

We want to have ProxySQL deployed in front of our PostgreSQL cluster. It should be pointing to primary and replicas to do a proper read-write split. 

proxysql-pg.png image here

OpenEverest shows only pgBouncer endpoint in the UI. To get the primary and replicas, we need to use kubectl. 


$ kubectl -n everest get svc
NAME                              TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
...
proxysql-test-ha                  ClusterIP   10.43.94.255    <none>        5432/TCP   9m51s
proxysql-test-replicas            ClusterIP   10.43.188.147   <none>        5432/TCP   9m51s


These are two services that we are interested in. `ha` points to primary, `replicas` to replicas.

ProxySQL configuration
Surprisingly, there is no official helm chart for ProxySQL. To deploy version 3 and configure it I will use the simple YAML manifests. 

Before we proceed, we need to create the user in the PostgreSQL database, that is going to help ProxySQL to monitor backend health proactively. It is optional, but good to have.

CREATE USER proxysql_monitor WITH PASSWORD '<monitor-pass>';
GRANT CONNECT ON DATABASE postgres TO proxysql_monitor;


Now lets proceed with the deployment of ProxySQL and related Kubernetes resources.

Credentials — Secret
All passwords are stored in a Kubernetes Secret - secret.yaml (link to real file). Replace every changeme-* value before applying.
[link to secret.yaml)
kubectl apply -f secret.yaml

Configuration — ConfigMap
ProxySQL's config is stored as a template in a ConfigMap (link to real file). The ${VAR} placeholders are substituted at pod start by an init container.
Key sections to understand:
pgsql_variables — core proxy settings. Notable ones:
interfaces="0.0.0.0:6133" — where ProxySQL listens for PostgreSQL client connections
monitor_username / monitor_password — credentials for backend health checks
pgsql_servers — the two backends. use_ssl=1 is required here because Patroni's pg_hba.conf only accepts SSL connections from outside the pod.
pgsql_users — every user that applications will use to connect through the proxy must be listed here with matching passwords. ProxySQL does its own auth check before forwarding.
pgsql_query_rules — read/write split logic evaluated in rule_id order:


rule_id
Pattern
Hostgroup
1
SELECT ... FOR UPDATE
10 (primary)
2
SELECT
20 (replicas)
—
everything else
10 (primary, via default_hostgroup)


Deployment
The Deployment uses an init container to render proxysql.cnf from the template before ProxySQL starts. awk's built-in ENVIRON[] does the substitution — no extra packages needed.
The --initial flag forces ProxySQL to rebuild its internal SQLite database from proxysql.cnf on every pod start, making the ConfigMap the single source of truth rather than persisted runtime state.
Link to deployment.yaml

Service
We use ClusterIP service type just to check that everything is working properly.

Apply everything

kubectl apply -f secret.yaml
kubectl apply -f configmap.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

Testing
Verify the connection and confirm which backend answered:
kubectl run psql-test --rm -it --restart=Never \
 --image=postgres:17 \
 --namespace=everest \
 --env="PGPASSWORD=<your-password>" \
 -- psql -h proxysql -p 5432 -U postgres -d postgres \
    -c "SELECT inet_server_addr(), pg_is_in_recovery();"



pg_is_in_recovery() returns false on the primary and true on a replica — run it a few times to see reads routed to replicas.
To inspect ProxySQL's view of backends and query stats, connect to the admin interface:

kubectl run psql-admin --rm -it --restart=Never \
 --image=postgres:17 --namespace=everest \
 --env="PGPASSWORD=<your-radmin-pass>" \
 -- psql -h proxysql -p 6132 -U radmin -d admin

SELECT * FROM pgsql_servers;
SELECT hostgroup, digest_text, count_star
 FROM stats.stats_pgsql_query_digest
 ORDER BY count_star DESC LIMIT 10;


admin=# SELECT * FROM pgsql_servers;
 hostgroup_id |        hostname        | port | status | weight | compression | max_connections | max_replication_lag | use_ssl | max_latency_ms | comment  
--------------+------------------------+------+--------+--------+-------------+-----------------+---------------------+---------+----------------+----------
 10           | proxysql-test-ha       | 5432 | ONLINE | 1000   | 0           | 1000            | 0                   | 1       | 0              | primary
 20           | proxysql-test-replicas | 5432 | ONLINE | 1000   | 0           | 1000            | 0                   | 1       | 0              | replicas
(2 rows)

admin=# SELECT hostgroup, digest_text, count_star
admin-#   FROM stats.stats_pgsql_query_digest
admin-#   ORDER BY count_star DESC LIMIT 10;
 hostgroup |                  digest_text                   | count_star 
-----------+------------------------------------------------+------------
 20        | SELECT inet_server_addr(),pg_is_in_recovery(); | 1
(1 row)



Read/Write split
Verify SELECT goes to a replica and writes go to the primary:




# Should return pg_is_in_recovery = true (replica)
kubectl run psql-test --rm -it --restart=Never --image=postgres:17 -n everest \
 --env="PGPASSWORD=<pass>" \
 -- psql -h proxysql -p 5432 -U postgres -d postgres \
    -c "SELECT inet_server_addr(), pg_is_in_recovery();"


# Should return pg_is_in_recovery = false (primary)
kubectl run psql-test --rm -it --restart=Never --image=postgres:17 -n everest \
 --env="PGPASSWORD=<pass>" \
 -- psql -h proxysql -p 5432 -U postgres -d postgres \
    -c "CREATE TABLE IF NOT EXISTS proxysql_test (id serial); SELECT inet_server_addr(), pg_is_in_recovery();"

 inet_server_addr | pg_is_in_recovery 
------------------+-------------------
 10.42.2.6        | f


Confirm from the admin interface which hostgroup each query was routed to:

SELECT hostgroup, digest_text, count_star
 FROM stats.stats_pgsql_query_digest
 ORDER BY last_seen DESC LIMIT 10;


Connection multiplexing
ProxySQL by default enables connection multiplexing (need some description what it is and how it is different from connection pooling).

# Initialize
kubectl run pgbench-init --rm -it --restart=Never --image=postgres:17 -n everest \
 --env="PGPASSWORD=<pass>" \
 -- pgbench -h proxysql -p 5432 -U postgres -d postgres -i


# Then run the test
kubectl run pgbench --rm -it --restart=Never --image=postgres:17 -n everest \
 --env="PGPASSWORD=<pass>" \
 -- pgbench -h proxysql -p 5432 -U postgres -d postgres \
    --client=20 --jobs=4 --time=30 --select-only


Then in a second terminal while it runs:




kubectl run psql-admin --rm -it --restart=Never --image=postgres:17 -n everest \
 --env="PGPASSWORD=<radmin-pass>" \
 -- psql -h proxysql -p 6132 -U radmin -d admin \
    -c "SELECT hostgroup, srv_host, ConnUsed, ConnFree, ConnOK FROM stats.stats_pgsql_connection_pool;"


-client=20 = 20 concurrent client connections, --select-only = read-only queries so they all hit the replica hostgroup. ConnUsed should be significantly less than 20 if multiplexing is working.



Conclusion

There are lots of manual steps to configure ProxySQL integration with PostgreSQL deployed with OpenEverest. It is far from ideal, but proves the concept that it is working.  Gladly in v2 this will be automated through a new plugin system. Stay tuned.
