---
title: "ClickHouse provider delivers a trustworthy Ready status and safer storage changes"
date: 2026-10-21T14:31:36
draft: false
topics:
 - clickhouse
 - releases
link: https://github.com/openeverest/provider-altinity-clickhouse/releases/tag/v0.3.0
summary: Ready now means the operator has fully rolled out the last applied change, and storage growth on non-expanding StorageClasses is rejected up front.
---

The Altinity ClickHouse provider now reports `Ready` only once the operator has rolled out the last change the provider applied, so the status reflects the actual state of the instance rather than a partial rollout.

Storage growth requests are also validated up front: growing storage on a StorageClass that cannot expand volumes is rejected before any change is applied.

These day-2 safety checks are available in provider-altinity-clickhouse 0.3.0. To learn more, see the [release notes](https://github.com/openeverest/provider-altinity-clickhouse/releases/tag/v0.3.0).
