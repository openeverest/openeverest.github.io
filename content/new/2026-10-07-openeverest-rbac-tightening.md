---
title: "OpenEverest tightens RBAC for backups, restores, and connection credentials"
date: 2026-10-07T13:48:21Z
draft: false
topics:
 - openeverest
 - security
 - rbac
 - releases
link: https://openeverest.io/documentation/2.0.0-dev.4/
summary: Backup and restore grants now follow the owning instance, reading instance credentials needs a new read-connection action, and previously unguarded restore endpoints are now protected.
---

OpenEverest 2.0.0 Developer Preview 4 tightens role-based access control. Grants for `backups` and `restores` now match the owning instance — `<cluster>/<namespace>/<instance>` — instead of the backup's or restore's own name. Reading instance credentials (`.../instances/{instance}/connection`) now requires the new `read-connection` action; `read` no longer covers it.

The release also fixes two gaps found in the preview: the restore endpoints previously enforced no RBAC at all, and read-only roles could read instance connection credentials. Policies that use unknown action names are now rejected rather than silently accepted.

Administrators should update their RBAC policies when moving to Developer Preview 4. Known issue: read-only users see a `403` error on the instance page until the UI checks `read-connection`. To learn more, visit the [documentation](https://openeverest.io/documentation/2.0.0-dev.4/).

<!-- release-key: openeverest/openeverest@v2.0.0-dev.4 -->