---
title: "The OpenSearch provider is now available in OpenEverest"
date: 2026-11-06T14:20:35
draft: false
topics:
 - opensearch
 - providers
 - releases
link: https://github.com/openeverest/provider-opensearch/releases/tag/v0.1.0
summary: OpenSearch 3.7 and 3.8 clusters come to OpenEverest with TLS always on, optional OpenSearch Dashboards, and S3-compatible snapshot backups with retention.
---

The OpenSearch provider is now available in OpenEverest. It runs OpenSearch 3.7 and 3.8 clusters on the [OpenSearch Kubernetes Operator](https://github.com/opensearch-project/opensearch-k8s-operator), and most of it was built by community member @shivansh-source. Thank you, Shivansh!

TLS is always on for transport and HTTP. Clusters ship in the standard topology, where every node is cluster-manager eligible and holds data, and you can add OpenSearch Dashboards to any cluster.

Day-2 operations are covered from day one: scale, resize, grow disks, rolling upgrades, custom opensearch.yml settings, and exposing the cluster outside Kubernetes. Snapshot backups go to S3-compatible storage on demand or on a schedule with retention, and you can restore into the same cluster or a brand-new one.

The OpenSearch provider is available now on the Extension Hub. To learn more, visit the [v0.1.0 release notes](https://github.com/openeverest/provider-opensearch/releases/tag/v0.1.0).

<!-- release-key: openeverest/provider-opensearch@v0.1.0 -->
