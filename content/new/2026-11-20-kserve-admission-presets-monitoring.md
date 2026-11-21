---
title: "KServe provider brings admission validation and cluster-wide presets"
date: 2026-11-20T19:53:28
draft: false
topics:
 - kserve
 - kubernetes
 - releases
link: https://github.com/openeverest/provider-kserve/releases/tag/v0.6.0
summary: The KServe provider validates serving runtimes at admission with precise field paths, ships cluster-wide instance presets, publishes metrics through the monitoring contract, and reports KServe failures as problems.
---

The KServe provider v0.6.0 is built for OpenEverest 2.0.0-alpha.1 and tightens the day-0 experience for model-serving deployments.

Invalid InferenceServices are now rejected at admission, with validation served as a webhook and errors that point at the exact field paths to fix — misconfigured serving runtimes fail fast at apply time instead of surfacing as mysterious rollout stalls. The chart also ships its default presets as cluster-scoped ClusterInstancePresets, and KServe failures are reported as problems on the instance, so a failed model rollout is visible directly in the OpenEverest UI.

Metrics are now published through the OpenEverest monitoring contract, so any monitoring integration — PMM, Prometheus, VictoriaMetrics, or Coroot — can scrape the endpoints the provider publishes.

**Breaking changes:** presets move from namespaced objects to ClusterInstancePresets, and monitoring moves from provider-specific endpoints to the monitoring contract. Both come from OpenEverest 2.0.0-alpha.1 — review its [upgrade notes](https://github.com/openeverest/openeverest/releases/tag/v2.0.0-alpha.1) before upgrading. Installation requires cert-manager; the chart installs the KServe CRDs and controllers alongside the provider.

To learn more, visit the [KServe provider v0.6.0 release notes](https://github.com/openeverest/provider-kserve/releases/tag/v0.6.0).

<!-- release-key: openeverest/provider-kserve@v0.6.0 -->
