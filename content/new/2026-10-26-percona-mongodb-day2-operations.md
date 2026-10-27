---
title: "Percona Server for MongoDB provider gains day-2 operations controls and MongoDB 8.0"
date: 2026-10-26T05:47:27
draft: false
topics:
 - mongodb
 - releases
link: https://github.com/openeverest/provider-percona-server-mongodb/releases/tag/v0.5.0
summary: Provider v0.5.0 adds richer backup imports, UI schema validation, per-component sharded resource grouping, affinity scheduling, and MongoDB 8.0.32 as the default.
---

The Percona Server for MongoDB provider (v0.5.0) ships a set of day-2 operations improvements:

- Importing a backup now populates version, backup type, and topology from the backup metadata.
- Provider schema is validated in the UI, catching misconfigurations before they reach the cluster.
- Sharded resources are grouped per component, and pod scheduling policies (affinity) can be edited in the UI.
- MongoDB 8.0.32 is now the default engine version, with 7.0.43 and 6.0.29 also available.

These controls are available in provider v0.5.0. To learn more, visit the [release notes](https://github.com/openeverest/provider-percona-server-mongodb/releases/tag/v0.5.0).
