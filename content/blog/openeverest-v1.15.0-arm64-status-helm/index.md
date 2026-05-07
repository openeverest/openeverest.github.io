---
title: "OpenEverest v1.15.0: ARM64 Multi-Arch Images, Health Checks with everestctl status, and Production-Grade Helm Flexibility"
date: 2026-05-01T10:00:00Z
draft: false
image:
    url: v1.15.0-blog-cover.png
    attribution:
authors:
 - patilpratik1905
tags:
 - announcement
 - release
 - kubernetes
 - database
 - arm64
 - helm
summary: OpenEverest v1.15.0 ships native ARM64 support across every component image, a new everestctl status command for instant cluster health visibility, and significantly enhanced Helm chart controls for scheduling, load balancer configuration, and air-gapped upgrades.
---

# OpenEverest 1.15: ARM64 Multi-Arch Images, Health Checks with everestctl status, and Production-Grade Helm Flexibility

You just migrated your Kubernetes cluster to AWS Graviton instances to cut compute costs by 40%. Everything is humming along — until you try to deploy OpenEverest and hit `exec format error` on every pod. Or maybe it's 2 AM, your on-call pager fires, and you need to know *right now* whether the problem is your database or the platform itself. Or perhaps you're running a locked-down, air-gapped environment where even Helm upgrades feel like a mission-critical operation.

