---
title: "KServe provider now cleans up controller-held objects on uninstall"
date: 2026-10-09T11:44:08Z
draft: false
topics:
 - kserve
 - kubernetes
 - releases
link: https://github.com/openeverest/provider-kserve/releases/tag/v0.2.4
summary: Uninstalling the KServe provider no longer leaves controller-held objects behind in the cluster.
---

The KServe provider now removes the objects it holds — such as controller-managed
resources and deployments — when the provider is uninstalled with Helm.

Previously, uninstalling the chart could leave controller-held objects behind in
`everest-system`, requiring manual cleanup before a reinstall or upgrade.

To learn more, visit the [v0.2.4 release notes](https://github.com/openeverest/provider-kserve/releases/tag/v0.2.4).
