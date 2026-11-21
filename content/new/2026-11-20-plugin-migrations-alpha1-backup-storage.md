---
title: "Migrations plugin is now compatible with OpenEverest 2.0.0-alpha.1 backup storages"
date: 2026-11-20T15:15:27
draft: false
topics:
 - migrations
 - backups
 - releases
link: https://github.com/openeverest/plugin-migrations/releases/tag/v0.1.3
summary: The Migrations plugin now reads the OpenEverest 2.0.0-alpha.1 BackupStorage shape, so migrations run correctly against clusters on the v2 alpha.
---

The Migrations plugin now reads the OpenEverest 2.0.0-alpha.1 BackupStorage shape, fixing failures that occurred when it ran against clusters upgraded to the v2 alpha, where backup storages are defined through backup storage classes.

If you are evaluating OpenEverest 2.0.0-alpha.1 and rely on the Migrations plugin, upgrade to v0.1.3 before running a migration so backup storage references resolve correctly.

To learn more, visit the [Migrations plugin v0.1.3 release notes](https://github.com/openeverest/plugin-migrations/releases/tag/v0.1.3).

<!-- release-key: openeverest/plugin-migrations@v0.1.3 -->