[OpenEverest v1.15.0](https://github.com/openeverest/openeverest/releases/tag/v1.15.0) tackles all three of these real-world scenarios head-on. Rather than walking through a changelog, let's dig into the three features that matter most — and why they'll change how you operate.

---

## Run Anywhere: Native ARM64 Architecture Support

### The Problem Nobody Talks About

The industry's shift to ARM-based compute is no longer experimental. AWS Graviton3 instances offer [meaningfully better price-performance](https://aws.amazon.com/ec2/graviton/) than comparable x86 instances for steady-state workloads. Apple Silicon has made ARM the default for local Kubernetes development on macOS. Edge deployments on Raspberry Pi clusters are increasingly common for data sovereignty and latency-sensitive workloads.

Yet many Kubernetes tools still ship x86-only images. The result? You either maintain separate clusters for different architectures, build custom images from source, or simply give up on ARM. None of those options are acceptable for a production database platform.

### How It Works

Starting with v1.15, every OpenEverest container image is published as a **multi-architecture manifest** to `ghcr.io`. This means a single image tag — such as `ghcr.io/percona/everest:v1.15.0` — resolves to the correct binary for your node's architecture automatically. The container runtime (containerd, CRI-O) handles the selection transparently at pull time.

**There is zero configuration required on your part.** No `nodeSelector` hacks, no platform-specific image overrides, no conditional Helm values. If your Kubernetes node runs ARM64, you get an ARM64 binary. If it runs AMD64, you get AMD64. The same manifests, the same Helm charts, the same `everestctl install` command.

### Why This Matters

This isn't just about "supporting another architecture." It fundamentally changes the deployment model:

- **Cost reduction:** Teams running on AWS Graviton or Azure Cobalt can now deploy OpenEverest without workarounds, unlocking the cost savings these instances are designed to deliver.
- **Consistent local development:** Developers on Apple Silicon Macs can run the exact same OpenEverest images locally that run in production — no Rosetta emulation overhead, no subtle behavioral differences.
- **Edge and IoT use cases:** Running a lightweight Percona XtraDB Cluster on a Raspberry Pi cluster for a branch office or retail location is now a first-class deployment target.

### Try It Yourself

Spin up a mixed-architecture cluster (or just use your M-series Mac with a local Kubernetes distribution) and deploy:

```bash
# On any architecture — the right image is pulled automatically
everestctl install

# Verify the running images
kubectl get pods -n everest-system -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.status.containerStatuses[0].image}{"\n"}{end}'
```

You'll see the same image tags across ARM64 and AMD64 nodes. No architecture suffixes, no special handling.

---

## Know Before They Call You: The `everestctl status` Command

### The Debugging Gap

Here's a scenario every platform operator has lived through: a developer opens a ticket saying "the database is down." You log in, check the pods, the operators, OLM, the monitoring stack — each one requiring different `kubectl` commands across different namespaces. By the time you've verified that all eight components are healthy, twenty minutes have passed and the real issue turns out to be an application misconfiguration.

OpenEverest deploys multiple interconnected components across several namespaces — the Everest server, the Everest operator, OLM components, and monitoring services. Until now, understanding the health of the *platform itself* required tribal knowledge about which deployments to check and where to find them.

### What `everestctl status` Does

The new `everestctl status` command provides a single, consolidated health check across every OpenEverest component. One command, one view, a definitive answer:

```bash
$ everestctl status
✅ Everest v1.15.0 is healthy

Components:
NAME                    NAMESPACE              STATUS     MESSAGE
everest-server          everest-system         ✅ Ready
everest-operator        everest-system         ✅ Ready
catalog-operator        everest-olm            ✅ Ready
olm-operator            everest-olm            ✅ Ready
packageserver           everest-olm            ✅ Ready   2/2 ready
vm-operator             everest-monitoring     ✅ Ready
kube-state-metrics      everest-monitoring     ✅ Ready
```

When something is wrong, the output immediately surfaces the issue:

```bash
$ everestctl status
❌ Everest v1.15.0 has issues

Components:
NAME                    NAMESPACE              STATUS       MESSAGE
everest-server          everest-system         ❌ Not Ready  0/1 ready
everest-operator        everest-system         ❌ Not Ready  0/1 ready
catalog-operator        everest-olm            ❌ Not Ready  0/1 ready
olm-operator            everest-olm            ❌ Not Ready  0/1 ready
packageserver           everest-olm            ❌ Not Ready  0/2 ready
vm-operator             everest-monitoring     ✅ Ready
kube-state-metrics      everest-monitoring     ✅ Ready
```

### Why This Is a Bigger Deal Than It Looks

The value here isn't just convenience — it's about reducing Mean Time to Resolution (MTTR). Consider how this fits into operational workflows:

- **On-call triage:** Before diving into database-level debugging, run `everestctl status` first. If the platform is healthy, the issue is almost certainly application-side. You just saved yourself 15 minutes of checking the wrong things.
- **Post-upgrade validation:** After running `everestctl upgrade`, immediately verify that all components came back healthy. No more waiting for Slack alerts to confirm that the upgrade worked.
- **CI/CD integration:** Embed `everestctl status` in your deployment pipelines as a gate. If the platform isn't healthy after an upgrade, fail the pipeline before promoting to the next environment.

```bash
# Example: CI/CD pipeline gate
everestctl upgrade
echo "Waiting for Everest to become ready..."
until everestctl status; do
  sleep 10
done
echo "Upgrade verified — all components healthy"
```

This is the kind of command you'll wonder how you ever operated without.

---

## Ship to Production, Your Way: Enhanced Helm Chart Flexibility

### The Gap Between "It Works" and "It Works in Production"

Getting OpenEverest running in a test cluster is straightforward. Getting it running in a production environment with strict scheduling requirements, custom load balancer classes, and no internet access? That used to require patching Helm charts or maintaining custom overlays.

OpenEverest 1.15 closes this gap with three major Helm chart enhancements that production teams have been asking for.

### Advanced Kubernetes Scheduling Controls

Both the Everest server and operator deployments now support `nodeSelector`, `tolerations`, `affinity`, and `topologySpreadConstraints` directly in the Helm values. This means you can enforce scheduling policies without post-install mutations or Kustomize patches.

**Scenario:** You have dedicated infrastructure nodes tainted with `role=platform:NoSchedule` and you want OpenEverest to run exclusively on those nodes, spread evenly across availability zones.

```yaml
# values.yaml
server:
  nodeSelector:
    role: platform
  tolerations:
    - key: "role"
      operator: "Equal"
      value: "platform"
      effect: "NoSchedule"
  topologySpreadConstraints:
    - maxSkew: 1
      topologyKey: topology.kubernetes.io/zone
      whenUnsatisfiable: DoNotSchedule
      labelSelector:
        matchLabels:
          app.kubernetes.io/name: everest-server

operator:
  nodeSelector:
    role: platform
  tolerations:
    - key: "role"
      operator: "Equal"
      value: "platform"
      effect: "NoSchedule"
```

```bash
helm upgrade everest openeverest/everest \
  -n everest-system \
  -f values.yaml
```

No more fighting with admission webhooks or writing custom scheduling logic. Define it once, deploy it everywhere.

### Custom `LoadBalancerClass` Support

Not every Kubernetes cluster uses the default cloud load balancer. Many organizations run multiple ingress controllers, use internal-only load balancers, or deploy specialized solutions like Cilium's LB-IPAM or MetalLB.

You can now specify a `LoadBalancerClass` for the Everest server service:

```yaml
# values.yaml
server:
  service:
    loadBalancerClass: "io.cilium/l2-announcer"
```

This is particularly valuable for:
- **Multi-cloud setups** where different clusters use different LB providers
- **On-premises deployments** using MetalLB or kube-vip
- **Internal-only access** where a dedicated internal LB class prevents accidental public exposure

### Air-Gapped Upgrades

Perhaps the most operationally significant change: Helm charts now include support for **air-gapped upgrades** via a pre-built `everestctl` image. In environments where nodes have no internet access — common in financial services, government, and healthcare — you can now upgrade OpenEverest entirely from pre-pulled images.

The workflow:

1. Pull the `everestctl` image into your internal registry during your change window
2. Configure Helm to use the internal registry
3. Run the upgrade — no outbound network calls required

```bash
# Pull and mirror the everestctl image to your internal registry
# Using docker (available on most systems)
docker pull ghcr.io/percona/everestctl:v1.15.0
docker tag ghcr.io/percona/everestctl:v1.15.0 registry.internal.corp/openeverest/everestctl:v1.15.0
docker push registry.internal.corp/openeverest/everestctl:v1.15.0

# Upgrade using your internal registry
helm upgrade everest openeverest/everest \
  -n everest-system \
  --set everestctl.image.repository=registry.internal.corp/openeverest/everestctl \
  --set everestctl.image.tag=v1.15.0
```

This eliminates the need for network exceptions or proxy configurations during upgrade maintenance windows.

---

## What Else Shipped

Beyond the three deep dives above, v1.15 includes several notable improvements:

- **Backup size visibility in the UI:** MongoDB cluster backups now show their size directly in the backup list, making storage capacity planning easier at a glance.
- **Percona Operator for PostgreSQL 2.9.0:** Access the latest upstream fixes and improvements.
- **Enhanced security posture:** Container base images are now pinned by digest for reproducible builds, and OpenSSF Scorecard integration provides transparency into project security practices.
- **Go 1.22 and Alpine-based images:** Smaller images, faster pulls, and the latest language runtime.
- **UI performance improvements:** Lazy loading for route pages reduces initial bundle size and improves page load times.

---

## Upgrading to v1.15

### Using everestctl

```bash
everestctl upgrade
```

### Using Helm

```bash
helm repo update openeverest
helm upgrade everest openeverest/everest -n everest-system
```

After upgrading, verify everything is healthy with the new status command:

```bash
everestctl status
```

For the complete list of changes, bug fixes, and linked issues, see the [full release notes](https://github.com/openeverest/openeverest/releases/tag/v1.15.0).

---

## Get Involved

OpenEverest is a vendor-neutral, CNCF Sandbox project — and it's built by its community. Whether you're running databases at scale or just getting started with Kubernetes, there's a place for you:

- **Contribute:** Browse our [Good First Issues](https://github.com/orgs/openeverest/projects/2) to find a starting point.
- **Chat:** Join us on CNCF Slack in [#openeverest-users](https://cloud-native.slack.com/archives/C09RRGZL2UX).
- **Explore:** Learn more at [openeverest.io](https://openeverest.io).

Happy clustering! 🏔️
