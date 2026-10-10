---
title: "The KServe provider now cleans up controller-held objects on uninstall"
date: 2026-10-09T11:44:08
draft: false
topics:
  - kserve
  - releases
link: https://github.com/openeverest/provider-kserve/releases/tag/v0.2.4
summary: Uninstalling the KServe provider now removes the objects its controller holds, so no leftover resources remain in the cluster.
---

The KServe provider now cleans up the objects its controller holds when it is
uninstalled, so removing the provider from a cluster no longer leaves leftover
resources behind.

Previously, controller-held objects could remain in the cluster after an
uninstall and require manual cleanup before the provider could be reinstalled.

To learn more, visit the
[provider-kserve v0.2.4 release](https://github.com/openeverest/provider-kserve/releases/tag/v0.2.4).
