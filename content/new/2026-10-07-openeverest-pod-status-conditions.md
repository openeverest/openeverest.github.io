---
title: "Instances now report why their pods are not running"
date: 2026-10-07T13:48:21Z
draft: false
topics:
 - openeverest
 - kubernetes
 - instances
 - releases
link: https://openeverest.io/documentation/2.0.0-dev.4/
summary: OpenEverest instances now expose per-component pod status with PodsScheduled and PodsReady conditions, surfaced in the UI and everestctl.
---

OpenEverest instances now say why their pods are not running. The runtime fills `status.components` from each component's pods and sets two conditions: `PodsScheduled` turns `False` once a pod has waited more than a minute for a node, and `PodsReady` names the worst problem — `CrashLoopBackOff`, `ImagePullBackOff`, `CreateContainerConfigError`, or `NotReady`.

Condition messages carry one line per component, for example: "engine: 1 of 3 pods cannot be scheduled: 0/2 nodes are available: 2 node(s) didn't match pod anti-affinity rules." The UI shows a warning banner and icon on affected instances, and `everestctl instance status` gains a `READY` column, so the cause is visible without inspecting pods by hand.

Pod status conditions are available in OpenEverest 2.0.0 Developer Preview 4, for providers that label their pods with `Context.PodLabels()`. The new [Inspector plugin](https://openeverest.io/new/2026-10-07-openeverest-plugin-inspector/) builds on the same `status.components` selectors: it adds an Inspector tab to instance pages that shows the pods behind each instance — readiness, restarts, and the node each runs on — with log streaming and a describe view. To learn more, visit the [documentation](https://openeverest.io/documentation/2.0.0-dev.4/).

<!-- release-key: openeverest/openeverest@v2.0.0-dev.4 -->