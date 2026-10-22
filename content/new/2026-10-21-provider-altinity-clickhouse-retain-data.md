---
title: "Deleting a ClickHouse instance now retains its data by default"
date: 2026-10-21T06:06:32
draft: false
topics:
 - clickhouse
 - releases
link: https://github.com/openeverest/provider-altinity-clickhouse/releases/tag/v0.2.0
summary: The Altinity ClickHouse provider retains data when an instance is deleted by default, protecting against accidental data loss.
---

The Altinity ClickHouse provider now retains data by default when an instance is deleted, and spreads instance pods across nodes for better resilience.

Previously, deleting an instance through the API could silently destroy its data volumes.

Data retention on deletion is available in provider-altinity-clickhouse 0.2.0. To learn more, see the [release notes](https://github.com/openeverest/provider-altinity-clickhouse/releases/tag/v0.2.0).
