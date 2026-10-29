---
title: "Percona PostgreSQL provider adds PgBouncer to the Proxy section"
date: 2026-10-28T11:31:58Z
draft: false
topics:
 - postgresql
 - pgbouncer
 - releases
link: https://github.com/openeverest/provider-percona-postgresql/releases/tag/v0.6.1
summary: PgBouncer connection pooling is now exposed in the Proxy section of the UI, with resource requests grouped for easier tuning.
---

The Percona PostgreSQL provider now exposes PgBouncer in the Proxy section of
the UI, letting you configure connection pooling for your cluster in the same
place as other proxy settings — and resource requests are grouped together so
sizing is easier to see and adjust.

Previously, PgBouncer configuration was not surfaced in the UI and resource
requests were scattered across separate fields.

PgBouncer in the Proxy section is available now. To learn more, visit the
[release notes](https://github.com/openeverest/provider-percona-postgresql/releases/tag/v0.6.1).
