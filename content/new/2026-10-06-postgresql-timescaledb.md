---
title: "PostgreSQL provider now supports TimescaleDB extension"
date: 2026-10-06T09:35:19Z
draft: false
topics:
 - postgresql
 - timescaledb
 - extensions
 - releases
link: https://github.com/AdityaPimpalkar/provider-cloudnative-pg/releases/tag/v0.3.0
summary: Enable TimescaleDB OSS on PostgreSQL 18 clusters directly through the OpenEverest provider.
---

The CloudNative PostgreSQL provider now supports the TimescaleDB extension, letting you run time-series workloads on PostgreSQL 18 clusters managed by OpenEverest.

Enable it via `parameters.extensions.timescaledb.enabled` in your instance spec. The extension is deployed using Kubernetes ImageVolume and defaults to telemetry-off for privacy. Once enabled, it cannot be disabled without recreating the cluster.

To get started, see the `examples/instance-timescaledb.yaml` in the provider repository.
