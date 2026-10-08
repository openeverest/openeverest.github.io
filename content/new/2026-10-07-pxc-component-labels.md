---
title: "Percona XtraDB Cluster provider now surfaces component pod status in the UI"
date: 2026-10-07T12:04:31Z
draft: false
topics:
 - percona-xtradb-cluster
 - observability
 - releases
link: https://docs.openeverest.io/
summary: PXC component pods are now labeled so OpenEverest can display accurate per-component health status.
---

The OpenEverest Percona XtraDB Cluster provider now labels component pods based on the selectors in `status.components`. This lets the platform surface accurate per-component status in the cluster UI, so you can see at a glance whether PXC, ProxySQL, or other component pods are healthy.

Previously, the UI lacked granular pod-level visibility into PXC components, making it harder to distinguish between a partial replica set issue and a fully healthy cluster.

Component status labels are live now for all PXC clusters managed through OpenEverest. To learn more, visit the [Percona XtraDB Cluster provider documentation](https://docs.openeverest.io/).
