---
title: "MariaDB provider introduces the common TLS configuration"
date: 2026-11-24T18:27:42
draft: false
topics:
 - mariadb
 - tls
 - releases
link: https://github.com/openeverest/provider-mariadb/releases/tag/v0.3.1
summary: MariaDB provider v0.3.1 moves TLS configuration to the shared spec.parameters.tls shape used by every OpenEverest provider.
---

The MariaDB provider now configures TLS through `spec.parameters.tls`, bringing MariaDB in line with the common TLS shape shared across OpenEverest providers. Encryption settings for MariaDB clusters are now expressed the same way as for ClickHouse, PostgreSQL, and Valkey, so cross-engine tooling and policy checks work uniformly.

**Breaking change.** This is a breaking change (marked `feat!`) in provider-mariadb v0.3.1: existing deployments must migrate their TLS settings to the new `spec.parameters.tls` location when upgrading. Check your cluster definitions before applying the update.

To learn more, see the [v0.3.1 release notes](https://github.com/openeverest/provider-mariadb/releases/tag/v0.3.1).

<!-- release-key: openeverest/provider-mariadb@v0.3.1 -->
