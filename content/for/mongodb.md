---
title: "MongoDB"
technology: "MongoDB"
summary: "Provision, scale, and back up production-grade MongoDB clusters on any Kubernetes cluster. Replica sets, sharding, automated backups, and point-in-time recovery through a single UI and API."
logo: "/images/for/mongodb/logo.svg"
weight: 2
draft: false

# Carousel: screenshots are required; add a slide with `youtube:` for an embedded video.
slides:
  - image: "/images/for/mongodb/for-mongodb-0.png"
    title: "Guided MongoDB Provisioning"
    description: "Spin up a single replica set or a sharded cluster in a few clicks — no manual manifests."
  - image: "/images/for/mongodb/for-mongodb-3.png"
    title: "Cluster Overview"
    description: "After creation get the connection details and high level overview of the instance."
  - image: "/images/for/mongodb/for-mongodb-1.png"
    title: "Backups & Recovery"
    description: "Schedule backups to S3-compatible storage and restore with point-in-time recovery."
  - image: "/images/for/mongodb/for-mongodb-2.png"
    title: "Advanced Configuration"
    description: "Fine tune your MongoDB instances, control availability zones scheduling and networking."
  # Example video slide (uncomment and set the YouTube ID when available):
  # - youtube: "VIDEO_ID"
  #   title: "MongoDB on OpenEverest in 3 minutes"

# Key capabilities. `icon` maps to layouts/partials/feature-icon.html keywords.
capabilities:
  - icon: "multi-cloud"
    title: "Self-Service UI & API"
    description: "Provision and operate MongoDB from a single web UI and API — a familiar experience for teams coming from Atlas or Ops Manager, on your own Kubernetes."
  - icon: "scaling"
    title: "High Availability & Sharding"
    description: "Run MongoDB as a replica set for automatic failover, or scale out horizontally with sharding."
  - icon: "backup"
    title: "Backups & PITR"
    description: "On-demand and scheduled backups with point-in-time recovery to S3-compatible storage via Percona Backup for MongoDB."
  - icon: "storage"
    title: "Flexible Storage"
    description: "Pick the storage class per cluster and expand volumes online as your data grows."
  - icon: "config"
    title: "Advanced Configuration"
    description: "Tune mongod and mongos parameters, external access, and topology without touching kubectl."
  - icon: "private-deploy"
    title: "TLS & Security"
    description: "Operator-managed certificate management and encrypted connections between clients and nodes."

# Open-source repositories powering this integration.
repos:
  - label: "provider-percona-server-mongodb"
    url: "https://github.com/openeverest/provider-percona-server-mongodb"
    description: "The OpenEverest provider that integrates MongoDB into the platform."

# Attribution to the operator that powers the databases.
powered_by:
  name: "percona/percona-server-mongodb-operator"
  url: "https://github.com/percona/percona-server-mongodb-operator"
  description: "MongoDB clusters on OpenEverest are powered by the open-source Percona Operator for MongoDB, which manages the full lifecycle of Percona Server for MongoDB on Kubernetes."

# FAQ: rendered as an accordion and emitted as FAQPage structured data for SEO.
faq:
  - question: "Is MongoDB free to run on OpenEverest?"
    answer: "Yes. OpenEverest is open-source with no licensing fees, and it runs MongoDB on your own Kubernetes cluster, in the cloud or on-premises."
  - question: "How does OpenEverest run MongoDB under the hood?"
    answer: "MongoDB clusters are managed by the open-source [Percona Operator for MongoDB](https://github.com/percona/percona-server-mongodb-operator), which handles provisioning, high availability, backups, and updates on Kubernetes."
  - question: "Does OpenEverest support high availability for MongoDB?"
    answer: "Yes. You can run MongoDB as a replica set for automatic failover, and scale out horizontally with sharding for larger workloads."
  - question: "Can I back up and restore MongoDB?"
    answer: "OpenEverest supports on-demand and scheduled backups to S3-compatible storage, with point-in-time recovery, powered by Percona Backup for MongoDB."
  - question: "Which MongoDB versions are supported?"
    answer: "OpenEverest tracks the versions supported by the underlying Percona Operator for MongoDB. See the provider repository for the current version matrix."

# Trademark attribution, rendered at the bottom of the page.
trademark_note: "MongoDB, MongoDB Atlas, and Ops Manager are trademarks of MongoDB, Inc. Percona and Percona Server for MongoDB are trademarks of Percona, LLC. OpenEverest is not affiliated with, endorsed by, or sponsored by MongoDB, Inc. or Percona, LLC. These names are used for identification and comparison purposes only."
---
