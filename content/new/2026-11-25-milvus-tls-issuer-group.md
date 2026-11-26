---
title: "Milvus provider adds issuer.group and additionalNames to TLS certificates"
date: 2026-11-25T07:02:07Z
draft: false
topics:
 - milvus
 - security
 - releases
link: https://github.com/openeverest/provider-milvus/releases/tag/v0.5.1
summary: Milvus clusters can now issue TLS certificates from a custom issuer group and add DNS-only additional names — a breaking change to the TLS spec.
---

The OpenEverest Milvus provider now lets you specify `issuer.group` when
requesting TLS certificates, enabling certificate issuance from any cert-manager
issuer API group rather than only the default. It also adds `additionalNames`,
DNS-only entries appended to the certificate's subject alternative names, so
clusters reachable under extra DNS aliases can still present valid
certificates.

**Breaking change:** this release modifies the TLS specification. Upgraders
should review the new `spec.parameters.tls` fields — in particular,
`additionalNames` entries are DNS-only, so IP-based SANs are not supported.
Check your Milvus cluster definitions before upgrading.

To learn more, visit the
[provider-milvus release notes](https://github.com/openeverest/provider-milvus/releases/tag/v0.5.1).

<!-- release-key: openeverest/provider-milvus@v0.5.1 -->