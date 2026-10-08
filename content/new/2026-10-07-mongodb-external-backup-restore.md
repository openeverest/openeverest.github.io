---
title: "MongoDB provider adds restore from external backups"
date: 2026-10-07T12:06:25Z
draft: false
topics:
 - mongodb
 - backups
 - releases
link: https://docs.openeverest.io/
summary: The MongoDB provider now supports importing and restoring from external backups, enabling migration from other environments.
---

The OpenEverest MongoDB provider now supports importing backups created outside of OpenEverest and restoring them into a new cluster. You can seed a fresh MongoDB instance from an external backup source, making migrations and disaster recovery more flexible.

Previously, restoring a MongoDB cluster in OpenEverest required a backup that was already created and stored by the platform, which limited options for onboarding existing datasets.

Backup import and external restore are available now for Percona Server for MongoDB clusters. To learn more, visit the [MongoDB provider documentation](https://docs.openeverest.io/).
