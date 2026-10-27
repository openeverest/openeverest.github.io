---
title: "SeaweedFS provider gains replication policies, storage expansion, and resilience defaults"
date: 2026-10-26T18:02:43
draft: false
topics:
 - seaweedfs
 - releases
link: https://github.com/openeverest/provider-seaweedfs/releases/tag/v0.2.0
summary: The SeaweedFS provider can now configure replication policies and per-component storage classes, expand storage size, and ships PodDisruptionBudgets, hostname anti-affinity, and metrics by default.
---

The SeaweedFS provider (v0.2.0) ships a broad set of production-readiness improvements:

- Replication policies with validation, configurable per deployment.
- Per-component storage classes in the UI, plus storage size expansion for growing clusters.
- PodDisruptionBudgets for every component and hostname anti-affinity for master, volume, and filer, keeping clusters resilient during node drains.
- Two filers run by default (SeaweedFS 4.48 is required for more), and volume slots are now sized from the disk so buckets grow fewer, larger volumes.
- Metrics are exposed for Prometheus and VictoriaMetrics.

These capabilities are available in provider v0.2.0. To learn more, visit the [release notes](https://github.com/openeverest/provider-seaweedfs/releases/tag/v0.2.0).
