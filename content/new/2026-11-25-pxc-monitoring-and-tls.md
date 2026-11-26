---
title: "Percona XtraDB Cluster provider delivers monitoring credentials and richer TLS"
date: 2026-11-25T14:43:57Z
draft: false
topics:
 - percona
 - mysql
 - monitoring
 - security
 - releases
link: https://github.com/openeverest/provider-percona-xtradb-cluster/releases/tag/v0.5.1
summary: The Percona XtraDB Cluster provider now publishes the operator's monitor user and connections (experiment) and supports issuer.group with additionalNames on TLS certificates.
---

The OpenEverest Percona XtraDB Cluster provider ships two customer-facing
changes this release.

**Monitoring access.** The provider now publishes the operator's monitor user
and its connection endpoints, so external monitoring tools can scrape
Percona XtraDB Cluster metrics without hand-built credentials. This is
currently an experiment and may change before becoming generally available.

**TLS flexibility.** Certificates can now be issued with `issuer.group`,
selecting any cert-manager issuer API group rather than only the default, and
`additionalNames`, which appends extra DNS entries to the certificate's
subject alternative names for clusters reachable under additional hostnames.

To learn more, visit the
[provider-percona-xtradb-cluster release notes](https://github.com/openeverest/provider-percona-xtradb-cluster/releases/tag/v0.5.1).

<!-- release-key: openeverest/provider-percona-xtradb-cluster@v0.5.1 -->