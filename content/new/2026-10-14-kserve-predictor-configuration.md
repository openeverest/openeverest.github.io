---
title: "KServe predictors now support custom env, scheduling, and service pass-through"
date: 2026-10-14T18:59:13Z
draft: false
topics:
 - kserve
 - configuration
 - releases
link: https://github.com/openeverest/provider-kserve/releases/tag/v0.3.0
summary: Predictors now accept environment variables, scheduling rules, external Services, and pass through service accounts, labels, and security contexts.
---

KServe predictors now accept custom environment variables, scheduling constraints, and external Services, and pass through service accounts, labels, and security contexts to the inference pods.

Previously, settings that did not map to a dedicated provider field could not reach the predictor pods, forcing workarounds for anything from node affinity to pod security.

Advanced predictor configuration is available now with provider-kserve v0.3.0. To learn more, visit the [release notes](https://github.com/openeverest/provider-kserve/releases/tag/v0.3.0).
