---
title: "KServe provider can now serve models packaged as OCI images"
date: 2026-10-29T17:51:26
draft: false
topics:
 - kserve
 - llm
 - releases
link: https://github.com/openeverest/provider-kserve/releases/tag/v0.5.0
summary: The KServe provider can serve LLMs packaged as container images via oci:// modelcar or oci+native:// image volumes, with node-level caching and private registry support.
---

The OpenEverest KServe provider (v0.5.0) can now serve models packaged as container images, using either the `oci://` modelcar flow or `oci+native://` image volumes. Images are cached on each node by the kubelet, so repeatedly scheduled replicas start faster without re-downloading weights.

Private registries are supported through `imagePullSecret`. Model URIs are validated up front — only `hf://`, `s3://`, `pvc://`, `oci://` and `oci+native://` schemes are accepted, so misconfigured `llm` models fail at deploy time instead of later inside KServe.

OCI model images are available now. To learn more, visit the [v0.5.0 release notes](https://github.com/openeverest/provider-kserve/releases/tag/v0.5.0).
