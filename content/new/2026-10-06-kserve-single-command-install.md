---
title: "KServe provider now supports one-command Helm installation"
date: 2026-10-06T12:12:16Z
draft: false
topics:
  - kserve
  - kubernetes
  - machine-learning
  - releases
link: https://github.com/openeverest/provider-kserve/releases/tag/v0.2.1
summary: The KServe provider now installs with a single Helm command, eliminating manual CRD pre-installation steps.
---

The KServe provider can now be installed with a single Helm command, eliminating the need to manually pre-install CRDs and cert-manager prerequisites.

Previously, installation required multiple setup steps. The streamlined flow reduces friction when bringing KServe into a new cluster or updating an existing deployment.

To install the provider, run:

```bash
helm install provider-kserve \
  oci://ghcr.io/openeverest/charts/provider-kserve \
  --version 0.2.1 -n everest-system
```

One-command installation is available starting with v0.2.1.
