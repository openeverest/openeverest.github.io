---
title: "Neo4j"
technology: "Neo4j"
summary: "Run the Neo4j graph database on any Kubernetes cluster. Start a Community server or an Enterprise cluster from a preset, add analytics and read servers, back it up to S3-compatible storage, restore it, and chart its metrics, all through one UI and API, powered by the Neo4j Kubernetes Operator."
description: "Self-hosted Neo4j on Kubernetes with OpenEverest: Community standalone servers and Enterprise clusters with analytics and read pools, TLS by default, scaling and version upgrades, on-demand and scheduled backups to S3-compatible storage, restores, and Prometheus metrics."
tagline: "The graph database, on your platform."
logo: "/images/for/neo4j/logo.svg"
weight: 14
draft: false

# Carousel: screenshots are required; add a slide with `youtube:` for an embedded video.
slides:
  - image: "/images/for/neo4j/for-neo4j-0.png"
    title: "Start From a Preset"
    description: "Pick the Community standalone preset or the three-member Enterprise cluster preset, choose a namespace and a name, and create. The summary shows every setting before you do."
  - image: "/images/for/neo4j/for-neo4j-1.png"
    title: "Primaries, Analytics and Read Servers"
    description: "Run three or more primaries and add an analytics pool for heavy graph queries and a read pool for read traffic, each sized on its own."
  - image: "/images/for/neo4j/for-neo4j-2.png"
    title: "Cluster Overview"
    description: "Copy the Bolt endpoint, credentials, and TLS connection URL, and review the edition, license, members, pools, monitoring, and backups at a glance."
  - image: "/images/for/neo4j/for-neo4j-3.png"
    title: "Scheduled Backups"
    description: "Schedule Neo4j Enterprise online backups to any S3-compatible storage with count- or time-based retention, or take one on demand."
  - image: "/images/for/neo4j/for-neo4j-4.png"
    title: "Neo4j Metrics"
    description: "Chart any Neo4j metric, such as committed transactions or Bolt connections, next to the CPU and memory of every member on the instance page."

# Key capabilities. `icon` maps to layouts/partials/feature-icon.html keywords.
capabilities:
  - icon: "database-engines"
    title: "Community or Enterprise"
    description: "Run a single Community server by default, or switch to Enterprise for clusters, online backups, and metrics. You accept the Enterprise license yourself, for production or evaluation."
  - icon: "scaling"
    title: "Clusters That Grow"
    description: "Run primaries for writes and add analytics and read servers next to them. Change members, CPU, and memory, grow volumes, and upgrade Neo4j with a rolling restart."
  - icon: "private-deploy"
    title: "TLS by Default"
    description: "Bolt and HTTPS are encrypted from the first start, with a CA managed through cert-manager or your own Secret or Issuer, and the CA is published with the connection details."
  - icon: "backup"
    title: "Backups & Restores"
    description: "Take online backups to S3-compatible storage on demand or on a schedule with retention, restore one in place, or start a new instance from it."
  - icon: "monitoring"
    title: "Prometheus Metrics"
    description: "Send Neo4j Enterprise metrics to Prometheus or VictoriaMetrics with one choice, and chart them on the instance page."
  - icon: "multi-cloud"
    title: "Reach It Anywhere"
    description: "Keep the database on a ClusterIP Service, or expose Bolt and HTTP(S) through a NodePort or LoadBalancer, on any cloud or on-premises."

# Open-source repositories powering this integration.
repos:
  - label: "provider-neo4j"
    url: "https://github.com/openeverest/provider-neo4j"
    description: "The OpenEverest provider that turns an Instance into a Neo4j cluster and reports its health, built on the Provider SDK."
  - label: "plugin-metrics"
    url: "https://github.com/openeverest/plugin-metrics"
    description: "The OpenEverest plugin that adds the Metrics tab, where you chart Neo4j metrics next to CPU and memory."

