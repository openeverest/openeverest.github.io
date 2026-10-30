---
title: "provider-kserve adds first-class vLLM engine tuning"
date: 2026-10-29T17:51:26
draft: false
topics:
 - kserve
 - llm
 - releases
link: https://github.com/openeverest/provider-kserve/releases/tag/v0.5.0
summary: The KServe provider now exposes vLLM engine parameters — tool calling, reasoning parsers, context length, quantization and more — without hand-written config.
---

The OpenEverest KServe provider (v0.5.0) introduces first-class vLLM engine tuning: context length, GPU memory share, batch size, dtype, quantization, KV cache dtype, and tool-calling and reasoning parsers can all be set through `llmEngine.parameters.engine` — no hand-written configuration required.

The `llm` form was also cleaned up: autoscaling, multi-node workers and prefill options now sit behind switches, and parallelism and LoRA settings are grouped together. Autoscaling is usable directly from the UI, which previously always sent a replica count that conflicted with min/max replica settings.

Engine tuning is available now for all KServe `llm` deployments. To learn more, visit the [v0.5.0 release notes](https://github.com/openeverest/provider-kserve/releases/tag/v0.5.0).
