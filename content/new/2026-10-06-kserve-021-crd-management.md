---
title: "KServe provider upgrades to KServe 0.21 with simplified CRD management"
date: 2026-10-06T11:08:17Z
draft: false
topics:
  - kserve
  - kubernetes
  - machine-learning
  - releases
link: https://github.com/openeverest/provider-kserve/releases/tag/v0.2.0
summary: The KServe provider now runs on KServe 0.21 and handles CRD installation automatically via a Kubernetes Job.
---

The KServe provider now runs on KServe 0.21, and CRD management has been moved to a dedicated Kubernetes Job that pulls the correct CRDs automatically.

Previously, CRDs had to be installed or upgraded separately before deploying the provider. The new Job-based approach ensures the correct CRD versions are in place without manual intervention, reducing version mismatch issues during upgrades.

This change is included in provider-kserve v0.2.0.
