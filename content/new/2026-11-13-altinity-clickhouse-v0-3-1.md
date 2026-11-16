---
title: "Altinity ClickHouse provider v0.3.1 adds sharding and hardens rollouts"
date: 2026-11-13T06:09:33Z
draft: false
topics:
 - clickhouse
 - altinity
 - releases
link: https://github.com/openeverest/provider-altinity-clickhouse/releases/tag/v0.3.1
summary: Release v0.3.1 lets replicated topologies scale out across shards, adds admission-webhook validation with precise field paths, stops needless Keeper restarts during TLS rollouts, and fixes UI admin credentials.
---

The Altinity ClickHouse provider v0.3.1 adds horizontal scaling and a set of reliability improvements for day-2 operations:

- **Sharded replicated topology:** ClickHouse clusters can now distribute data and query load across multiple shards. Previously, replicated deployments scaled read capacity but kept all data on one logical shard.
- **Precise validation errors:** configuration is validated by an admission webhook, with errors that point to the exact field paths that need fixing.
- **Stable Keeper during TLS rollouts:** ClickHouse rollouts with TLS enabled no longer restart Keeper, avoiding unnecessary disruption to cluster coordination.
- **Working admin credentials from the UI:** the UI now stores admin credentials under the keys the provider reads, so instances created from the console connect on the first try.

These changes are available now in provider-altinity-clickhouse v0.3.1. To learn more, visit the [release notes](https://github.com/openeverest/provider-altinity-clickhouse/releases/tag/v0.3.1).

<!-- release-key: openeverest/provider-altinity-clickhouse@v0.3.1 -->
