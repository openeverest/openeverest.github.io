---
title: "MariaDB provider can now seed new instances from logical backups"
date: 2026-10-16T08:28:18
draft: false
topics:
 - mariadb
 - backups
 - releases
link: https://github.com/openeverest/provider-mariadb/releases/tag/v0.2.0
summary: New MariaDB instances can be seeded directly from an existing logical backup by setting spec.dataSource.
---

The MariaDB provider can now seed a new Instance directly from a logical backup
by setting `spec.dataSource`. Previously, restoring data into a fresh instance
required manual steps outside the operator.

With this change, you point a new Instance's `spec.dataSource` at a logical
backup, and the provider populates the instance from it during provisioning.

To learn more, visit the
[provider-mariadb v0.2.0 release](https://github.com/openeverest/provider-mariadb/releases/tag/v0.2.0).
