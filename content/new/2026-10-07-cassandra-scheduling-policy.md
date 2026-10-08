---
title: "Cassandra provider supports pod scheduling and fits on smaller clusters"
date: 2026-10-07T15:02:22Z
draft: false
topics:
 - cassandra
 - scheduling
 - releases
link: https://github.com/openeverest/provider-cassandra/releases/tag/v0.1.3
summary: Cassandra instances now honour node selectors, tolerations and affinity, and new clusters prefer separate nodes instead of requiring them.
---

The [Cassandra provider](https://github.com/openeverest/provider-cassandra) v0.1.3 no longer ignores the instance's scheduling policy. Node selectors, tolerations, node affinity and pod anti-affinity on the engine component now apply to the Cassandra pods, so you can keep Cassandra on a dedicated node pool or place it to match how your cluster is laid out.

The default placement changed too. [cass-operator](https://github.com/k8ssandra/cass-operator) normally requires one Cassandra pod per Kubernetes node, so a three-node Cassandra cluster could sit pending on a small dev cluster. New clusters now only *prefer* separate nodes. Any affinity you set replaces that preference, and `affinity: {}` removes it. cass-operator needs both CPU and memory limits for this, so the provider now sets a CPU limit in its default resources too.

Some limits remain. Clusters created before v0.1.3 keep the strict one-pod-per-node rule and reject a custom affinity, because cass-operator can't change it after creation. Topology spread constraints, pod affinity and a custom scheduler are rejected with a clear error instead of being silently dropped. See [#34](https://github.com/openeverest/provider-cassandra/pull/34) and [#36](https://github.com/openeverest/provider-cassandra/pull/36) for details. Requires OpenEverest v2.0.0-dev.4 or later.
