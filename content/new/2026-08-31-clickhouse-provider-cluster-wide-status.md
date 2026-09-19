---
title: "ClickHouse provider now runs in cluster-wide mode with proper status tracking"
date: 2026-08-31T18:12:35Z
draft: false
topics:
 - clickhouse
 - kubernetes
 - releases
link: https://github.com/openeverest/provider-altinity-clickhouse/releases/tag/v0.1.1
summary: The Altinity ClickHouse provider now runs in cluster-wide mode and reports accurate instance status, including health and readiness conditions.
---

The Altinity ClickHouse provider now runs in cluster-wide mode and reports accurate instance status through Kubernetes conditions, giving you reliable health and readiness signals for your ClickHouse clusters.

Previously, the operator was limited to a single namespace, and status reporting was minimal — you could not tell whether a cluster was fully ready, partially degraded, or still provisioning without inspecting individual pods. Now the operator watches instances across all namespaces and updates the standard OpenEverest status conditions with precise health information.

This makes the ClickHouse provider suitable for shared clusters and gives the OpenEverest UI and API accurate data for dashboards, alerts, and automated health checks.

Upgrade the Altinity ClickHouse provider to version 0.1.1 via Helm to use cluster-wide mode and status tracking.
