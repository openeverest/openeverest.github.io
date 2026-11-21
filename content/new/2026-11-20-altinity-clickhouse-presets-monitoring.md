---
title: "Altinity ClickHouse provider delivers topology presets and native monitoring"
date: 2026-11-20T15:03:43
draft: false
topics:
 - clickhouse
 - monitoring
 - releases
link: https://github.com/openeverest/provider-altinity-clickhouse/releases/tag/v0.4.0
summary: The Altinity ClickHouse provider ships a cluster-wide preset per topology, quantity fields in the UI, native metrics through the monitoring contract, and fact-based instance status.
---

The Altinity ClickHouse provider v0.4.0 is built for OpenEverest 2.0.0-alpha.1 and brings four operator-facing changes.

The chart now ships a ClusterInstancePreset for each topology, so spinning up a single-node, replicated, or cluster-style ClickHouse instance is a one-click choice of a cluster-wide preset instead of hand-tuning parameters. In the UI, CPU, memory, and disk are edited as quantity fields with proper units, replacing free-form text entry.

ClickHouse native metrics are now published through the OpenEverest monitoring contract, so any monitoring integration — PMM, Prometheus, VictoriaMetrics, or Coroot — can scrape the endpoints the provider publishes, and instance status reports concrete facts instead of a single phase, making it clearer what is actually happening during rollouts and upgrades.

This release also fixes credentials handling: the provider now reads the credentials Secret past the cache, eliminating stale-credential errors after secret rotation.

**Breaking changes:** monitoring via provider-specific endpoints is replaced by the monitoring contract, and phase-based instance status is replaced by fact-based status. Both come from OpenEverest 2.0.0-alpha.1 — review its [upgrade notes](https://github.com/openeverest/openeverest/releases/tag/v2.0.0-alpha.1) before upgrading. The 0.4.x compatibility row documents which core versions this provider supports.

To learn more, visit the [Altinity ClickHouse provider v0.4.0 release notes](https://github.com/openeverest/provider-altinity-clickhouse/releases/tag/v0.4.0).

<!-- release-key: openeverest/provider-altinity-clickhouse@v0.4.0 -->
