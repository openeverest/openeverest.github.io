---
title: "ClickHouse provider replaces create-or-update with server-side apply"
date: 2026-10-07T14:36:36Z
draft: false
topics:
 - clickhouse
 - releases
link: https://docs.openeverest.io/
summary: The ClickHouse provider now uses Kubernetes server-side apply to reconcile Custom Resources reliably during cluster merges.
---

The OpenEverest ClickHouse provider now uses Kubernetes server-side apply when reconciling ClickHouse Installation (CHI) and Keeper (CHK) resources. This eliminates race conditions during updates and ensures that cluster changes are merged predictably instead of overwritten.

Previously, the provider relied on a create-or-update pattern that could drop fields or conflict with concurrent changes, particularly when operators and the platform both modified the same resource.

Server-side apply is live now for all ClickHouse clusters managed through OpenEverest. To learn more, visit the [ClickHouse provider documentation](https://docs.openeverest.io/).
