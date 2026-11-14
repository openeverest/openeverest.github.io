---
title: "Milvus provider introduces TLS for client connections"
date: 2026-11-13T07:00:32Z
draft: false
topics:
 - milvus
 - security
 - releases
link: https://github.com/openeverest/provider-milvus/releases/tag/v0.3.2
summary: Milvus clusters provisioned through OpenEverest can now require TLS for client connections, encrypting traffic between applications and the database.
---

The Milvus provider now supports TLS for client connections, so traffic between your applications and Milvus clusters provisioned through OpenEverest is encrypted in transit.

Previously, client connections to Milvus ran unencrypted, which left vector data and queries exposed on the network.

TLS for client connections is available now in provider-milvus v0.3.2. To learn more, visit the [release notes](https://github.com/openeverest/provider-milvus/releases/tag/v0.3.2).
