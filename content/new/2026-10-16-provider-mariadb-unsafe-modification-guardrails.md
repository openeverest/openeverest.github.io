---
title: "MariaDB provider introduces guardrails against unsafe instance modifications"
date: 2026-10-16T08:28:18
draft: false
topics:
 - mariadb
 - releases
link: https://github.com/openeverest/provider-mariadb/releases/tag/v0.2.0
summary: The provider now rejects version downgrades, storage size reductions, and storage class changes that could corrupt or lose data.
---

The MariaDB provider now rejects change requests that are unsafe for your data:
engine version downgrades, shrinking the configured storage size, and changing
the storage class of an existing instance.

Previously these edits could be accepted silently and risk data corruption or
loss. Now they are caught and rejected up front, before any change reaches the
cluster. To learn more, visit the
[provider-mariadb v0.2.0 release](https://github.com/openeverest/provider-mariadb/releases/tag/v0.2.0).
