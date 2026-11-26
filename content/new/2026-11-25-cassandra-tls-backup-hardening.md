---
title: "Cassandra provider now supports client and node-to-node TLS"
date: 2026-11-25T08:32:11Z
draft: false
topics:
 - cassandra
 - security
 - releases
link: https://github.com/openeverest/provider-cassandra/releases/tag/v0.2.1
summary: The Cassandra provider adds client and node-to-node TLS under spec.parameters.tls, and ships backup and JVM-sizing fixes.
---

The OpenEverest Cassandra provider now supports encrypted client connections and
node-to-node TLS, configured under `spec.parameters.tls`. Clusters can now run
with fully encrypted client-to-node and internode traffic without leaving the
OpenEverest API.

Alongside TLS, this release hardens day-2 operations:

- On-demand backups now start only once Medusa can actually accept them,
  instead of failing silently or racing the backup job.
- The Medusa backup UI no longer renders empty `uiSchema` sections that could
  confuse operators configuring backup schedules.
- The Cassandra JVM is now sized from the container's memory limit rather than
  the node's total memory, so heap sizing stays correct on busy or shared nodes.

To learn more, visit the
[provider-cassandra release notes](https://github.com/openeverest/provider-cassandra/releases/tag/v0.2.1).

<!-- release-key: openeverest/provider-cassandra@v0.2.1 -->