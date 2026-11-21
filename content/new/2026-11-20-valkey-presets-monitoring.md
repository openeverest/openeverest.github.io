---
title: "Valkey provider ships cluster-wide presets and monitoring contract support"
date: 2026-11-20T13:38:16
draft: false
topics:
 - valkey
 - redis
 - releases
link: https://github.com/openeverest/provider-valkey/releases/tag/v0.2.0
summary: The Valkey provider ships presets as ClusterInstancePresets, adds quantity fields in the UI, and moves to the OpenEverest 2.0 monitoring and status contracts.
---

The Valkey provider v0.2.0 is built for OpenEverest 2.0.0-alpha.1 and aligns the Redis-compatible cache with the new platform contracts.

The chart's presets now ship as cluster-scoped ClusterInstancePresets, and the UI edits CPU, memory, and disk as quantity fields with proper units. Valkey metrics are published through the OpenEverest monitoring contract, letting any monitoring integration — PMM, Prometheus, VictoriaMetrics, or Coroot — scrape the endpoints the provider publishes.

**Breaking changes:** the monitoring contract and fact-based instance status come from OpenEverest 2.0.0-alpha.1 — review its [upgrade notes](https://github.com/openeverest/openeverest/releases/tag/v2.0.0-alpha.1) before upgrading.

To learn more, visit the [Valkey provider v0.2.0 release notes](https://github.com/openeverest/provider-valkey/releases/tag/v0.2.0).

<!-- release-key: openeverest/provider-valkey@v0.2.0 -->
