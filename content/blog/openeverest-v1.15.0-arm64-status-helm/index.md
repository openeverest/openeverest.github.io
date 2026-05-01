---
title: "OpenEverest 1.15.0: Running Anywhere, Debugging Faster, Deploying Smarter"
date: 2025-05-01T10:00:00Z
draft: false
image:
    url: featured.png
    attribution: 
authors:
 - patilpratik1905
tags:
 - release
 - kubernetes
 - arm64
 - helm
 - cli
summary: OpenEverest 1.15.0 brings ARM64 support, a new health-check CLI command, and richer Helm chart controls — here's what that actually means for your clusters.
---

# OpenEverest 1.15.0: Running Anywhere, Debugging Faster, Deploying Smarter

There's a particular kind of frustration that comes from knowing your infrastructure works, but not being able to prove it quickly. Or from carefully tuning a deployment only to find your Helm chart doesn't expose the scheduling knob you need. Or from discovering, on an ARM-based dev machine, that you're building for the wrong architecture entirely.

OpenEverest 1.15.0 doesn't announce itself with a laundry list of fixes. Instead, it quietly addresses a few of those recurring friction points — the ones that don't make it into postmortems but do slow teams down. Let's look at three of them properly.

---

## 1. ARM64 Support: The Architecture Shift You Shouldn't Have to Think About

### What changed

All OpenEverest container images are now published as multi-architecture manifests to `ghcr.io`, covering both `amd64` and `arm64`. There's nothing to configure — the container runtime pulls the correct variant based on the node's architecture automatically.

### How it works

Multi-arch Docker manifests (formally, OCI Image Index) allow a single image tag to serve as an umbrella over multiple architecture-specific images. When you run:

```bash
docker pull ghcr.io/percona/everest:1.15.0
```

...the daemon inspects the manifest list, matches it against the local platform, and fetches the right layer set. From a Kubernetes perspective, the scheduler places pods on nodes as usual — no node affinity hacks, no image overrides, no separate tags.

This applies across the full OpenEverest component set: the server, the operator, and supporting tooling.

### Why it matters

The shift isn't just about Raspberry Pis (though yes, you can now run OpenEverest on a Raspberry Pi cluster if that's your weekend project). The real production impact lands in two places:

**AWS Graviton** — Graviton3 instances offer meaningfully better price-performance than equivalent x86 nodes for steady-state workloads. Until now, mixing Graviton nodes into an OpenEverest cluster required workarounds. That ceiling is gone.

**Apple Silicon developer machines** — Engineers running `k3d` or `minikube` locally on M-series MacBooks were previously pulling emulated `amd64` images, which is slower and occasionally unstable. Native `arm64` images mean local dev environments behave closer to production, and cold-start times drop noticeably.

### A practical example

Suppose you're setting up a dev cluster on an M2 MacBook with `k3d`:

```bash
k3d cluster create everest-dev --servers 1 --agents 2
everestctl install
```

That's it. No `--platform linux/amd64` flags, no Rosetta workarounds. If you later move the same config to a Graviton3-backed EKS cluster, it works identically. The image tag stays the same; the architecture negotiation happens beneath you.

---

## 2. `everestctl status`: A Health Check That Earns Its Keep

### What changed

A new `everestctl status` command surfaces the readiness state of every Everest component in one shot — operators, the server, OLM machinery, and monitoring stack. It's a single command that answers the question you're already running three or four `kubectl` commands to answer.

### How it works

The command queries the Kubernetes API for the deployment and pod states of each component across the namespaces Everest manages (`everest-system`, `everest-olm`, `everest-monitoring`). It then maps those states to a human-readable summary, flagging anything not ready with a clear status message rather than raw YAML:

```bash
$ everestctl status

❌ Everest v1.15.0 has issues

Components:
NAME                  NAMESPACE            STATUS        MESSAGE
everest-server        everest-system       ❌ Not Ready  0/1 ready
everest-operator      everest-system       ❌ Not Ready  0/1 ready
catalog-operator      everest-olm          ❌ Not Ready  0/1 ready
olm-operator          everest-olm          ❌ Not Ready  0/1 ready
packageserver         everest-olm          ❌ Not Ready  0/2 ready
vm-operator           everest-monitoring   ✅ Ready
kube-state-metrics    everest-monitoring   ✅ Ready
```

The exit code is non-zero when any component reports as not ready, which makes it script-friendly.

### Why it matters

Consider the alternative: verifying a fresh Everest install currently means checking deployments across three namespaces separately. Something like:

