---
title: "ClickHouse provider introduces maintenance approval for rolling restarts"
date: 2026-10-21T06:06:32
draft: false
topics:
 - clickhouse
 - releases
link: https://github.com/openeverest/provider-altinity-clickhouse/releases/tag/v0.2.0
summary: Provider-initiated rolling restarts of ClickHouse instances are now held until you approve the maintenance action.
---

The Altinity ClickHouse provider now holds provider-initiated rolling restarts for maintenance approval, so an operator-initiated change no longer restarts your ClickHouse instances without your say-so.

The pending action is listed in the instance status; approve it once and the restart proceeds as a controlled rollout.

Maintenance approval is available in provider-altinity-clickhouse 0.2.0. To learn more, see the [release notes](https://github.com/openeverest/provider-altinity-clickhouse/releases/tag/v0.2.0).
