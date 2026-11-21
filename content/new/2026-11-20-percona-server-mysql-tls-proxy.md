---
title: "Percona Server for MySQL provider now supports TLS and custom HAProxy configuration"
date: 2026-11-20T14:45:24
draft: false
topics:
 - mysql
 - percona
 - releases
link: https://github.com/openeverest/provider-percona-server-mysql/releases/tag/v0.3.0
summary: The Percona Server for MySQL provider adds TLS support, HAProxy customization, admission validation, and proxy and engine exposure in the UI.
---

The Percona Server for MySQL provider v0.3.0 is built for OpenEverest 2.0.0-alpha.1 and rounds out the MySQL control plane.

Clusters can now run with TLS, and the HAProxy layer accepts custom configuration, so traffic-shaping tweaks that used to require overlaying the proxy can be declared on the instance. The proxy gains its own UI exposure alongside engine exposure, and monitoring is aligned with the latest OpenEverest release.

Validation is served as an admission webhook with precise field paths: invalid instances are rejected at apply time instead of failing during reconciliation.

**Breaking changes:** backup storages are rendered through backup storage classes, and presets move to ClusterInstancePresets. These come from OpenEverest 2.0.0-alpha.1 — review its [upgrade notes](https://github.com/openeverest/openeverest/releases/tag/v2.0.0-alpha.1) before upgrading.

This release marks @chilagrow's and @spron-in's first contributions to the provider — thank you!

To learn more, visit the [Percona Server for MySQL provider v0.3.0 release notes](https://github.com/openeverest/provider-percona-server-mysql/releases/tag/v0.3.0).

<!-- release-key: openeverest/provider-percona-server-mysql@v0.3.0 -->
