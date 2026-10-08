---
title: "Cassandra provider now applies engine scheduling policies to pods"
date: 2026-10-07T15:02:22Z
draft: false
topics:
 - cassandra
 - scheduling
 - releases
link: https://docs.openeverest.io/
summary: The Cassandra provider now applies engine-level scheduling policies for pod placement across nodes and zones.
---

The OpenEverest Cassandra provider now applies the engine-level scheduling policies when placing Cassandra pods. This lets you control pod placement through the provider's scheduling configuration, including topology spread constraints and node affinity rules.

Previously, Cassandra pod placement was left to the default Kubernetes scheduler without any engine-specific guidance, which could result in suboptimal distribution across nodes and zones.

Scheduling policy support is available now for all Cassandra clusters managed through OpenEverest. To learn more, visit the [Cassandra provider documentation](https://docs.openeverest.io/).
