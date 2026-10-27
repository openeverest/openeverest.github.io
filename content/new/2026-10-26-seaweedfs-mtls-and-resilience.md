---
title: "SeaweedFS provider adds inter-component mTLS and production-readiness defaults"
date: 2026-10-26T18:02:43
draft: false
topics:
 - seaweedfs
 - security
 - releases
link: https://github.com/openeverest/provider-seaweedfs/releases/tag/v0.2.0
summary: provider-seaweedfs v0.2.0 secures component traffic with mTLS, requires S3 credentials by default, and ships replication policies, storage expansion, disruption budgets, and metrics.
---

The SeaweedFS provider (v0.2.0) ships a broad set of security and production-readiness improvements:

- Traffic between SeaweedFS components is encrypted with mutual TLS, and ingress is supported on the S3 gateway, so object traffic no longer moves across the network in the clear.
- S3 authentication is enabled by default, so clients need credentials from the first deployment, and a new spec.admin setting can expose the SeaweedFS admin UI for managing volumes and filers.
- Replication policies (with validation) and per-component storage classes are configurable in the UI, and storage size can be expanded for growing clusters.
- PodDisruptionBudgets for every component and hostname anti-affinity for master, volume, and filer keep clusters resilient during node drains.
- Two filers run by default (SeaweedFS 4.48 is required for more), volume slots are sized from the disk so buckets grow fewer, larger volumes, and metrics are exposed for Prometheus and VictoriaMetrics.

mTLS, default S3 authentication, and these defaults are available in provider v0.2.0. To learn more, visit the [release notes](https://github.com/openeverest/provider-seaweedfs/releases/tag/v0.2.0).