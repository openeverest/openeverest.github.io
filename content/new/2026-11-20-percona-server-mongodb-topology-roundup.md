---
title: "Percona Server for MongoDB provider brings hidden replica set members and admission validation"
date: 2026-11-20T14:44:45
draft: false
topics:
 - mongodb
 - percona
 - releases
link: https://github.com/openeverest/provider-percona-server-mongodb/releases/tag/v0.6.0
summary: The Percona Server for MongoDB provider adds hidden replica set members, proxy and router controls, TLS for PMM, admission validation, and moves to the OpenEverest 2.0 monitoring, backup, and status contracts.
---

Percona Server for MongoDB provider v0.6.0 is a large release built for OpenEverest 2.0.0-alpha.1, spanning topology, networking, validation, and monitoring.

For topology, replica sets can now include hidden members — useful for dedicated analytics or delayed-secondary nodes — and the proxy section gains custom configuration, with routers moved to a separate section in the UI for clearer control of mongos routing. Router exposure is updated alongside, so sharded clusters can publish router endpoints the same way engines are exposed. On import, the user Secret field is now required, making imported clusters declare their credentials explicitly, and the storageClass field accepts empty values in the UI schema for clusters that rely on cluster defaults. Restores now fail early on wrong credentials instead of erroring mid-flight.

Validation is now split into a pure check and a reference check, served as an admission webhook: invalid Instances are rejected at apply time with precise errors rather than failing during reconciliation.

Monitoring moves to the OpenEverest monitoring contract: PMM runs from bindings with exporters on demand, supports authentication modes and TLS, declares the mongod component type, and runs the exporter whenever the "Always" metrics policy is set.

**Breaking changes:** the monitoring contract, backup storages rendered through backup storage classes, and fact-based instance status all come from OpenEverest 2.0.0-alpha.1 — review its [upgrade notes](https://github.com/openeverest/openeverest/releases/tag/v2.0.0-alpha.1) before upgrading.

This release includes @Anuragkumar-687's first contribution to the provider — welcome!

To learn more, visit the [Percona Server for MongoDB provider v0.6.0 release notes](https://github.com/openeverest/provider-percona-server-mongodb/releases/tag/v0.6.0).

<!-- release-key: openeverest/provider-percona-server-mongodb@v0.6.0 -->
