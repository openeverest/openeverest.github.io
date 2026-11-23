---
title: "OpenSearch provider is now built for OpenEverest 2.0.0-alpha.1"
date: 2026-11-20T19:49:29
draft: false
topics:
 - opensearch
 - search
 - releases
link: https://github.com/openeverest/provider-opensearch/releases/tag/v0.3.0
summary: The OpenSearch provider moves to OpenEverest 2.0.0-alpha.1 with backup storage classes, cluster-wide presets, quantity fields in the UI, and monitoring contract support.
---

The OpenSearch provider v0.3.0 moves to OpenEverest 2.0.0-alpha.1, aligning the search and analytics engine with the new platform contracts.

The chart ships a ClusterInstancePreset for each topology, and the UI edits CPU, memory, and disk as quantity fields with proper units. Backup storages are rendered through backup storage classes, and OpenSearch metrics are published through the OpenEverest monitoring contract, letting any monitoring integration — PMM, Prometheus, VictoriaMetrics, or Coroot — scrape the endpoints the provider publishes.

**Breaking changes:** the move to backup storage classes, cluster-wide presets, the monitoring contract, and fact-based instance status all come from OpenEverest 2.0.0-alpha.1 — review its [upgrade notes](https://github.com/openeverest/openeverest/releases/tag/v2.0.0-alpha.1) before upgrading.

To learn more, visit the [OpenSearch provider v0.3.0 release notes](https://github.com/openeverest/provider-opensearch/releases/tag/v0.3.0).

<!-- release-key: openeverest/provider-opensearch@v0.3.0 -->
