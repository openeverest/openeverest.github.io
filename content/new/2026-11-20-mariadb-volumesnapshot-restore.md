---
title: "MariaDB provider can now restore instances from VolumeSnapshots"
date: 2026-11-20T16:16:34
draft: false
topics:
 - mariadb
 - backups
 - releases
link: https://github.com/openeverest/provider-mariadb/releases/tag/v0.3.0
summary: The MariaDB provider adds restores from Kubernetes VolumeSnapshots, scheduled-friendly backup storages via classes, and moves to the OpenEverest 2.0 monitoring and status contracts.
---

The MariaDB provider v0.3.0 can start a new instance from an existing Kubernetes VolumeSnapshot, giving operators a fast, storage-native path to clone or recover a database without running a full backup restore first.

Backup storages are now rendered through OpenEverest backup storage classes, so the same S3-compatible target can back multiple instances with per-class policies instead of per-instance plumbing.

**Breaking changes:** monitoring moves to the OpenEverest monitoring contract — metrics flow through monitoring destinations, with the MariaDB component type declared for the contract and the exporter running whenever the "Always" metrics policy is set — and instance status reports facts instead of a single phase. Presets also ship as ClusterInstancePresets. All of these come from OpenEverest 2.0.0-alpha.1 — review its [upgrade notes](https://github.com/openeverest/openeverest/releases/tag/v2.0.0-alpha.1) before upgrading.

To learn more, visit the [MariaDB provider v0.3.0 release notes](https://github.com/openeverest/provider-mariadb/releases/tag/v0.3.0).

<!-- release-key: openeverest/provider-mariadb@v0.3.0 -->
