---
title: "Scheduled backups gain explicit types in the Percona Server for MySQL provider"
date: 2026-11-26T13:39:32
draft: false
topics:
 - mysql
 - backups
 - releases
link: https://github.com/openeverest/provider-percona-server-mysql/releases/tag/v0.3.2
summary: Scheduled backups in the Percona Server for MySQL provider now carry an explicit type, aligning them with the upstream backup model.
---

The Percona Server for MySQL provider v0.3.2 aligns scheduled backups with the
upstream OpenEverest backup model: schedules now carry an explicit backup
type instead of relying on implicit naming or defaults.

This makes scheduled backup behaviour predictable — the type on the schedule
determines what runs, so mixed full and incremental strategies can be
expressed directly on the Instance without surprises from name-derived
defaults.

To learn more, see the
[v0.3.2 release notes](https://github.com/openeverest/provider-percona-server-mysql/releases/tag/v0.3.2).

<!-- release-key: openeverest/provider-percona-server-mysql@v0.3.2 -->
