---
title: "MariaDB provider adds replication topology scale-out and automatic replica recovery"
date: 2026-10-16T08:28:18
draft: false
topics:
 - mariadb
 - high-availability
 - releases
link: https://github.com/openeverest/provider-mariadb/releases/tag/v0.2.0
summary: Replication topologies can now be scaled out, and broken replicas are recovered automatically.
---

The MariaDB provider now supports scaling out an existing replication topology,
so you can add replicas to a running cluster instead of rebuilding it. It also
recovers broken replicas on the replication topology automatically, without
operator intervention.

Together, these changes make MariaDB replication topologies easier to grow and
keep healthy over time. To learn more, visit the
[provider-mariadb v0.2.0 release](https://github.com/openeverest/provider-mariadb/releases/tag/v0.2.0).
