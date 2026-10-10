---
title: "MariaDB provider boots semi-sync replication nodes read-only"
date: 2026-10-09T11:35:33Z
draft: false
topics:
 - mariadb
 - replication
 - releases
link: https://github.com/openeverest/provider-mariadb/releases/tag/v0.1.9
summary: Semi-synchronous replication nodes in MariaDB clusters now start in read-only mode to protect replication consistency.
---

MariaDB clusters using semi-synchronous replication now boot their replication
nodes in read-only mode (`semiSyncBootAsReplica`), ensuring replicas never accept
writes before replication is fully established.

Previously, a replication node could come up writable during boot, risking
divergence from the primary if the node was promoted or written to before
catching up.

To learn more, visit the [v0.1.9 release notes](https://github.com/openeverest/provider-mariadb/releases/tag/v0.1.9).
