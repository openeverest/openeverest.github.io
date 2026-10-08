---
title: "TiDB provider now applies engine scheduling policies to component pods"
date: 2026-10-07T12:54:21Z
draft: false
topics:
 - tidb
 - scheduling
 - releases
link: https://docs.openeverest.io/
summary: The TiDB provider now honours engine-level scheduling policies for TiDB, TiKV, and PD pod placement.
---

The OpenEverest TiDB provider now applies engine-level scheduling policies when placing TiDB, TiKV, and PD pods. This lets you control pod placement through the provider's scheduling configuration, including topology spread constraints and node affinity rules.

Previously, TiDB pod placement was left to the default Kubernetes scheduler without any engine-specific guidance, which could result in suboptimal distribution across nodes and zones.

Scheduling policy support is available now for all TiDB clusters managed through OpenEverest. To learn more, visit the [TiDB provider documentation](https://docs.openeverest.io/).
