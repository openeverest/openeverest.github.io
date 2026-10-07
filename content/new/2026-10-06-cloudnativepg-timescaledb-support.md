---
title: "CloudNativePG provider now supports TimescaleDB extension"
date: 2026-10-06T09:35:19Z
draft: false
topics:
  - postgresql
  - cloudnativepg
  - timescaledb
  - releases
link: https://github.com/AdityaPimpalkar/provider-cloudnative-pg/releases/tag/v0.3.0
summary: The CloudNativePG provider now supports the TimescaleDB extension for time-series workloads on PostgreSQL 18.
---

The CloudNativePG provider now supports TimescaleDB OSS, enabling time-series data workloads directly inside your PostgreSQL clusters.

You can enable TimescaleDB via `parameters.extensions.timescaledb.enabled`. The extension is deployed using Kubernetes ImageVolume and is currently supported on PostgreSQL 18 only. Once enabled, the toggle is one-way for data safety. The configuration defaults to `timescaledb.telemetry_level=off` and `max_locks_per_transaction=128`.

An example configuration is available in `examples/instance-timescaledb.yaml`. Learn more in the provider repository and release notes.
