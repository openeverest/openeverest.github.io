---
title: "Percona Server for MongoDB now supports importing BackupClass resources"
date: 2026-10-19T16:17:09Z
draft: false
topics:
 - mongodb
 - backups
 - releases
link: https://github.com/openeverest/provider-percona-server-mongodb/releases/tag/v0.4.1
summary: Existing BackupClass resources for Percona Server for MongoDB can now be imported into OpenEverest instead of being recreated.
---

BackupClass resources for Percona Server for MongoDB now declare support for import, so you can bring existing backup configurations under OpenEverest management without recreating them or risking the backup history attached to them.

Previously, adopting an existing BackupClass required manual editing of provider fields, which was error-prone for resources already in use.

To learn more, visit the [provider-percona-server-mongodb v0.4.1 release](https://github.com/openeverest/provider-percona-server-mongodb/releases/tag/v0.4.1).