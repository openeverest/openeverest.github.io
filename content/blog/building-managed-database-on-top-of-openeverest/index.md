---
title: "Building a Managed Database Service on Top of OpenEverest for Locci Cloud"
date: 2026-09-23T12:00:00Z
draft: false

image:
  url: images/locci-openeverest.png
  attribution:

authors:
  - MikeTeddyOmondi

tags:
  - OpenEverest
  - Kubernetes
  - PostgreSQL

summary: >
  Learn how Locci Cloud experimented with and eventually adopted OpenEverest to their platform.
---

This post is a talk on how we added one-call Postgres provisioning to [Locci Cloud](https://www.locci.cloud), the wins, the gotchas, and the one experiment that made the whole thing click.

## The itch

Locci Cloud is a small, opinionated PaaS. You push a project, we bundle it, and a Go service called `locci-deployer` turns it into a Deployment Service Ingress on a single-node k3s cluster. It works. It's boring in the good way.

But every real app eventually asks the same question: "where's my database?" Until now the answer was "bring your own," which is a terrible answer for a platform that's supposed to make infrastructure disappear. We wanted the Neon/Supabase experience, **one API call, get a connection string back**, without becoming a database company.

So the goal was simple to state: **let a tenant POST a request and get a ready-to-use Postgres, using the same deployer service that already creates our Kubernetes objects.** We didn't want to hand-roll StatefulSets, backups, failover, and connection pooling. That's a solved problem, and [OpenEverest](https://github.com/openeverest/openeverest) solves it.

This is the story of wiring OpenEverest into our platform, written for the [OpenEverest](https://github.com/openeverest/openeverest) and [CNCF](https://www.cncf.io/) community at large, because the parts that tripped us up are exactly the parts a guide can't fully prepare you for.

## Why OpenEverest?

OpenEverest gives you a single, clean abstraction, the DatabaseCluster custom resource, that hides an enormous amount of operational machinery ([Percona](https://www.percona.com/) operators, pgBouncer, PVCs, TLS, secrets). From our side of the fence it means:

- **One CRD to write.** We create a DatabaseCluster; the operator does the rest.
- **Multi-engine.** Postgres today, MySQL/MongoDB later, same shape.
- **Kubernetes-native.** No external control plane, no vendor lock-in. It lives in _our_ cluster.

Crucially, that CRD is a contract we can drive from code without importing a heavy SDK. Which set the tone for our whole integration.

## The architecture: a dynamic client, not an SDK

Inside Locci Cloud, _locci-deployer_ is our Go service that links and talks to the Kubernetes API. The temptation was to pull in the Everest/Percona Go modules. We didn't, importing an operator's SDK drags in a couple hundred transitive dependencies and couples your build to their release cadence. Instead we used the Kubernetes **dynamic client** and treated DatabaseCluster as unstructured YAML-in-Go. The entire "SDK" is a handful of GroupVersionResource values:

```go
var GVRDatabaseCluster = schema.GroupVersionResource{
    `Group: "everest.percona.com", Version: "v1alpha1", Resource: "databaseclusters",`
}
```

Provisioning is then just building an unstructured object and calling .Create() / .Update(). Listing, status, deletion, all the same dynamic client. Zero new heavyweight dependencies, and our go.mod didn't gain a single module (the dynamic client already ships with client-go). If you're integrating [OpenEverest](https://github.com/openeverest/openeverest) into an existing Go service, **start here**. It's the lightest possible coupling.

## Reality check \#1: installation isn't what the old notes said

Our internal setup notes (written against an older assumption) told us to install with  
`everestctl install --operator.postgresql=true` from a GitHub releases URL. That's not how modern [OpenEverest](https://github.com/openeverest/openeverest) installs. The real path is Helm:

```bash
helm repo add openeverest https://openeverest.github.io/helm-charts/
helm repo update
helm install everest openeverest/openeverest \
  --namespace everest-system --create-namespace \
  --set dbNamespace.pxc=false \
  --set dbNamespace.psmdb=false \
  --set dbNamespace.postgresql=true
```

That single command lays down four namespaces, everest-system (server operator), everest-olm (OLM), everest-monitoring, and the **everest** DB namespace where your databases and the Percona operators actually live. The operator flags live on the everest-db-namespace subchart (dbNamespace.{postgresql,pxc,psmdb}, all default true), so you disable what you don't need.

**Takeaway:** trust the current Helm chart docs over any older everestctl operator flags.

## Reality check #2: the database engine that would not install

After installing, kubectl get dbengine \-n everest showed percona-postgresql-operator stuck on installing, forever. The operator pod was healthy. The CSV said Succeeded. But provisioning any DatabaseCluster failed with spec.engine.version: Unsupported value: "".

The clue was in the everest-operator logs:

`Get "https://check.percona.com/versions/v1/pg-operator/3.0.0":`  
 `dial tcp: lookup check.percona.com: server misbehaving`

**OpenEverest's operator calls the [Percona](https://www.percona.com/) Version Service to populate the list of installable database versions.** If your cluster DNS can't resolve check.percona.com, the engine never finishes installing, status.availableVersions stays empty, and, because engine.version is required, you can't provision anything.

In our case CoreDNS was forwarding to a broken upstream. The fix:

```bash
kubectl -n kube-system get cm coredns -o jsonpath='{.data.Corefile}' \
  sed 's#forward . /etc/resolv.conf#forward . 1.1.1.1 8.8.8.8#' > /tmp/Corefile
# recreate the configmap with the patched Corefile, then:
kubectl -n kube-system rollout restart deploy/coredns
```

Seconds later the version service returned 200, the engine flipped to installed, and status.availableVersions filled with real Postgres versions (15, 16, 17, 18…).

**Takeaway:** if your engine is stuck installing with an operator that looks healthy, check egress DNS to check.percona.com before anything else. This is a five-minute fix that you can eat in the afternoon.

## Reality check #3: the multi-tenant model is subtler than "a namespace per tenant"

That plan does not survive contact with OpenEverest 1.16. The DB namespace's OperatorGroup (everest-databases) runs in **OLM SingleNamespace mode**, targetNamespaces: [`everest`]. It watches exactly one namespace. A DatabaseCluster dropped into tenant-abc simply never reconciles, because no operator is watching there. Everest's actual model for multiple DB namespaces is to **install a fresh operator set per namespace** (via the everest-db-`namespace` subchart / everestctl namespaces add), not to fan one OperatorGroup out across many. So we made a deliberate MVP decision: **all databases live in the shared everest namespace, isolated by a locci.cloud/tenant label.** Our API enforces ownership on that label, a tenant can only see, connect to, or delete a cluster carrying their tag.

```go
list, _ := dc.Resource(GVRDatabaseCluster).Namespace("everest").List(ctx, metav1.ListOptions{
  LabelSelector: "locci.cloud/tenant=" + tenantID,
})
```

The trade-off is honest: isolation is _logical_ (label \+ RBAC), not a hard namespace boundary, and cluster names must be globally unique. For a small platform that's a fine place to start. Per-tenant namespaces become a real option later, but only once you understand it means N operator installs, which brings us to…

## Interlude: what does per-namespace actually cost?

Because we run on a modest single-node VPS, we measured instead of guessed. An idle percona-postgresql-operator costs roughly **10m CPU / 40Mi RAM**. That's _per DB namespace_. The shared OLM control plane and everest-server are paid once (\~400–500Mi combined baseline).

So the shared model is **constant** overhead; the per-namespace model is **linear** (20 tenants ≈\~0.8GB of RAM in idle operators alone, before a single query runs). On constrained hardware, the shared-namespace-plus-labels approach isn't just simpler, it's materially cheaper. Reach for per-namespace isolation when you have the headroom and a compliance reason to.

## The API we exposed

With the model settled, the deployer grew a small, boring, pleasant /db/\* surface:

| Endpoint                                    | Does                                         |
| :------------------------------------------ | :------------------------------------------- |
| POST `/db/provision`                        | Create/update a DatabaseCluster (idempotent) |
| GET `/db/clusters/:tenant`                  | List a tenant's databases (label-filtered)   |
| GET `/db/clusters/:tenant/:name/status`     | Just the .status                             |
| GET `/db/clusters/:tenant/:name/connection` | How to connect (see below)                   |
| DELETE `/db/deprovision`                    | Delete the database                          |

A provision request is exactly what you'd hope:

```json
{
  "tenant_id": "0255…",
  "cluster_name": "pg01",
  "engine": { "type": "postgresql", "version": "16.14", "replicas": 1 },
  "resources": { "cpu": "500m", "memory": "512Mi" },
  "storage": { "size": "512Mi" }
}
```

Two schema notes that cost us a couple of failed applies, so you don't repeat them:

- **engine.version is required**, no "latest" shortcut. Read valid values from the dbengine resource's status.availableVersions.
- **proxy.expose values changed.** internal/external are deprecated; use ClusterIP / LoadBalancer. The operator warns you, but only after you've already been surprised.

## Connection strings: the part everyone actually cares about

A managed database is only as good as the connection string it hands back. We designed the connection endpoint around three consumers:

1. **In-cluster services** (our WASM-based _Locci Functions_) should use the **pooled internal DNS**, lowest latency, no hair-pinning out of the cluster: `pg01-pgbouncer.everest.svc.cluster.local:5432`.
2. **A dashboard** should be able to show the user a full URI _on demand_.
3. **Nobody** should get a password by accident.

So by default the endpoint returns password-free URIs plus the name of the Kubernetes secret (everest-secrets-`<cluster>`) where the real credentials live. In-cluster consumers read that secret directly and never touch our HTTP API for it. A dashboard that genuinely needs the password passes `?reveal=true` query paramaters, and we return it explicitly, with a hard note that it's a live secret over HTTP and must sit behind auth.

One small bug worth sharing: Everest-generated passwords are _spicy_ (ours had these special characters `\] \< , ; \=` in it). Naively string-concatenating that into `postgres://user:pass@host` produces an invalid URI. Build it with your language's URL type so userinfo gets percent-encoded, we verified the round-trip by parsing the URI back and comparing the decoded password to the secret.

## The hard part: giving each database a hostname

Internal access was easy. The interesting challenge was **external** access, a developer on a laptop running migrations, or wanting psql from their machine.

The naive answer is `proxy.expose: LoadBalancer`. On a single node that gives you the node's IP on :5432… for exactly **one** database. The second one collides on the host port. And you get a raw IP:5432, not the `something.your-domain.com` experience people expect from Neon or Supabase.

What we _wanted_ was: many databases, one port, routed by hostname. That's SNI routing, and it's where Postgres fights you.

### The Postgres STARTTLS problem

Postgres doesn't start with a TLS ClientHello. It sends a plaintext SSLRequest preamble first, _then_ upgrades. A generic TCP/SNI router won't see the SNI hostname unless it specifically understands this Postgres handshake. This one question, _can our ingress even read the SNI?_, gated the entire feature. So before writing a line of deployer code, we ran a spike. We already run [Traefik](https://traefik.io/traefik/). We added a TCP entrypoint on :5432 and created an IngressRouteTCP:

```yaml
apiVersion: traefik.io/v1alpha1
kind: IngressRouteTCP
metadata:
  name: pg01-db
  namespace: everest
spec:
  entryPoints:
    - postgres
  routes:
    - match: HostSNI(`pg01-db.locci.cloud`)
      services:
        - name: pg01-pgbouncer
          port: 5432
  tls:
    passthrough: true
```

The debugging arc was genuinely fun:

1. First attempt ([Traefik](https://traefik.io/traefik/) terminates TLS): psql returned tlsv1 alert no application protocol. **Progress\!** That's not a timeout, it means Traefik read the SNI and did the TLS dance. The failure was ALPN: psql 18 offers ALPN postgresql, and Traefik's default TLS advertised HTTP protocols.
2. Adding a `TLSOption{ alpnProtocols: [postgresql] }` moved us to **FATAL: SSL required**, a _Postgres-level_ error, meaning routing now reached pgBouncer, but Traefik was connecting to it in plaintext while pgBouncer required TLS.

3. Switching to **tls: { passthrough: true }**, letting pgBouncer terminate TLS itself, and it worked. Clean connection, both with default STARTTLS negotiation and sslnegotiation=direct.

```bash
$ psql "host=pg01-db.locci.cloud port=5432 user=postgres sslmode=require"
  result                          | current_database
----------------------------------+------------------
 routed via traefik sni           |   postgres
```

[**Traefik**](https://traefik.io/traefik/) **can SNI-route Postgres, in passthrough mode.** No pgcat, no Neon-proxy, no custom Go network code. That was the moment the whole feature became real.

## Wiring it into the deployer

With the mechanism proven, we added a third expose mode, Ingress, to the provision API. When a tenant sets `"expose": "Ingress"`, the deployer keeps the database ClusterIP and additionally emits an IngressRouteTCP for `<cluster>-db.<domain>`. Deprovisioning tears it down. The connection endpoint then returns the external hostname as a first-class URI.

One delightfully mundane constraint shaped the naming. We're on Cloudflare's free tier, whose Universal SSL (and a `*.locci.cloud` wildcard cert) only covers **one** label. So `pg01.db.locci.cloud` would need a paid multi-level wildcard, but `pg01-db.locci.cloud` (single label, dash instead of dot) is covered by what we already have. A tiny detail that saved a recurring bill per tenant's database.

The end result: provision a database, get back `postgres://user@pg01-db.locci.cloud:5432/postgres`, and every new database gets its own hostname multiplexed over a single :5432, the Neon model, on our own cluster, on free-tier DNS.

## An honest caveat: an everest-server crash we hit (and mis-diagnosed at first)

Not everything was clean. On our dev cluster, running on [k3d](https://k3d.io/) on MacOS, the **everest-server** (the UI/REST API) crash-loops on both 1.16.1 (fatal error: concurrent map writes) and 1.15.2 (SIGSEGV), always right after logging starting incluster client cache, **twice**. The _operators_ (everest-operator, the Percona operators) run fine, which is why database provisioning works end to end regardless; only the dashboard is affected.

Our first theory was an architecture problem, because we're on Apple Silicon. **That theory was wrong**, for version 1.15.2 at least, and it's worth showing why, because it's a good lesson in reading a stack trace properly. The build is a clean arm64 one (zero asm_amd64 frames). The real crashing path is:

```bash
internal/server/handlers/rbac.New
 → pkg/rbac.NewEnforcerWithRefresh   (rbac.go:187)
 → pkg/rbac.newEnforcer            (rbac.go:160)
 → pkg/rbac.validatePolicy       (validate.go:43)
 → pkg/rbac.buildPathResourceMap (rbac.go:296)
 → client.GetSwagger/GetSpec (everest-client.gen.go:16269)
 → openapi3.Loader.LoadFromData → deepCast → json.Unmarshal
 → fatal error: concurrent map writes
```

So the server crashes while the **RBAC enforcer parses the embedded OpenAPI spec** (kin-openapi), with two goroutines doing it concurrently, which also explains the duplicated startup log line. It's a data race in an initialization path, not an arch or emulation issue at all.

We've reported it to the OpenEverest maintainers with the full trace. Two takeaways worth more than the bug itself: **read past the stdlib frames to the frames that are actually yours**, and when a project has a friendly community (OpenEverest does, thanks to the folks in the CNCF Slack), a good report gets you a real answer faster than another day of guessing.

For version 1.16.1, we found out later that the arm64 variant of [openeverest github images](https://ghcr.io/openeverest/openeverest) shipped an x86-64 `everest-api` binary, so the OpenEverest server crashed on arm64 hosts with `exec /everest-api: exec format error`.

Note that all these got fixed on version [1.16.2](https://github.com/openeverest/openeverest/releases/tag/v1.16.2) about ~3 weeks later.

## What we ended up with

- A `/db/` API on our existing deployer that provisions Postgres via [OpenEverest](https://github.com/openeverest/openeverest) with a single call.
- Internal pooled connection strings for in-cluster functions, secret-backed credentials, and an opt-in reveal for dashboards.
- **Per-database public hostnames** (`<name>`-db.locci.cloud) via [Traefik](https://traefik.io/traefik/) IngressRouteTCP \+ HostSNI in passthrough mode, validated end to end, free-tier friendly.

- A resource-honest, single-node-friendly shared-namespace tenancy model, with a clear path to per-namespace isolation when we outgrow it.

All of it on top of a CRD contract, driven by a dynamic client, with no operator SDK in our build.

## Lessons for anyone building on [OpenEverest](https://github.com/openeverest/openeverest)

1. **Drive the CRDs with a dynamic client.** Lightest possible coupling; your go.mod barely notices.
2. **Egress DNS to check.percona.com is load-bearing.** If your engine is stuck installing, check that first.
3. **Understand the OperatorGroup mode before you design tenancy.** SingleNamespace means shared namespace \+ labels is the simple path; per-namespace means N operator installs, measure the cost.
4. **engine.version is required; expose values are ClusterIP/LoadBalancer.** Small schema facts, real time saved.
5. **Postgres external access \= TCP SNI, not HTTP Ingress.** [Traefik](https://traefik.io/traefik/) does it in tls.passthrough. Spike the STARTTLS question before you build around it.
6. **Percent-encode generated passwords** when you build URIs.

[OpenEverest](https://github.com/openeverest/openeverest) did the genuinely hard part \- the databases themselves. Our job was a thin, honest layer of glue and a couple of good afternoon-saving discoveries. If you're building a DBaaS layer on top of it, we hope this saves you a few of ours.

## Join the Community

- **Contribute:** If you want to dive in, check out our [Good First Issues](https://github.com/orgs/openeverest/projects/2) and [repositories](https://github.com/openeverest).
- **Chat:** Join the conversation in the CNCF Slack (channel: [#openeverest-users](https://cloud-native.slack.com/archives/C09RRGZL2UX)).
- **Explore:** See how we're simplifying databases at [openeverest.io/#community](https://openeverest.io/#community).
<div style="display:flex;gap:12px;margin-top:24px;flex-wrap:wrap;">
  <a href="https://cloud-native.slack.com/archives/C09RRGZL2UX" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:8px;background-color:#4A154B;color:#fff;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;font-size:15px;">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 122.8 122.8"><path d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z" fill="#e01e5a"/><path d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z" fill="#36c5f0"/><path d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z" fill="#2eb67d"/><path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z" fill="#ecb22e"/></svg>
    Join Slack
  </a>
  <a href="https://github.com/openeverest/openeverest" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:8px;background-color:#24292f;color:#fff;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;font-size:15px;">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="#fff"><path d="M8 .25a7.75 7.75 0 1 0 0 15.5A7.75 7.75 0 0 0 8 .25zm0 1.5a6.25 6.25 0 0 1 1.97 12.18c-.31.06-.42-.13-.42-.3v-1.05c0-.36-.01-1.02-.49-1.4 1.62-.18 2.5-.88 2.5-2.57 0-.57-.2-1.1-.53-1.49.05-.14.23-.7-.05-1.47 0 0-.44-.14-1.44.54a5.02 5.02 0 0 0-2.62 0C5.93 6.6 5.49 6.74 5.49 6.74c-.28.77-.1 1.33-.05 1.47-.33.39-.53.92-.53 1.49 0 1.69.88 2.39 2.5 2.57-.31.27-.43.67-.47 1.04-.42.19-1.5.52-2.16-.62 0 0-.39-.71-1.13-.76 0 0-.72-.01-.05.45 0 0 .48.23.82 1.08 0 0 .43 1.32 2.49.87v.75c0 .17-.11.36-.42.3A6.25 6.25 0 0 1 8 1.75z"/></svg>
    Star the Repo
  </a>
</div>
