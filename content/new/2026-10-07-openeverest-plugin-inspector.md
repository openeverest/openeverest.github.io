---
title: "Inspector plugin shows the pods behind every database"
date: 2026-10-07T15:48:11Z
draft: false
topics:
 - plugins
 - ui
 - releases
link: https://github.com/openeverest/plugin-inspector/releases/tag/v0.1.0
summary: A new plugin adds an Inspector tab to database pages with pod status, live logs and kubectl-describe-style details.
---

When an instance isn't healthy, the next question is usually "which pod, and why?" The [Inspector plugin](https://github.com/openeverest/plugin-inspector) v0.1.0 answers it without leaving OpenEverest. It adds an **Inspector** tab to Instance pages that shows the pods behind the instance as a diagram or a table, with their status, readiness, restarts and the node each one runs on.

From there you can stream or tail container logs, or open a describe view with containers, conditions and events, much like `kubectl describe pod`. Access follows OpenEverest RBAC: the plugin looks up the instance as the signed-in user, so people only see pods of instances they're allowed to read.

Inspector works with any provider. It finds pods through the component selectors that [OpenEverest v2.0.0-dev.4](https://github.com/openeverest/openeverest/releases/tag/v2.0.0-dev.4) now publishes in `status.components`, and falls back to the `app.kubernetes.io/instance` label for providers that don't report them yet. Install it from the [Extension Hub](https://openeverest.io/documentation/2.0.0-dev.4/extend/hub.html), or run `helm install plugin-inspector oci://ghcr.io/openeverest/charts/plugin-inspector --version 0.1.0 -n everest-system`.
