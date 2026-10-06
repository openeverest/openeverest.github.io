---
title: "PostgreSQL provider adds point-in-time recovery"
date: 2026-10-06T09:35:19Z
draft: false
topics:
 - postgresql
 - backups
 - pitr
 - releases
link: https://github.com/AdityaPimpalkar/provider-cloudnative-pg/releases/tag/v0.3.0
summary: Restore PostgreSQL clusters to any specific point in time using backup archival data.
---

The CloudNative PostgreSQL provider now supports point-in-time recovery (PITR), letting you restore a PostgreSQL cluster to a specific moment using archival backup data.

Specify the target recovery point via `spec.dataSource` when creating or restoring an instance. Previously, restores were limited to full backup snapshots, so recovering from an accidental change meant losing everything written after the last snapshot.

Point-in-time recovery is available now for all PostgreSQL clusters using the CloudNative PG provider.
