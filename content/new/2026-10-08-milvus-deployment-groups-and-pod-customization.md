---
title: "Milvus deployment groups and per-component pod customization"
date: 2026-10-08T19:44:51Z
draft: false
topics:
 - milvus
 - releases
link: https://github.com/openeverest/provider-milvus/releases/tag/v0.1.1
summary: Place Milvus components on separate node pools with deployment groups, and fine-tune each component's pod settings via parameters.pod.
---

The Milvus provider now lets you split Milvus components across node pools with
deployment groups, and customize individual component pods through
`parameters.pod`.

Together, these controls let you keep storage-heavy components on
storage-optimized nodes, GPU components on GPU nodes, and tune resources per
component — all from the usual OpenEverest deployment parameters.

To learn more, visit the
[release notes](https://github.com/openeverest/provider-milvus/releases/tag/v0.1.1).
