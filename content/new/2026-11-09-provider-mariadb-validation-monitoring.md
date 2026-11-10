---
title: "MariaDB provider adds admission-time validation and ServiceMonitor support"
date: 2026-11-09T10:37:14Z
draft: false
topics:
 - mariadb
 - monitoring
 - configuration
 - releases
link: https://github.com/openeverest/provider-mariadb/releases/tag/v0.2.2
summary: MariaDB resources are now validated by an admission webhook with precise field paths, and the chart honours serviceMonitor.enabled for Prometheus monitoring.
---

The MariaDB provider now validates resources through an admission webhook that reports errors with exact field paths, so misconfigured MariaDB resources are rejected at apply time with errors that point straight to the offending field.

The same release also honours `serviceMonitor.enabled` in the Helm chart — enabling it now creates a Prometheus ServiceMonitor for MariaDB instances, wiring the provider into your existing Prometheus monitoring with a single value.

Both improvements are available in provider-mariadb v0.2.2. To learn more, visit the [release notes](https://github.com/openeverest/provider-mariadb/releases/tag/v0.2.2).
