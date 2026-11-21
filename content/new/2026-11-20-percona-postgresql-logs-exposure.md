---
title: "Percona PostgreSQL provider adds automatic log collection and engine exposure"
date: 2026-11-20T14:44:51
draft: false
topics:
 - postgresql
 - percona
 - releases
link: https://github.com/openeverest/provider-percona-postgresql/releases/tag/v0.7.0
summary: The Percona PostgreSQL provider collects database logs through the operator's log collector by default, supports exposing the engine, and upgrades to Percona Operator for PostgreSQL 3.1.0.
---

The Percona PostgreSQL provider v0.7.0 is built for OpenEverest 2.0.0-alpha.1 and brings three operator-facing additions.

New instances now collect database logs through the Percona operator's log collector by default, so troubleshooting a slow query or a crash no longer requires kubectl acrobatics to find pod logs. The provider also supports engine exposure, letting you publish the PostgreSQL engine endpoint through OpenEverest's exposure controls instead of hand-rolled Services.

The bundled Percona Operator for PostgreSQL moves to 3.1.0, bringing the upstream operator's latest fixes and improvements to clusters managed through OpenEverest.

**Breaking changes:** backup storages are rendered through backup storage classes, PMM monitoring moves to the monitoring contract (with PMM parameters decoded through the contract and the postgresql and pgbouncer component types declared), and instance status reports facts instead of a single phase. These come from OpenEverest 2.0.0-alpha.1 — review its [upgrade notes](https://github.com/openeverest/openeverest/releases/tag/v2.0.0-alpha.1) before upgrading.

To learn more, visit the [Percona PostgreSQL provider v0.7.0 release notes](https://github.com/openeverest/provider-percona-postgresql/releases/tag/v0.7.0).

<!-- release-key: openeverest/provider-percona-postgresql@v0.7.0 -->
