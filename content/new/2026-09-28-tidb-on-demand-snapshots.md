---
title: "TiDB provider now supports on-demand snapshot backups"
date: 2026-09-28T17:31:37Z
draft: false
topics:
 - tidb
 - backups
 - releases
link: https://github.com/openeverest/provider-tidb/releases/tag/v0.1.3
summary: You can now trigger snapshot backups of TiDB clusters to S3-compatible storage on demand.
---

The TiDB provider now supports on-demand snapshot backups to S3-compatible storage, letting you capture a point-in-time copy of your TiDB cluster whenever you need it.

Previously, there was no native way to back up TiDB clusters from within OpenEverest. Operators had to use external tools or manual scripts to protect their data. The new backup flow is integrated directly into the provider and works with any S3-compatible endpoint.

Update to provider-tidb v0.1.3 to use on-demand snapshot backups. To learn more, visit the [TiDB provider documentation](https://docs.openeverest.io/).
