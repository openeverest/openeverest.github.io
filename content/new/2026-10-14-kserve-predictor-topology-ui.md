---
title: "OpenEverest UI now exposes KServe predictor topology"
date: 2026-10-14T18:59:13Z
draft: false
topics:
 - kserve
 - ui
 - releases
link: https://github.com/openeverest/provider-kserve/releases/tag/v0.3.0
summary: Predictor topology is now visible in the OpenEverest UI, showing how a KServe deployment is wired together.
---

The OpenEverest UI now displays the full topology of KServe predictors, so you can see how the components of an inference deployment relate without inspecting Kubernetes resources by hand.

Previously, understanding a predictor's structure meant reading raw InferenceService and pod definitions in kubectl.

Predictor topology is available now with provider-kserve v0.3.0. To learn more, visit the [release notes](https://github.com/openeverest/provider-kserve/releases/tag/v0.3.0).
