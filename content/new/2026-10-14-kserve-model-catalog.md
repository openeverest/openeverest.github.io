---
title: "KServe provider adds a model catalog with CPU, GPU, and classic models"
date: 2026-10-14T18:59:13Z
draft: false
topics:
 - kserve
 - ai
 - releases
link: https://github.com/openeverest/provider-kserve/releases/tag/v0.3.0
summary: A built-in model catalog lets you pick CPU, GPU, or classic models for KServe predictors instead of wiring images by hand.
---

The KServe provider now ships a model catalog covering CPU, GPU, and classic models, so you can pick a ready-to-deploy model for your predictor instead of assembling container images and arguments manually.

The catalog groups models by hardware class, making it clear which ones run on CPU-only nodes and which need GPUs before you commit cluster resources.

The model catalog is available now with provider-kserve v0.3.0. To learn more, visit the [release notes](https://github.com/openeverest/provider-kserve/releases/tag/v0.3.0).
