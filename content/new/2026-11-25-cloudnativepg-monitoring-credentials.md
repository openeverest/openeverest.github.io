---
title: "CloudNativePG provider now exposes monitor credentials and connections"
date: 2026-11-25T14:46:19Z
draft: false
topics:
 - postgresql
 - cloudnativepg
 - monitoring
 - releases
link: https://github.com/openeverest/provider-cloudnative-pg/releases/tag/v0.4.3
summary: The CloudNativePG provider can now publish the monitor credential and its connection endpoints as an experimental monitoring feature.
---

The OpenEverest CloudNativePG provider now exposes the monitoring credential and
its connection details for PostgreSQL clusters, letting external monitoring
tools connect without hand-crafted secrets or manual secret hunting.

Previously, wiring a metrics scraper to a CloudNativePG cluster meant
reconstructing the monitoring user's credentials by hand. The provider now
publishes both the credential and the connection endpoints so monitoring
integrations can consume them directly.

This capability is currently an experiment and may change before becoming
generally available. To learn more, visit the
[provider-cloudnative-pg release notes](https://github.com/openeverest/provider-cloudnative-pg/releases/tag/v0.4.3).

<!-- release-key: openeverest/provider-cloudnative-pg@v0.4.3 -->