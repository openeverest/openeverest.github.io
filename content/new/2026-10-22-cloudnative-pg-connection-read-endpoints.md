---
title: "PostgreSQL connection details now expose read endpoints and TLS mode"
date: 2026-10-22T14:02:00
draft: false
topics:
 - postgresql
 - releases
link: https://github.com/AdityaPimpalkar/provider-cloudnative-pg/releases/tag/v0.3.3
summary: The connection Secret for CloudNativePG PostgreSQL clusters now includes read and read-only host endpoints plus an explicit sslmode.
---

The connection Secret produced by the CloudNativePG PostgreSQL provider now exposes read endpoints and an explicit TLS mode, so applications can target the right kind of instance without guessing: `host` for the read-write service, `host-r` for every ready instance including the primary, and `host-ro` for ready replicas only.

The Secret also sets `sslmode` to `require`, and the connection `uri` includes it — making encrypted connections the documented default. Note that `pg-connection-string` 2.7+ treats `sslmode=require` as `verify-full`; point `sslrootcert` at the `ca.crt` from the cluster CA Secret, or use `sslmode=no-verify` to encrypt without certificate checks.

To learn more, see the [release notes](https://github.com/AdityaPimpalkar/provider-cloudnative-pg/releases/tag/v0.3.3).
