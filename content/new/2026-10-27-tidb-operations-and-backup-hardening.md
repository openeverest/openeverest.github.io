---
title: "TiDB provider release roundup: HTAP presets, S3 backups, and lifecycle reliability"
date: 2026-10-27T17:05:36Z
draft: false
topics:
 - tidb
 - backups
 - releases
link: https://github.com/openeverest/provider-tidb/releases/tag/v0.2.2
summary: The TiDB provider's latest releases add an HTAP analytics preset, S3-compatible backups for more storage providers, and a series of reliability fixes for Secrets, DNS, and small-instance sizing.
---

Two TiDB provider releases shipped today with a set of operator-facing improvements:

- **HTAP analytics preset** — the analytics preset now deploys TiFlash with 32Gi of memory, and HTAP routing between the transactional and analytical paths is documented.
- **S3-compatible backups** — backups now work with S3-compatible storage providers that name their regions differently from AWS, instead of failing on region resolution.
- **Safer Secret lifecycle** — Secrets of a deleted Instance are never reused by a new Instance with the same name, deleted Instances are held until their TiDB cluster is fully torn down, and connection Secrets keep working after a restore.
- **Reliability fixes** — PD now waits for its DNS name to resolve instead of crash-looping, and TiKV memory and disk reserves are sized sensibly for small Instances.

All of these are available in provider-tidb v0.2.1 and v0.2.2. To learn more, visit the [v0.2.2 release notes](https://github.com/openeverest/provider-tidb/releases/tag/v0.2.2).
