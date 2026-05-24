---
title: "OpenEverest 1.15: ARM64 Support, CLI Health Checks, and Helm Scheduling Controls"
date: 2026-05-22T10:00:00Z
draft: false
image:
    url: v115-blog-cover.png
    attribution:
authors:
 - areebahmeddd
tags:
 - announcement
 - release
 - kubernetes
 - database
summary: OpenEverest 1.15 adds multi-arch images for ARM64 clusters, a new `everestctl status` command for CLI-based health checking, and expanded Helm chart scheduling controls. Here is what changed, why it’s useful, and what broke in 1.15.1.
---

# OpenEverest 1.15: ARM64 Support, CLI Health Checks, and Helm Scheduling Controls

OpenEverest 1.15 shipped at the end of April. The release highlights are ARM64 support across all images, a new `everestctl status` command, and Helm chart scheduling controls that were previously missing. This post covers all three, plus two patch releases that fixed real regressions introduced in 1.15.0.

If you are already on 1.15.0 and running an ARM cluster, skip to the 1.15.1 section. The UI was broken for ARM users, and the fix is a one-line upgrade.

## ARM64: multi-arch images across all components

Until 1.15.0, every OpenEverest container was AMD64-only. If you were running on AWS Graviton nodes, an Apple Silicon Mac, or any other ARM-based cluster, you were either stuck with QEMU emulation or unable to run Everest at all.

Starting with 1.15.0, all OpenEverest images are published as multi-arch manifests to `ghcr.io/openeverest`:

- `ghcr.io/openeverest/openeverest` (Everest server)
- `ghcr.io/openeverest/openeverest-operator` (operator)
- `ghcr.io/openeverest/openeverest-catalog` (OLM catalog)
- `ghcr.io/openeverest/everestctl` (CLI image used in Helm hooks)

The way this works: the release pipeline builds each image separately for AMD64 and ARM64, then publishes both under a single tag (`openeverest:v1.15.0`). When your container runtime pulls that tag, it picks the right one for your node automatically. Nothing in your Helm values or `everestctl install` command needs to change.

### What broke in 1.15.1

The 1.15.0 ARM64 support came with a silent regression that should be mentioned. The UI build step in the release pipeline was accidentally restricted to AMD64 only, so ARM images shipped without a compiled frontend. The backend (Everest server, operator, and OLM) started fine on ARM clusters, but opening the UI via `kubectl port-forward` showed a blank page with no error message.

