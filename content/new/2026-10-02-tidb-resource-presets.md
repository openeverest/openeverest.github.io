---
title: "TiDB provider adds resource presets for simplified cluster configuration"
date: 2026-10-02T13:48:04
draft: false
topics:
 - tidb
 - configuration
 - releases
link: https://github.com/openeverest/provider-tidb/releases/tag/v0.1.4
summary: Deploy TiDB clusters faster with pre-configured resource size presets that eliminate manual CPU and memory tuning.
---

The TiDB provider now includes resource presets, letting you choose a pre-configured size profile instead of manually specifying CPU, memory, and storage for each cluster component.

Previously, setting up a TiDB cluster required sizing each component — TiDB, TiKV, and PD — individually. With presets, you can select a profile that fits your workload and have all resources provisioned consistently.

Resource presets are available now when creating a new TiDB cluster through the OpenEverest UI. To learn more, visit the [TiDB provider release notes](https://github.com/openeverest/provider-tidb/releases/tag/v0.1.4).
