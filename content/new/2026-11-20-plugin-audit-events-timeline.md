---
title: "Audit plugin adds an events timeline with charts, filters, and export"
date: 2026-11-20T15:13:07
draft: false
topics:
 - audit
 - observability
 - releases
link: https://github.com/solanicaio/plugin-audit/releases/tag/v0.2.0
summary: The Audit plugin records events from the Kubernetes cluster events API and adds an events chart, time ranges, filters, and export, aligned with the host UI.
---

The Audit plugin v0.2.0 grows from a plain log into a working observability surface for cluster activity.

The plugin now records events from the Kubernetes cluster events API, so the audit trail captures what the platform and its operators actually did — not just user actions. The audit log UI is aligned with the host application's look and feel, and gains an events chart with selectable time ranges, filters to narrow down what happened, and export for offline analysis or compliance review.

Together these make the plugin a practical answer to "who changed what, and when" across an OpenEverest-managed cluster.

To learn more, visit the [Audit plugin v0.2.0 release notes](https://github.com/solanicaio/plugin-audit/releases/tag/v0.2.0).

<!-- release-key: solanicaio/plugin-audit@v0.2.0 -->
