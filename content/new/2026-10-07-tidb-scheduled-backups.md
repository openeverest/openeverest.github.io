---
title: "TiDB provider adds managed scheduled backups"
date: 2026-10-07T12:54:21Z
draft: false
topics:
 - tidb
 - backups
 - releases
link: https://docs.openeverest.io/
summary: The TiDB provider now supports scheduled backups, letting you define backup cadence and retention directly in the cluster spec.
---

The OpenEverest TiDB provider now supports scheduled backups. You can configure backup frequency and retention policies directly in your TiDB cluster spec, and OpenEverest will manage the backup lifecycle automatically.

Previously, backup scheduling for TiDB clusters had to be handled outside of OpenEverest, either through custom CronJobs or external tooling.

Scheduled backups for TiDB are available now for all TiDB clusters managed through OpenEverest. To learn more, visit the [TiDB provider documentation](https://docs.openeverest.io/).
