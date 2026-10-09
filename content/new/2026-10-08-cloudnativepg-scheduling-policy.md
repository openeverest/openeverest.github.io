---
title: "CloudNativePG provider now applies your scheduling policy to database clusters"
date: 2026-10-08T07:12:59Z
draft: false
topics:
 - cloudnativepg
 - postgresql
 - releases
link: https://github.com/AdityaPimpalkar/provider-cloudnative-pg/releases/tag/v0.3.1
summary: The engine scheduling policy you set in OpenEverest is now applied to the CloudNativePG Cluster, so database pods land on the nodes you expect.
---

The CloudNativePG provider now applies the engine scheduling policy configured
in OpenEverest directly to the CloudNativePG Cluster resource. Database pods
are placed on the nodes you intend, consistent with the rest of your deployment.

Previously, scheduling settings made in OpenEverest were not passed through to
the CloudNativePG Cluster, leaving pod placement to cluster defaults.

To learn more, visit the
[release notes](https://github.com/AdityaPimpalkar/provider-cloudnative-pg/releases/tag/v0.3.1).
