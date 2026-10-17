---
title: "MariaDB provider now reports PITR restores as complete only after binlogs are replayed"
date: 2026-10-16T08:28:18
draft: false
topics:
 - mariadb
 - backups
 - releases
link: https://github.com/openeverest/provider-mariadb/releases/tag/v0.2.0
summary: Point-in-time recovery restores are no longer marked as succeeded before the binlogs have been fully replayed.
---

Point-in-time recovery (PITR) restores in the MariaDB provider are now reported
as succeeded only after the full binlog replay has completed. Previously, a
restore could be marked as succeeded while binlogs were still replaying, which
meant applications could be pointed at an instance that was not yet at the
requested point in time.

This removes the risk of quietly running against incomplete data after a PITR
restore. To learn more, visit the
[provider-mariadb v0.2.0 release](https://github.com/openeverest/provider-mariadb/releases/tag/v0.2.0).
