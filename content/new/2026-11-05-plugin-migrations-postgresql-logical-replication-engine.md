---
title: "Migrations plugin adds a PostgreSQL engine based on native logical replication"
date: 2026-11-05T19:14:40
draft: false
topics:
 - migrations
 - postgresql
 - releases
link: https://github.com/openeverest/plugin-migrations/releases/tag/v0.1.1
summary: The new postgres-logical engine migrates PostgreSQL databases with near-zero cutover downtime using native logical replication.
---

The Migrations plugin adds a `postgres-logical` engine for PostgreSQL-to-PostgreSQL migrations, built on native logical replication. The target database copies tables and streams changes directly from the source, so replication keeps running even if the migration worker restarts, and cutover waits only until the target applies a token written on the source.

A preflight check validates both sides up front — source on PostgreSQL 13+ with logical WAL enabled, target with superuser access, and a primary key or replica identity on every migrated table — and refuses tables that would break replication later. Schema, sequence sync, and materialized view refresh are handled as part of cutover.

Options include schema and table include/exclude filters, database recreation, and pause/resume of the replication stream. The engine is available now in plugin-migrations v0.1.1. To learn more, see the [release notes](https://github.com/openeverest/plugin-migrations/releases/tag/v0.1.1).
