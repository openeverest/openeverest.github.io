---
title: "OpenEverest now supports Coroot for infrastructure monitoring"
date: 2026-11-18T14:20:09
draft: false
topics:
 - coroot
 - monitoring
 - releases
link: https://github.com/openeverest/monitoring-coroot/releases/tag/v0.1.0
summary: Coroot is now available as an OpenEverest MonitoringClass, giving you automated infrastructure and application monitoring from the same declarative API.
---

OpenEverest now supports Coroot as a managed monitoring engine: declare a
Coroot MonitoringClass and a dedicated controller provisions and reconciles
the instance, giving you Coroot's automated infrastructure and application
monitoring — dashboards, traces, and metrics with zero manual instrumentation
— from the same declarative API you use for everything else.

Coroot instances require backing MongoDB and PostgreSQL databases, so make
sure both are available to the controller before creating a class.
MonitoringClasses are claimed by matching `controllerName`, which lets this
component run alongside other OpenEverest monitoring controllers in one
installation without conflicts.

The component ships as a multi-arch image (linux/amd64 and linux/arm64) and a
Helm chart in the OpenEverest OCI registry, installed with a single Helm
command. Thanks to first-time contributions from @spron-in and @recharte. To
learn more, visit the
[release page](https://github.com/openeverest/monitoring-coroot/releases/tag/v0.1.0).

<!-- release-key: openeverest/monitoring-coroot@v0.1.0 -->
