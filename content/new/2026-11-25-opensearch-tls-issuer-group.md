---
title: "OpenSearch provider TLS certificates now support custom issuers and additional names"
date: 2026-11-25T03:45:11Z
draft: false
topics:
 - opensearch
 - security
 - releases
link: https://github.com/openeverest/provider-opensearch/releases/tag/v0.3.1
summary: OpenSearch clusters can now issue TLS certificates from a chosen issuer group and include additional DNS names.
---

The OpenEverest OpenSearch provider now supports `issuer.group` on TLS
certificates, letting you issue OpenSearch's transport and REST-layer
certificates from any cert-manager issuer API group instead of only the
default one. The new `additionalNames` field appends extra DNS entries to the
certificate's subject alternative names, so clusters reachable under
additional hostnames present valid certificates.

Together, the two fields bring OpenSearch TLS in line with the certificate
flexibility already available in other OpenEverest providers.

To learn more, visit the
[provider-opensearch release notes](https://github.com/openeverest/provider-opensearch/releases/tag/v0.3.1).

<!-- release-key: openeverest/provider-opensearch@v0.3.1 -->