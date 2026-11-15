---
title: "CloudNativePG provider brings high availability and faster recovery by default"
date: 2026-11-14T14:23:53Z
draft: false
topics:
 - cloudnativepg
 - postgresql
 - releases
link: https://github.com/openeverest/provider-cloudnative-pg/releases/tag/v0.3.4
summary: CloudNativePG deployments now run their operator highly available by default, with replication slot failover, VolumeSnapshot bootstrapping, and clearer barman plugin diagnostics.
---

The CloudNativePG provider v0.3.4 rounds up its resilience and recovery improvements:

- The CloudNativePG operator now runs highly available by default, so cluster management survives operator pod failures.
- Logical replication slots now fail over to replicas, keeping change-data-capture and subscriptions working after a primary switch.
- New instances can start directly from a VolumeSnapshot, cutting bootstrap and restore times compared to full data restores.
- Backups now detect a missing barman-cloud plugin and surface a clear alert instead of failing silently.
- Backup and restore status reporting is more accurate, including a completedAt timestamp and correct failure handling for in-cluster restores.

These defaults apply to new and existing CloudNativePG deployments. To learn more, visit the [v0.3.4 release notes](https://github.com/openeverest/provider-cloudnative-pg/releases/tag/v0.3.4).