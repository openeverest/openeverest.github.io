---
title: "Percona PostgreSQL provider now renders PMM monitoring from MonitoringBindings"
date: 2026-10-28T11:31:58Z
draft: false
topics:
 - postgresql
 - monitoring
 - releases
link: https://github.com/openeverest/provider-percona-postgresql/releases/tag/v0.6.1
summary: Percona for PostgreSQL clusters can now be monitored through Percona Monitoring and Management configured directly from MonitoringBindings.
---

The Percona PostgreSQL provider now renders its Percona Monitoring and
Management (PMM) configuration from MonitoringBindings, so cluster monitoring
is wired up automatically from the binding you define — no manual PMM setup
per cluster.

Previously, enabling PMM for a Percona PostgreSQL deployment required
provider-level configuration that did not follow the standard monitoring
binding flow.

PMM rendered from MonitoringBindings is available now for all Percona
PostgreSQL clusters. To learn more, visit the
[release notes](https://github.com/openeverest/provider-percona-postgresql/releases/tag/v0.6.1).
