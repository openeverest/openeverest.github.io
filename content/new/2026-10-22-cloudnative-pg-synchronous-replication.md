---
title: "PostgreSQL provider introduces synchronous replication"
date: 2026-10-22T14:02:00
draft: false
topics:
 - postgresql
 - high-availability
 - releases
link: https://github.com/AdityaPimpalkar/provider-cloudnative-pg/releases/tag/v0.3.3
summary: CloudNativePG PostgreSQL clusters can now require standbys to confirm every commit before acknowledging writes.
---

The CloudNativePG PostgreSQL provider can now configure synchronous replication: set `parameters.postgresql.synchronous` to require a chosen number of standbys to confirm each commit, choosing quorum (`any`) or priority-order (`first`) confirmation.

Synchronous replication trades some write latency for stronger durability — a confirmed commit exists on more than one instance. You can also decide whether writes stop when too few standbys remain (`required`) or the cluster falls back to asynchronous replication until they return (`preferred`).

The option is available in the UI under Resources, and invalid configurations are rejected before the cluster is applied. To learn more, see the [release notes](https://github.com/AdityaPimpalkar/provider-cloudnative-pg/releases/tag/v0.3.3).
