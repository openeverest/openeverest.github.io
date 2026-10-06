---
title: "PostgreSQL provider introduces scheduled backups"
date: 2026-10-06T09:35:19Z
draft: false
topics:
 - postgresql
 - backups
 - releases
link: https://github.com/AdityaPimpalkar/provider-cloudnative-pg/releases/tag/v0.3.0
summary: Schedule automated PostgreSQL backups via storage-level cron expressions.
---

The CloudNative PostgreSQL provider now supports scheduled backups, letting you define recurring backup schedules directly in your instance storage configuration.

Add `schedules` to any entry in `spec.backup.storages[]` to create CNPG `ScheduledBackup` resources automatically. Each schedule can target a specific storage backend and run on a custom cron expression.

Scheduled backups are available now. Backup schedules are managed by the provider and will appear in the cluster automatically.
