---
title: "PostgreSQL provider maps backup schedule retention to pgBackRest"
date: 2026-10-07T12:06:01Z
draft: false
topics:
 - postgresql
 - backups
 - releases
link: https://docs.openeverest.io/
summary: Scheduled PostgreSQL backups now automatically enforce retention limits through pgBackRest, deleting older backups beyond the configured window.
---

The OpenEverest PostgreSQL provider now maps backup schedule retention policies directly to pgBackRest. When you define how many backups to keep, older backups are automatically pruned by pgBackRest so your storage usage stays predictable.

Previously, retention policies were stored in the schedule but not necessarily enforced by the underlying backup tool, which could lead to unbounded storage growth over time.

Retention-aware scheduled backups are available now for all PostgreSQL clusters managed through OpenEverest. To learn more, visit the [PostgreSQL provider documentation](https://docs.openeverest.io/).
