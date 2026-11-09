---
title: "OpenSearch on Kubernetes: Built by the Community"
date: 2026-11-09T10:00:00
draft: false
image:
    url: opensearch-provider-hub.png
    attribution:
authors:
  - spron-in
tags:
  - opensearch
  - providers
  - community
  - open-source
  - kubernetes
  - v2
summary: The OpenSearch provider just shipped — OpenSearch 3.7 and 3.8 on Kubernetes with TLS always on and S3-compatible snapshot backups — and most of it was built by a community contributor. Here is the story.
---

The [What's New entry](https://openeverest.io/new/2026-11-06-opensearch-provider-available/) for the OpenSearch provider is deliberately short — that page is made to be scanned. This post is for everyone who read it and paused at one line: *most of it was built by a community member.* Yes, really. Here's what the provider does, who built it, and why we think that last part is the most important thing about this release.

## What the provider does

The OpenSearch provider runs OpenSearch 3.7 and 3.8 clusters on the [OpenSearch Kubernetes Operator](https://github.com/opensearch-project/opensearch-k8s-operator). You create a technology-agnostic `Instance` custom resource; the provider reconciles it into an `OpenSearchCluster` and the operator does the lifecycle work. All the OpenSearch-specific knowledge — topologies, versions, parameters, backup wiring — lives in the provider, so the API server, CLI, and UI stay technology-agnostic.

Out of the box you get:

* The **standard topology**: every node is cluster-manager eligible and holds data.
* **TLS always on** for transport and HTTP, with operator-generated certificates. There is no insecure mode to accidentally pick.
* An optional **OpenSearch Dashboards** component you can attach to any cluster.
* **Day-2 operations from day one**: horizontal and vertical scaling (the JVM heap is set to half the memory request), disk expansion, rolling version upgrades performed by the operator, custom `opensearch.yml` fragments, and exposing the cluster outside Kubernetes.
* **Backups to any S3-compatible storage**, on demand or on a schedule with retention, plus restore — in place, or seeding a brand-new instance.

The chart is published as an OCI artifact with the OpenSearch operator bundled as a chart dependency, so installing the provider from the Extension Hub brings everything with it in one step. OpenEverest v2 is still in developer preview and the provider is at v0.1.0, so treat this first slice as exactly that — but a very capable one. The full capability list is in the [v0.1.0 release notes](https://github.com/openeverest/provider-opensearch/releases/tag/v0.1.0) and the [provider repository](https://github.com/openeverest/provider-opensearch).

## How a community member built most of it

OpenSearch support didn't start as a roadmap item staffed by the core team. It started with [@shivansh-source](https://github.com/shivansh-source) — Shivansh Sinha, a DevOps and backend engineer from Bengaluru.

If his name looks familiar, that's because we've told part of his story before, in the [contributor spotlight](/blog/contributor-spotlight-shivansh-sinha/) from last month. He showed up with bug reports against the early OpenEverest v2 developer builds — a `helm upgrade` that didn't apply schema changes, an Instance created in the wrong namespace that hung silently, a CRD generation step shipping stale definitions. Then he came back with the fixes for those same bugs. Then he worked on the ClickHouse and KubeAI providers. And then he picked up the OpenSearch provider and built most of it: the operator integration, the capability surface, the backup and restore story.

"Contributing has felt fun, with such a supportive community and maintainers," he told us when we asked about the journey. We'd argue it goes both ways.

None of this required inside knowledge or a special invitation. He started where every contributor starts — filing issues, reading code, opening PRs — and the [Provider SDK](https://github.com/openeverest/provider-sdk) scaffold did the plumbing that used to stop community efforts from reaching production quality. The result is the most recent proof of a path we've watched several contributors walk now: bug reports, then fixes, then entire features.

## Why community contributions matter

In OpenEverest v1, database logic lived in the core: adding an engine meant touching the server, operator, CLI, and UI. A core team can only spread so thin, so the list of supported engines grew slowly and on the core team's schedule.

OpenEverest v2 flipped that model. A provider is now a self-contained plugin with its own component catalog, topologies, versions, parameters, and reconciliation logic, built on the [Provider SDK](https://github.com/openeverest/provider-sdk) and described in the [v2 Developer Preview announcement](/blog/v2-developer-preview-release/). The core team no longer gates what users can run — anyone who understands a technology and its Kubernetes operator can bring it to the platform, and the [Extension Hub](https://github.com/openeverest/hub) puts it in front of every user.

That is the real story of this release. OpenSearch matters — search and analytics workloads have been asking for it. But a project where one motivated engineer can go from bug reports to shipping a new database engine in months is a project whose engine coverage will eventually beat anything a single core team could plan.

## Contribute

The path Shivansh walked is open, documented, and shorter than you probably think:

* **Try the OpenSearch provider** — install it from the Extension Hub and read the [v0.1.0 release notes](https://github.com/openeverest/provider-opensearch/releases/tag/v0.1.0).
* **Build your own provider** — start with the [Provider SDK](https://github.com/openeverest/provider-sdk); its tutorial walks you through a working provider in about an hour.
* **Pick a starter task** — browse our [Good First Issues](https://github.com/orgs/openeverest/projects/2).
* **Get mentored** — we participate in the [LFX Mentorship program](https://mentorship.lfx.linuxfoundation.org/#projects_all?q=openeverest), a paid program for new contributors.
* **Talk to us** — join a [community meeting](https://github.com/openeverest), or [book time with a maintainer](https://talk.openeverest.tech/30min) directly.

OpenSearch on Kubernetes was built by the community. We intend to make that the norm, not the exception.
