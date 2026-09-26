---
title: "TiDB provider supports expanding PD and TiKV storage"
date: 2026-09-25T18:59:37
draft: false
topics:
 - tidb
 - databases
 - storage
 - releases
link: https://github.com/openeverest/provider-tidb/releases/tag/v0.1.2
summary: The TiDB provider now allows expanding PD and TiKV storage volumes, and rejects shrinking to prevent data loss.
---

The TiDB provider now supports expanding storage for the PD and TiKV components, and rejects any attempt to shrink those volumes to prevent accidental data loss.

Previously, storage changes were passed through unvalidated, which could either silently fail or trigger unsupported shrinking operations. The provider now validates storage size changes during sync: expansion is allowed (handled by the TiDB Operator v2), while shrinking is rejected immediately with a clear error.

Storage expansion support is available now in TiDB provider v0.1.2.
