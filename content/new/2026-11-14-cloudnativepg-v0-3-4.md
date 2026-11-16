---
title: "CloudNativePG provider v0.3.4 adds PgBouncer pooling, high availability, and richer defaults"
date: 2026-11-14T14:23:53Z
draft: false
topics:
 - cloudnativepg
 - postgresql
 - releases
link: https://github.com/openeverest/provider-cloudnative-pg/releases/tag/v0.3.4
summary: CloudNativePG v0.3.4 brings a managed PgBouncer pooler, a highly available operator with faster recovery, and better defaults such as pg_stat_statements, pg_cron, pg_repack, and pgHBA.
---

The CloudNativePG provider v0.3.4 is a large day-2 release for PostgreSQL on OpenEverest.

**PgBouncer connection pooling**

- A new PgBouncer pooler component pools client connections without a separate proxy to deploy or operate. You declare it alongside the cluster and manage it like every other component.

**High availability and recovery**

- The CloudNativePG operator now runs highly available by default, so cluster management survives operator pod failures.
- Logical replication slots now fail over to replicas, keeping change-data-capture and subscriptions working after a primary switch.
- New instances can start directly from a VolumeSnapshot, cutting bootstrap and restore times compared to full data restores.
- Backups now detect a missing barman-cloud plugin and surface a clear alert instead of failing silently.
- Backup and restore status reporting is more accurate, including a `completedAt` timestamp and correct failure handling for in-cluster restores.

**Defaults and usability**

- Query statistics (`pg_stat_statements`) are now enabled by default, so slow-query insight needs no extra setup.
- `pg_cron` and `pg_repack` extension toggles let you schedule jobs and reclaim bloat without manual SQL.
- Client access rules can be declared with a `pgHBA` parameter instead of hand-editing cluster configuration.
- Instances are validated at admission time, catching misconfigurations before they reach a running cluster.

These changes are available now. To learn more, visit the [v0.3.4 release notes](https://github.com/openeverest/provider-cloudnative-pg/releases/tag/v0.3.4).

<!-- release-key: openeverest/provider-cloudnative-pg@v0.3.4 -->
