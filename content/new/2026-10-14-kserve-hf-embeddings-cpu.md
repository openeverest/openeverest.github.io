---
title: "KServe predictors can now serve Hugging Face embedding models on CPU"
date: 2026-10-14T18:59:13Z
draft: false
topics:
 - kserve
 - ai
 - releases
link: https://github.com/openeverest/provider-kserve/releases/tag/v0.3.0
summary: KServe predictors can run Hugging Face embedding models on plain CPU nodes, no GPU required.
---

The OpenEverest KServe provider can now serve Hugging Face embedding models on CPU-only nodes, making text-embedding workloads practical without provisioning GPUs.

Previously, serving embedding models typically required GPU-backed predictor deployments, which priced out inference workloads with modest throughput needs.

CPU embedding serving is available now with provider-kserve v0.3.0. To learn more, visit the [release notes](https://github.com/openeverest/provider-kserve/releases/tag/v0.3.0).
