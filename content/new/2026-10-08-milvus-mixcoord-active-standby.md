---
title: "Milvus provider can now run multi-replica MixCoord in active-standby"
date: 2026-10-08T19:44:51Z
draft: false
topics:
 - milvus
 - releases
link: https://github.com/openeverest/provider-milvus/releases/tag/v0.1.1
summary: Multi-replica MixCoord deployments now run in active-standby mode, keeping coordination available if a replica fails.
---

The Milvus provider now runs multi-replica MixCoord as active-standby. When you
deploy more than one MixCoord replica, one stays active while the others stand
by, so a replica failure no longer interrupts cluster coordination.

Previously, multi-replica MixCoord did not provide this failover behaviour.

To learn more, visit the
[release notes](https://github.com/openeverest/provider-milvus/releases/tag/v0.1.1).
