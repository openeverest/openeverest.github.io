---
title: "Valkey replication clients now connect through a Service that follows the primary"
date: 2026-10-19T17:24:48Z
draft: false
topics:
 - valkey
 - releases
link: https://github.com/openeverest/provider-valkey/releases/tag/v0.1.9
summary: Valkey replication clients now connect through a Service that always points at the current primary, preventing writes to a stale primary after a failover.
---

Valkey replication clients provisioned by the provider now connect through a Service that follows the current primary, so client traffic is always routed to the node that is actually accepting writes.

Previously, after a failover, clients could keep writing to a node that had become a replica, silently losing writes until the connection was recreated.

To learn more, visit the [provider-valkey v0.1.9 release](https://github.com/openeverest/provider-valkey/releases/tag/v0.1.9).