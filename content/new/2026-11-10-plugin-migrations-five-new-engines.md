---
title: "OpenEverest migrations add five database replication engines"
date: 2026-11-10T11:25:42Z
draft: false
topics:
 - migrations
 - databases
 - releases
link: https://github.com/openeverest/plugin-migrations/releases/tag/v0.1.2
summary: The migrations plugin now supports live migrations for MySQL, MariaDB, TiDB, SQL Server, Redis, and Valkey through five new engines.
---

The OpenEverest migrations plugin adds five engines that copy data and replicate ongoing changes until cutover:

- **MySQL to Percona XtraDB Cluster:** initial copy with MySQL Shell followed by native GTID replication.
- **MariaDB to MariaDB:** snapshot transfer followed by native GTID replication, including Galera target support.
- **Redis or Valkey to Valkey:** RedisShake-based migration with replication-lag tracking and coordinated cutover.
- **SQL Server to SQL Server:** S3-backed log shipping for SQL Server 2022 and later, with availability-group support.
- **MySQL to TiDB:** TiDB Data Migration for MySQL 5.7–8.4 sources, with preflight checks and binlog replication.

The engines are available now in the migrations plugin. To learn more, visit the [release notes](https://github.com/openeverest/plugin-migrations/releases/tag/v0.1.2).

<!-- release-key: openeverest/plugin-migrations@v0.1.2 -->
