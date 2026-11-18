---
title: "CloudNativePG provider ships PostgreSQL 18.7 as the default and a version-aware extension catalog"
date: 2026-11-17T11:43:29
draft: false
topics:
 - postgresql
 - cloudnativepg
 - releases
link: https://github.com/openeverest/provider-cloudnative-pg/releases/tag/v0.3.5
summary: New PostgreSQL clusters now default to PostgreSQL 18.7, and the provider picks catalog extensions that match each cluster's PostgreSQL version.
---

The OpenEverest CloudNativePG provider now provisions new PostgreSQL clusters
with PostgreSQL 18.7 by default, so fresh deployments pick up the latest
PostgreSQL release without pinning a version.

The extension catalog has also become version-aware: the provider now selects
catalog entries by PostgreSQL version range, so only extensions compatible
with a cluster's PostgreSQL version are offered. This removes the guesswork
of matching an extension to your database version and prevents installs that
would fail on version mismatch.

Both changes are available in provider-cloudnative-pg 0.3.5, with images for
linux/amd64 and linux/arm64. To learn more, visit the
[release notes](https://github.com/openeverest/provider-cloudnative-pg/releases/tag/v0.3.5).

<!-- release-key: adityapimpalkar/provider-cloudnative-pg@v0.3.5 -->
