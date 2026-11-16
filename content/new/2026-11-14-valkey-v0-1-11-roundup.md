---
title: "Valkey provider moves to valkey-operator v0.9.0 and validates instances at admission time"
date: 2026-11-14T11:40:09Z
draft: false
topics:
 - valkey
 - releases
 - kubernetes
 - configuration
link: https://github.com/openeverest/provider-valkey/releases/tag/v0.1.11
summary: "provider-valkey v0.1.11 moves to valkey-operator v0.9.0 — apply the new CRDs before upgrading — and now validates instance specs through an admission webhook with exact field paths."
---

provider-valkey v0.1.11 moves the provider onto valkey-operator v0.9.0, and adds validation that catches misconfigurations before anything is scheduled.

**valkey-operator v0.9.0 (breaking):** the provider now runs on valkey-operator v0.9.0, so OpenEverest-managed Valkey picks up the operator's newest behavior: ACL users move to `spec.acl.users`, the Valkey `default` user is off unless a cluster declares it, `replicasPerShard` replaces patching `replicas`, a cluster can expose a Service per node and a separate client CA for mTLS, and a crashed primary's data is kept when its shard has a replica. The bump is marked breaking for a reason: the [operator's upgrade notes](https://github.com/valkey-io/valkey-operator) require applying both v0.9.0 CRDs *before* upgrading, because the older CRDs prune the fields the new operator reads — including the ACL revision each node has loaded, and `networking.perNodeServices` — and a `replicas` to `replicasPerShard` patch against the old CRD leaves a cluster with zero replicas.

**Admission-time validation:** instance specs are now validated through an admission webhook that returns pure validation results with exact field paths, so a misconfigured instance is rejected at apply time, with the error pointing straight at the offending field.

The release also marks a first contribution from community member @chilagrow — welcome, and thank you.

To learn more, visit the [v0.1.11 release notes](https://github.com/openeverest/provider-valkey/releases/tag/v0.1.11).

<!-- release-key: openeverest/provider-valkey@v0.1.11 -->