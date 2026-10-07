---
title: "CloudNativePG provider adds point-in-time recovery for PostgreSQL"
date: 2026-10-06T09:35:19Z
draft: false
topics:
  - postgresql
  - cloudnativepg
  - backups
  - releases
link: https://github.com/AdityaPimpalkar/provider-cloudnative-pg/releases/tag/v0.3.0
summary: CloudNativePG provider now supports point-in-time recovery, letting you restore PostgreSQL clusters to a specific moment.
---

The CloudNativePG provider now supports point-in-time recovery (PITR), letting you restore PostgreSQL clusters to any specific point in time via `spec.dataSource`.

Previously, restores were limited to full backup snapshots. With PITR, you can recover from accidental data changes or corruption without losing everything written after the last snapshot.

Point-in-time recovery is available now for all CloudNativePG clusters. Check the release notes or the provider repository for configuration details.
