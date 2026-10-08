---
title: "OpenEverest now skips plugins that declare incompatible host versions"
date: 2026-10-07T13:48:21Z
draft: false
topics:
 - openeverest
 - plugins
 - releases
link: https://openeverest.io/documentation/2.0.0-dev.4/
summary: Plugin compatibility manifests are now enforced: a plugin that fails compatibleHostVersions or the new compatibleUiContractVersions is skipped.
---

OpenEverest now enforces plugin compatibility manifests. A plugin is skipped if it fails `spec.compatibleHostVersions`, which previously was declared but not enforced, or the new `spec.compatibleUiContractVersions`.

Previously, a plugin that declared itself incompatible with the running host still loaded, risking breakage against a UI or host contract it was never built for. Now the incompatible plugin is held out until the host or the plugin is updated.

If a plugin that ran under Developer Preview 3 disappears after upgrading to Developer Preview 4, check its compatibility manifest first. To learn more, visit the [documentation](https://openeverest.io/documentation/2.0.0-dev.4/).

<!-- release-key: openeverest/openeverest@v2.0.0-dev.4 -->