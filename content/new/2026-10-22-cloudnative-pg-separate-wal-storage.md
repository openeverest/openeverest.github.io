---
title: "PostgreSQL provider now supports separate WAL storage"
date: 2026-10-22T14:02:00
draft: false
topics:
 - postgresql
 - cloudnativepg
 - releases
link: https://github.com/AdityaPimpalkar/provider-cloudnative-pg/releases/tag/v0.3.3
summary: You can now place PostgreSQL write-ahead logs on their own volume, sized and managed independently from the data volume.
---

The CloudNativePG PostgreSQL provider now supports separate WAL storage: set `spec.components.engine.parameters.walStorage` and each instance gets its own WAL PVC, provisioned, migrated, and expanded by CloudNativePG.

Previously, WAL always lived on the data volume, so heavy write activity competed with data for the same storage. With a dedicated volume — and optionally a faster storage class — write-heavy clusters get more predictable performance.

Leave `walStorage` unset to keep WAL on the data volume. To learn more, see the [release notes](https://github.com/AdityaPimpalkar/provider-cloudnative-pg/releases/tag/v0.3.3).
