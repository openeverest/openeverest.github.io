---
title: "Cassandra provider now prefers dedicated nodes for data pods"
date: 2026-10-07T15:02:22Z
draft: false
topics:
 - cassandra
 - high-availability
 - releases
link: https://docs.openeverest.io/
summary: Cassandra pods now default to running on separate nodes to prevent co-location and improve data-layer resilience.
---

The OpenEverest Cassandra provider now defaults to placing Cassandra pods on separate nodes. This prevents co-location of data replicas and improves resilience against single-node failures without requiring manual anti-affinity configuration.

Previously, pod placement was left to the default scheduler, which could place multiple Cassandra pods on the same node depending on cluster capacity and scheduling order.

Dedicated-node placement is available now for all Cassandra clusters managed through OpenEverest. To learn more, visit the [Cassandra provider documentation](https://docs.openeverest.io/).