The fix in [PR #2110](https://github.com/openeverest/openeverest/pull/2110) removed that restriction, so both architectures now get a full image. If you deployed 1.15.0 on an ARM cluster and saw a blank page, that was the cause. Upgrade to 1.15.1 or later.

## everestctl status: a single command to see what is healthy

The new `status` subcommand gives you a quick read on everything Everest is managing in your cluster. Instead of checking multiple namespaces by hand, you run one command:

```
$ everestctl status
❌ Everest v1.15.0 has issues

Components:
  NAME                NAMESPACE           STATUS          MESSAGE
  everest-server      everest-system      ❌ Not Ready    0/1 ready
  everest-operator    everest-system      ❌ Not Ready    0/1 ready
  catalog-operator    everest-olm         ❌ Not Ready    0/1 ready
  olm-operator        everest-olm         ❌ Not Ready    0/1 ready
  packageserver       everest-olm         ❌ Not Ready    0/2 ready
  vm-operator         everest-monitoring  ✅ Ready
  kube-state-metrics  everest-monitoring  ✅ Ready

Database Operators:
  NAME                                    NAMESPACE   VERSION   STATUS    MESSAGE
  percona-xtradb-cluster-operator (MySQL) everest-db  v1.19.0   ✅ Ready
```

The output covers four groups:

**Core components:** the `everest-server` and `everest-operator` Deployments in the `everest-system` namespace. These are the minimum required for Everest to function at all.

**OLM components:** the `catalog-operator`, `olm-operator`, and `packageserver` Deployments in `everest-olm`. OLM manages operator installations and upgrades under the hood.

**Monitoring:** `vm-operator` and `kube-state-metrics` in `everest-monitoring`. If these are down, metrics will be missing from the UI but your databases still run.

**Database operators:** whichever of the three operators (MySQL/PXC, MongoDB/PSMDB, PostgreSQL) are installed in each DB namespace, including their installed version.

For each component, the check looks at whether all expected replicas are running and up-to-date. A deployment stuck mid-rollout or crash-looping will show as Not Ready with a short message explaining why.

If you need to pipe this into a script or a monitoring hook, use `--json`:

```json
{
  "everestVersion": "v1.15.0",
  "healthy": false,
  "components": [
    {
      "name": "everest-server",
      "namespace": "everest-system",
      "ready": false,
      "message": "0/1 ready"
    }
  ],
  "operators": [
    {
      "name": "percona-xtradb-cluster-operator (MySQL)",
      "namespace": "everest-db",
      "version": "v1.19.0",
      "ready": true
    }
  ],
  "namespaces": ["everest-db"]
}
```

It picks up your kubeconfig from `KUBECONFIG` in your environment, the same way as the rest of `everestctl`. Pass `--kubeconfig` to point it at a specific file.

Keep in mind: the check works at the Deployment level, not the individual pod level. If a pod just started crash-looping and Kubernetes has not yet marked it unhealthy, the command might still show green for a few seconds. For active incidents, `kubectl get pods -n everest-system` gives you faster, more granular feedback. Where `everestctl status` earns its place is in scripts: a pre-upgrade gate, a CI health check, or a monitoring probe that needs a clean exit code and structured JSON output.

## Helm chart scheduling controls

The Helm charts now support the standard Kubernetes scheduling fields (`nodeSelector`, `tolerations`, `affinity`, and `topologySpreadConstraints`) for both the server and operator Deployments. If you have used any of these in other Helm charts, the syntax is exactly what you expect.

A real-world example: dedicated database nodes. Many production clusters taint certain nodes to keep application workloads off them:

```bash
kubectl taint nodes db-node-1 dedicated=database:NoSchedule
```

Before 1.15.0, if those nodes had this taint, the Everest operator and server Deployments would stay in `Pending` because they could not tolerate it. The Helm chart gave you no way to add tolerations, so you either had to untaint the nodes or patch the Deployments manually after each upgrade.

Now you can pass the toleration through `values.yaml`:

```yaml
server:
  tolerations:
    - key: dedicated
      operator: Equal
      value: database
      effect: NoSchedule

operator:
  tolerations:
    - key: dedicated
      operator: Equal
      value: database
      effect: NoSchedule
```

The same approach works for `nodeSelector`, `affinity`, and `topologySpreadConstraints`. Use these to pin Everest components to a specific node pool, restrict them from certain zones, or spread replicas across failure domains.

The `LoadBalancerClass` addition is a smaller but useful fix. If your cluster has more than one load balancer (for example, MetalLB for internal services and the cloud provider's load balancer for external traffic), you can now specify which one the Everest server Service should use:

```yaml
server:
  service:
    loadBalancerClass: service.k8s.aws/nlb
```

Without this, a `LoadBalancer` Service picks up whichever implementation is the cluster default. That is fine when there is only one, but unpredictable when there are two.

### Air-gapped upgrades

The upgrade process now uses a pre-built `everestctl` container image as a Helm pre-upgrade hook, instead of pulling the binary from the internet at upgrade time. This means Helm upgrades work in clusters with no internet access. The image ships with the chart.

This also hit a bug in 1.15.2: the `everestctl` image was being built with version `0.0.0` instead of the real release version, so the pre-upgrade version check always failed. That is fixed in [PR #2168](https://github.com/openeverest/openeverest/pull/2168). If Helm upgrades failed during the pre-upgrade hook stage, upgrading to 1.15.2 resolves the issue.

## ProxySQL: two bugs to know about

If you use ProxySQL with MySQL clusters, two bugs were fixed in this release.

The first one was hard to diagnose: creating a `DatabaseCluster` with `proxy.type: proxysql` caused the operator to panic with `assignment to entry in nil map`. The operator pod would crash-loop with no helpful error message. After that, it was easy to see what was wrong: an uninitialized map. But without that context, it looked like a general operator failure.

The second was a copy-paste mistake: ProxySQL was reading its resource limits from HAProxy's spec instead of its own. If you had set custom CPU or memory limits for ProxySQL, they were silently ignored and HAProxy's values were used instead. The cluster still started, which made it easy to miss.

Both are fixed in the operator, tracked under [issue #938](https://github.com/openeverest/openeverest-operator/issues/938).

## Other changes

**PostgreSQL operator 2.9.0:** Everest now supports Percona Operator for PostgreSQL 2.9.0. Check the [operator release notes](https://docs.percona.com/percona-operator-for-postgresql/) for what changed there.

**Go 1.26 and Alpine base images:** All Dockerfiles now build on Go 1.26 with Alpine as the base. The resulting images are noticeably smaller.

**Digest-pinned base images:** Base images in the Dockerfiles are now pinned by SHA256 digest rather than just by tag. This means the build is reproducible: a base image tag updated upstream does not change what gets shipped. Contributed by [@ankitkurmi152](https://github.com/ankitkurmi152).

**Control-plane taint handling:** Everest's worker node filtering now recognizes the `node-role.kubernetes.io/control-plane` taint, which replaced the older `master` taint in Kubernetes 1.24. On newer cluster distributions, Everest was incorrectly including control-plane nodes in its worker node list. Contributed by [@konglyyy](https://github.com/konglyyy).

**Faster UI on first load:** Route pages in the frontend now load on demand instead of upfront. The initial bundle is smaller, so the first page load is faster, especially on slower connections.

**Backup size for MongoDB:** The backup list in the UI now shows backup sizes for MongoDB clusters, so you can see at a glance how much storage each backup is using. Contributed by [@adityapimpalkar](https://github.com/adityapimpalkar).

**ProxySQL persistent storage:** The `DatabaseCluster` proxy spec now has a `storage` field for ProxySQL, so you can configure a custom storage class and size for it. This field was previously missing.

## Upgrading

### Using everestctl

```sh
everestctl upgrade
```

### Using Helm

Update CRDs first:

```sh
helm repo update
helm upgrade --install everest-crds \
    openeverest/everest-crds \
    --namespace everest-system \
    --take-ownership
```

Then upgrade Everest:

```sh
helm upgrade everest openeverest/everest -n everest-system
```

The full changelogs are at:

- [v1.15.0](https://github.com/openeverest/openeverest/releases/tag/v1.15.0)
- [v1.15.1](https://github.com/openeverest/openeverest/releases/tag/v1.15.1)
- [v1.15.2](https://github.com/openeverest/openeverest/releases/tag/v1.15.2)
