---
title: "ClickHouse upgrades now run a preflight check before anything is applied"
date: 2026-10-21T14:31:36
draft: false
topics:
 - clickhouse
 - releases
link: https://github.com/openeverest/provider-altinity-clickhouse/releases/tag/v0.3.0
summary: helm upgrade first validates the new provider against live ClickHouse instances and aborts before applying anything if an instance would be stranded.
---

Upgrading the Altinity ClickHouse provider now runs a preflight pass: the new provider image is exercised against your live instances, and the upgrade aborts before anything is applied if one of them would be stranded.

Previously, an incompatible upgrade could leave running instances in a state the new provider could no longer manage.

Upgrade preflight is available in provider-altinity-clickhouse 0.3.0. To learn more, see the [release notes](https://github.com/openeverest/provider-altinity-clickhouse/releases/tag/v0.3.0).
