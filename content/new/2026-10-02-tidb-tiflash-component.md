---
title: "TiDB provider now supports the TiFlash analytical engine"
date: 2026-10-02T13:48:04
draft: false
topics:
 - tidb
 - tiflash
 - releases
link: https://github.com/openeverest/provider-tidb/releases/tag/v0.1.4
summary: The TiDB provider now supports deploying TiFlash, enabling real-time analytical queries alongside transactional workloads.
---

The TiDB provider now supports the optional TiFlash component, bringing hybrid transactional and analytical processing (HTAP) to TiDB clusters managed through OpenEverest.

TiFlash is TiDB's columnar storage engine. With it enabled, you can run real-time analytical queries on the same data that powers your transactional workloads — without maintaining a separate data warehouse or ETL pipeline.

TiFlash is available as an optional component when creating or editing a TiDB cluster through the OpenEverest UI or API. To learn more, visit the [TiDB provider release notes](https://github.com/openeverest/provider-tidb/releases/tag/v0.1.4).
