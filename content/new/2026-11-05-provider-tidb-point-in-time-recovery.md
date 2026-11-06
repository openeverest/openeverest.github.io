---
title: "TiDB provider now supports point-in-time recovery"
date: 2026-11-05T19:06:29
draft: false
topics:
 - tidb
 - backups
 - releases
link: https://github.com/openeverest/provider-tidb/releases/tag/v0.2.3
summary: The TiDB provider adds continuous log backup with a restorable window, so clusters can be restored to any point in time.
---

The TiDB provider now supports point-in-time recovery (PITR) built on TiDB BR's log backup. Enabling PITR on a storage runs a continuous log backup alongside snapshot backups, and the provider publishes the restorable window — from the oldest covered full backup to the latest checkpoint — in the instance backup status.

A `PointInTime` restore (to a specific date or the latest safe moment) combines the newest full backup at or before that point with the replayed log, restoring to an empty cluster in one step. The restored instance adopts the root password recorded with the base backup.

Restores that would land outside the restorable window fail fast or wait at the checkpoint, and the operator reports log backup health including lag and failure reasons. Point-in-time recovery is available now in provider-tidb v0.2.3. To learn more, see the [release notes](https://github.com/openeverest/provider-tidb/releases/tag/v0.2.3).
