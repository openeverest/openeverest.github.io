---
title: "MariaDB replication nodes can now boot in read-only mode"
date: 2026-10-09T11:35:33
draft: false
topics:
  - mariadb
  - releases
link: https://github.com/openeverest/provider-mariadb/releases/tag/v0.1.9
summary: With semiSyncBootAsReplica, MariaDB replication nodes boot as read-only replicas, keeping replica data consistent from the moment a node starts.
---

MariaDB replication nodes can now boot in read-only mode. With the
semiSyncBootAsReplica option, standby nodes start up already serving as
read-only replicas, keeping replica data consistent from the moment a node
comes online.

To learn more, visit the
[provider-mariadb v0.1.9 release](https://github.com/openeverest/provider-mariadb/releases/tag/v0.1.9).
