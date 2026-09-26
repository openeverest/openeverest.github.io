---
title: "TiDB provider now prevents unsafe version downgrades and out-of-order upgrades"
date: 2026-09-25T18:59:37
draft: false
topics:
 - tidb
 - databases
 - safety
 - releases
link: https://github.com/openeverest/provider-tidb/releases/tag/v0.1.2
summary: The TiDB provider now rejects version downgrades and out-of-order upgrades automatically, protecting cluster state.
---

The TiDB provider now rejects unsafe version changes before they are applied to the cluster. Downgrades and out-of-order upgrades are blocked at the validation layer, giving operators an early error instead of discovering the problem after the operator has already failed.

Previously, an incorrect version in the instance spec could send the TiDB Operator into an unrecoverable state. The provider now validates the requested version against the current one during the sync phase and surfaces a clear error if the change is not allowed.

Version safety guardrails are available now in TiDB provider v0.1.2.
