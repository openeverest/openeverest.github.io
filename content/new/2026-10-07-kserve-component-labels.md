---
title: "KServe provider now surfaces component pod status in the UI"
date: 2026-10-07T12:36:20Z
draft: false
topics:
 - kserve
 - observability
 - releases
link: https://docs.openeverest.io/
summary: KServe component pods are now labeled so OpenEverest can display accurate per-component health status.
---

The OpenEverest KServe provider now labels component pods based on the selectors in `status.components`. This lets the platform surface accurate per-component status in the cluster UI, so you can see at a glance whether model serving pods are healthy.

Previously, the UI lacked granular pod-level visibility into KServe components, making it harder to troubleshoot model serving issues.

Component status labels are live now for all KServe clusters managed through OpenEverest. To learn more, visit the [KServe provider documentation](https://docs.openeverest.io/).
