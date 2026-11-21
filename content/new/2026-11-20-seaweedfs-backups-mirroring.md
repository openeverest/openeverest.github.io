---
title: "SeaweedFS provider introduces on-demand and scheduled backups with cross-cluster mirroring"
date: 2026-11-20T19:40:39
draft: false
topics:
 - seaweedfs
 - backups
 - releases
link: https://github.com/openeverest/provider-seaweedfs/releases/tag/v0.3.0
summary: The SeaweedFS provider adds on-demand backup, scheduled backup with mirror, cross-cluster data mirroring, and enables HTTPS on the S3 gateway with TLS.
---

The SeaweedFS provider v0.3.0 delivers the object store's full data-protection suite: on-demand backup, scheduled backup with mirroring, and continuous cross-cluster data mirroring.

On-demand backup lets you snapshot a SeaweedFS instance to a backup storage at any moment — before a risky change, or on an operator's signal. Scheduled backup automates the same flow on an interval, and adds mirroring: the backup can be written to a second location, so a copy of your object data survives even a full cluster loss.

For tighter recovery objectives, the new data mirroring capability replicates data to another SeaweedFS cluster continuously, giving you a warm standby rather than a cold restore. And the S3 gateway now defaults to HTTPS when TLS is enabled, so clients get encrypted access without extra configuration.

To learn more, visit the [SeaweedFS provider v0.3.0 release notes](https://github.com/openeverest/provider-seaweedfs/releases/tag/v0.3.0).

<!-- release-key: openeverest/provider-seaweedfs@v0.3.0 -->
