---
title: "PostgreSQL provider honours topology spread constraints for high availability"
date: 2026-10-07T12:06:01Z
draft: false
topics:
 - postgresql
 - high-availability
 - releases
link: https://docs.openeverest.io/
summary: PostgreSQL clusters now respect Kubernetes topology spread constraints to distribute pods across nodes and zones by default.
---

The OpenEverest PostgreSQL provider now respects topology spread constraints defined in the engine scheduling policy. PostgreSQL pods are distributed across nodes and availability zones by default, reducing the risk of a single node or zone failure taking down the entire database cluster.

Previously, pod placement was handled by the default Kubernetes scheduler without explicit topology guidance, which could leave replicas co-located in smaller clusters.

Topology-aware scheduling is available now for all PostgreSQL clusters managed through OpenEverest. To learn more, visit the [PostgreSQL provider documentation](https://docs.openeverest.io/).
