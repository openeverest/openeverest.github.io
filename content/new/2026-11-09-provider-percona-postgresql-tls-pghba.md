---
title: "Percona PostgreSQL provider adds TLS support and pgHBA client access rules"
date: 2026-11-09T11:58:24Z
draft: false
topics:
 - percona-postgresql
 - security
 - releases
link: https://github.com/openeverest/provider-percona-postgresql/releases/tag/v0.6.2
summary: Percona PostgreSQL clusters can now run with TLS, and client access can be declared with the pgHBA parameter.
---

The Percona PostgreSQL provider now supports TLS, so connections to Percona PostgreSQL clusters can be encrypted end to end instead of relying on network-level controls.

The same release adds a `pgHBA` parameter for declaring client access rules, letting you control who can connect, from where, and with which authentication method — directly in the instance spec rather than by editing pg_hba.conf by hand.

Both features are available in provider-percona-postgresql v0.6.2. To learn more, visit the [release notes](https://github.com/openeverest/provider-percona-postgresql/releases/tag/v0.6.2).
