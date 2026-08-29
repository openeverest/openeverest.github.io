---
title: "MariaDB"
technology: "MariaDB"
summary: "Provision, scale, and back up production-grade MariaDB clusters on any Kubernetes cluster. High availability, automated backups, and point-in-time recovery through a single UI and API."
logo: "/images/for/mariadb/logo.svg"
weight: 1
draft: false

# Carousel: screenshots are required; add a slide with `youtube:` for an embedded video.
slides:
  - image: "/images/for/mariadb/for-mariadb-0.png"
    title: "Guided MariaDB Provisioning"
    description: "Spin up a single node or a highly available cluster in a few clicks — no manual manifests."
  - image: "/images/for/mariadb/for-mariadb-3.png"
    title: "Cluster Overview"
    description: "After creation get the connection details and high level overview of the instance."
  - image: "/images/for/mariadb/for-mariadb-1.png"
    title: "Backups & Recovery"
    description: "Schedule logical and physical backups to S3-compatible storage and restore with ease."
  - image: "/images/for/mariadb/for-mariadb-2.png"
    title: "Advanced Configuration"
    description: "Fine tune your MariaDB instances, control availability zones scheduling and networking."
  # Example video slide (uncomment and set the YouTube ID when available):
  # - youtube: "VIDEO_ID"
  #   title: "MariaDB on OpenEverest in 3 minutes"

# Key capabilities. `icon` maps to layouts/partials/feature-icon.html keywords.
capabilities:
  - icon: "scaling"
    title: "High Availability"
    description: "Run MariaDB with native replication or Galera for automatic failover and zero-downtime maintenance."
  - icon: "backup"
    title: "Backups & PITR"
    description: "On-demand and scheduled backups with point-in-time recovery to S3, Azure, or persistent volumes."
  - icon: "storage"
    title: "Flexible Storage"
    description: "Pick the storage class per cluster and expand volumes online as your data grows."
  - icon: "config"
    title: "Advanced Configuration"
    description: "Tune engine parameters, external access, and topology without touching kubectl."
  - icon: "private-deploy"
    title: "TLS & Security"
    description: "Automated certificate management and encrypted connections between clients and nodes."

# Open-source repositories powering this integration.
repos:
  - label: "provider-mariadb"
    url: "https://github.com/openeverest/provider-mariadb"
    description: "The OpenEverest provider that integrates MariaDB into the platform."

# Attribution to the operator that powers the databases.
powered_by:
  - name: "mariadb-operator/mariadb-operator"
    url: "https://github.com/mariadb-operator/mariadb-operator"
    description: "MariaDB clusters on OpenEverest are powered by the open-source mariadb-operator, which manages the full lifecycle of MariaDB on Kubernetes."

# FAQ: rendered as an accordion and emitted as FAQPage structured data for SEO.
faq:
  - question: "Is MariaDB free to run on OpenEverest?"
    answer: "Yes. OpenEverest is open-source with no licensing fees, and it runs MariaDB on your own Kubernetes cluster, in the cloud or on-premises."
  - question: "How does OpenEverest run MariaDB under the hood?"
    answer: "MariaDB clusters are managed by the open-source [mariadb-operator](https://github.com/mariadb-operator/mariadb-operator), which handles provisioning, high availability, backups, and updates on Kubernetes."
  - question: "Does OpenEverest support high availability for MariaDB?"
    answer: "Yes. You can run MariaDB with native replication or Galera for automatic failover and zero-downtime maintenance."
  - question: "Can I back up and restore MariaDB?"
    answer: "OpenEverest supports on-demand and scheduled backups to S3-compatible storage. Both Physical and Logical."
  - question: "Which MariaDB versions are supported?"
    answer: "OpenEverest tracks the versions supported by the underlying mariadb-operator. See the provider repository for the current version matrix."
---
