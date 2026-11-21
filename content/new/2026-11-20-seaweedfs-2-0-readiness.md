---
title: "SeaweedFS provider aligns with the OpenEverest 2.0 monitoring and status contracts"
date: 2026-11-20T19:40:39
draft: false
topics:
 - seaweedfs
 - monitoring
 - releases
link: https://github.com/openeverest/provider-seaweedfs/releases/tag/v0.3.0
summary: The SeaweedFS provider now validates instances at admission, publishes metrics through the monitoring contract, renders backup storages through classes, and reports fact-based status.
---

Alongside its new backup and mirroring capabilities, the SeaweedFS provider v0.3.0 is built for OpenEverest 2.0.0-alpha.1 and adopts the new platform contracts.

Validation is served as an admission webhook: invalid instances are rejected at apply time instead of failing during reconciliation. SeaweedFS metrics are published through the OpenEverest monitoring contract, letting any monitoring integration — PMM, Prometheus, VictoriaMetrics, or Coroot — scrape the endpoints the provider publishes.

**Breaking changes:** BackupStorages are rendered through backup storage classes, and instance status reports facts instead of a single phase. These come from OpenEverest 2.0.0-alpha.1 — review its [upgrade notes](https://github.com/openeverest/openeverest/releases/tag/v2.0.0-alpha.1) before upgrading.

To learn more, visit the [SeaweedFS provider v0.3.0 release notes](https://github.com/openeverest/provider-seaweedfs/releases/tag/v0.3.0).

<!-- release-key: openeverest/provider-seaweedfs@v0.3.0 -->
