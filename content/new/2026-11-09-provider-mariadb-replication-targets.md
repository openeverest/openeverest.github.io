---
title: "MariaDB provider: instances can now serve as replication targets"
date: 2026-11-09T10:37:14Z
draft: false
topics:
 - mariadb
 - high-availability
 - releases
link: https://github.com/openeverest/provider-mariadb/releases/tag/v0.2.2
summary: MariaDB instances managed by OpenEverest can now be used as replication targets, enabling replication into existing clusters.
---

The MariaDB provider can now use OpenEverest-managed MariaDB instances as replication targets, so you can replicate into an instance running in your cluster from an external source or another instance.

Previously, instances could only act as replication sources; setting up a managed instance as a target required manual configuration outside OpenEverest.

Replication targets are available now in provider-mariadb v0.2.2. To learn more, visit the [release notes](https://github.com/openeverest/provider-mariadb/releases/tag/v0.2.2).
