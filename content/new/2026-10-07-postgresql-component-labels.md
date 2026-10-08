---
title: "PostgreSQL provider now delivers component pod status in the UI"
date: 2026-10-07T12:06:01Z
draft: false
topics:
 - postgresql
 - observability
 - releases
link: https://docs.openeverest.io/
summary: PostgreSQL component pods are now labeled so OpenEverest can surface accurate per-component health status.
---

The OpenEverest PostgreSQL provider now labels component pods according to the selectors defined in `status.components`. This lets the platform surface accurate per-component status in the cluster UI, so you can see at a glance whether PostgreSQL or PgBouncer pods are healthy.

Previously, the UI lacked granular pod-level visibility into PostgreSQL components, making it harder to distinguish between a partial connection pool issue and a fully healthy cluster.

Component status labels are live now for all PostgreSQL clusters managed through OpenEverest. To learn more, visit the [PostgreSQL provider documentation](https://docs.openeverest.io/).
