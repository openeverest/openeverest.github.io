---
title: "CloudNativePG provider introduces scheduled backups"
date: 2026-10-06T09:35:19Z
draft: false
topics:
  - postgresql
  - cloudnativepg
  - backups
  - releases
link: https://github.com/AdityaPimpalkar/provider-cloudnative-pg/releases/tag/v0.3.0
summary: Scheduled backups are now available in the CloudNativePG provider via the CNPG ScheduledBackup controller.
---

The CloudNativePG provider now supports scheduled backups, letting you define recurring backup schedules directly inside your cluster specification.

Use `spec.backup.storages[].schedules` to configure recurring backup windows. Under the hood, the provider creates CNPG `ScheduledBackup` resources on your behalf.

Note: while the schedules are active, they are not yet surfaced as OpenEverest Backup objects in the UI. Scheduled backups are available now for all CloudNativePG clusters.
