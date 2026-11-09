---
title: "Write Your First Extension Hub Provider"
date: 2026-11-09T12:00:00
draft: false
image:
    url: provider-components.png
    attribution:
authors:
  - spron-in
tags:
  - tutorial
  - providers
  - v2
  - extension-hub
  - open-source
  - kubernetes
summary: A practical tour of building a provider for OpenEverest v2 and publishing it to the Extension Hub — the same documented path that produced the CloudNativePG, ClickHouse, and OpenSearch providers.
---

OpenEverest v2 exists for one reason: so that adding a new database engine to the platform doesn't require the core team's permission, calendar, or code. A provider is a self-contained plugin, the [Provider SDK](https://github.com/openeverest/provider-sdk) does the plumbing, and the [Extension Hub](https://github.com/openeverest/hub) puts the result in front of every user. We introduced the ideas in the [v2 Developer Preview announcement](/blog/v2-developer-preview-release/) and the [Hub introduction](/blog/the-hub-introduction/); this post is the practical tour: pick an engine, implement the contract, package a chart, publish to the Hub.

Before you ask whether this path actually works: it's the same path behind the [CloudNativePG provider](/blog/building-cloudnativepg-provider-for-openeverest-v2/), the [ClickHouse provider](/blog/ai-agent-clickhouse-provider/), and the OpenSearch provider that shipped last week, most of it built by [one community contributor](/blog/contributor-spotlight-shivansh-sinha/). Documented, open, and walked by people who started exactly where you are now.

## What a provider actually is

OpenEverest gives users one API for every data service: the `Instance` custom resource. A provider is the piece that knows what a particular technology needs. Your provider has two halves, and keeping them straight is most of the job:

* **`definition/`** — *what* you offer: which components exist (engine, proxy, backup agent), which versions, which topologies, which parameters, and how the UI should render the form. This is compiled into the Provider custom resource.
* **The runtime** — four functions against the real world: `Validate()` rejects a spec you can't serve before it's accepted; `Sync()` reconciles the `Instance` into your engine's actual Kubernetes resources; `Status()` reports what the cluster really looks like back onto the `Instance`; `Cleanup()` handles the finalizer when the `Instance` goes away.

You never manage pods directly — you drive an upstream Kubernetes operator's custom resources (or, for simple engines, a StatefulSet). The OpenSearch provider, for example, reconciles `Instance` into the OpenSearch operator's `OpenSearchCluster` and lets the operator do the lifecycle work.

## Step 1: Pick your engine

Two criteria, in order:

1. **Is there a Kubernetes operator for it?** Driving an existing operator means your `Sync` mostly translates between CRDs, and you inherit the operator's day-2 operations.
2. **If not, can it run on a StatefulSet?** The SDK tutorial deliberately builds memcached on a plain StatefulSet with no operator in between — so the provider contract is the only thing on screen. Everything you learn there applies unchanged to an operator-backed provider; only the body of `Sync` and `Status` differs.

Before you commit, check the [Extension Hub](https://github.com/openeverest/hub) so you don't rebuild something that exists — and if your engine is already covered, a better question is what's missing from that provider. That's a contribution too, and often the faster one.

## Step 2: Scaffold

Install the SDK and scaffold the project:

```bash
go install github.com/openeverest/provider-sdk@latest

provider-sdk init \
  --name my-database \
  --module github.com/my-org/provider-my-database
```

From there, each command adds one slice of the provider and prints its own flags with `--help`:

| Command | What it adds |
|---|---|
| `provider-sdk add component` | A component and its type |
| `provider-sdk add topology` | A deployment topology |
| `provider-sdk add backup` | Backup and restore implementation stubs |
| `provider-sdk add backupclass` | A BackupClass definition |
| `provider-sdk generate` | Builds the Provider CR spec from `definition/` (run via `go generate ./...`) |

If you want to read a complete provider instead of generating one, [provider-example](https://github.com/openeverest/provider-example) is the smallest complete provider, commented to be read, and [provider-percona-server-mongodb](https://github.com/openeverest/provider-percona-server-mongodb) is the production version for when you need to see the real thing.

## Step 3: Implement the contract

Work through the [tutorial](https://github.com/openeverest/provider-sdk/blob/main/TUTORIAL.md) once — it takes about an hour, needs only Go, Docker, kubectl, Helm, and k3d, and ends with your provider running in a local cluster and an `Instance` you created through it. Then keep the [provider development guide](https://github.com/openeverest/provider-sdk/blob/main/PROVIDER_DEVELOPMENT.md) open as your reference: components, versions, topologies, the UI schema, the provider interface, RBAC, backups, releasing.

Two things surprise newcomers, in a good way:

* **The UI is schema work, not frontend work.** You describe the form in the UI schema inside `definition/`, and the OpenEverest UI renders it. The CloudNativePG author described it this way: most of his settings UI was schema plus small Go type changes, not a custom frontend.
* **The dev loop is included.** The SDK ships a Tilt-based local development flow and a kuttl test harness, so you can reconcile against a real cluster and prove your reconcile does what you think it does — before anyone reviews it.

One warning from every provider author so far: learn your upstream operator's API before you touch the provider contract. The ClickHouse post tells the same story — none of the steps are hard, but not knowing them costs an hour each. Start by reading your operator's CRDs and the resources it creates.

## Step 4: Package it as a chart

A provider ships as a Helm chart published as an OCI artifact — the same way the OpenSearch provider does, via `ghcr.io`. The chart carries your controller, CRDs, RBAC, and (if your engine needs one) the upstream operator as a chart dependency, so users install the provider and get everything wired in one step. The development guide covers the release mechanics, and the SDK's template README gives every provider the same structure: a capabilities table users can compare, a roadmap file, and install instructions that don't lie about the provider requiring an OpenEverest installation to do anything.

## Step 5: Publish to the Extension Hub

The Hub is a GitHub repository — the [formula](https://github.com/openeverest/hub) for each extension is a small manifest, not a code review. The full procedure is in [PUBLISHING.md](https://github.com/openeverest/hub/blob/main/docs/PUBLISHING.md); the shape of it:

1. Fork [`openeverest/hub`](https://github.com/openeverest/hub) and copy `extensions/_template` into `extensions/providers/<your-slug>`. The slug must be lowercase, alphanumeric plus hyphens, globally unique, and match the directory name.
2. Fill in `formula.yaml` — the authoritative schema is [`schemas/formula-v1.json`](https://github.com/openeverest/hub/blob/main/schemas/formula-v1.json) — and keep its `version` field in sync with your releases. A GitHub Action template in the hub automates the bump.
3. Add a short `README.md` and a logo file referenced from `metadata.icon`.
4. Open the PR. The validate workflow runs JSON schema validation on every formula, checks the directory name against `metadata.name`, verifies the required files, and dry-runs the index generator.
5. A maintainer reviews the metadata — there is no code review, because the formula is a pointer, not code. On merge, the index regenerates and your provider is live in every OpenEverest UI.

That last point is worth dwelling on: once the formula merges, users discover your engine without you writing a single line of frontend, marketing, or distribution code.

## Where to start

* **The tutorial** — [build your first provider](https://github.com/openeverest/provider-sdk/blob/main/TUTORIAL.md) in about an hour, end to end, against a local k3d cluster.
* **A starter task** — our [Good First Issues](https://github.com/orgs/openeverest/projects/2) board is maintained to be a real on-ramp, not a graveyard of unfixable papercuts.
* **LFX Mentorship** — if you want structure and a mentor, we participate in the [LFX Mentorship program](https://mentorship.lfx.linuxfoundation.org/#projects_all?q=openeverest); it's paid, and [our mentees ship real projects](/blog/lfx-mentorship-term3-2026/).
* **Talk to us** — bring your engine idea to a [community meeting](https://github.com/openeverest), or [book time with a maintainer](https://talk.openeverest.tech/30min) if you want help scoping before you write code.

Pick an engine you actually run — you'll build a better provider for something you know, and you'll be its first user. Scaffold it this weekend, open a draft PR early so we can unblock you, and we'll see you on the Hub.
