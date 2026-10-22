---
title: "You can now require TLS for ClickHouse clients and encrypt distributed queries"
date: 2026-10-21T06:06:32
draft: false
topics:
 - clickhouse
 - security
 - releases
link: https://github.com/openeverest/provider-altinity-clickhouse/releases/tag/v0.2.0
summary: The Altinity ClickHouse provider can require TLS for client connections and encrypts distributed query traffic between replicas.
---

The Altinity ClickHouse provider can now require TLS for client connections and encrypts distributed queries between replicas, so query traffic no longer crosses the network in plaintext.

Previously, client connections and inter-replica query traffic were unencrypted unless you configured TLS yourself.

Client TLS and encrypted distributed queries are available in provider-altinity-clickhouse 0.2.0. To learn more, see the [release notes](https://github.com/openeverest/provider-altinity-clickhouse/releases/tag/v0.2.0).
