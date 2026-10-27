---
title: "SeaweedFS provider adds inter-component mTLS and enables S3 authentication by default"
date: 2026-10-26T18:02:43
draft: false
topics:
 - seaweedfs
 - security
 - releases
link: https://github.com/openeverest/provider-seaweedfs/releases/tag/v0.2.0
summary: The SeaweedFS provider now secures traffic between components with mTLS, requires S3 credentials by default, and can expose the admin UI.
---

The SeaweedFS provider (v0.2.0) now encrypts traffic between SeaweedFS components with mutual TLS and supports ingress on the S3 gateway, so object traffic no longer moves across the network in the clear.

The same release enables S3 authentication by default, so clients need credentials from the first deployment rather than an opt-in hardening step. A new `spec.admin` setting can also enable the SeaweedFS admin UI for managing volumes and filers.

mTLS, default S3 authentication, and the admin UI are available in provider v0.2.0. To learn more, visit the [release notes](https://github.com/openeverest/provider-seaweedfs/releases/tag/v0.2.0).
