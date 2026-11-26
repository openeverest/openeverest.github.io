---
title: "TiDB provider adopts the common TLS shape under spec.parameters.tls"
date: 2026-11-25T06:28:27Z
draft: false
topics:
 - tidb
 - security
 - releases
link: https://github.com/openeverest/provider-tidb/releases/tag/v0.3.1
summary: TLS configuration for TiDB clusters moves to spec.parameters.tls using the common OpenEverest TLS shape — a breaking change for existing clusters.
---

The OpenEverest TiDB provider now configures TLS under
`spec.parameters.tls`, adopting the same common shape used across OpenEverest
providers. TLS for TiDB clusters is configured exactly like TLS for every other
engine — one field, one structure, no provider-specific exceptions.

**Breaking change:** this is a breaking modification to the TiDB TLS
specification. Cluster definitions that configure TLS under the previous
location must be migrated to `spec.parameters.tls` when upgrading; review
your definitions before applying this release.

To learn more, visit the
[provider-tidb release notes](https://github.com/openeverest/provider-tidb/releases/tag/v0.3.1).

<!-- release-key: openeverest/provider-tidb@v0.3.1 -->