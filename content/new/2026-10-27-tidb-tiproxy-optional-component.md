---
title: "TiDB provider adds TiProxy as an optional component"
date: 2026-10-27T10:11:07Z
draft: false
topics:
 - tidb
 - releases
link: https://github.com/openeverest/provider-tidb/releases/tag/v0.2.1
summary: The OpenEverest TiDB provider can now deploy TiProxy as an optional component for stable, proxy-managed connections to TiDB clusters.
---

The OpenEverest TiDB provider now supports TiProxy as an optional component, giving TiDB clusters a dedicated connection proxy for stable routing between the SQL layer and TiDB servers.

With TiProxy enabled, client connections survive TiDB node restarts and rolling maintenance without dropping sessions, which previously required clients to handle reconnection logic themselves.

TiProxy is disabled by default and can be enabled per Instance. To learn more, visit the [provider-tidb v0.2.1 release notes](https://github.com/openeverest/provider-tidb/releases/tag/v0.2.1).
