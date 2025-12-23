---
title: "Kubernetes 1.35 'Timbernetes': Vertical Scaling and SLA Management for Stateful Workloads"
date: 2025-12-19T10:00:00Z
draft: false
image:
    url: timbernetes-min-min.png
    attribution: https://kubernetes.io/blog/2025/12/17/kubernetes-v1-35-release/
authors:
 - spron-in
tags:
 - blog
 - kubernetes
 - database
 - scaling
summary: Kubernetes 1.35 introduces In-Place Vertical Scaling and Gang Scheduling. Learn how these features enable zero-downtime resizing for stateful database workloads on OpenEverest.
---

The year 2025 concludes with [the release](https://kubernetes.io/blog/2025/12/17/kubernetes-v1-35-release/) of Kubernetes v1.35 (codenamed "Timbernetes"). This release brings 60 improvements, 17 of which have moved to Stable status.

At OpenEverest, our mission is simplifying database management, anywhere. Since our platform runs on Kubernetes, we closely monitor the Cloud Native ecosystem for features that improve stability, performance or influence stateful workload in any way. Managing stateful workloads remains a significant hurdle for many engineering teams, and this release addresses one of the biggest pain points: changing resources without killing the database.

Here is an overview of the critical changes in v1.35, starting with the feature we are most excited about: In-Place Vertical Scaling.

## Vertical Scaling "On the Fly"

For database administrators and SREs, defining container resources — CPU and RAM — is done via `requests` and `limits`.

* **Requests:** The amount of resources the container is likely to consume. The orchestrator uses this to decide which node to place the Pod on.
* **Limits:** The hard cap enforced by the OS cgroup. The container cannot consume more than this.

Historically, changing these values required restarting the Pod. For stateless applications, this is fine. For stateful workloads (like PostgreSQL or MongoDB), a restart often means cache dumps, failovers, and potential downtime.

With Kubernetes 1.35, In-place update of Pod resources moves to Stable ([KEP #1287](https://kep.k8s.io/1287)). You can now resize Pods without restarting the containers. OpenEverest users can leverage this for efficient vertical scaling of single-node deployments.

### Technical Walkthrough: Trying In-Place Scaling

While this feature is now stable, you might want to test it in a controlled environment. Below is a guide on how to reproduce this behavior using `kind`.

**1. The Old Problem**

First, let's look at what happens without this feature. If we spin up a standard cluster and a pod with NGINX:

```yaml
# nginx.yaml 
apiVersion: v1
kind: Pod
metadata:
  name: resize-test
spec:
  containers:
  - name: nginx
    image: nginx:1.29.4
    resources:
      requests:
        cpu: "250m"
        memory: "128Mi"
      limits:
        cpu: "500m"
        memory: "256Mi"
```

Attempting to change `requests.cpu` (e.g., from `250m` to `300m`) results in the classic error:

```text
The Pod "resize-test" is invalid: spec: Forbidden: pod updates may not change fields other than...
```

**2. Changing resources without restarts**

Now with version 1.35 users can modify the manifest to increase the CPU request and apply it:

```diff
    resources:
      requests:
-     cpu: "300m"
+     cpu: "350m"
        memory: "128Mi"
```

If you check the events, you will see that the container was **not** restarted, preventing the downtime usually associated with resizing:

```bash
kubectl describe pod resize-test
...
Events:
  Type    Reason     Age    From               Message
  ----    ------     ----   ----               -------
  Normal  Created    2m53s  kubelet            Created container nginx
  Normal  Started    2m53s  kubelet            Started container nginx
```
*Note: No "Killing" or "Restarting" events appear.*

---

## Gang Scheduling: Control for Pod Groups

Gang Scheduling has been added to the Alpha branch ([KEP #4671](https://kep.k8s.io/4671)). It introduces an "all-or-nothing" strategy for scheduling pod groups.

A group of pods will only be launched if the cluster has enough resources to start **all** of them. This is particularly critical for:

* **AI/ML Workloads:** Distributed training often requires all workers to start at once.
* **Tightly Coupled Databases:** Some clustered database topologies require all nodes to be present to form a quorum effectively during initialization.

This prevents the "partial start" problem, where half your processes sit idle consuming resources while waiting for the rest of the group, optimizing overall cluster efficiency.

---

## KYAML: almost JSON, but still YAML

KYAML is a new, safer output format for `kubectl`, which has moved to Beta status in v1.35 ([KEP #5295](https://kep.k8s.io/5295)).

Standard YAML has notorious pitfalls—for example, the "Norway problem" where the country code `NO` is interpreted as the boolean `false`. KYAML is a subset of YAML where all strings are quoted and indentation does not affect the data structure.

This makes it much safer for templating in Helm or Kustomize. Instead of risking indentation errors, KYAML uses explicit brackets, looking very similar to JSON but compatible with YAML parsers:

```json
{
  apiVersion: "v1",
  kind: "Service",
  metadata: {
    name: "my-service",
    labels: {
      app: "my-app",
    },
  },
}
```

This format makes configurations more predictable and robust against automated transformation errors.

---

## Numeric Tolerations: Scheduling by SLA

The `taints` and `tolerations` mechanism received a significant upgrade ([KEP #5471](https://github.com/kubernetes/enhancements/issues/5471)) — support for numeric operators `Gt` (Greater than) and `Lt` (Less than).

This allows you to define policies based on numeric values, such as reliability levels (SLA) or hardware capabilities. This is ideal for hybrid clusters that mix expensive, high-stability nodes with cheaper Spot Instances.

**Key Difference:** Unlike NodeAffinity, this supports `NoExecute`. This means Kubernetes can not only control placement but also automatically evict a pod if the node's SLA drops below a certain threshold.

**Example:**
An administrator sets a taint `sla=500:NoExecute` on a node. A critical job can explicitly "consent" to run there only if the SLA is greater than 400:

```yaml
tolerations:
- key: "sla"
  operator: "Gt"
  value: "400"
  effect: "NoExecute"
```

This creates a safety model where admins define risk, and applications explicitly opt-in to acceptable risk levels.

---

## Node Declared Features: Automated Compatibility

Starting in Alpha, Kubernetes 1.35 introduces the **Node Declared Features** framework. Its goal is to solve the version skew problem — where a cluster-wide feature is enabled, but specific nodes (perhaps pending an upgrade) do not yet support it.

**How it works:**
* Nodes automatically report their capabilities in their status.
* **The Scheduler** will not place a pod requiring a specific feature on a node that lacks it.
* **Controllers** will reject operations (like resizing a pod) if the underlying node cannot handle it.

**Why it matters:**
For features like *GuaranteedQoSPodCPUResize*, you no longer need to manually label nodes or manage complex compatibility matrices. The system ensures compatibility automatically.

---

## Conclusion

Kubernetes 1.35 brings features that bridge the gap between simple container orchestration and deep database internals. Features like In-Place Vertical Scaling and Numeric Tolerations allow OpenEverest to provide a more robust, production-ready solution out of the box.

See more details about k8s 1.35 release in the [Changelog](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.35.md).