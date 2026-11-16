---
title: "OpenSearch cluster versions can now be edited from the OpenEverest UI"
date: 2026-11-15T18:53:08
draft: false
topics:
 - opensearch
 - releases
link: https://github.com/openeverest/provider-opensearch/releases/tag/v0.2.0
summary: The OpenSearch engine version can now be changed directly from the UI, and a fix stops OpenSearch Dashboards from getting stuck after a slow first cluster start.
---

You can now edit the OpenSearch version of a cluster directly from the OpenEverest UI, without reaching for the API or editing manifests.

This release also fixes a bug where OpenSearch Dashboards could get stuck forever with "Another OpenSearch Dashboards instance appears to be migrating" after a slow first cluster start. Dashboards now start only once the cluster is fully initialized.

To learn more, see the [v0.2.0 release notes](https://github.com/openeverest/provider-opensearch/releases/tag/v0.2.0).