---
title: "MariaDB provider now exposes monitoring toggle"
date: 2026-09-28T09:23:34Z
draft: false
topics:
 - mariadb
 - monitoring
 - releases
link: https://github.com/openeverest/provider-mariadb/releases/tag/v0.1.6
summary: You can now enable or disable monitoring for MariaDB clusters directly from the provider.
---

The MariaDB provider now supports a monitoring toggle, letting you enable or disable metrics collection for your MariaDB clusters without leaving the OpenEverest UI or API.

Previously, monitoring was either always on or required manual configuration outside the provider. With this release, you can control observability per cluster from the same interface you use to manage the database itself.

Update to provider-mariadb v0.1.6 to use the new toggle. No additional setup is required.
