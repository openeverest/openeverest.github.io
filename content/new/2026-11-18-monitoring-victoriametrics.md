---
title: "OpenEverest adds VictoriaMetrics as a managed monitoring engine"
date: 2026-11-18T14:20:38
draft: false
topics:
 - victoriametrics
 - monitoring
 - releases
link: https://github.com/openeverest/monitoring-victoriametrics/releases/tag/v0.1.0
summary: VictoriaMetrics can now run as an OpenEverest MonitoringClass with anonymous or mutual-TLS authentication, installed in one Helm command.
---

OpenEverest now ships a VictoriaMetrics monitoring component, bringing the
VictoriaMetrics stack under the MonitoringClass model: declare the class, and
a dedicated controller provisions and reconciles the engine for you, installed
with a single Helm command into the Everest system namespace.

Like the other OpenEverest monitoring components, it supports an anonymous
authentication mode for network-isolated setups and uses the shared TLS
configuration shape, so certificates are handled consistently across engines.
For targets that require it, the controller presents the client certificate of
mutual-TLS metrics endpoints, letting VictoriaMetrics scrape mTLS-protected
workloads without extra wiring.

MonitoringClasses are claimed by matching `controllerName`, so this component
coexists cleanly with other monitoring controllers in the same installation.

The component ships as a multi-arch image (linux/amd64 and linux/arm64) with a
Helm chart in the OpenEverest OCI registry. Thanks to first-time contributions
from @recharte and @spron-in. To learn more, visit the
[release page](https://github.com/openeverest/monitoring-victoriametrics/releases/tag/v0.1.0).

<!-- release-key: openeverest/monitoring-victoriametrics@v0.1.0 -->
