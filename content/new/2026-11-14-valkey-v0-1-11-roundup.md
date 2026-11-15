---
title: "Valkey provider now supports valkey-operator v0.9.0 and admission-time validation"
date: 2026-11-14T11:40:09Z
draft: false
topics:
 - valkey
 - releases
link: https://github.com/openeverest/provider-valkey/releases/tag/v0.1.11
summary: The Valkey provider moves to valkey-operator v0.9.0 and now validates instances through an admission webhook with precise field-path errors.
---

The Valkey provider for OpenEverest v0.1.11 rounds up its latest improvements:

- The provider now runs on valkey-operator v0.9.0, picking up the operator's newest behavior for managed Valkey deployments.
- Instance specs are validated through an admission webhook that returns pure validation results with exact field paths, so misconfigurations are rejected with actionable errors before anything is scheduled.

Valkey provider v0.1.11 is available now. To learn more, visit the [v0.1.11 release notes](https://github.com/openeverest/provider-valkey/releases/tag/v0.1.11).