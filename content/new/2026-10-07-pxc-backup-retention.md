---
title: "Percona XtraDB Cluster provider maps backup schedule retention to PXC schedules"
date: 2026-10-07T12:04:31Z
draft: false
topics:
 - percona-xtradb-cluster
 - backups
 - releases
link: https://docs.openeverest.io/
summary: Scheduled Percona XtraDB Cluster backups now enforce retention limits through the underlying PXC backup tool.
---

The OpenEverest Percona XtraDB Cluster (PXC) provider now maps backup schedule retention policies to the PXC backup schedules. Backup retention limits you configure in the cluster spec are enforced automatically, preventing unbounded storage growth.

Previously, retention policies were defined in the schedule but not propagated to the backup tooling, which meant older backups accumulated unless manually cleaned up.

Retention-aware scheduled backups are available now for all PXC clusters managed through OpenEverest. To learn more, visit the [Percona XtraDB Cluster provider documentation](https://docs.openeverest.io/).
