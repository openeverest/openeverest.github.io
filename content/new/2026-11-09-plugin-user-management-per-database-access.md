---
title: "User Management plugin introduces per-database access control"
date: 2026-11-09T09:36:44Z
draft: false
topics:
 - percona-postgresql
 - plugins
 - security
 - releases
link: https://github.com/openeverest/plugin-user-management/releases/tag/v0.2.2
summary: Declare databases and owners with InstanceDatabase, grant per-database read and readWrite roles, restrict CONNECT, and enable extensions — all from a new Access tab.
---

The User Management plugin v0.2.2 adds per-database access control for PostgreSQL. A new `InstanceDatabase` resource declares a database and its owner, and users can now be granted `read` or `readWrite` scoped to a single database instead of the whole instance.

The plugin also restricts `CONNECT` on each `InstanceDatabase` to explicitly granted users, and lets you enable PostgreSQL extensions per database rather than per instance.

All of this is surfaced in a new Access tab in the UI, which groups Users and Databases in one place. To learn more, visit the [release notes](https://github.com/openeverest/plugin-user-management/releases/tag/v0.2.2).
