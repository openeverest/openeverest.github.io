---
title: "CloudNativePG provider adds a PgBouncer connection pooler component"
date: 2026-11-14T14:23:53Z
draft: false
topics:
 - cloudnativepg
 - postgresql
 - releases
link: https://github.com/openeverest/provider-cloudnative-pg/releases/tag/v0.3.4
summary: OpenEverest CloudNativePG clusters can now run a managed PgBouncer pooler sidecar for connection pooling, configurable directly from the provider.
---

The CloudNativePG provider for OpenEverest now includes a PgBouncer pooler component, so PostgreSQL clusters can pool client connections without deploying or operating a separate proxy.

Long-lived connections from many clients quickly exhaust PostgreSQL's connection limits, forcing applications to manage their own pooling or hit "too many connections" errors. With the new pooler component, connection pooling is declared alongside the cluster and managed the same way as every other component.

PgBouncer pooling is available now for CloudNativePG clusters. To learn more, visit the [v0.3.4 release notes](https://github.com/openeverest/provider-cloudnative-pg/releases/tag/v0.3.4).