# Attribution to the projects that power Neo4j on OpenEverest.
powered_by:
  - name: "neo4j/neo4j"
    url: "https://github.com/neo4j/neo4j"
    description: "Neo4j is the graph database that stores data as nodes and relationships and queries it with Cypher. Neo4j Community Edition is open source under the GPLv3."
  - name: "neo4j-partners/neo4j-kubernetes-operator"
    url: "https://github.com/neo4j-partners/neo4j-kubernetes-operator"
    description: "The Neo4j Kubernetes Operator runs Neo4j servers and clusters on Kubernetes, with TLS, backups, and restores."

# FAQ: rendered as an accordion and emitted as FAQPage structured data for SEO.
faq:
  - question: "Is Neo4j free to run on OpenEverest?"
    answer: "OpenEverest and the Neo4j Kubernetes Operator are open source under the Apache 2.0 license, and Neo4j Community Edition is free under the GPLv3. Neo4j Enterprise Edition, which clusters, online backups, and metrics need, is commercial software from Neo4j, Inc.: you accept its license yourself, either for production or for evaluation. OpenEverest never supplies or bypasses a Neo4j license."
  - question: "How does OpenEverest run Neo4j under the hood?"
    answer: "The [provider-neo4j](https://github.com/openeverest/provider-neo4j) provider translates OpenEverest `Instance`, `Backup`, and `Restore` resources into the `Neo4j`, `Neo4jBackup`, `Neo4jBackupSchedule`, and `Neo4jRestore` resources of the [Neo4j Kubernetes Operator](https://github.com/neo4j-partners/neo4j-kubernetes-operator), which runs the servers. The provider reports health, connection details, and credentials back onto the `Instance` and never manages pods directly."
  - question: "Which Neo4j versions are supported?"
    answer: "Recent Neo4j calendar releases (2026.x) and the 5.26 long-term support line. Raise the version of an existing instance and the operator upgrades it with a rolling restart. See the [provider repository](https://github.com/openeverest/provider-neo4j) for the exact releases."
  - question: "What is the difference between primaries, analytics, and read servers?"
    answer: "Primaries form the cluster's quorum and accept writes, so a cluster needs at least three of them. Analytics and read servers are secondaries: they hold copies of the data for heavy analytical work, such as graph algorithms, and for read traffic, without slowing down the primaries. Each pool is sized on its own."
  - question: "Where are backups stored, and how do I restore one?"
    answer: "Neo4j Enterprise takes online backups while the database keeps serving traffic, and OpenEverest writes them to S3-compatible storage such as Amazon S3, MinIO, Ceph RGW, or [SeaweedFS](/for/seaweedfs/). Schedules keep the last N backups or the backups of a period. Restore a backup into the same instance or start a new instance from it. Point-in-time recovery is not supported."
  - question: "How do I connect to Neo4j?"
    answer: "The instance page shows the host, Bolt port, user, password, and a `neo4j+s://` connection URL, and OpenEverest stores them, with the TLS CA, in a Kubernetes Secret. Connect with any Neo4j driver, Cypher Shell, or Neo4j Browser over Bolt. Choose a NodePort or LoadBalancer Service to reach the database from outside the cluster."
  - question: "How do I monitor Neo4j?"
    answer: "Neo4j Enterprise exposes its metrics in the Prometheus format. Add a monitoring destination, such as Prometheus through [monitoring-prometheus](https://github.com/openeverest/monitoring-prometheus) or VictoriaMetrics, and OpenEverest creates the scrape configuration for you. With [plugin-metrics](https://github.com/openeverest/plugin-metrics) installed, the instance page gets a Metrics tab where you chart any Neo4j metric."

# Optional override of the closing call-to-action text.
cta_description: "Deploy OpenEverest on any Kubernetes cluster and run your first Neo4j graph database in minutes."

# Trademark attribution, rendered at the bottom of the page.
trademark_note: "Neo4j, Cypher, and the Neo4j logo are trademarks of Neo4j, Inc. OpenEverest is not affiliated with, endorsed by, or sponsored by Neo4j, Inc. These names are used for identification purposes only."
---
