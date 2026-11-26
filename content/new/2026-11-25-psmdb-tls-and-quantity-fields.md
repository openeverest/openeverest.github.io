---
title: "Percona Server for MongoDB provider: flexible TLS and quantity-aware resource fields"
date: 2026-11-25T04:01:38Z
draft: false
topics:
 - mongodb
 - percona
 - security
 - releases
link: https://github.com/openeverest/provider-percona-server-mongodb/releases/tag/v0.6.1
summary: The Percona Server for MongoDB provider adds issuer.group and additionalNames to TLS certificates, and the UI now reads CPU, memory, and disk as quantity fields.
---

The OpenEverest Percona Server for MongoDB provider ships two customer-facing
changes this release.

**TLS flexibility.** Certificates can now be issued with `issuer.group`,
selecting any cert-manager issuer API group rather than only the default, and
`additionalNames`, which appends extra DNS entries to the certificate's
subject alternative names. Clusters serving traffic under multiple hostnames
no longer need workarounds to present valid certificates.

**Quantity-aware resource fields.** The provider UI now reads CPU, memory, and
disk values as Kubernetes quantity fields, so resource requests and limits
entered by operators are parsed and validated exactly as the API server will
parse them — plain numbers, suffixed units, and fractional values like
`1500Mi` are all handled consistently.

To learn more, visit the
[provider-percona-server-mongodb release notes](https://github.com/openeverest/provider-percona-server-mongodb/releases/tag/v0.6.1).

<!-- release-key: openeverest/provider-percona-server-mongodb@v0.6.1 -->