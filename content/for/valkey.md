---
title: "Valkey"
technology: "Valkey"
summary: "Run Valkey, the open-source, Redis-compatible in-memory data store, on any Kubernetes cluster. Provision replicated or sharded clusters, scale shards and replicas, and secure every connection through a single UI and API, powered by the Valkey Kubernetes Operator."
tagline: "Redis-compatible caching and key-value at scale."
logo: "/images/for/valkey/logo.png"
weight: 8
draft: false

# Carousel: screenshots are required; add a slide with `youtube:` for an embedded video.
slides:
  - image: "/images/for/valkey/for-valkey-0.png"
    title: "Guided Valkey Provisioning"
    description: "Start from a ready-made preset for development, sharded, or replicated production clusters — or configure everything from scratch — and create a Redis-compatible cluster in a few clicks."
  - image: "/images/for/valkey/for-valkey-1.png"
    title: "Shards, Replicas & Resources"
    description: "Set the number of shards and replicas per shard, then size CPU, RAM, and storage for every node to match your workload."
  - image: "/images/for/valkey/for-valkey-2.png"
    title: "Cluster Overview"
    description: "Check cluster status and copy the host, port, credentials, or full connection URL straight into any Redis client."
  - image: "/images/for/valkey/for-valkey-3.png"
    title: "Visual Inspector"
    description: "See every Valkey node and its containers as a live graph — status, readiness, restarts, and Kubernetes node placement — to spot and debug issues at a glance."

# Key capabilities. `icon` maps to layouts/partials/feature-icon.html keywords.
capabilities:
  - icon: "database-engines"
    title: "Redis-Compatible"
    description: "Valkey speaks the Redis protocol, so existing Redis clients, libraries, and tools connect without code changes — an open-source drop-in alternative to Redis."
  - icon: "scaling"
    title: "Replication or Sharding"
    description: "Run a single primary with read replicas, or partition data across shards in Valkey Cluster mode — and scale shards and replicas as traffic grows."
  - icon: "resources"
    title: "Flexible Sizing"
    description: "Tune CPU, memory, and persistent storage per node, and start from presets for caching, session stores, or larger production workloads."
  - icon: "backup"
    title: "Backups & Restore"
    description: "On-demand and scheduled snapshots to S3-compatible storage, with restore into new or existing clusters."
  - icon: "private-deploy"
    title: "TLS & Authentication"
    description: "TLS on by default with automatically issued certificates, and a password-protected default user stored as a Kubernetes Secret."
  - icon: "monitoring"
    title: "Monitoring"
    description: "Enable a Prometheus exporter sidecar straight from the provisioning flow to track memory, hit rates, and latency."
  - icon: "config"
    title: "Advanced Configuration"
    description: "Pass through Valkey settings such as maxmemory-policy, pick the version, and upgrade in place without touching kubectl."

# Open-source repositories powering this integration.
repos:
  - label: "provider-valkey"
    url: "https://github.com/openeverest/provider-valkey"
    description: "The OpenEverest provider that integrates Valkey into the platform, built on the Provider SDK."

# Attribution to the operator that powers the databases.
powered_by:
  - name: "valkey-io/valkey-operator"
    url: "https://github.com/valkey-io/valkey-operator"
    description: "Valkey clusters on OpenEverest are powered by the open-source Valkey Kubernetes Operator, which handles deployment, scaling, failover, rolling upgrades, TLS, and access control on Kubernetes."

# FAQ: rendered as an accordion and emitted as FAQPage structured data for SEO.
faq:
  - question: "Is Valkey free to run on OpenEverest?"
    answer: "Yes. Both Valkey and OpenEverest are open-source with no licensing fees, and OpenEverest runs Valkey on your own Kubernetes cluster, in the cloud or on-premises."
  - question: "What is Valkey, and how does it relate to Redis?"
    answer: "[Valkey](https://valkey.io) is an open-source, high-performance key-value data store backed by the Linux Foundation. It was forked from Redis 7.2.4 and remains compatible with the Redis protocol, data types, and commands."
  - question: "Can I use Valkey as a Redis replacement?"
    answer: "Yes. Applications built for Redis connect to Valkey with the same clients and libraries, so OpenEverest gives you a self-hosted, open-source alternative to Redis for caching, session storage, queues, and other key-value workloads."
  - question: "How does OpenEverest run Valkey under the hood?"
    answer: "The [provider-valkey](https://github.com/openeverest/provider-valkey) provider translates an OpenEverest `Instance` into resources for the open-source [Valkey Kubernetes Operator](https://github.com/valkey-io/valkey-operator), which provisions and manages Valkey on Kubernetes."
  - question: "Does OpenEverest support high availability and sharding for Valkey?"
    answer: "Yes. Choose the replication topology for a primary with read replicas, or the cluster topology to shard data across multiple primaries, each with its own replicas."
  - question: "Which Valkey versions are supported?"
    answer: "OpenEverest tracks the Valkey versions supported by the provider, currently Valkey 9.0 and 8.1. See the [provider repository](https://github.com/openeverest/provider-valkey) for the current version matrix."

# Trademark attribution, rendered at the bottom of the page.
trademark_note: "Valkey is a project of LF Projects, LLC. Redis is a registered trademark of Redis Ltd. OpenEverest is not affiliated with, endorsed by, or sponsored by Redis Ltd. These names are used for identification purposes only."
---
