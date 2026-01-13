---
title: "OpenEverest 1.11.0: Flexible Networking with NodePort Support"
date: 2026-01-14T10:00:00Z
draft: false
image:
    url: v1.11.0-nodeport-cover.png
    attribution: 
authors:
 - recharte
tags:
 - announcement
 - release
 - kubernetes
 - database
 - networking
summary: OpenEverest v1.11.0 is now available, featuring the highly requested NodePort networking option for flexible database exposure, along with support for PostgreSQL 18.1 and updated operators.
---

# OpenEverest 1.11.0: Flexible Networking with NodePort Support

We are excited to announce the release of **OpenEverest v1.11.0**! This release brings major updates to our platform, including support for **PostgreSQL 18.1**, updated operators, and key stability fixes.

However, the highlight of this release is a highly requested networking feature that gives you granular control over how you expose your database clusters: **NodePort Service Type support**.

---

## Why NodePort?

Until now, OpenEverest primarily relied on `LoadBalancer` services or internal `ClusterIP` to expose database clusters. While LoadBalancers are excellent for production environments requiring high availability, they are not a "one-size-fits-all" solution.

The community made a strong case for this feature (see [Issue #234](https://github.com/openeverest/openeverest/issues/234)), and we want to highlight where NodePort shines:

#### 1. Cost-Effective Dev/Test Environments

Cloud LoadBalancers typically incur an hourly cost per service. When spinning up multiple ephemeral environments for development, testing, or CI/CD, these costs compound quickly. NodePort provides a "free," native way to expose temporary databases without provisioning extra cloud infrastructure.

#### 2. Strict Internal Networking (VPC)

For many enterprises, exposing a database via a public-facing LoadBalancer—even with access lists—is a non-starter. NodePort allows you to expose databases exclusively within your private network (VPC). This enables application clusters or legacy VMs in the same network to connect securely using standard internal firewall rules, keeping your data completely off the public internet.

#### 3. On-Premises & Bare Metal Simplicity

Running Kubernetes on bare metal often means you don't have a cloud provider's LoadBalancer readily available. While tools like MetalLB exist, they add operational complexity. NodePort offers a universal, out-of-the-box solution to expose services in these environments.

#### 4. Advanced Custom Routing

Power users often prefer to handle their own DNS and routing logic. By exposing a stable NodePort, you can easily integrate with tools like **ExternalDNS** or **Consul** to map custom hostnames to your database nodes, bypassing the rigid configurations of standard cloud load balancers.

---

## ⚠️ Important: The Availability Trade-off

While OpenEverest deploys highly available database clusters (with multiple replicas running on different nodes), using **NodePort** shifts the connectivity responsibility to the client.

#### **The Connectivity Challenge**

To connect via NodePort, your client application typically targets a specific **Node IP** (e.g., `192.168.1.10`).

* **The Risk:** If that specific node crashes or is taken down for maintenance, your application's connection will fail, even if the database pods are running perfectly on other nodes.
* **The Mitigation (Smart Clients):** Unlike a LoadBalancer, standard clients won't automatically reroute. However, you can mitigate this by using **Failover Connection Strings**. Many modern database drivers (like PostgreSQL JDBC or MongoDB drivers) accept a list of multiple Node IPs. If the first node is down, the driver will automatically attempt to connect to the next one in the list.

> **Expert Tip:** When using NodePort for production-like workloads, always configure your client applications with at least 2 or 3 different Node IPs to ensure resilience.

---

## Feature Spotlight: Exposing DatabaseClusters via NodePort

In **v1.11.0**, you can now configure your DatabaseClusters to use the `NodePort` service type. When enabled, Kubernetes opens a specific port (range 30000-32767) on every node in the cluster.

### How to Enable It

You will find the **NodePort** option in the **External Access** settings within **Advanced Configurations**:

* **New Clusters:** In the Database Creation Wizard, navigate to **Advanced Configurations** > **External Access** and select **NodePort**.
* **Existing Clusters:** Go to your database **Overview** page, click **Edit** under **Advanced Configurations**, and switch the Exposure Method to **NodePort**.

### How to Connect

Once configured, use standard Kubernetes commands to retrieve your connection details.

**1. Retrieve a Node IP**
Find the IP address of the nodes in your cluster:

```bash
kubectl get nodes -o wide

```

* Use `EXTERNAL-IP` for access outside the cluster (if allowed).
* Use `INTERNAL-IP` for access within the VPC/private network.

**2. Retrieve the Assigned Port**
Find the port assigned to your database service using this command (replace `<DB_NAME>` and `<DB_NAMESPACE>`):

```bash
kubectl get svc -n DB_NAMESPACE | grep '^DB_NAME' | grep NodePort | awk '{print $5}' | grep -oE '[0-9]+/TCP'`

```

*Example Output:* `30179`

**3. Connect**
Combine the IP and Port to form your connection string:
`postgres://user:password@<NODE_IP>:30179/dbname`

For a deep dive on configuration, check out the [official NodePort documentation](https://docs.percona.com/everest/networking/nodeport_support.html).

---

## Other Release Highlights

* **PostgreSQL 18.1 Support:** Deploy clusters using the latest PostgreSQL 18.1 to leverage the newest performance improvements and security patches.
* **Operator Updates:** We have updated the underlying operators, including support for **Percona PostgreSQL Operator v2.8.2**.
* **Bug Fixes:**
  * Fixed an issue where MongoDB backup restores failed due to missing version fields.
  * Resolved a race condition when adding the first backup storage to a PostgreSQL cluster.
  * Added deletion protection for backup/restore resources currently in progress.


---

## Get Started

Ready to upgrade?

* **Upgrade:** Follow the [Upgrade Guide](https://docs.percona.com/everest/upgrade/upgrade_with_helm.html) to move to v1.11.0.
* **Release Notes:** Read the full list of changes in the [Release Notes](https://docs.percona.com/everest/release-notes/Percona-Everest-1.11.0-%282026-01-12%29.html).
* **Feedback:** If you have questions, let us know on [GitHub Issues](https://github.com/openeverest/openeverest/issues).

Happy clustering! 🏔️
