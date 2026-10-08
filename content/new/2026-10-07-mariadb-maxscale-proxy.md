---
title: "MariaDB provider now supports MaxScale database proxy"
date: 2026-10-07T14:15:49Z
draft: false
topics:
 - mariadb
 - proxy
 - releases
link: https://docs.openeverest.io/
summary: The MariaDB provider can now deploy and manage MaxScale proxy nodes alongside your MariaDB clusters.
---

The OpenEverest MariaDB provider now supports deploying MaxScale as a database proxy for your MariaDB clusters. This adds query routing, read/write splitting, and high availability at the connection layer without requiring a separate proxy deployment.

Previously, teams managing MariaDB workloads through OpenEverest had to run proxy infrastructure outside the platform to distribute read traffic or handle failover.

MaxScale proxy support is available now. To learn more, visit the [MariaDB provider documentation](https://docs.openeverest.io/).
