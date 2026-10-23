---
title: "PostgreSQL provider now supports time-based backup retention and deletion"
date: 2026-10-22T14:02:00
draft: false
topics:
 - postgresql
 - backups
 - releases
link: https://github.com/AdityaPimpalkar/provider-cloudnative-pg/releases/tag/v0.3.3
summary: CloudNativePG PostgreSQL backups can now be retained for a time window (e.g. 30 days) and deleted directly from the object store.
---

The CloudNativePG PostgreSQL provider now supports native, time-window backup retention delegated to CloudNativePG and Barman — for example, retain the archive for `30d`. The window applies to the cluster's whole Barman archive, including on-demand backups and WAL.

Backups can now also be deleted from the underlying object store: `deletionPolicy: Delete` runs a one-off `barman-cloud-backup-delete` job for the backup's Barman ID, while `Retain` removes only the Everest objects and leaves the base backup in place.

Conflicting retention policies on shared storage are refused up front with a clear `BackupRetentionConflict` error. To learn more, see the [release notes](https://github.com/AdityaPimpalkar/provider-cloudnative-pg/releases/tag/v0.3.3).
