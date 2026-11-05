---
title: "New Migrations plugin: move databases into OpenEverest"
date: 2026-11-03T14:56:04
draft: false
topics:
 - mongodb
 - plugins
 - releases
link: https://github.com/openeverest/plugin-migrations/releases/tag/v0.1.0
summary: The new Migrations plugin moves existing databases into OpenEverest with minimal downtime. The first engine migrates MongoDB clusters, powered by Percona ClusterSync for MongoDB (PCSM).
---

OpenEverest introduces the Migrations plugin: move existing databases into OpenEverest-managed clusters with minimal downtime, much like a self-hosted data migration service.

A per-migration worker copies the existing data (full load), keeps the target in sync with ongoing changes (CDC), and you trigger cutover when your application is ready to switch.

The plugin is built around an engine architecture, so it is not limited to MongoDB. The first engine, available now, migrates MongoDB clusters: MongoDB to MongoDB, powered by [Percona ClusterSync for MongoDB](https://github.com/percona/percona-clustersync-mongodb) (PCSM). Additional database engines will follow as they are added to the plugin.

The Migrations plugin is available now on the Extension Hub. To learn more, visit the [v0.1.0 release notes](https://github.com/openeverest/plugin-migrations/releases/tag/v0.1.0).
