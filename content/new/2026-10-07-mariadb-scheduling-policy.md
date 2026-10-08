---
title: "MariaDB provider now supports engine scheduling policies for pod placement"
date: 2026-10-07T14:15:49Z
draft: false
topics:
 - mariadb
 - scheduling
 - releases
link: https://docs.openeverest.io/
summary: The MariaDB provider now applies engine-level scheduling policies, including topology spread constraints and node affinity.
---

The OpenEverest MariaDB provider now applies the engine-level scheduling policies when placing MariaDB and MaxScale pods. This lets you control pod placement through the provider's scheduling configuration, including topology spread constraints and node affinity rules.

Previously, MariaDB pod placement was left to the default Kubernetes scheduler without any engine-specific guidance, which could result in suboptimal distribution across nodes and zones.

Scheduling policy support is available now for all MariaDB clusters managed through OpenEverest. To learn more, visit the [MariaDB provider documentation](https://docs.openeverest.io/).
