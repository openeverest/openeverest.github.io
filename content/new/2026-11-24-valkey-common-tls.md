---
title: "Valkey provider brings TLS configuration in line with the common spec"
date: 2026-11-24T19:24:49
draft: false
topics:
 - valkey
 - tls
 - releases
link: https://github.com/openeverest/provider-valkey/releases/tag/v0.2.1
summary: Valkey provider v0.2.1 adopts the shared spec.parameters.tls shape for TLS settings, matching every other OpenEverest provider.
---

The Valkey provider now configures TLS through `spec.parameters.tls`, adopting the common TLS shape shared across OpenEverest providers. Redis-compatible workloads running on Valkey get the same certificate configuration structure as every other engine on the platform — one place to look, one shape to automate.

**Breaking change.** This is a breaking change (marked `feat!`) in provider-valkey v0.2.1: existing deployments must move their TLS settings to the new `spec.parameters.tls` location when upgrading. Review your cluster definitions before applying the update.

To learn more, see the [v0.2.1 release notes](https://github.com/openeverest/provider-valkey/releases/tag/v0.2.1).

<!-- release-key: openeverest/provider-valkey@v0.2.1 -->
