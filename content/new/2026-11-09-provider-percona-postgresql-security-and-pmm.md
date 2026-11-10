---
title: "Percona PostgreSQL provider: TLS, pgHBA rules, PMM, and proxy tuning"
date: 2026-11-09T11:58:24Z
draft: false
topics:
 - percona-postgresql
 - security
 - monitoring
 - configuration
 - releases
link: https://github.com/openeverest/provider-percona-postgresql/releases/tag/v0.6.2
summary: Percona PostgreSQL clusters gain TLS, pgHBA client access rules, PMM monitoring rendered from the destination's authentication mode, proxy tuning, and admission-time validation.
---

provider-percona-postgresql v0.6.2 lands a security and operability batch: encrypted connections, access rules in the instance spec, and smarter monitoring and validation.

TLS and access rules: Percona PostgreSQL clusters can now run with TLS, so connections are encrypted end to end instead of relying on network-level controls. A new `pgHBA` parameter declares client access rules — who can connect, from where, and with which authentication method — directly in the instance spec rather than by editing pg_hba.conf by hand.

Monitoring and validation: PMM monitoring is now rendered from the destination's authentication mode, so PMM connections to Percona PostgreSQL clusters pick up the right credentials automatically instead of requiring a separate configuration. Proxy behaviour becomes tunable per instance through custom config, and resources are validated by an admission webhook that reports errors with exact field paths at apply time.

To learn more, visit the [release notes](https://github.com/openeverest/provider-percona-postgresql/releases/tag/v0.6.2).

<!-- release-key: openeverest/provider-percona-postgresql@v0.6.2 -->
