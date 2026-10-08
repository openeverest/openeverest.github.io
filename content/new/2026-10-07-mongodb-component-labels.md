---
title: "MongoDB provider now delivers component status through labeled pod selectors"
date: 2026-10-07T12:06:25Z
draft: false
topics:
 - mongodb
 - observability
 - releases
link: https://docs.openeverest.io/
summary: MongoDB component pods are now labeled so OpenEverest can surface accurate component status directly in the UI.
---

The OpenEverest MongoDB provider now labels component pods according to the selectors defined in `status.components`. This lets the platform surface accurate per-component status in the cluster UI, so you can see at a glance whether mongod, mongos, or cfg server pods are healthy.

Previously, the UI lacked granular pod-level visibility into MongoDB components, making it harder to distinguish between a partial replica set issue and a fully healthy cluster.

Component status labels are live now for all Percona Server for MongoDB clusters managed through OpenEverest. To learn more, visit the [MongoDB provider documentation](https://docs.openeverest.io/).
