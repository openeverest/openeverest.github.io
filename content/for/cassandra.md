---
title: "Apache Cassandra"
technology: "Apache Cassandra"
summary: "Run Apache Cassandra on any Kubernetes cluster. Provision a cluster from a preset, scale nodes and resources, back it up to S3-compatible storage with Medusa, keep it repaired with Reaper, and watch it from the instance page, all through one UI and API, powered by k8ssandra-operator."
description: "Self-hosted Apache Cassandra on Kubernetes with OpenEverest: presets, horizontal and vertical scaling, version upgrades, Medusa backups and in-place restores to S3-compatible storage, scheduled Reaper repairs, and Prometheus metrics with a built-in dashboard."
tagline: "Wide-column NoSQL at scale, on your platform."
logo: "/images/for/cassandra/logo.svg"
weight: 13
draft: false

# Carousel: screenshots are required; add a slide with `youtube:` for an embedded video.
slides:
  - image: "/images/for/cassandra/for-cassandra-0.png"
    title: "Guided Provisioning"
    description: "Start from the three-node preset or configure everything yourself: version, nodes, CPU, memory, disk, JVM heap, monitoring, and scheduled repairs, with a live summary of every choice."
  - image: "/images/for/cassandra/for-cassandra-1.png"
    title: "Cluster Overview"
    description: "Copy the CQL endpoint and credentials, and review the version, resources, heap, repairs, monitoring, and backup status of the cluster at a glance."
  - image: "/images/for/cassandra/for-cassandra-2.png"
    title: "Backups With Medusa"
    description: "Take on-demand backups and schedule recurring ones to any S3-compatible storage, with retention by count. Restore a backup in place from the same page."
  - image: "/images/for/cassandra/for-cassandra-3.png"
    title: "Built-In Metrics"
    description: "The Metrics tab charts client requests, p99 latency, and timeouts by request type, native clients, disk space, and pending compactions, next to the CPU and memory of every pod."

# Key capabilities. `icon` maps to layouts/partials/feature-icon.html keywords.
capabilities:
  - icon: "config"
    title: "Presets or Full Control"
    description: "Create a three-node cluster from the bundled preset in one click, or set the version, node count, resources, storage class, and JVM heap yourself."
  - icon: "scaling"
    title: "Scale and Upgrade"
    description: "Add or remove Cassandra nodes, change CPU and memory, grow volumes when the StorageClass allows it, and upgrade from Cassandra 4.1 to 5.0 by changing the version."
  - icon: "backup"
    title: "Backups & Restores"
    description: "Back up with Medusa to S3-compatible storage, on demand or on a schedule with count-based retention, and restore a backup in place."
  - icon: "alerting"
    title: "Scheduled Repairs"
    description: "Turn on Reaper and every non-system keyspace is repaired on a schedule, incrementally on Cassandra 4 and later, so deleted data does not come back."
  - icon: "monitoring"
    title: "Metrics Without Sidecars"
    description: "Send the management API's metrics to Prometheus or another monitoring destination with no restart, and chart them on the instance page."
  - icon: "private-deploy"
    title: "Authentication On"
    description: "Every cluster starts with password authentication and authorization enabled, and OpenEverest publishes the superuser credentials as a Kubernetes Secret."

# Open-source repositories powering this integration.
repos:
  - label: "provider-cassandra"
    url: "https://github.com/openeverest/provider-cassandra"
    description: "The OpenEverest provider that turns an Instance into a K8ssandraCluster and reports its health, built on the Provider SDK."
  - label: "plugin-metrics"
    url: "https://github.com/openeverest/plugin-metrics"
    description: "The OpenEverest plugin that adds the Metrics tab with a built-in Cassandra dashboard."

# Attribution to the projects that power Cassandra on OpenEverest.
powered_by:
  - name: "apache/cassandra"
    url: "https://github.com/apache/cassandra"
    description: "Apache Cassandra is the open-source, Apache-2.0 distributed NoSQL database for high write throughput and no single point of failure."
  - name: "k8ssandra/k8ssandra-operator"
    url: "https://github.com/k8ssandra/k8ssandra-operator"
    description: "k8ssandra-operator and cass-operator run Cassandra on Kubernetes, with Medusa for backups and Reaper for repairs."

# FAQ: rendered as an accordion and emitted as FAQPage structured data for SEO.
faq:
  - question: "Is Apache Cassandra free to run on OpenEverest?"
    answer: "Yes. OpenEverest, Apache Cassandra, and k8ssandra-operator are open source under the Apache 2.0 license, with no licensing fees, and everything runs on your own Kubernetes cluster, in the cloud or on-premises."
  - question: "How does OpenEverest run Cassandra under the hood?"
    answer: "The [provider-cassandra](https://github.com/openeverest/provider-cassandra) provider translates an OpenEverest `Instance` into a `K8ssandraCluster` for [k8ssandra-operator](https://github.com/k8ssandra/k8ssandra-operator), which runs the Cassandra nodes, Medusa, and Reaper. The provider reports health, connection details, and credentials back onto the `Instance` and never manages pods directly."
  - question: "Which Cassandra versions are supported?"
    answer: "Cassandra 5.0 (the default) and 4.1. Raise the version of an existing cluster and the nodes are upgraded one at a time. See the [provider repository](https://github.com/openeverest/provider-cassandra#versions) for the exact patch releases."
  - question: "Where are backups stored, and how do I restore one?"
    answer: "Backups are taken by Medusa, which runs as a sidecar of every Cassandra node, and written to S3-compatible storage such as Amazon S3, MinIO, Ceph RGW, or [SeaweedFS](/for/seaweedfs/). Schedules keep the last N backups. A restore runs in place on the same cluster. Point-in-time recovery is not supported yet."
  - question: "Why do Cassandra clusters need repairs?"
    answer: "Cassandra must repair every keyspace within `gc_grace_seconds` (10 days by default), or deleted data can reappear. Enable scheduled repairs and OpenEverest runs [Reaper](https://cassandra-reaper.io) next to the cluster. It picks up new keyspaces automatically, and adding or removing it does not restart Cassandra."
  - question: "How do I monitor a Cassandra cluster?"
    answer: "Every Cassandra node serves its metrics through the k8ssandra management API. Add a monitoring destination, such as Prometheus through [monitoring-prometheus](https://github.com/openeverest/monitoring-prometheus), and OpenEverest creates the scrape configuration for you. With [plugin-metrics](https://github.com/openeverest/plugin-metrics) installed, the instance page gets a Metrics tab with a Cassandra dashboard."
  - question: "Can I run several datacenters or enable TLS?"
    answer: "Not yet. The provider currently runs a single datacenter, and client and internode TLS are not supported. Both are on the [provider roadmap](https://github.com/openeverest/provider-cassandra/blob/main/ROADMAP.md)."

# Optional override of the closing call-to-action text.
cta_description: "Deploy OpenEverest on any Kubernetes cluster and run your first Apache Cassandra cluster in minutes."

# Trademark attribution, rendered at the bottom of the page.
trademark_note: "Apache, Apache Cassandra, Cassandra, and the Apache Cassandra logo are trademarks of The Apache Software Foundation. OpenEverest is not affiliated with, endorsed by, or sponsored by The Apache Software Foundation. These names are used for identification purposes only."
---
