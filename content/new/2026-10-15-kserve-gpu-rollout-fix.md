---
title: "KServe fixes GPU rollouts, GPU node taints, and the replica floor"
date: 2026-10-15T19:08:55Z
draft: false
topics:
 - kserve
 - kubernetes
 - releases
link: https://github.com/openeverest/provider-kserve/releases/tag/v0.4.0
summary: provider-kserve v0.4.0 fixes GPU-backed rollouts, scheduling onto tainted GPU nodes, and the replica floor for predictors.
---

provider-kserve v0.4.0 fixes how GPU-backed predictors deploy: GPU rollouts now complete correctly, predictors schedule onto tainted GPU nodes, and the replica floor is respected.

The fixes land right after v0.3.0 made embedding inference practical on GPU nodes, smoothing the GPU serving path end to end.

The GPU rollout fixes are available in provider-kserve v0.4.0. To learn more, visit the [release notes](https://github.com/openeverest/provider-kserve/releases/tag/v0.4.0).

<!-- release-key: openeverest/provider-kserve@v0.4.0 -->
