---
title: "Percona Server for MongoDB provider now supports TLS and native metrics"
date: 2026-10-26T05:47:27
draft: false
topics:
 - mongodb
 - security
 - releases
link: https://github.com/openeverest/provider-percona-server-mongodb/releases/tag/v0.5.0
summary: The Percona Server for MongoDB provider can now configure TLS with cert-manager and expose metrics directly to Prometheus or VictoriaMetrics.
---

The Percona Server for MongoDB provider (v0.5.0) now supports configuring TLS for your clusters — mode, certificates, and a cert-manager issuer — directly through OpenEverest.

The same release adds native metrics exposure for Prometheus and VictoriaMetrics, and Percona Monitoring and Management (PMM) is now optional rather than required for monitoring. Together these changes let you secure database traffic and wire up metrics with the stack you already run, without leaving OpenEverest.

TLS configuration and metrics exposure are available in provider v0.5.0. To learn more, visit the [release notes](https://github.com/openeverest/provider-percona-server-mongodb/releases/tag/v0.5.0).
