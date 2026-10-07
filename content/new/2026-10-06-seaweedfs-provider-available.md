---
title: "SeaweedFS is now available in OpenEverest"
date: 2026-10-06T15:32:21Z
draft: false
topics:
 - seaweedfs
 - distributed-storage
 - new-provider
 - releases
link: https://github.com/openeverest/provider-seaweedfs/releases/tag/v0.1.1
summary: Initial release brings SeaweedFS distributed object storage support to the OpenEverest platform.
---

OpenEverest now supports SeaweedFS distributed object storage, letting you provision and manage SeaweedFS clusters directly from the platform UI or API.

SeaweedFS is a lightweight, high-performance distributed object store that scales horizontally across Kubernetes nodes. It serves as an alternative to S3-compatible backends for workloads that need fast, local object storage within the cluster.

Update to provider-seaweedfs v0.1.1 to start using SeaweedFS in OpenEverest. Install via Helm:

```bash
helm install provider-seaweedfs \
  oci://ghcr.io/openeverest/charts/provider-seaweedfs \
  --version 0.1.1 -n everest-system
```

This is the initial release of the SeaweedFS provider. Feedback and feature requests are welcome on the [GitHub repository](https://github.com/openeverest/provider-seaweedfs).
