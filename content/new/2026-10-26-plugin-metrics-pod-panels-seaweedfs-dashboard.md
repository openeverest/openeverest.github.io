---
title: "Metrics plugin adds pod resource panels and a SeaweedFS dashboard"
date: 2026-10-26T19:55:01
draft: false
topics:
 - metrics
 - seaweedfs
 - releases
link: https://github.com/openeverest/plugin-metrics/releases/tag/v0.2.2
summary: plugin-metrics v0.2.2 adds pod CPU and memory panels plotted against resource limits on every dashboard, plus a prebuilt SeaweedFS dashboard and Explore fixes for VictoriaMetrics.
---

The OpenEverest metrics plugin (v0.2.2) expands its dashboards to cover both workload saturation and object storage:

- Every dashboard now includes pod CPU and memory panels plotted against the configured resource limits, so saturation is visible at a glance instead of requiring a separate workload inspection.
- A prebuilt Grafana dashboard for SeaweedFS gives out-of-the-box visibility into object storage clusters deployed through OpenEverest, appearing automatically alongside the existing per-engine dashboards.
- The same release fixes Explore on VictoriaMetrics and per-replica MariaDB panels.

The dashboards are available in plugin-metrics 0.2.2. To learn more, visit the [release notes](https://github.com/openeverest/plugin-metrics/releases/tag/v0.2.2).