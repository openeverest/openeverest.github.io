---
title: "TiDB provider adds restore and instance recovery from backup"
date: 2026-09-28T17:31:37Z
draft: false
topics:
 - tidb
 - restore
 - releases
link: https://github.com/openeverest/provider-tidb/releases/tag/v0.1.3
summary: You can now restore TiDB clusters from existing backups and create new instances from backup.
---

The TiDB provider now supports restoring clusters from existing backups and creating new TiDB instances directly from a backup. This makes it possible to recover from data loss or clone a cluster for testing without manual data migration.

Previously, restoring a TiDB cluster or creating a new instance from an existing backup required external tools and manual orchestration outside of OpenEverest. The restore flow is now managed end-to-end by the provider.

Update to provider-tidb v0.1.3 to use the new restore and instance-from-backup capabilities. To learn more, visit the [TiDB provider documentation](https://docs.openeverest.io/).
