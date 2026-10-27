---
title: "Percona Server for MongoDB provider adds TLS, native metrics, and day-2 operations controls"
date: 2026-10-26T05:47:27
draft: false
topics:
 - mongodb
 - security
 - releases
link: https://github.com/openeverest/provider-percona-server-mongodb/releases/tag/v0.5.0
summary: Percona Server for MongoDB provider v0.5.0 brings TLS with cert-manager, native Prometheus and VictoriaMetrics exposure, richer backup imports, UI schema validation, scheduling controls, and MongoDB 8.0 as the default.
---

The Percona Server for MongoDB provider (v0.5.0) ships a broad set of security, observability, and day-2 operations improvements:

- Clusters can now require TLS — mode, certificates, and a cert-manager issuer — configured directly through OpenEverest.
- Metrics are exposed natively to Prometheus and VictoriaMetrics, and Percona Monitoring and Management (PMM) is now optional rather than required for monitoring.
- Importing a backup now populates version, backup type, and topology from the backup metadata.
- The provider schema is validated in the UI, catching misconfigurations before they reach the cluster.
- Sharded resources are grouped per component, and pod scheduling policies (affinity) can be edited in the UI.
- MongoDB 8.0.32 is now the default engine version, with 7.0.43 and 6.0.29 also available.

These capabilities are available in provider v0.5.0. To learn more, visit the [release notes](https://github.com/openeverest/provider-percona-server-mongodb/releases/tag/v0.5.0).