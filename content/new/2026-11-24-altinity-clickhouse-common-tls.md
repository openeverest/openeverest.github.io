---
title: "Altinity ClickHouse provider now uses the common TLS configuration shape"
date: 2026-11-24T19:05:07
draft: false
topics:
 - clickhouse
 - tls
 - releases
link: https://github.com/openeverest/provider-altinity-clickhouse/releases/tag/v0.4.1
summary: TLS settings for Altinity ClickHouse clusters now live under spec.parameters.tls, using the same shape as every other OpenEverest provider.
---

The Altinity ClickHouse provider now configures TLS through `spec.parameters.tls`, adopting the common TLS shape shared across OpenEverest providers. Operators can manage certificate settings for ClickHouse clusters exactly the way they already do for PostgreSQL, MariaDB, and other engines — one structure to learn, one to automate.

**Breaking change.** This is a breaking change (marked `feat!`) in provider-altinity-clickhouse v0.4.1: existing deployments must move their TLS settings to the new `spec.parameters.tls` location when they upgrade. Review your cluster definitions before applying the update.

To learn more, see the [v0.4.1 release notes](https://github.com/openeverest/provider-altinity-clickhouse/releases/tag/v0.4.1).

<!-- release-key: openeverest/provider-altinity-clickhouse@v0.4.1 -->
