---
title: "OpenEverest adds a pod placement editor with explicit scheduling defaults"
date: 2026-10-07T13:48:21Z
draft: false
topics:
 - openeverest
 - scheduling
 - kubernetes
 - releases
link: https://openeverest.io/documentation/2.0.0-dev.4/
summary: The instance creation wizard and overview can now edit each component's affinity rules, and scheduling defaults are explicit: omitted fields use the provider default, empty values mean none.
---

The instance creation wizard and the instance overview now include a pod placement editor for each component's affinity rules. A provider enables the editor from its UI schema with `widgetType: podSchedulingPolicy`.

Scheduling defaults are now explicit: omitting `affinity` or `topologySpreadConstraints` gets the provider's default, while an empty value (`{}` / `[]`) means none. The MongoDB and MySQL providers now place each data-bearing member on its own node, so a three-member cluster needs three schedulable nodes unless you set `affinity: {}`. A cluster that is too small shows up as `PodsScheduled=False` instead of quietly doubling up on one node.

The placement editor and explicit defaults are available in OpenEverest 2.0.0 Developer Preview 4. To learn more, visit the [documentation](https://openeverest.io/documentation/2.0.0-dev.4/).

<!-- release-key: openeverest/openeverest@v2.0.0-dev.4 -->