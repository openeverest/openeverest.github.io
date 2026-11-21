---
title: "Metrics plugin adds dashboards for KServe, MongoDB, and SeaweedFS"
date: 2026-11-20T14:33:52
draft: false
topics:
 - metrics
 - monitoring
 - releases
link: https://github.com/openeverest/plugin-metrics/releases/tag/v0.3.0
summary: The Metrics plugin ships ready-made dashboards for KServe and SeaweedFS, plus MongoDB panels for Prometheus and PMM monitoring destinations.
---

The Metrics plugin now ships ready-made dashboards for three more engines: KServe, MongoDB, and SeaweedFS. Teams running these engines get native-feeling observability out of the box instead of building panels by hand.

The MongoDB panels work with both major collection paths: they render when metrics are scraped by Prometheus, and when data is sent to Percona Monitoring and Management (PMM) through OpenEverest monitoring destinations.

The KServe dashboard covers model-serving workloads, and the SeaweedFS dashboard rounds out coverage for the S3-compatible object store.

To learn more, visit the [Metrics plugin v0.3.0 release notes](https://github.com/openeverest/plugin-metrics/releases/tag/v0.3.0).

<!-- release-key: openeverest/plugin-metrics@v0.3.0 -->
