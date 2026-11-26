---
title: "SeaweedFS provider moves TLS to spec.parameters.tls with the common shape"
date: 2026-11-25T09:27:27Z
draft: false
topics:
 - seaweedfs
 - security
 - releases
link: https://github.com/openeverest/provider-seaweedfs/releases/tag/v0.3.1
summary: TLS configuration for SeaweedFS clusters moves to spec.parameters.tls using the common OpenEverest TLS shape — a breaking change for existing clusters.
---

The OpenEverest SeaweedFS provider now configures TLS under
`spec.parameters.tls`, using the same common shape as the rest of the
OpenEverest providers. TLS settings live in one predictable place across every
engine instead of a provider-specific field.

**Breaking change:** existing SeaweedFS cluster definitions that configure TLS
under the previous location must be migrated to `spec.parameters.tls` when
upgrading. Review your cluster definitions before applying this release.

To learn more, visit the
[provider-seaweedfs release notes](https://github.com/openeverest/provider-seaweedfs/releases/tag/v0.3.1).

<!-- release-key: openeverest/provider-seaweedfs@v0.3.1 -->