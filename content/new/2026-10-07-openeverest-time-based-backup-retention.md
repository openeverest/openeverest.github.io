---
title: "OpenEverest adds time-based retention for scheduled backups"
date: 2026-10-07T13:48:21Z
draft: false
topics:
 - openeverest
 - backups
 - releases
link: https://github.com/openeverest/openeverest/releases/tag/v2.0.0-dev.4
summary: Backup schedules can now keep backups for a period of time, not just a fixed number of copies.
---

"Keep the last 7 backups" and "keep 30 days of backups" are different policies, and [OpenEverest v2.0.0-dev.4](https://github.com/openeverest/openeverest/releases/tag/v2.0.0-dev.4) supports both. A schedule's `retention` is either `{type: count, count: 7}` or `{type: time, duration: 30d}`, with the duration in days, weeks or months (`Nd`, `Nw`, `Nm`). Each provider maps it onto its backup engine. Anything the engine can't do is reported on the instance's `BackupConfigured` condition instead of being silently ignored.

Support in the providers released alongside dev.4:

- **PostgreSQL** ([v0.4.0](https://github.com/openeverest/provider-percona-postgresql/releases/tag/v0.4.0)): count and time, enforced by [pgBackRest](https://pgbackrest.org/user-guide.html#retention). Time windows are converted to days, and a month counts as 31 days so you never keep less than you asked for. Differential schedules support count only.
- **MySQL** ([v0.3.0](https://github.com/openeverest/provider-percona-xtradb-cluster/releases/tag/v0.3.0)): count only. The Percona XtraDB Cluster operator prunes old backups and deletes them from storage.
- **TiDB** ([v0.1.5](https://github.com/openeverest/provider-tidb/releases/tag/v0.1.5)): count and time, run by the provider's own backup scheduler.
- **MongoDB** and **Cassandra**: count only. Cassandra applies retention to the whole cluster rather than per schedule.

`retention` replaces `retentionCopies`. Once the new CRDs are installed, the old field is dropped and those schedules keep every backup, so re-apply them with `retention: {type: count, count: N}`. The UI still edits count retention only. See the [dev.4 release notes](https://openeverest.io/documentation/2.0.0-dev.4/release-notes/OpenEverest-2.0.0-dev.4-%282026-10-07%29.html) for the full list of changes.
