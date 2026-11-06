---
title: "Deleting a migration now cleans up engine state on the source"
date: 2026-11-05T19:14:40
draft: false
topics:
 - migrations
 - postgresql
 - releases
link: https://github.com/openeverest/plugin-migrations/releases/tag/v0.1.1
summary: Deleting a migration now removes replication artifacts left on the source database first, so nothing keeps retaining WAL silently.
---

The Migrations plugin now cleans up engine state before deleting a started migration. Engines whose workers leave state behind — such as a PostgreSQL replication slot that keeps WAL on the source — can now tear it down as part of the delete.

Previously, deleting a migration could leave replication artifacts running on the source indefinitely. If the cleanup fails, the delete returns an error and keeps the migration record, so nothing retains WAL silently; a "Delete anyway" option skips cleanup when the source is no longer reachable.

This behavior ships with the new postgres-logical engine in plugin-migrations v0.1.1. To learn more, see the [release notes](https://github.com/openeverest/plugin-migrations/releases/tag/v0.1.1).
