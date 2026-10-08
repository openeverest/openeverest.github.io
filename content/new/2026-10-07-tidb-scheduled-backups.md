---
title: "TiDB provider adds scheduled backups with retention"
date: 2026-10-07T12:54:21Z
draft: false
topics:
 - tidb
 - backups
 - releases
link: https://github.com/openeverest/provider-tidb/releases/tag/v0.1.5
summary: TiDB instances can now back up on a cron schedule and prune old backups by count or by age.
---

TiDB backups no longer need someone to start them. The [TiDB provider](https://github.com/openeverest/provider-tidb) v0.1.5 adds cron schedules to the snapshot backups introduced in [v0.1.3](https://github.com/openeverest/provider-tidb/releases/tag/v0.1.3). Add `schedules` to a storage under `spec.backup.storages[]` and choose a retention: keep the last N successful backups, or everything from the last few days, weeks or months.

[TiDB Operator v2](https://github.com/pingcap/tidb-operator) ships the `BackupSchedule` resource without a controller to run it, so the provider runs the schedules itself. Each cron slot creates a regular OpenEverest `Backup` that runs exactly like an on-demand one. A slot only fires while the instance is `Ready` or `Updating` and the previous run of the same schedule has finished. If it can't start within 10 minutes, it's skipped rather than queued.

Retention counts only successful backups, so a run of failures never pushes good backups out, and a time window always keeps the newest successful backup. An invalid cron expression shows up on the instance's `BackupConfigured` condition. More details are in the provider [README](https://github.com/openeverest/provider-tidb#capabilities). Requires OpenEverest v2.0.0-dev.4 or later.
