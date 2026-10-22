---
title: "ClickHouse provider extends TLS to all pod-to-pod traffic"
date: 2026-10-21T14:31:36
draft: false
topics:
 - clickhouse
 - security
 - releases
link: https://github.com/openeverest/provider-altinity-clickhouse/releases/tag/v0.3.0
summary: In required TLS mode, replication, Keeper, and inter-node traffic in ClickHouse instances is now encrypted end to end.
---

The Altinity ClickHouse provider now encrypts traffic between pods: replicas fetch parts over HTTPS (port 9010), ClickHouse reaches Keeper over TLS, and Keeper nodes talk to each other over TLS.

In required mode, a NetworkPolicy additionally limits Keeper access to the instance's own ClickHouse pods, its Keeper nodes, and the operator — closing off a previously internal-only trust boundary.

Pod-to-pod TLS is available in provider-altinity-clickhouse 0.3.0. To learn more, see the [release notes](https://github.com/openeverest/provider-altinity-clickhouse/releases/tag/v0.3.0).
