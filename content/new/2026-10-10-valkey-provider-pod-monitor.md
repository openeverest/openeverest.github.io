---
title: "Valkey provider brings built-in Prometheus monitoring"
date: 2026-10-10T10:08:17
draft: false
topics:
 - valkey
 - monitoring
 - releases
link: https://github.com/openeverest/provider-valkey/releases/tag/v0.1.8
summary: Valkey instances can now create a Prometheus PodMonitor automatically, so metrics scraping works out of the box.
---

The OpenEverest Valkey provider can now create a Prometheus PodMonitor for each instance, streamlining monitoring for Valkey deployments.

Previously, setting up metrics collection meant writing and maintaining your own scrape configuration for every instance. With the new podMonitor resource, instances integrate with the Prometheus Operator automatically, so metrics are collected without extra setup.

The PodMonitor option is available with provider-valkey v0.1.8. To learn more, visit the [provider-valkey release notes](https://github.com/openeverest/provider-valkey/releases/tag/v0.1.8).
