---
title: "KServe provider now emits PodMonitor metrics for inference pods"
date: 2026-10-14T18:59:13Z
draft: false
topics:
 - kserve
 - monitoring
 - releases
link: https://github.com/openeverest/provider-kserve/releases/tag/v0.3.0
summary: InferenceService pods are now scraped automatically via an emitted PodMonitor, so predictor metrics land in Prometheus without manual setup.
---

The KServe provider now emits a PodMonitor for InferenceService pods, letting Prometheus scrape predictor metrics automatically as deployments come and go.

Previously, monitoring inference pods required hand-maintained scrape configuration that drifted as predictors were created or rescheduled.

Automatic metrics discovery is available now with provider-kserve v0.3.0. To learn more, visit the [release notes](https://github.com/openeverest/provider-kserve/releases/tag/v0.3.0).
