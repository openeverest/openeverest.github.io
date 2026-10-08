---
title: "MariaDB provider adds MaxScale for read/write routing"
date: 2026-10-07T14:15:49Z
draft: false
topics:
 - mariadb
 - proxy
 - releases
link: https://github.com/openeverest/provider-mariadb/releases/tag/v0.1.7
summary: Galera and replication clusters can now sit behind MariaDB MaxScale, which sends writes to the primary and spreads reads across the other nodes.
---

The [MariaDB provider](https://github.com/openeverest/provider-mariadb) v0.1.7 can put [MariaDB MaxScale](https://github.com/mariadb-operator/mariadb-operator/blob/main/docs/maxscale.md) in front of `galera` and `replication` clusters. Switch on **Enable MaxScale** in the new **Proxy** section of the instance form, and MaxScale sends writes to the primary and balances reads across the other nodes. Applications keep a single endpoint: while the proxy is on, the connection Secret points at the MaxScale Service with the same credentials.

MaxScale only routes traffic. Primary failover and rejoin stay with the [mariadb-operator](https://github.com/mariadb-operator/mariadb-operator). On the `replication` topology the provider turns off MaxScale's own auto-failover, so the two never race for the primary ([#37](https://github.com/openeverest/provider-mariadb/issues/37)). You get two MaxScale replicas by default, and MaxScale terminates TLS when the engine requires it (`tls.required: true`).

MaxScale is licensed under the [Business Source License](https://github.com/mariadb-corporation/MaxScale/blob/23.08/LICENSE.TXT), so check the terms before you enable it. Setup steps and an example are in the provider's [MaxScale proxy guide](https://github.com/openeverest/provider-mariadb#maxscale-proxy). Requires OpenEverest v2.0.0-dev.4 or later.
