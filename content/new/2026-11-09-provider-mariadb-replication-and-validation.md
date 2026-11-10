---
title: "MariaDB provider: replication targets, admission-time validation, and ServiceMonitor"
date: 2026-11-09T10:37:14Z
draft: false
topics:
 - mariadb
 - high-availability
 - monitoring
 - configuration
 - releases
link: https://github.com/openeverest/provider-mariadb/releases/tag/v0.2.2
summary: MariaDB instances can now serve as replication targets, resources are validated at admission time with exact field paths, and the chart can expose Prometheus metrics with one value.
---

provider-mariadb v0.2.2 ships a replication, validation, and monitoring batch: replication into OpenEverest-managed instances, misconfiguration caught at apply time, and a one-line path into Prometheus.

Replication targets: OpenEverest-managed MariaDB instances can now be used as replication targets, so you can replicate into an instance running in your cluster from an external source or another instance. Previously, instances could only act as replication sources, and setting up a managed instance as a target required manual configuration outside OpenEverest.

Admission-time validation and ServiceMonitor: MariaDB resources are now validated through an admission webhook that reports errors with exact field paths, so misconfigured resources are rejected at apply time with errors pointing straight to the offending field. The same release honours `serviceMonitor.enabled` in the Helm chart: enabling it creates a Prometheus ServiceMonitor for MariaDB instances, wiring the provider into your existing monitoring with a single value.

To learn more, visit the [release notes](https://github.com/openeverest/provider-mariadb/releases/tag/v0.2.2).

<!-- release-key: openeverest/provider-mariadb@v0.2.2 -->
