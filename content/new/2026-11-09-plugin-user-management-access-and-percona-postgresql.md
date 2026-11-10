---
title: "User Management plugin: per-database access and Percona PostgreSQL support"
date: 2026-11-09T09:36:44Z
draft: false
topics:
 - percona-postgresql
 - plugins
 - security
 - releases
link: https://github.com/openeverest/plugin-user-management/releases/tag/v0.2.2
summary: The User Management plugin v0.2.2 adds per-database access control for PostgreSQL and extends support to Percona PostgreSQL clusters.
---

The User Management plugin v0.2.2 lands two upgrades in one release: finer-grained access control for PostgreSQL, and support for a new engine.

Per-database access control: a new `InstanceDatabase` resource declares a database and its owner, and users can now be granted `read` or `readWrite` scoped to a single database instead of the whole instance. `CONNECT` on each `InstanceDatabase` is restricted to explicitly granted users, and PostgreSQL extensions can be enabled per database rather than per instance. All of it is surfaced in a new Access tab in the UI, which groups Users and Databases in one place.

Percona PostgreSQL support: the plugin can now manage users and roles on Percona PostgreSQL clusters the same way as on any other supported engine — no more out-of-band administration for those clusters.

To learn more, visit the [release notes](https://github.com/openeverest/plugin-user-management/releases/tag/v0.2.2).

<!-- release-key: openeverest/plugin-user-management@v0.2.2 -->