```bash
kubectl get deployments -n everest-system
kubectl get deployments -n everest-olm
kubectl get deployments -n everest-monitoring
```

...then parsing the `READY` column across multiple outputs, then deciding whether any `0/1` you spotted is transient or a real problem. That's fine once you know the system. It's tedious when you're onboarding someone, running post-install validation in CI, or debugging an upgrade that didn't go cleanly.

`everestctl status` collapses that into a single call you can wire into a readiness gate:

```bash
# Post-install health check in CI
everestctl install
echo "Waiting for Everest to become ready..."
until everestctl status; do
  sleep 10
done
echo "Cluster is healthy, proceeding with provisioning"
```

The value isn't that the command does something impossible — it's that it removes the cognitive overhead of knowing *what to check* and *how to interpret it*. That matters especially when something is going wrong and you want to assess blast radius quickly.

---

## 3. Helm Chart Flexibility: Scheduling Control and Offline Upgrades

### What changed

The Everest Helm charts now support a significantly broader set of Kubernetes scheduling primitives — `nodeSelector`, `tolerations`, `affinity`, and `topologySpreadConstraints` — for both the server and operator components. The charts also support specifying a custom `LoadBalancerClass` for the server service, and there's now a first-class path for upgrading Everest in air-gapped environments via a pre-bundled `everestctl` image.

### How it works

**Scheduling controls** are passed through `values.yaml` and applied to the server and operator deployments independently. For example, if you want to constrain the Everest server to nodes with SSDs and spread it across availability zones:

```yaml
server:
  nodeSelector:
    node.kubernetes.io/disk-type: ssd
  topologySpreadConstraints:
    - maxSkew: 1
      topologyKey: topology.kubernetes.io/zone
      whenUnsatisfiable: DoNotSchedule
      labelSelector:
        matchLabels:
          app: everest-server
```

This is standard Kubernetes scheduling — the charts just now expose these fields rather than hardcoding placement decisions.

**LoadBalancerClass** lets you disambiguate between multiple load balancer controllers in a cluster (MetalLB, cloud-native LBs, service mesh ingress controllers, etc.):

```yaml
server:
  service:
    type: LoadBalancer
    loadBalancerClass: metallb.universe.tf/metallb
```

**Air-gapped upgrades** address a problem that silently affects many enterprise deployments: `everestctl upgrade` fetches images and Helm charts from the internet. In environments with no outbound access, that upgrade path was simply broken. The charts now include a pre-built `everestctl` image that can be mirrored into an internal registry, then referenced during upgrade:

```bash
helm upgrade everest openeverest/everest \
  -n everest-system \
  --set everestctl.image.repository=registry.internal.corp/everest/everestctl \
  --set everestctl.image.tag=1.15.0
```

### Why it matters

Production Kubernetes clusters are rarely uniform. You might have dedicated node pools for control plane workloads, taint-based isolation for compliance, or multi-zone deployments where you want topology guarantees. Prior to this release, Everest's own components were essentially exempt from that operational model — you could schedule your *databases* carefully, but the operator managing them had to go wherever Kubernetes put it.

The scheduling controls change that. The Everest operator can now be co-located with the workloads it manages, or pinned to dedicated infra nodes, or distributed across zones with the same patterns you'd apply to anything else in your cluster.

For teams in regulated industries or air-gapped environments, the offline upgrade path is arguably more significant. It removes the last hard dependency on internet access during maintenance windows, which is a real blocker for some production environments.

---

## What This Means in Practice

If you're running OpenEverest today, the practical upgrade calculus is straightforward. None of these changes require you to do anything differently — ARM64 just works, `everestctl status` is additive, and the Helm chart changes only apply if you opt into them through `values.yaml`. The upgrade itself is:

```bash
# Via everestctl
everestctl upgrade

# Via Helm
helm repo update openeverest
helm upgrade everest openeverest/everest -n everest-system
```

What you get on the other side is a project that's measurably easier to run on heterogeneous hardware, faster to validate after changes, and more compatible with how mature production Kubernetes environments are actually structured.

---

## Closing Thoughts

1.15.0 feels like a release where the OpenEverest project is paying attention to operators — not the Kubernetes kind, but the people actually running this in production. The ARM64 work, the status command, and the Helm flexibility all solve real operational friction rather than adding surface area.

If you're running into edge cases or have a use case the scheduling controls don't cover yet, the community is active. Open an issue, join the community meeting (documented in the repo), or submit a pull request — the contribution guidelines have been expanded in this release, so the barrier to getting involved is lower than it's been.

Full changelog and previous release notes are available in the [GitHub repository](https://github.com/percona/everest).
