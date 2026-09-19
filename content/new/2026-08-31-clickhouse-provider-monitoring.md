---
title: "ClickHouse provider now integrates with OpenEverest monitoring"
date: 2026-08-31T18:12:35Z
draft: false
topics:
 - clickhouse
 - monitoring
 - releases
link: https://github.com/openeverest/provider-altinity-clickhouse/releases/tag/v0.1.1
summary: The Altinity ClickHouse provider now supports OpenEverest's built-in monitoring integration, automatically exposing metrics for collection.
---

The Altinity ClickHouse provider now supports OpenEverest's built-in monitoring integration, automatically exposing metrics for collection by the platform's monitoring stack.

Previously, monitoring a ClickHouse instance required manual configuration of scrape endpoints and metric exporters outside of OpenEverest. Now the provider declares its monitoring capability through the standard OpenEverest provider interface, so metrics are discovered and collected automatically when monitoring is enabled on the instance.

This gives you out-of-the-box visibility into query performance, resource usage, and replication health without additional setup.

Upgrade the Altinity ClickHouse provider to version 0.1.1 via Helm to enable automatic monitoring integration.
