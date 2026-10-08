---
title: "Backups can now be kept for a period instead of a count"
date: 2026-10-07T13:48:21Z
draft: false
topics:
 - openeverest
 - backups
 - postgresql
 - releases
link: https://openeverest.io/documentation/2.0.0-dev.4/
summary: Backup schedules support time-based retention, such as keeping 30 days of backups, with the PostgreSQL provider supporting it first.
---

Backup schedules can now keep backups for a period instead of a count: `retention: {type: time, duration: 30d}`, with `Nd`, `Nw`, or `Nm` durations. The PostgreSQL provider supports time-based retention now.

Previously, schedules could only retain a number of copies. The MongoDB and MySQL operators still support only count-based retention, so those providers report `type: time` on the `BackupConfigured` condition, and the UI still edits count retention only. Note for upgraders: `schedules[].retentionCopies: 7` becomes `retention: {type: count, count: 7}`, and after the CRD upgrade `retentionCopies` is pruned — affected schedules keep every backup until `retention` is set.

Time-based retention is available in OpenEverest 2.0.0 Developer Preview 4, installed on a fresh cluster. To learn more, visit the [documentation](https://openeverest.io/documentation/2.0.0-dev.4/).

<!-- release-key: openeverest/openeverest@v2.0.0-dev.4 -->