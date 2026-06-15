---
title: "OpenEverest 1.15: ARM64 Support, CLI Health Checks and Helm Scheduling Controls"
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
summary: OpenEverest 1.15 adds native ARM64 support across all components. This post covers supported workloads, current limitations and the other changes included in the 1.15 release series.
---

# OpenEverest 1.15: ARM64 Support

OpenEverest 1.15 now ships native ARM64 images for all components.

Until this release, all containers were AMD64-only. Running OpenEverest on AWS Graviton, Hetzner CAX, Oracle A1, or other ARM64 infrastructure meant relying on QEMU emulation or building images yourself.

With 1.15, ARM64 works out of the box.

## Where ARM64 support matters

ARM64 support is useful across several common deployment setups:

- **AWS Graviton**: EKS node groups using Graviton instances (`m7g`, `c7g`, `r7g`) offer good price-to-performance for database workloads. Mixed AMD64 and ARM64 node groups also work well.
- **Hetzner CAX**: Ampere Altra-based CAX instances are widely used in Europe and were one of the most requested ARM targets from the community.
- **Oracle Cloud A1**: Oracle's free ARM tier makes it easy to run demos, test clusters, or smaller deployments at low cost.
- **On-prem ARM servers**: Teams already standardizing on ARM hardware can now run OpenEverest natively.
- **Edge clusters**: Lightweight Kubernetes distributions like k3s on ARM devices are now supported within hardware limits.

## How the multi-arch images work

OpenEverest 1.15 publishes multi-architecture images to `ghcr.io/openeverest`:

- `ghcr.io/openeverest/openeverest` (server)
- `ghcr.io/openeverest/openeverest-operator` (operator)
- `ghcr.io/openeverest/openeverest-catalog` (OLM catalog)
- `ghcr.io/openeverest/everestctl` (CLI, used in Helm upgrade hooks)

Each image tag is published as an OCI image index containing both AMD64 and ARM64 manifests. Your container runtime automatically pulls the correct image for the node architecture.

No extra Helm values, annotations, or node selectors are required.

To inspect the architectures included in a tag:

```bash
docker manifest inspect ghcr.io/openeverest/openeverest:v1.15.2
```

Example output:

```json
{
  "manifests": [
    {
      "digest": "sha256:...",
      "platform": {
        "architecture": "amd64",
        "os": "linux"
      }
    },
    {
      "digest": "sha256:...",
      "platform": {
        "architecture": "arm64",
        "os": "linux"
      }
    }
  ]
}
```

To verify what was pulled on a running cluster:

```bash
kubectl describe pod -n everest-system -l app.kubernetes.io/name=everest-server | grep Image:
```

The image digest should match the ARM64 manifest from the image index.

## Current ARM64 support status

### PostgreSQL

Supported.

The Percona Operator for PostgreSQL already provides ARM64 images so PostgreSQL clusters work normally on ARM.

### MongoDB

Supported.

The Percona Operator for MongoDB also ships ARM64 images and MongoDB deployments run without additional changes.

### MySQL (Percona XtraDB Cluster)

Not supported yet.

The PXC operator still depends on HAProxy and ProxySQL images that do not have ARM64 builds. As a result, MySQL pods will not start on ARM nodes.

This is currently tracked upstream in [percona-xtradb-cluster-operator#1646](https://github.com/percona/percona-xtradb-cluster-operator/issues/1646).

## ARM64 regression in 1.15.0

The initial 1.15.0 release accidentally shipped incomplete ARM64 images.

The backend components were built correctly for both architectures but the UI build step only ran on AMD64. ARM64 images were published without the frontend assets included.

The backend started normally but opening the UI resulted in a blank page.

[PR #2110](https://github.com/openeverest/openeverest/pull/2110) fixed the build pipeline. Starting from 1.15.1, both AMD64 and ARM64 images include the full frontend bundle.

If you deployed 1.15.0 on ARM and saw a blank UI, upgrading to 1.15.1 or later fixes the issue.

## Other changes in 1.15

### `everestctl status`

A new `status` command shows the health of Everest components across namespaces:

```text
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

The command checks component readiness at the Deployment level.

Pass `--json` for machine-readable output and proper exit codes, which makes the command easier to use in scripts and CI pipelines.

`everestctl` reads `KUBECONFIG` automatically or accepts `--kubeconfig` explicitly.

### Helm chart scheduling controls

The Helm chart now supports standard Kubernetes scheduling fields for both the `server` and `operator` Deployments:

- `nodeSelector`
- `tolerations`
- `affinity`
- `topologySpreadConstraints`

Before this change, deployments on tainted nodes often stayed stuck in `Pending` unless users manually patched the Deployments after installation.

Now tolerations can be configured directly through `values.yaml`:

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

The chart also adds support for `loadBalancerClass`:

```yaml
server:
  service:
    loadBalancerClass: service.k8s.aws/nlb
```

This is useful in clusters running multiple load balancer controllers.

### Air-gapped Helm upgrades

The Helm pre-upgrade hook now uses a prebuilt `everestctl` image instead of downloading the binary during upgrades.

This allows upgrades to work in air-gapped environments without outbound internet access.

Version 1.15.2 also fixes a follow-up issue where the hook image was accidentally built with version `0.0.0`, causing version checks to fail during upgrades.

That fix is included in [PR #2168](https://github.com/openeverest/openeverest/pull/2168).

### ProxySQL fixes

Two ProxySQL-related operator bugs were fixed:

- `DatabaseCluster` resources using `proxy.type: proxysql` could trigger a panic (`assignment to entry in nil map`), causing the operator to crash-loop.
- ProxySQL resource limits were incorrectly inherited from the HAProxy configuration instead of using their own values.

Both issues are tracked in [operator#938](https://github.com/openeverest/openeverest-operator/issues/938).

### Other improvements

- Added support for Percona Operator for PostgreSQL 2.9.0
- Updated all images to Go 1.26 and Alpine
- Base images are now pinned by SHA256 digest for reproducible builds
- Worker node filtering now recognizes the `control-plane` taint used in Kubernetes 1.24+
- Route-based UI lazy loading reduces the initial frontend bundle size
- MongoDB backup sizes are now visible in the UI
- Added a `storage` field for ProxySQL persistent volume configuration

Thanks to everyone who contributed to this release:

- [@ankitkurmi152](https://github.com/ankitkurmi152) for digest-pinned base images
- [@konglyyy](https://github.com/konglyyy) for control-plane taint support
- [@adityapimpalkar](https://github.com/adityapimpalkar) for MongoDB backup size support

## Upgrading

### Using everestctl

```sh
everestctl upgrade
```

### Using Helm

```sh
helm repo update

helm upgrade --install everest-crds \
  openeverest/everest-crds \
  --namespace everest-system \
  --take-ownership

helm upgrade everest openeverest/everest \
  -n everest-system
```

## Release notes

Full release notes for each patch:

- [v1.15.0](https://github.com/openeverest/openeverest/releases/tag/v1.15.0)
- [v1.15.1](https://github.com/openeverest/openeverest/releases/tag/v1.15.1)
- [v1.15.2](https://github.com/openeverest/openeverest/releases/tag/v1.15.2)
