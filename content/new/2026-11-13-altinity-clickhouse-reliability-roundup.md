---
title: "Altinity ClickHouse provider hardens validation and rollout reliability"
date: 2026-11-13T06:09:33Z
draft: false
topics:
 - clickhouse
 - altinity
 - releases
link: https://github.com/openeverest/provider-altinity-clickhouse/releases/tag/v0.3.1
summary: Release v0.3.1 adds admission-webhook validation with precise field paths, stops needless Keeper restarts during TLS rollouts, and fixes UI admin-credential handling.
---

The Altinity ClickHouse provider v0.3.1 ships a set of reliability improvements for day-2 operations:

- **Precise validation errors** — configuration is now validated by a pure validator served as an admission webhook, with errors that point to the exact field paths that need fixing.
- **Stable Keeper during TLS rollouts** — ClickHouse rollouts with TLS enabled no longer restart Keeper, avoiding unnecessary disruptions to cluster coordination.
- **Working admin credentials from the UI** — the UI now stores admin credentials under the keys the provider actually reads, so instances created from the console connect correctly on the first try.

These changes are available now in provider-altinity-clickhouse v0.3.1. To learn more, visit the [release notes](https://github.com/openeverest/provider-altinity-clickhouse/releases/tag/v0.3.1).
