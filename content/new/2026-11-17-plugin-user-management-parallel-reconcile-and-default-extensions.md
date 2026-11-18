---
title: "User Management plugin adds faster, parallel instance reconciliation and enables amcheck and pg_buffercache by default"
date: 2026-11-17T13:37:36
draft: false
topics:
 - postgresql
 - user-management
 - releases
link: https://github.com/openeverest/plugin-user-management/releases/tag/v0.2.6
summary: Database instances now reconcile in parallel with correct user ownership, and the amcheck and pg_buffercache extensions are allowed without chart overrides.
---

The OpenEverest User Management plugin now reconciles database instances in
parallel, meaning user, role, and permission changes apply across instances
noticeably faster on deployments with many databases. Alongside this, users
are now claimed before they are declared, fixing a race that could briefly
misattribute a user during reconciliation.

The plugin's default Helm chart also now allows the `amcheck` and
`pg_buffercache` PostgreSQL extensions by default, so they can be enabled on
instances directly instead of requiring a custom chart values override —
handy for consistency checks and buffer-cache analysis.

Both changes are available in plugin-user-management 0.2.6, with images for
linux/amd64 and linux/arm64. To learn more, visit the
[release notes](https://github.com/openeverest/plugin-user-management/releases/tag/v0.2.6).

<!-- release-key: openeverest/plugin-user-management@v0.2.6 -->
