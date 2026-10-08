---
title: "The BackupImport API brings instance creation from existing backups"
date: 2026-10-07T13:48:21Z
draft: false
topics:
 - openeverest
 - backups
 - api
 - releases
link: https://openeverest.io/documentation/2.0.0-dev.4/
summary: The new BackupImport API and provider-runtime support let a provider create an instance directly from a backup in S3 storage.
---

OpenEverest 2.0.0 Developer Preview 4 adds a `BackupImport` API with provider-runtime support, the first building block for creating an instance directly from a backup in S3 storage.

The provider-runtime reconciles `BackupImport` custom resources: a provider implements the new `ImportBackup` interface, and the runtime deduplicates backups with identical paths and creates the corresponding `Backup` custom resources. There is no UI for it yet — the workflow is API-first, aimed at migration and disaster-recovery automation.

The `BackupImport` API is available in OpenEverest 2.0.0 Developer Preview 4. To learn more, visit the [documentation](https://openeverest.io/documentation/2.0.0-dev.4/).

<!-- release-key: openeverest/openeverest@v2.0.0-dev.4 -->