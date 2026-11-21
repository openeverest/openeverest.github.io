---
title: "Percona XtraDB Cluster provider adds TLS and admission validation"
date: 2026-11-20T14:45:15
draft: false
topics:
 - mysql
 - xtradb
 - percona
 - releases
link: https://github.com/openeverest/provider-percona-xtradb-cluster/releases/tag/v0.5.0
summary: The Percona XtraDB Cluster provider adds TLS support, proxy customization, admission validation, exposure controls, and moves to the OpenEverest 2.0 monitoring, backup, and status contracts.
---

The Percona XtraDB Cluster provider v0.5.0 is built for OpenEverest 2.0.0-alpha.1 and hardens the Galera-based MySQL layer.

Clusters can now run with TLS, and the proxy layer accepts custom configuration. Exposure controls let you publish the cluster endpoints through OpenEverest instead of hand-rolled Services, and the UI now reads CPU, memory, and disk as quantity fields with proper units.

Validation is served as an admission webhook with precise field paths: invalid instances are rejected at apply time instead of failing during reconciliation. Monitoring moves to the OpenEverest monitoring contract — PMM runs from bindings with the mysqld exporter on demand, supports authentication modes and TLS, declares the pxc and haproxy component types, and runs the exporter whenever the "Always" metrics policy is set.

**Breaking changes:** the monitoring contract, backup storages rendered through backup storage classes, and fact-based instance status all come from OpenEverest 2.0.0-alpha.1 — review its [upgrade notes](https://github.com/openeverest/openeverest/releases/tag/v2.0.0-alpha.1) before upgrading.

This release includes @Anuragkumar-687's first contribution to the provider — welcome!

To learn more, visit the [Percona XtraDB Cluster provider v0.5.0 release notes](https://github.com/openeverest/provider-percona-xtradb-cluster/releases/tag/v0.5.0).

<!-- release-key: openeverest/provider-percona-xtradb-cluster@v0.5.0 -->
