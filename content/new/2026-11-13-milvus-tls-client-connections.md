---
title: "Milvus provider: TLS for client connections, milvus-operator v1.3.13, Milvus 2.6.27"
date: 2026-11-13T07:00:32Z
draft: false
topics:
 - milvus
 - security
 - releases
 - kubernetes
link: https://github.com/openeverest/provider-milvus/releases/tag/v0.3.2
summary: "provider-milvus v0.3.2 can require TLS on client connections and moves to milvus-operator v1.3.13, bringing instances to Milvus 2.6.27."
---

provider-milvus v0.3.2 is a security and currency release: client traffic can now be encrypted, and the operator underneath moves to its current release line.

**TLS for client connections:** Milvus instances provisioned through OpenEverest can now require TLS from their clients, so traffic between applications and the vector database — vectors, queries, results — is encrypted in transit instead of crossing the network in the clear.

**milvus-operator v1.3.13 and Milvus 2.6.27:** the provider moves to the operator's newest release line, so instances pick up the current Milvus version for the workloads they run.

The release also marks a first contribution from community member @chilagrow — welcome, and thank you.

To learn more, visit the [v0.3.2 release notes](https://github.com/openeverest/provider-milvus/releases/tag/v0.3.2).

<!-- release-key: openeverest/provider-milvus@v0.3.2 -->
