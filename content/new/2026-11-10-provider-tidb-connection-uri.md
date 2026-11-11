---
title: "TiDB provider now publishes ready-to-use connection URIs"
date: 2026-11-10T06:34:28Z
draft: false
topics:
 - tidb
 - connectivity
 - releases
link: https://github.com/openeverest/provider-tidb/releases/tag/v0.2.4
summary: TiDB connection Secrets now include a complete MySQL URI, making it easier to connect URI-based clients and migration tools.
---

The TiDB provider now adds a `uri` field to each connection Secret alongside the existing host, port, username, and password fields. Clients that accept a MySQL connection URI can now connect to TiDB without assembling the endpoint themselves.

The URI follows the active TiProxy endpoint, URL-escapes credentials, and reflects the client TLS setting. This also allows the migrations plugin's MySQL-to-TiDB engine to resolve TiDB targets through the standard connection endpoint.

Available now in the TiDB provider. To learn more, visit the [release notes](https://github.com/openeverest/provider-tidb/releases/tag/v0.2.4).

<!-- release-key: openeverest/provider-tidb@v0.2.4 -->
