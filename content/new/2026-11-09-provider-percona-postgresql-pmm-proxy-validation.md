---
title: "Percona PostgreSQL provider: PMM authentication modes, proxy custom config, and admission-time validation"
date: 2026-11-09T11:58:24Z
draft: false
topics:
 - percona-postgresql
 - monitoring
 - configuration
 - releases
link: https://github.com/openeverest/provider-percona-postgresql/releases/tag/v0.6.2
summary: PMM monitoring is now rendered from the destination's authentication mode, proxy behaviour is tunable through custom config, and resources are validated by an admission webhook.
---

The Percona PostgreSQL provider now renders PMM monitoring from the destination's authentication mode, so PMM connections to Percona PostgreSQL clusters pick up the right credentials automatically instead of requiring a separate configuration.

The same release adds proxy custom config, letting you tune proxy behaviour per instance, and validates resources through an admission webhook that reports errors with exact field paths at apply time.

All three improvements are available in provider-percona-postgresql v0.6.2. To learn more, visit the [release notes](https://github.com/openeverest/provider-percona-postgresql/releases/tag/v0.6.2).
