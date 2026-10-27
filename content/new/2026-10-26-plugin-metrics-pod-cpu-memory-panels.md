---
title: "Every metrics dashboard now shows pod CPU and memory usage"
date: 2026-10-26T19:55:01
draft: false
topics:
 - metrics
 - releases
link: https://github.com/openeverest/plugin-metrics/releases/tag/v0.2.2
summary: All dashboards shipped by the metrics plugin now include pod CPU and memory panels plotted against resource limits.
---

The OpenEverest metrics plugin (v0.2.2) now includes pod CPU and memory panels on every dashboard it ships, plotted against the configured resource limits.

Previously, dashboards focused on engine-level metrics, so checking whether a pod was approaching its CPU or memory limits required leaving the dashboard and inspecting workloads separately. The new panels surface saturation at a glance, and the same release fixes Explore on VictoriaMetrics and per-replica MariaDB panels.

The panels are available in plugin-metrics 0.2.2. To learn more, visit the [release notes](https://github.com/openeverest/plugin-metrics/releases/tag/v0.2.2).
