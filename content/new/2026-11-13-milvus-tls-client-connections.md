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
summary: "provider-milvus v0.3.2 can require TLS on client connections, moves to milvus-operator v1.3.13 running Milvus 2.6.27, and now tracks upstream operator releases through Dependabot."
---

provider-milvus v0.3.2 is a security and currency release: client traffic can now be encrypted, the operator underneath moves to its current release line, and upstream updates start arriving as PRs.

**TLS for client connections:** Milvus instances provisioned through OpenEverest can now require TLS from their clients, so traffic between applications and the vector database is encrypted in transit instead of crossing the network in the clear (#89).

**milvus-operator v1.3.13 and Milvus 2.6.27:** the provider moves to the operator's newest release line (#85), picking up the current Milvus version for the instances it manages.

The release also brings housekeeping that compounds: the provider's CI no longer installs the MonitoringConfig CRD it does not need (#87), and Dependabot now tracks milvus-operator releases (#86) — so the next upstream bump arrives as a reviewable PR instead of a manual diff. And it ships a first contribution from @chilagrow — exploring cluster-scoped instance presets (#81, reverted in #82).

To learn more, visit the [v0.3.2 release notes](https://github.com/openeverest/provider-milvus/releases/tag/v0.3.2).

<!-- release-key: openeverest/provider-milvus@v0.3.2 -->
