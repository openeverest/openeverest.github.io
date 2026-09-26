---
title: "Percona PostgreSQL provider now supports custom configuration"
date: 2026-09-25T10:04:07
draft: false
topics:
 - percona-postgresql
 - postgresql
 - configuration
 - releases
link: https://github.com/openeverest/provider-percona-postgresql/releases/tag/v0.3.0
summary: The Percona PostgreSQL provider now exposes a custom configuration field, letting operators tune database settings directly from the OpenEverest UI or API.
---

The Percona PostgreSQL provider now supports custom configuration, letting you tune PostgreSQL runtime settings directly in the instance spec without editing raw YAML or running manual commands.

Previously, adjusting parameters like `max_connections`, `shared_buffers`, or `wal_level` required either post-provisioning scripts or direct database access. These settings can now be declared in the OpenEverest UI or API and are applied automatically through the Percona Operator.

Custom configuration is available now in Percona PostgreSQL provider v0.3.0. Update the provider via Helm or the Extension Hub to use it.
