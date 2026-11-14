---
title: "Altinity ClickHouse provider adds sharding for replicated topologies"
date: 2026-11-13T06:09:33Z
draft: false
topics:
 - clickhouse
 - altinity
 - releases
link: https://github.com/openeverest/provider-altinity-clickhouse/releases/tag/v0.3.1
summary: The Altinity ClickHouse provider can now shard replicated cluster topologies, letting deployments scale horizontally beyond a single replica set.
---

The Altinity ClickHouse provider now supports sharding the replicated topology, so ClickHouse clusters provisioned through OpenEverest can distribute data and query load across multiple shards instead of relying on a single replicated set.

Previously, replicated deployments scaled read capacity but kept all data on one logical shard, limiting horizontal growth for large datasets.

Sharding is available now in provider-altinity-clickhouse v0.3.1. To learn more, visit the [release notes](https://github.com/openeverest/provider-altinity-clickhouse/releases/tag/v0.3.1).
