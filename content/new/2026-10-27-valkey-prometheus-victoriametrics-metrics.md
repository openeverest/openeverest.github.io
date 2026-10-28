---
title: "Valkey provider now exposes metrics for Prometheus and VictoriaMetrics"
date: 2026-10-27T16:14:29Z
draft: false
topics:
 - valkey
 - monitoring
 - releases
link: https://github.com/openeverest/provider-valkey/releases/tag/v0.1.10
summary: OpenEverest Valkey Instances can now be scraped by Prometheus and/or VictoriaMetrics, with no extra exporter setup.
---

The OpenEverest Valkey provider now exposes metrics that can be scraped by Prometheus and/or VictoriaMetrics, making Valkey Instances observable without wiring up a separate exporter.

Previously, monitoring a Valkey Instance meant deploying and configuring additional scraping infrastructure by hand; the operator now discovers and scrapes metrics automatically.

Metrics scraping is available now in provider-valkey v0.1.10. To learn more, visit the [v0.1.10 release notes](https://github.com/openeverest/provider-valkey/releases/tag/v0.1.10).
