---
title: "OpenEverest introduces Percona PMM monitoring with TLS-secured destinations"
date: 2026-11-18T14:20:27
draft: false
topics:
 - pmm
 - monitoring
 - releases
link: https://github.com/openeverest/monitoring-pmm/releases/tag/v0.1.0
summary: Percona Monitoring and Management is now available as an OpenEverest MonitoringClass, with configurable authentication and TLS on monitoring destinations.
---

OpenEverest introduces a Percona PMM (Monitoring and Management) monitoring
component: declare a PMM MonitoringClass and a dedicated controller provisions
the instance into the Everest system namespace, installed with a single Helm
command.

Monitoring destinations support configurable authentication modes and TLS,
so PMM clients can ship metrics to secured endpoints without manual
certificate handling — and the component publishes an integration contract
module, giving other OpenEverest components a stable, typed interface for
registering themselves as PMM monitoring targets.

MonitoringClasses are claimed by matching `controllerName`, letting this
component coexist with the other OpenEverest monitoring controllers in the
same installation.

The component ships as a multi-arch image (linux/amd64 and linux/arm64) and a
Helm chart in the OpenEverest OCI registry. Thanks to first-time contributions
from @recharte and @spron-in. To learn more, visit the
[release page](https://github.com/openeverest/monitoring-pmm/releases/tag/v0.1.0).

<!-- release-key: openeverest/monitoring-pmm@v0.1.0 -->
