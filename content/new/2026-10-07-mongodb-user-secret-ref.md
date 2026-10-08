---
title: "MongoDB provider now supports user-managed secrets for database credentials"
date: 2026-10-07T12:06:25Z
draft: false
topics:
 - mongodb
 - security
 - releases
link: https://docs.openeverest.io/
summary: The MongoDB provider now supports referencing user-managed Kubernetes secrets for database credentials via userSecretRef.
---

The OpenEverest MongoDB provider now supports `userSecretRef`, letting you bring your own Kubernetes secret for database credentials instead of relying on system-generated passwords. This makes credential rotation, secret injection via external vaults, and compliance workflows easier to manage.

Previously, MongoDB credentials were always generated and managed by the provider, which limited integration with existing secret management practices.

This feature is available now for all Percona Server for MongoDB clusters managed through OpenEverest. To learn more, visit the [MongoDB provider documentation](https://docs.openeverest.io/).
