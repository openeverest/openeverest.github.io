---
title: "TiDB provider now surfaces per-component status and failure details"
date: 2026-09-25T18:59:37
draft: false
topics:
 - tidb
 - databases
 - observability
 - releases
link: https://github.com/openeverest/provider-tidb/releases/tag/v0.1.2
summary: The TiDB provider now exposes per-component readiness and operator-level failure reasons in the instance status.
---

The TiDB provider now reports per-component readiness and surfaces operator-level failure reasons in the OpenEverest instance status, making it easier to diagnose why a TiDB cluster is not yet healthy.

Previously, a stalled `Pending` or `Updating` phase offered little guidance. The provider now maps the PD, TiKV, and TiDB group conditions — along with any blocking operator events — into readable status fields, so you can identify which component needs attention without reading raw CR conditions.

Per-component status reporting is available now in TiDB provider v0.1.2.
