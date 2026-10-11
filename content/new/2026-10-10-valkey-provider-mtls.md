---
title: "Valkey provider adds mTLS support for secure client connections"
date: 2026-10-10T10:08:17
draft: false
topics:
 - valkey
 - security
 - releases
link: https://github.com/openeverest/provider-valkey/releases/tag/v0.1.8
summary: Valkey instances can now require mutual TLS, so only clients presenting a trusted certificate can connect.
---

The OpenEverest Valkey provider adds mutual TLS (mTLS) support, so connections to your Valkey instances can be secured with client certificate authentication in addition to TLS encryption.

Previously, Valkey instances supported TLS for encryption but clients were authenticated with credentials only. With mTLS, deployments can require that every client presents a trusted certificate before a connection is accepted, tightening access to data in transit.

mTLS support is available with provider-valkey v0.1.8. To learn more, visit the [provider-valkey release notes](https://github.com/openeverest/provider-valkey/releases/tag/v0.1.8).
