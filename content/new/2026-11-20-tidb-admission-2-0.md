---
title: "TiDB provider moves to OpenEverest 2.0 with admission validation"
date: 2026-11-20T19:23:45
draft: false
topics:
 - tidb
 - mysql
 - releases
link: https://github.com/openeverest/provider-tidb/releases/tag/v0.3.0
summary: The TiDB provider now rejects invalid instances at admission and moves to the OpenEverest 2.0 monitoring, backup, preset, and status contracts.
---

The TiDB provider v0.3.0 is built for OpenEverest 2.0.0-alpha.1.

Invalid instances are now rejected at admission, so misconfigured TiDB clusters fail fast at apply time with actionable errors instead of surfacing as reconciliation stalls.

TiDB metrics are published through the OpenEverest monitoring contract — metrics endpoints are published as sources that any monitoring integration (PMM, Prometheus, VictoriaMetrics, or Coroot) can scrape.

**Breaking changes:** presets ship as cluster-scoped ClusterInstancePresets, BackupStorages are rendered through backup storage classes, and instance status reports facts instead of a single phase. These come from OpenEverest 2.0.0-alpha.1 — review its [upgrade notes](https://github.com/openeverest/openeverest/releases/tag/v2.0.0-alpha.1) before upgrading.

To learn more, visit the [TiDB provider v0.3.0 release notes](https://github.com/openeverest/provider-tidb/releases/tag/v0.3.0).

<!-- release-key: openeverest/provider-tidb@v0.3.0 -->
