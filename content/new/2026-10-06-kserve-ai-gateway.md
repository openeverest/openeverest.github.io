---
title: "KServe provider turns OpenEverest into a Model-as-a-Service platform"
date: 2026-10-06T11:08:17Z
draft: false
topics:
  - kserve
  - machine-learning
  - ai
  - releases
link: https://github.com/openeverest/provider-kserve/releases/tag/v0.2.0
summary: Serve every model behind one HTTPS, OpenAI-compatible endpoint with a per-model API key and token quotas - your own private AI API on your own GPUs.
---

The KServe provider now ships an AI Gateway, built on Envoy AI Gateway. Every model you deploy can be published on one shared, OpenAI-compatible endpoint - the same experience as a hosted AI API, running on your own Kubernetes cluster and GPUs.

What you get when you set **External access** to **Envoy AI Gateway**:

- **One endpoint for all models.** Clients pick the model with the standard OpenAI `model` field, so the OpenAI SDK and other OpenAI-compatible tools work without code changes.
- **An API key per model.** OpenEverest generates it and shows it in the connection details. A missing key returns `401`; a key for a different model returns `403`.
- **HTTPS only.** Keys are never accepted over plain HTTP; certificates are issued automatically by cert-manager, for example from Let's Encrypt.
- **Token metering and quotas.** Real prompt and completion tokens are counted per key, and an optional hourly budget per model returns `429` when it is used up.

Before, every model needed its own Service or load balancer, and there was no authentication or usage control in front of it.

Available in provider-kserve v0.2.0. For a step-by-step walkthrough - installation, HTTPS, deploying a model, and splitting one model across several GPU nodes - read [Model-as-a-Service with OpenEverest](https://solanica.io/blog/model-as-a-service-with-openeverest/). For an overview of everything the provider does, see [OpenEverest for KServe](https://openeverest.io/for/kserve/).
