---
title: "CloudNativePG instances now deliver richer defaults: pg_stat_statements, pg_cron, pg_repack, and pgHBA"
date: 2026-11-14T14:23:53Z
draft: false
topics:
 - cloudnativepg
 - postgresql
 - releases
link: https://github.com/openeverest/provider-cloudnative-pg/releases/tag/v0.3.4
summary: CloudNativePG instances now enable query statistics and offer pg_cron/pg_repack toggles, pgHBA client access rules, and admission-time validation.
---

The CloudNativePG provider v0.3.4 makes day-2 PostgreSQL management easier with a batch of usability and defaults improvements:

- Query statistics (pg_stat_statements) are now enabled by default, so slow-query insight needs no extra setup.
- pg_cron and pg_repack extension toggles are available in the provider spec, letting you schedule jobs and reclaim bloat without manual SQL.
- Client access rules can be declared with a pgHBA parameter instead of hand-editing cluster configuration.
- Instances are validated at admission time, catching misconfigurations before they ever reach a running cluster.

These defaults and toggles are available now. To learn more, visit the [v0.3.4 release notes](https://github.com/openeverest/provider-cloudnative-pg/releases/tag/v0.3.4).