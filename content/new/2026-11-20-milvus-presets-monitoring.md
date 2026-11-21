---
title: "Milvus provider now publishes metrics through the OpenEverest monitoring contract"
date: 2026-11-20T19:21:39
draft: false
topics:
 - milvus
 - vector-database
 - releases
link: https://github.com/openeverest/provider-milvus/releases/tag/v0.5.0
summary: The Milvus provider adds a cluster-wide preset per topology, quantity fields in the UI, and moves to the OpenEverest 2.0 monitoring, backup, and status contracts.
---

The Milvus provider v0.5.0 is built for OpenEverest 2.0.0-alpha.1 and aligns the vector database with the new platform contracts.

The chart ships a ClusterInstancePreset for each topology, so choosing standalone vs. distributed Milvus is a one-click preset selection, and CPU, memory, and disk are edited as quantity fields with proper units in the UI. Milvus metrics are now published through the OpenEverest monitoring contract, letting any monitoring integration — PMM, Prometheus, VictoriaMetrics, or Coroot — scrape the endpoints the provider publishes.

**Breaking changes:** monitoring via provider-specific endpoints is replaced by the monitoring contract, BackupStorages are rendered through backup storage classes, and instance status reports facts instead of a single phase. These come from OpenEverest 2.0.0-alpha.1 — review its [upgrade notes](https://github.com/openeverest/openeverest/releases/tag/v2.0.0-alpha.1) before upgrading.

This release also marks @recharte's first contribution to the Milvus provider — thank you!

To learn more, visit the [Milvus provider v0.5.0 release notes](https://github.com/openeverest/provider-milvus/releases/tag/v0.5.0).

<!-- release-key: openeverest/provider-milvus@v0.5.0 -->
