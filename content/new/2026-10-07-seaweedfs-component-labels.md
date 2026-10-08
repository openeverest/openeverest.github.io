---
title: "SeaweedFS provider now surfaces component pod status in the UI"
date: 2026-10-07T12:10:36Z
draft: false
topics:
 - seaweedfs
 - observability
 - releases
link: https://docs.openeverest.io/
summary: SeaweedFS component pods are now labeled so OpenEverest can display accurate per-component health status.
---

The OpenEverest SeaweedFS provider now labels component pods according to the selectors in `status.components`. This lets the platform surface accurate per-component status in the cluster UI, so you can see at a glance whether master, volume, or filer pods are healthy.

Previously, the UI lacked granular pod-level visibility into SeaweedFS components, making it harder to pinpoint which part of the storage layer was experiencing issues.

Component status labels are live now for all SeaweedFS clusters managed through OpenEverest. To learn more, visit the [SeaweedFS provider documentation](https://docs.openeverest.io/).
