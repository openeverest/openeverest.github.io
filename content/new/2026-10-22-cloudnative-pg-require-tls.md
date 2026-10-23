---
title: "PostgreSQL provider adds a Require TLS option to reject unencrypted connections"
date: 2026-10-22T14:02:00
draft: false
topics:
 - postgresql
 - security
 - releases
link: https://github.com/AdityaPimpalkar/provider-cloudnative-pg/releases/tag/v0.3.3
summary: A new Require TLS setting rejects unencrypted client connections to CloudNativePG PostgreSQL clusters without restarting pods.
---

The CloudNativePG PostgreSQL provider introduces `parameters.requireTLS`, which places an explicit reject rule for unencrypted connections ahead of your `pg_hba` rules. CloudNativePG applies it with a reload, so no pods are restarted and replication is unaffected.

By default, CloudNativePG serves TLS but still accepts unencrypted clients. With Require TLS enabled, `sslmode=disable` is refused; use `sslmode=verify-full` with the cluster CA to authenticate the server. New and restored instances in the UI get this option turned on automatically.

To learn more, see the [release notes](https://github.com/AdityaPimpalkar/provider-cloudnative-pg/releases/tag/v0.3.3).
