---
title: "provider-opensearch adds dedicated node roles and hardened upgrades"
date: 2026-11-15T18:53:08
draft: false
topics:
 - opensearch
 - releases
link: https://github.com/openeverest/provider-opensearch/releases/tag/v0.2.0
summary: The OpenSearch provider v0.2.0 splits node roles, lets you bring your own admin credentials and TLS certificates, and gates upgrades behind preflight checks and maintenance approval.
---

The OpenSearch provider v0.2.0 now supports a dedicated roles topology, splitting the cluster into separate cluster-manager, data, and optional coordinator nodes instead of a single all-in-one node pool.

You can also bring your own secrets: seed the `admin` password from `spec.userSecretRef`, and supply the HTTP certificate from a Kubernetes Secret or a cert-manager issuer. To keep cluster operations safe, `helm upgrade` now runs a preflight check that stops if a cluster is mid-upgrade or mid-restart, and changes a new provider would make to existing clusters wait for `spec.maintenance` approval before being applied. A PodDisruptionBudget ensures that draining Kubernetes nodes evicts only one OpenSearch node at a time.

Upgrades from 0.1.0 were tested on Kubernetes 1.35; existing clusters stay Ready without restarts. To learn more, see the [v0.2.0 release notes](https://github.com/openeverest/provider-opensearch/releases/tag/v0.2.0).