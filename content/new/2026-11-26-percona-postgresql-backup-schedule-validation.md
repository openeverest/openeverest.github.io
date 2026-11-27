---
title: "Percona PostgreSQL provider now validates backup schedules and parameters"
date: 2026-11-26T13:38:55
draft: false
topics:
 - postgresql
 - backups
 - releases
link: https://github.com/openeverest/provider-percona-postgresql/releases/tag/v0.7.2
summary: Backup schedules get a free-form name with an explicit type, and strict parameter validation catches bad backup, restore, and schedule definitions before they apply.
---

The Percona PostgreSQL provider v0.7.2 tightens how backup schedules and
parameters are defined, catching misconfigurations before they reach a
running cluster.

A backup schedule's `Name` is now a free-form identifier, unique across the
Instance — the effective backup type comes from `schedule.parameters.type`
(default `full`, with `full`, `diff`, and `incr` supported) instead of being
implied by the name. Schedules are also validated as a set: names must be
unique, at most one schedule per type may be enabled at a time, and retention
is applied per effective type.

Backup, restore, and schedule parameters are now decoded strictly — unknown
fields are rejected instead of silently ignored — so a typo in a pgBackRest
parameter fails at apply time rather than surfacing as a broken backup job
later.

To learn more, see the
[v0.7.2 release notes](https://github.com/openeverest/provider-percona-postgresql/releases/tag/v0.7.2).

<!-- release-key: openeverest/provider-percona-postgresql@v0.7.2 -->
