---
title: "provider-cloudnative-pg is now an official OpenEverest provider"
date: 2026-11-16T06:00:00
draft: false
authors:
  - spron-in
tags:
  - blog
  - providers
  - postgresql
  - kubernetes
  - community
summary: "The community-built CloudNativePG provider — started as a personal project by Aditya Pimpalkar in June — has moved into the OpenEverest organization."
---

The provider for CloudNativePG has moved into the OpenEverest organization. It now lives at [openeverest/provider-cloudnative-pg](https://github.com/openeverest/provider-cloudnative-pg) and is maintained as an official provider for running PostgreSQL HA clusters on Kubernetes.

It didn't start there. [Aditya Pimpalkar](https://github.com/AdityaPimpalkar) created the repo in June 2026 under his own account and built it against OpenEverest's v2 provider architecture — one of the first providers to do so, while that SDK was still taking shape. We [introduced him in July](https://openeverest.io/blog/contributor-spotlight-aditya-pimpalkar/) in our contributor spotlight; he described himself then as "still new to the Kubernetes side," which is worth remembering when you look at what the provider does now.

Over five months, the work added up: separate WAL storage, end-to-end tests that run against the full OpenEverest platform, detection for missing Barman alerts, query statistics, and a steady run of restore and status fixes. The latest release, v0.3.3, went out in October. The commit history tells the rest — most of it Aditya's, with the core team joining in along the way.

Aditya's contributions weren't limited to this provider, either. He wrote our guide on [running OpenEverest on GKE](https://openeverest.io/blog/running-openeverest-on-gke/), landed console improvements in the platform, fixed a provider-runtime bug, and spent this autumn in the [LFX Mentorship program](https://openeverest.io/blog/lfx-mentorship-term3-2026/) building a second provider — SeaweedFS object storage.

Moving the repo into the organization makes the arrangement explicit: the provider is developed in the open under the OpenEverest org, with Aditya continuing as its maintainer. Issues and contributions are welcome where they always were — under a new URL.

CloudNativePG is one of two ways to run PostgreSQL in OpenEverest. The other is the Percona PostgreSQL provider — [openeverest/provider-percona-postgresql](https://github.com/openeverest/provider-percona-postgresql), built on the Percona Operator for PostgreSQL — which suits teams already running Percona's distribution and tooling. Which one to pick is a question of your existing stack, not a ranking; the platform manages both through the same UI and API.

If PostgreSQL is one of the databases you run on Kubernetes, [the CloudNativePG provider is here](https://github.com/openeverest/provider-cloudnative-pg). And if you've considered building a provider yourself, the v2 SDK was designed for exactly this — an external contributor with a working idea, and no special access required to make it official.

Thanks, Aditya.