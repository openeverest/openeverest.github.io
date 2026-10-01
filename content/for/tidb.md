---
title: "TiDB"
technology: "TiDB"
summary: "Run distributed, MySQL-compatible TiDB clusters on any Kubernetes cluster. Scale SQL, storage, and analytics independently, protect data with backups and point-in-time recovery, and manage it all through a single UI and API, powered by TiDB Operator v2."
tagline: "Distributed, MySQL-compatible SQL with built-in HTAP."
logo: "/images/for/tidb/logo.png"
weight: 7
draft: false

# Carousel: screenshots are required; add a slide with `youtube:` for an embedded video.
slides:
  - image: "/images/for/tidb/for-tidb-0.png"
    title: "Guided TiDB Provisioning"
    description: "Start from a ready-made preset for development, standard, or analytics workloads — or configure the SQL, storage, and PD layers from scratch — and review every setting before you create."
  - image: "/images/for/tidb/for-tidb-1.png"
    title: "HTAP with TiFlash"
    description: "Add columnar TiFlash replicas with their own CPU, memory, and disk to run real-time analytics on live transactional data — no separate pipeline required."
  - image: "/images/for/tidb/for-tidb-2.png"
    title: "Scheduled Backups"
    description: "Schedule recurring TiDB BR snapshot backups to S3-compatible storage, with configurable retention."
  - image: "/images/for/tidb/for-tidb-3.png"
    title: "Cluster Overview"
    description: "Check cluster status, copy MySQL-compatible connection details, and see the sizing and configuration of every component in one view."

# Key capabilities. `icon` maps to layouts/partials/feature-icon.html keywords.
capabilities:
  - icon: "scaling"
    title: "Distributed SQL at Scale"
    description: "Scale the stateless SQL layer, the TiKV storage layer, and the PD control plane independently — add capacity without sharding your application."
  - icon: "database-engines"
    title: "HTAP in One Cluster"
    description: "Add TiFlash columnar replicas to serve analytical queries on live transactional data, with TiProxy for connection management and TiCDC for change data capture."
  - icon: "backup"
    title: "Backups & PITR"
    description: "On-demand and scheduled snapshot backups with log backup for point-in-time recovery to S3-compatible storage, plus restore into new or existing clusters."
  - icon: "storage"
    title: "Safe Day-2 Operations"
    description: "Ordered rolling upgrades with preflight checks, online storage expansion, and graceful scale-in that evicts leaders before removing nodes."
  - icon: "private-deploy"
    title: "TLS & Security"
    description: "Mutual TLS between cluster components, encrypted MySQL client connections, and an auto-generated root password stored as a Kubernetes Secret."
  - icon: "monitoring"
    title: "Monitoring"
    description: "Expose metrics for every component and plug them into your existing Prometheus-based monitoring stack straight from the provisioning flow."
  - icon: "config"
    title: "Advanced Topologies"
    description: "Separate TP and AP SQL groups, PD micro-services mode, placement policies, and presets for common sizings — all from the same UI and API."

# Open-source repositories powering this integration.
repos:
  - label: "provider-tidb"
    url: "https://github.com/openeverest/provider-tidb"
    description: "The OpenEverest provider that integrates TiDB into the platform, built on the Provider SDK."

# Attribution to the operator that powers the databases.
powered_by:
  - name: "pingcap/tidb-operator"
    url: "https://github.com/pingcap/tidb-operator"
    description: "TiDB clusters on OpenEverest are powered by the open-source TiDB Operator v2, which manages the full lifecycle of PD, TiKV, TiDB, and the wider TiDB ecosystem on Kubernetes."

# FAQ: rendered as an accordion and emitted as FAQPage structured data for SEO.
faq:
  - question: "Is TiDB free to run on OpenEverest?"
    answer: "Yes. OpenEverest is open-source with no licensing fees, and it runs TiDB on your own Kubernetes cluster, in the cloud or on-premises."
  - question: "How does OpenEverest run TiDB under the hood?"
    answer: "The [provider-tidb](https://github.com/openeverest/provider-tidb) provider translates an OpenEverest `Instance` into resources for the open-source [TiDB Operator v2](https://github.com/pingcap/tidb-operator): a shared `Cluster` plus one group per component (PD, TiKV, TiDB, and optional TiFlash, TiProxy, and TiCDC)."
  - question: "Is TiDB compatible with MySQL?"
    answer: "Yes. TiDB speaks the MySQL protocol, so existing MySQL drivers, tools, and ORMs connect to it as they would to MySQL. OpenEverest hands you MySQL-style connection details for every cluster."
  - question: "Which TiDB versions are supported?"
    answer: "OpenEverest tracks TiDB LTS releases supported by TiDB Operator v2, currently TiDB 8.5 and 7.5. See the [provider repository](https://github.com/openeverest/provider-tidb) for the current version matrix."

# Trademark attribution, rendered at the bottom of the page.
trademark_note: "TiDB, TiKV, TiFlash, and PingCAP are trademarks of PingCAP, Inc. MySQL is a trademark of Oracle Corporation. OpenEverest is not affiliated with, endorsed by, or sponsored by PingCAP, Inc. or Oracle Corporation. These names are used for identification purposes only."
---
