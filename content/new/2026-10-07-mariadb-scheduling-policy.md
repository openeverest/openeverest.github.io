---
title: "MariaDB provider gets the pod scheduling editor"
date: 2026-10-07T14:15:49Z
draft: false
topics:
 - mariadb
 - scheduling
 - releases
link: https://github.com/openeverest/provider-mariadb/releases/tag/v0.1.7
summary: MariaDB instances now honour node selectors, tolerations, affinity and topology spread constraints, all editable from a new pod scheduling section in the UI.
---

Placing MariaDB pods is now part of the instance form. In the [MariaDB provider](https://github.com/openeverest/provider-mariadb) v0.1.7, the old free-text **Node targeting** field is replaced by a **Pod scheduling policy** section under **Advanced**. It uses the scheduling editor that shipped in [OpenEverest v2.0.0-dev.4](https://github.com/openeverest/openeverest/releases/tag/v2.0.0-dev.4). From there you can pin MariaDB to a node pool, tolerate its taints, and spread replicas across nodes or zones.

The engine's `schedulingPolicy` now reaches the MariaDB resource in full. Before this release, the API accepted `nodeSelector`, `tolerations` and `topologySpreadConstraints` but the provider silently dropped them. The MaxScale proxy takes its own `schedulingPolicy` through the API.

Two behaviour changes come with it. The `nodeAffinity` engine parameter is removed, so move those rules to `spec.components.engine.schedulingPolicy.affinity.nodeAffinity`. And on HA topologies, any `affinity` you set now replaces the default soft anti-affinity instead of being merged into it; `affinity: {}` means no constraints at all. The details are in [provider-mariadb#86](https://github.com/openeverest/provider-mariadb/pull/86).
