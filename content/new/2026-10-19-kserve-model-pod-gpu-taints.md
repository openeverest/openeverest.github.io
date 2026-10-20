---
title: "KServe model pods now tolerate GPU taints and honour scheduling policies"
date: 2026-10-19T17:23:11Z
draft: false
topics:
 - kserve
 - llm
 - scheduling
 - releases
link: https://github.com/openeverest/provider-kserve/releases/tag/v0.4.1
summary: The KServe provider now applies your scheduling policy to model pods and tolerates GPU taints, so inference workloads land on the nodes you intend.
---

The OpenEverest KServe provider now applies the scheduling policy of your choice to model pods and tolerates GPU taints, so inference workloads are placed on exactly the nodes you intend — including dedicated GPU nodes.

Previously, scheduling policies were not applied to model pods, and GPU-tainted nodes could reject or evict them, leaving models unscheduled on the very hardware provisioned for them.

Both behaviours are available now in provider-kserve v0.4.1. To learn more, visit the [provider-kserve v0.4.1 release](https://github.com/openeverest/provider-kserve/releases/tag/v0.4.1).