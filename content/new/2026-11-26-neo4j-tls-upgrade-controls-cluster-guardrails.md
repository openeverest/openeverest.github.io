---
title: "Neo4j provider adds common TLS, controlled upgrades, and cluster guardrails"
date: 2026-11-26T11:50:35
draft: false
topics:
 - neo4j
 - tls
 - releases
link: https://github.com/openeverest/provider-neo4j/releases/tag/v0.1.2
summary: The Neo4j provider now uses the common OpenEverest TLS shape, holds provider upgrades until you approve them, and adds cluster guardrails — with one breaking TLS change to plan for.
---

The Neo4j provider v0.1.2 brings the component in line with the rest of the
OpenEverest fleet: a common TLS parameter shape, human-approved upgrades, and
safer cluster operations.

**TLS now follows the common OpenEverest shape.** `spec.parameters.tls` now
accepts `mode: requireTLS | disabled` (defaulting to `requireTLS`), a
cert-manager `issuer` block (`name`, `kind`, optional `group`), a
`certificateSecretName` for bringing your own certificate Secret, and
`additionalNames` for extra SANs on the bolt/https certificate.

**Breaking change:** the previous `enabled` key is gone. If your instance
specification sets `tls.enabled`, migrate it to the new `mode` field — TLS is
on by default (`requireTLS`), so existing deployments keep encrypted
connections, but specs that reference the old key must be updated before
applying v0.1.2.

**Upgrades now wait for your approval.** Provider-level upgrade changes are
held until you approve them through the `upgrade-to-<release>` action, so a
new provider version never silently reshapes a running cluster. Once
approved, clusters created by v0.1.0 also receive the default soft pod
anti-affinity, spreading members across nodes for better resilience.

**Cluster guardrails.** The provider now refuses primary-count changes that
would drop below the minimum (`1 <-> N` primary switches are rejected to
protect the cluster), and it sets a changed Neo4j password before the
database advertises it, closing a window where credentials could be stale.

To learn more, see the
[v0.1.2 release notes](https://github.com/openeverest/provider-neo4j/releases/tag/v0.1.2).

<!-- release-key: openeverest/provider-neo4j@v0.1.2 -->
