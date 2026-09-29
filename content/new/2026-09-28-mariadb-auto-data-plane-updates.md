---
title: "MariaDB provider introduces automatic data-plane updates"
date: 2026-09-28T09:23:34Z
draft: false
topics:
 - mariadb
 - upgrades
 - releases
link: https://github.com/openeverest/provider-mariadb/releases/tag/v0.1.6
summary: Automatic data-plane updates keep MariaDB clusters current without manual intervention.
---

The MariaDB provider now supports automatic data-plane updates, running `mariadb-upgrade` automatically when the operator version changes. This ensures your clusters stay current without requiring manual upgrade steps.

Previously, operators had to run `mariadb-upgrade` manually after updating the operator, which was easy to miss and could leave system tables out of sync with the new server version.

Update to provider-mariadb v0.1.6 to enable automatic data-plane updates. The upgrade runs automatically on the next operator reconciliation.
