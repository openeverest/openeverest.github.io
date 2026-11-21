---
title: "CloudNativePG provider introduces read-only pooling and pg_partman support"
date: 2026-11-20T20:41:31
draft: false
topics:
 - postgresql
 - cloudnative-pg
 - releases
link: https://github.com/openeverest/provider-cloudnative-pg/releases/tag/v0.4.1
summary: The CloudNativePG provider adds read-only connection pooling, a pg_partman extension toggle, wal2json logical decoding, and moves to the OpenEverest 2.0 monitoring, backup, and status contracts.
---

The CloudNativePG provider ships two releases today — v0.4.0 with the feature set, and v0.4.1 with extension fixes — both built for OpenEverest 2.0.0-alpha.1.

v0.4.0 adds a read-only connection pooler, letting you route reporting and analytic traffic to replicas without burdening the primary, and a pg_partman extension toggle for automated time-based partition management directly from the instance settings. The chart now ships a ClusterInstancePreset per topology, and the UI edits CPU, memory, and disk as quantity fields with proper units. A generated reference now documents every Instance parameter.

**Breaking changes in v0.4.0:** metrics are published through the OpenEverest monitoring contract instead of provider-specific endpoints, BackupStorages are rendered through backup storage classes, and instance status reports facts instead of a single phase. These come from OpenEverest 2.0.0-alpha.1 — review its [upgrade notes](https://github.com/openeverest/openeverest/releases/tag/v2.0.0-alpha.1) before upgrading.

v0.4.1 follows with two extension fixes: wal2json can now be used as a logical decoding output plugin, enabling CDC pipelines against CloudNativePG-managed clusters, and the pg_stat_statements toggle no longer triggers unnecessary restart warnings, with a clearer version hint when selecting it.

To learn more, visit the [v0.4.0](https://github.com/openeverest/provider-cloudnative-pg/releases/tag/v0.4.0) and [v0.4.1](https://github.com/openeverest/provider-cloudnative-pg/releases/tag/v0.4.1) release notes.

<!-- release-key: openeverest/provider-cloudnative-pg@v0.4.1 -->
