---
title: "Prometheus monitoring is now available for OpenEverest clusters"
date: 2026-11-18T12:26:54
draft: false
topics:
 - prometheus
 - monitoring
 - releases
link: https://github.com/openeverest/monitoring-prometheus/releases/tag/v0.1.0
summary: OpenEverest can now run self-hosted Prometheus as a MonitoringClass, with anonymous or mutual-TLS authentication and a Helm chart for one-command installs.
---

The OpenEverest Prometheus monitoring component is now available, giving you a
fully managed, in-cluster Prometheus through the familiar MonitoringClass
model — installed with a single Helm command and reconciled by a dedicated
controller.

Each Prometheus MonitoringClass you create is claimed by the controller via
its `controllerName`, so multiple monitoring controllers can coexist in one
installation without fighting over the same classes. The controller supports
an anonymous authentication mode for simple, network-isolated setups, and
shares the same TLS configuration shape as the other OpenEverest monitoring
components, so certificates are provisioned consistently across engines.

For stricter environments, the controller presents the client certificate of
mutual-TLS metrics endpoints, letting Prometheus scrape targets that require
mTLS without manual certificate wiring.

The component ships as a multi-arch image (linux/amd64 and linux/arm64) and a
Helm chart hosted in the OpenEverest OCI registry. Thanks to first-time
contributions from @recharte and @spron-in. To learn more, visit the
[release page](https://github.com/openeverest/monitoring-prometheus/releases/tag/v0.1.0).

<!-- release-key: openeverest/monitoring-prometheus@v0.1.0 -->
