---
title: "Valkey provider now supports Valkey 9.1"
date: 2026-10-10T10:08:17
draft: false
topics:
 - valkey
 - releases
link: https://github.com/openeverest/provider-valkey/releases/tag/v0.1.8
summary: New Valkey instances can run Valkey 9.1, and existing 9.0 deployments move to the latest 9.0.6 patch release.
---

The OpenEverest Valkey provider now offers a Valkey 9.1 version bundle, so you can provision new instances running Valkey 9.1.2 directly from the version picker.

The 9.0 bundle has also moved from 9.0.0 to the 9.0.6 patch release, so instances on the 9.0 bundle pick up the latest 9.0 fixes after upgrading the provider. The pinned 9.0.0 entry remains in the catalog, marked deprecated, so existing instances that use it keep working and surface a deprecation condition.

The default bundle for new instances stays on 9.0. To learn more, visit the [provider-valkey release notes](https://github.com/openeverest/provider-valkey/releases/tag/v0.1.8).
