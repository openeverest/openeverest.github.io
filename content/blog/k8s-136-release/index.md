---
title: "Kubernetes 1.36 'Haru': Volume Group Snapshots, GPU Partitioning, and OCI Volume Sources"
date: 2026-04-23T10:00:00Z
draft: false
image:
    url: k8s-v1.36.svg
    attribution: https://kubernetes.io/blog/2026/04/22/kubernetes-v1-36-release/
authors:
 - spron-in
tags:
 - blog
 - kubernetes
 - database
 - scaling
 - AI
summary: Kubernetes 1.36 brings Volume Group Snapshots, OCI Volume Source, DRA GPU partitioning, and Memory QoS to stable/beta. Here is what matters for databases, portability, and AI on Kubernetes.
---

Spring 2026 arrives with [the release](https://kubernetes.io/blog/2026/04/22/kubernetes-v1-36-release/) of Kubernetes v1.36 (codenamed "Haru" — 春, meaning spring in Japanese). This release packs 70 enhancements: 18 graduated to Stable, 25 to Beta, and 25 new in Alpha.

At OpenEverest, we care about anything that makes running databases on Kubernetes safer, more portable, and more observable. This release delivers on all three fronts. Volume Group Snapshots finally hit GA, OCI artifacts can now serve as native volume sources, and the Dynamic Resource Allocation framework is maturing fast — directly impacting GPU-heavy AI/ML pipelines that increasingly run alongside databases.

Here is our breakdown, starting with the features most critical for data workloads.

## Volume Group Snapshots: Crash-Consistent Backups Go GA

This is the headline feature for anyone managing stateful workloads. Volume Group Snapshots ([KEP #3476](https://kep.k8s.io/3476)) graduated to Stable in v1.36. 

Many database deployments use multiple PersistentVolumeClaims — for example, one for data and one for the write-ahead log (WAL). Previously, snapshotting each volume independently could result in an inconsistent state: the WAL snapshot might be ahead of the data snapshot, making point-in-time recovery unreliable.

VolumeGroupSnapshot solves this by taking crash-consistent snapshots across multiple PVCs simultaneously. From the storage system's perspective, all volumes in the group are frozen at the same instant.

**Why this matters for OpenEverest:**

There are two scenarios where this feature is directly useful for PostgreSQL clusters on OpenEverest.

**Scenario 1: Multiple tablespaces.** PostgreSQL supports tablespaces — you can place specific tables or indexes on separate storage volumes (for example, a hot OLTP tablespace on NVMe and a cold archive tablespace on cheaper spinning disk). Each tablespace lives on its own PVC. A snapshot taken PVC-by-PVC would leave recovery in an inconsistent state because the tablespace PVCs would be captured at slightly different points in time. VolumeGroupSnapshot solves this by freezing all of them at once.

**Scenario 2: Snapshotting the full cluster topology.** In a primary + replica setup, each Pod has its own PVC. If you want to clone the entire cluster — for example, to spin up a staging environment that mirrors production — you need all volumes captured at the same WAL position. Snapshotting them independently means each clone node would be at a different LSN, and forming a replica set from them would require replay and reconciliation. VolumeGroupSnapshot captures all nodes atomically.

```yaml
apiVersion: groupsnapshot.storage.k8s.io/v1
kind: VolumeGroupSnapshot
metadata:
  name: pg-cluster-snapshot
spec:
  volumeGroupSnapshotClassName: csi-groupsnapclass
  source:
    selector:
      matchLabels:
        app: postgresql
        instance: prod-db-01
```

All PVCs labeled with `app: postgresql` and `instance: prod-db-01` — whether that is three replica volumes or multiple tablespace volumes — are snapshotted atomically. Restoring from this group snapshot guarantees a consistent recovery point across the entire cluster.

**One important caveat: crash-consistent ≠ application-consistent.** VolumeGroupSnapshot gives you storage-level atomicity — all volumes are frozen at the same instant — but it does not flush in-memory database buffers to disk before triggering the snapshot. The name "crash-consistent" means exactly that: the snapshot looks like what you would get if the machine lost power at that moment. Data that was in the database buffer cache but not yet written to disk is simply absent.

Whether that is a problem depends on the database:

- **PostgreSQL** can recover from a crash-consistent snapshot through WAL replay, provided the WAL data is included in the snapshot. On restore, PostgreSQL detects the unclean shutdown and replays the WAL to reach a consistent state — this is exactly what it does after a real crash. For tablespace snapshots, all PVCs must be captured atomically (which is what VolumeGroupSnapshot provides) so WAL replay can reconcile them.
- **MySQL / MongoDB / others** vary. Some engines support crash recovery well; others benefit from a quiesce step first — for example, running `FLUSH TABLES WITH READ LOCK` in MySQL, or using the database's native freeze/checkpoint API before triggering the snapshot.

In practice, a robust backup script should trigger a checkpoint or quiesce the engine before calling the snapshot API whenever the database supports it. VolumeGroupSnapshot handles the hard part — ensuring all volumes are captured at the same storage instant — but application-level preparation remains the operator's responsibility.

This feature relies on [CSI extension APIs for group snapshots](https://kubernetes-csi.github.io/docs/group-snapshot-restore-feature.html#volume-group-snapshot-apis), so your CSI driver must support it. But the API surface is now stable and safe for production.

---

## Memory QoS with cgroups v2 (Beta)

Memory QoS ([KEP #2570](https://kep.k8s.io/2570)) advances to Beta in v1.36, bringing smarter, tiered memory protection to Linux nodes using cgroups v2.

Databases are memory-hungry, and they suffer disproportionately from memory pressure compared to stateless services. When a neighboring Pod on the same node allocates aggressively, the kernel's page reclaim can thrash the database buffer cache, causing dramatic latency spikes.

Memory QoS addresses this by programming `memory.min` and `memory.high` in the cgroup hierarchy. The kubelet now:

* Sets **`memory.min`** based on the Pod's `requests.memory`, guaranteeing that the kernel will not reclaim memory below this threshold from the container. Your database buffer cache stays warm.
* Sets **`memory.high`** based on `limits.memory`, creating a soft throttle before the hard OOM kill. Instead of instant death, the container gets slowed down, giving the system time to reclaim pages gracefully.

This iteration also adds metrics and safeguards to prevent livelocks, along with configuration options so cluster operators can tune behavior per environment.

One hard requirement: this feature only works on nodes with **cgroups v2** enabled. Most modern Linux distributions default to cgroups v2 (RHEL 9, Ubuntu 22.04+, Fedora 31+), but older node images do not. If your kubelet is still on cgroups v1, the `memory.min` and `memory.high` knobs are silently ignored.

For OpenEverest users on cgroups v2, this means that a PostgreSQL `shared_buffers` or MongoDB `wiredTiger` cache is now more protected from noisy neighbors without requiring dedicated nodes.

---

## PSI Metrics Go Stable: Know When Your Node Is Stalling

Pressure Stall Information (PSI) ([KEP #4205](https://kep.k8s.io/4205)) graduates to Stable. The kubelet can now report pressure metrics for CPU, memory, and I/O based on the Linux kernel's PSI framework.

**The key distinction:** traditional utilization metrics tell you a resource is *busy*. PSI metrics tell you workloads are *waiting*. A node at 80% CPU utilization might be fine. A node with 20% CPU *pressure* is actively stalling processes.

A PostgreSQL instance experiencing I/O stalls due to shared storage contention will now surface as I/O pressure — even while CPU and memory utilization look completely normal. That matters because utilization-based alerting misses this failure mode entirely: the node looks healthy right up until queries start timing out. With PSI metrics available from the kubelet, you can set alerts on `io` stall percentage and catch the degradation while there is still time to act — move the workload, throttle a noisy neighbor, or trigger a failover.

---

## Staleness Mitigation for Controllers: Safer Operator Reconciliation

Controller staleness mitigation ([KEP #5647](https://kep.k8s.io/5647)) is now in Beta. This addresses a subtle but dangerous problem: what happens when a controller reconciles based on an outdated view of the cluster?

For database operators (like the ones OpenEverest builds on), stale cache reads during reconciliation can lead to harmful actions — scaling down a replica that is actually still serving traffic, or triggering a failover based on a state that has already resolved. This feature adds mechanisms for controller authors to opt into freshness guarantees, along with metrics to observe how often reconciliation is running on stale data.

This is not something end users configure — it is a building block for operator authors. The practical benefit is that operators built with these primitives become safer by default, without end users having to think about cache consistency.

---

## Mutable Container Resources for Suspended Jobs

The `MutablePodResourcesForSuspendedJobs` feature ([KEP #5440](https://kep.k8s.io/5440)) graduates to Beta (enabled by default). It allows you to change CPU, memory, GPU, and extended resource requests/limits on a Job's PodTemplate while the Job is suspended.

This is particularly relevant for batch database workloads — backup jobs, ETL pipelines, data migrations. A queue controller can now:

1. Suspend an incoming backup Job.
2. Inspect available cluster resources.
3. Adjust the Job's resource requests to fit current capacity.
4. Unsuspend the Job.

Changes are strictly limited to suspended Jobs (or Jobs whose Pods have been terminated upon suspension), preventing disruptive modifications to running workloads.

---

## Workload Aware Scheduling: Gang Scheduling Gets Atomic Binding

Kubernetes v1.35 introduced Gang Scheduling in Alpha — the "all-or-nothing" guarantee for scheduling pod groups. v1.36 takes this further under the broader Workload Aware Scheduling (WAS) umbrella, with a new PodGroup scheduling cycle that evaluates the entire group atomically.

The difference from v1.35: instead of just checking that enough pods *could* be scheduled, the v1.36 scheduler runs a complete scheduling cycle for the group — either all pods are bound together, or none are. This eliminates the race conditions where pods could end up on suboptimal nodes because they were evaluated independently.

**Database relevance:** Some clustered topologies (like a Galera cluster for MySQL or a MongoDB replica set) benefit from having all nodes start simultaneously to form a quorum during initialization. WAS ensures this happens cleanly.

**AI relevance:** Distributed training jobs that require all workers to start at once are a primary use case. No more half-started training runs consuming expensive GPU resources while waiting for the rest of the group.

This work spans several KEPs ([#4671](https://kep.k8s.io/4671), [#5547](https://kep.k8s.io/5547), [#5832](https://kep.k8s.io/5832), [#5732](https://kep.k8s.io/5732), [#5710](https://kep.k8s.io/5710)) and remains in Alpha.

---

## OCI Artifacts as Volume Sources (GA)

OCI Volume Source ([KEP #4639](https://kep.k8s.io/4639)) graduates to Stable. You can now mount content from any OCI-compliant registry directly as a volume in a Pod — using the same registries and versioning workflows you already use for container images.

```yaml
volumes:
- name: model-data
  image:
    reference: registry.example.com/ml-models/embeddings:v2.1
    pullPolicy: IfNotPresent
```

For data workloads this means database seed data, schema migrations, or Liquibase changelogs can be versioned and distributed as OCI artifacts rather than baked into init containers or pulled from cloud storage buckets. For AI workloads, ML models and embeddings can use the same registry and tagging workflow as your container images. The same `imagePullSecrets`, the same registry mirror config, the same air-gap story — no separate model store required. The volume is always read-only, which is the right default for both cases.

---

## External ServiceAccount Token Signing: Centralised Identity Across Clusters

External ServiceAccount token signing ([KEP #740](https://kep.k8s.io/740)) reaches Stable. Clusters can now offload JWT signing to an external system while integrating cleanly with the Kubernetes API.

Previously, each cluster held its own signing key for service account tokens, meaning there was no way to issue a token valid across clusters without copying keys or building custom federation logic. Now, you can point multiple clusters at the same external signer — HashiCorp Vault, AWS KMS, a SPIFFE/SPIRE deployment, or any OIDC-compliant system. Each cluster's kube-apiserver fetches the public keys from the external signer, caches them, and validates tokens regardless of which cluster issued them.

For multi-cluster database deployments this matters when a workload in cluster A needs to authenticate to a control plane component in cluster B using a projected service account token — something that previously required custom workarounds.

---

## Mutating Admission Policies: No More Webhook Servers

Mutating Admission Policies ([KEP #3962](https://kep.k8s.io/3962)) graduate to Stable. You can now define resource mutations directly in the API server using CEL, eliminating the need for external webhook infrastructure.

Previously, if you wanted to inject a sidecar, set default labels, or enforce resource defaults, you needed to deploy and maintain a webhook server — with its own TLS certificates, availability concerns, and network latency on every API call. Now, these common mutations are declared as native API objects using CEL:

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: MutatingAdmissionPolicy
metadata:
  name: set-default-memory-limit
spec:
  matchConstraints:
    resourceRules:
    - apiGroups: [""]
      apiVersions: ["v1"]
      resources: ["pods"]
      operations: ["CREATE"]
  mutations:
  - patchType: ApplyConfiguration
    applyConfiguration:
      expression: |
        Object{
          spec: Object.spec{
            containers: object.spec.containers.map(c,
              c.with({resources: c.resources.with({
                limits: (\"memory\" in c.resources.limits) ? c.resources.limits : {\"memory\": \"512Mi\"}
              })}
            ))
          }
        }
```

The mutation runs inside the API server process itself — no network hop, no webhook availability SLA to maintain.

---

## Dynamic Resource Allocation: GPU Partitioning, Device Taints, and Device Metadata

DRA continues its rapid evolution in v1.36, with features spanning all three maturity levels.

### Stable: Admin Access and Prioritized Lists

DRA Admin Access ([KEP #5018](https://kep.k8s.io/5018)) and Prioritized Lists ([KEP #4816](https://kep.k8s.io/4816)) reach **GA**. Admin access provides a permanent framework for cluster administrators to manage hardware resources globally. Prioritized lists let ResourceClaims specify fallback device preferences — "give me an A100, but I'll take two T4s if that's all that's available."

### Beta: Partitionable Devices and Consumable Capacity

GPU partitioning ([KEP #5004](https://kep.k8s.io/5004)) and consumable capacity ([KEP #5055](https://kep.k8s.io/5055)) move to Beta (enabled by default). These features allow a single physical GPU to serve multiple workloads by tracking sub-device resources through counter sets:

```yaml
# A GPU with 8Gi memory can be split into logical devices
sharedCounters:
- name: gpu-1-counters
  counters:
    memory:
      value: 8Gi
```

A workload requesting 6Gi of GPU memory gets one logical slice; the remaining 2Gi stays available for smaller workloads. The scheduler tracks consumed capacity across all ResourceClaims referencing that device and rejects new claims that would exceed the total. This is not MIG (the NVIDIA hardware partitioning mechanism) — it is scheduler-level accounting, which means it works for any device type whose driver exposes counter sets, not just NVIDIA GPUs.

### Beta: Device Taints and Tolerations

Device taints ([KEP #4817](https://kep.k8s.io/4817)) bring the familiar node taint model to hardware devices. A faulty GPU can be tainted with `NoSchedule` or `NoExecute`, and only workloads that explicitly tolerate the taint will be scheduled on it. This is critical for large GPU clusters where hardware failures are a statistical certainty.

### Alpha: Device Metadata in Containers

DRA device metadata ([KEP #5304](https://kep.k8s.io/5304)) lets drivers expose device attributes (PCI addresses, UUIDs, driver versions) directly to containers as JSON files — no Kubernetes API queries needed. Applications discover their allocated hardware through well-known file paths:

```
/var/run/kubernetes.io/dra-device-attributes/
  resourceclaimtemplates/<claimName>/<requestName>/<driver>-metadata.json
```

For AI workloads, this means inference servers can auto-discover GPU topology without custom controllers.

---

## HPA Scale to Zero for Inference Workloads (Alpha)

HPA Scale to Zero ([KEP #2021](https://kep.k8s.io/2021)) continues in Alpha, allowing the HorizontalPodAutoscaler to scale down to zero replicas when using Object or External metrics.

The use case is clear: an inference endpoint that serves sporadic requests can scale to zero when no work is pending, completely eliminating resource costs during idle periods. When a queue metric (like message count) shows new requests, the HPA scales back up.

This is still behind the `HPAScaleToZero` feature gate and is disabled by default. It does not yet work with CPU or memory metrics — only Object (e.g. a queue depth from a custom resource) or External metrics (e.g. a metric pulled from Prometheus or a message queue). So in practice you need a metrics adapter wired up that exposes queue depth before this becomes useful.

---

## Resource Health Status: Know When Your Hardware Fails

Resource health status ([KEP #4680](https://kep.k8s.io/4680)) moves to Beta. The `allocatedResourcesStatus` field in Pod status now reports device health for all specialized hardware, whether provisioned via device plugins or DRA.

```bash
kubectl describe pod gpu-worker
...
Allocated Resources Status:
  gpu-0: Unhealthy (message: "ECC error detected")
```

This visibility closes a critical gap. When a training job enters a crash loop, operators can now immediately determine whether the failure is software or hardware — without SSH-ing into the node or querying vendor-specific management APIs.

---

## Notable Mentions

**Mutable Volume Attach Limits (GA):** CSI drivers can now dynamically update the maximum number of volumes a node can handle, without component restarts. The scheduler always sees accurate storage availability. ([KEP #4876](https://kep.k8s.io/4876))

**Mixed Version Proxy (Beta):** API requests can be routed to the apiserver instance that serves the requested resource version, reducing 404s during rolling control-plane upgrades. Safer multi-version clusters. ([KEP #4020](https://kep.k8s.io/4020))

**Ingress NGINX Retirement:** Officially retired on March 24, 2026. No further releases or security fixes. If you have not migrated to Gateway API, now is the time. See the [official announcement](https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/).

**AI Gateway Working Group:** A new Kubernetes working group focused on [standardizing AI workload networking](https://kubernetes.io/blog/2026/03/09/announcing-ai-gateway-wg/) — token-based rate limiting, inference routing, payload inspection, and egress gateways for external AI services. Worth watching for anyone running inference at scale.

---

## What to act on now

Not all of these features need your attention today. Here is the practical breakdown:

**Ready for production (GA):** Volume Group Snapshots, OCI volume sources, PSI metrics, external ServiceAccount signing, mutating admission policies. Check whether your CSI driver supports group snapshots before planning around VolumeGroupSnapshot — not all do yet.

**Worth enabling if you qualify (Beta):** Memory QoS if your nodes run cgroups v2. DRA device taints if you already run DRA drivers. Both are on by default but require the underlying platform support to do anything.

**Worth watching (Alpha):** Workload Aware Scheduling is still early but the direction is clear — native gang scheduling in the core scheduler will eventually replace third-party solutions like Volcano or Kueue for this use case. HPA scale-to-zero for inference workloads is similarly early but the primitives are building toward something practical.

See more details about k8s 1.36 release in the [Changelog](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.36.md).
