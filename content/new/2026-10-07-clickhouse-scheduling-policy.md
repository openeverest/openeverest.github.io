---
title: "ClickHouse provider now applies scheduling policies to engine pods"
date: 2026-10-07T14:36:36Z
draft: false
topics:
 - clickhouse
 - scheduling
 - releases
link: https://docs.openeverest.io/
summary: The ClickHouse provider now honours engine-level scheduling policies for ClickHouse and Keeper pod placement.
---

The OpenEverest ClickHouse provider now applies the engine-level scheduling policies when placing ClickHouse and Keeper pods. This lets you control pod placement through the provider's scheduling configuration, including topology spread constraints and node affinity rules.

Previously, ClickHouse pod placement was left to the default Kubernetes scheduler without any engine-specific guidance, which could result in suboptimal distribution across nodes and zones.

Scheduling policy support is available now for all ClickHouse clusters managed through OpenEverest. To learn more, visit the [ClickHouse provider documentation](https://docs.openeverest.io/).
