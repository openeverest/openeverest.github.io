---
title: "Percona XtraDB Cluster provider now requires nodes on separate hosts for resilience"
date: 2026-10-07T12:04:31Z
draft: false
topics:
 - percona-xtradb-cluster
 - high-availability
 - releases
link: https://docs.openeverest.io/
summary: PXC nodes now default to spreading across hosts, with anti-affinity rules that prevent multiple replicas from running on the same node.
---

The OpenEverest Percona XtraDB Cluster provider now enforces that PXC nodes run on separate hosts by default, while still allowing the Kubernetes scheduler to handle zone-level spreading automatically. This reduces the risk of losing quorum when a single node fails, without requiring manual anti-affinity configuration.

Previously, pod placement was managed entirely by the default scheduler, which could co-locate multiple PXC replicas on the same node depending on resource availability.

Dedicated-node placement is available now for all PXC clusters managed through OpenEverest. To learn more, visit the [Percona XtraDB Cluster provider documentation](https://docs.openeverest.io/).
