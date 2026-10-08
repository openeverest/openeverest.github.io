---
title: "Valkey provider now respects engine scheduling policies for pod placement"
date: 2026-10-07T15:05:08Z
draft: false
topics:
 - valkey
 - scheduling
 - releases
link: https://github.com/openeverest/provider-valkey
summary: The Valkey provider now applies engine-level scheduling policies to determine where pods are placed across the cluster.
---

The OpenEverest Valkey provider now applies the engine-level scheduling policies when placing Valkey pods. This lets you control pod placement through the provider's scheduling configuration, including topology spread constraints and node affinity rules.

Previously, Valkey pod placement was left to the default Kubernetes scheduler without any engine-specific guidance, which could result in suboptimal distribution across nodes and zones.

Scheduling policy support is available now for all Valkey clusters managed through OpenEverest. To learn more - try [OpenEverest](https://openeverest.io) and install the [provider for Valkey](https://github.com/openeverest/provider-valkey).
