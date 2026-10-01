---
title: "MySQL"
technology: "MySQL"
summary: "Provision, scale, and back up production-grade MySQL clusters on any Kubernetes cluster. Synchronous replication with Percona XtraDB Cluster, automated backups, and point-in-time recovery through a single UI and API."
logo: "/images/for/mysql/logo.svg"
tagline: "Synchronous replication with Percona XtraDB Cluster."
weight: 1
draft: false

# Carousel: screenshots are required; add a slide with `youtube:` for an embedded video.
slides:
  - image: "/images/for/mysql/for-mysql-1.png"
    title: "Wide MySQL Version Support"
    description: "Choose from a wide range of supported MySQL versions when provisioning your cluster — no manual manifests."
  - image: "/images/for/mysql/for-mysql-0.png"
    title: "Resource Configuration"
    description: "Set replica sizing along with CPU, RAM, and storage per node to match your workload."
  - image: "/images/for/mysql/for-mysql-2.png"
    title: "Cluster Overview"
    description: "After creation get the connection details and high level overview of the ready cluster."
  - image: "/images/for/mysql/for-mysql-3.png"
    title: "Backups & Recovery"
    description: "Create on-demand backups to an S3 bucket, with point-in-time recovery and scheduled backups also supported."
  - image: "/images/for/mysql/for-mysql-4.png"
    title: "Advanced Configuration"
    description: "Fine tune the MySQL engine with custom parameters without touching kubectl."
  # Example video slide (uncomment and set the YouTube ID when available):
  # - youtube: "VIDEO_ID"
  #   title: "MySQL on OpenEverest in 3 minutes"

# Key capabilities. `icon` maps to layouts/partials/feature-icon.html keywords.
capabilities:
  - icon: "scaling"
    title: "Synchronous Replication"
    description: "Run MySQL clustered with Percona XtraDB Cluster for synchronous replication, improved data consistency, and resilient failover on Kubernetes."
  - icon: "backup"
    title: "Backups & PITR"
    description: "On-demand and scheduled backups with point-in-time recovery to S3-compatible storage via Percona XtraBackup."
  - icon: "storage"
    title: "Flexible Storage"
    description: "Pick the storage class per cluster and expand volumes online as your data grows."
  - icon: "database-engines"
    title: "Wide Version Support"
    description: "Pick from a wide range of supported MySQL versions directly in the provisioning flow, and upgrade in place later."
  - icon: "config"
    title: "Advanced Configuration"
    description: "Tune the MySQL engine with custom my.cnf parameters, resources, and topology without touching kubectl."
  - icon: "private-deploy"
    title: "TLS & Security"
    description: "Operator-managed certificate management and encrypted connections between clients and nodes."
  - icon: "monitoring"
    title: "Monitoring with PMM"
    description: "When enabled, metrics are shipped to Percona Monitoring and Management (PMM), so you can track performance, queries, and health of your clusters."

# Open-source repositories powering this integration.
repos:
  - label: "provider-percona-xtradb-cluster"
    url: "https://github.com/openeverest/provider-percona-xtradb-cluster"
    description: "The OpenEverest provider that integrates MySQL, clustered with Percona XtraDB Cluster, into the platform."

# Attribution to the operator that powers the databases.
powered_by:
  - name: "percona/percona-xtradb-cluster-operator"
    url: "https://github.com/percona/percona-xtradb-cluster-operator"
    description: "MySQL clusters on OpenEverest are powered by the open-source Percona Operator for MySQL, based on Percona XtraDB Cluster (PXC), which manages the full lifecycle of synchronous MySQL clusters on Kubernetes."

# FAQ: rendered as an accordion and emitted as FAQPage structured data for SEO.
faq:
  - question: "Is MySQL free to run on OpenEverest?"
    answer: "Yes. OpenEverest is open-source with no licensing fees, and it runs MySQL on your own Kubernetes cluster, in the cloud or on-premises."
  - question: "How does OpenEverest run MySQL under the hood?"
    answer: "MySQL clusters are managed by the open-source [Percona Operator for MySQL](https://github.com/percona/percona-xtradb-cluster-operator), based on Percona XtraDB Cluster (PXC), which handles provisioning, synchronous replication, backups, and updates on Kubernetes."
  - question: "Does OpenEverest support high availability for MySQL?"
    answer: "Yes. MySQL runs clustered with Percona XtraDB Cluster, providing synchronous replication for improved data consistency and resilient failover."
  - question: "Can I back up and restore MySQL?"
    answer: "OpenEverest supports on-demand and scheduled backups to S3-compatible storage, with point-in-time recovery, powered by Percona XtraBackup."
  - question: "Which MySQL versions are supported?"
    answer: "OpenEverest supports a wide range of MySQL versions, tracking those supported by the underlying Percona Operator for MySQL. See the [provider repository](https://github.com/openeverest/provider-percona-xtradb-cluster) for the current version matrix."

# Trademark attribution, rendered at the bottom of the page.
trademark_note: "MySQL is a trademark of Oracle Corporation. Percona, Percona XtraDB Cluster, Percona XtraBackup, and Percona Monitoring and Management (PMM) are trademarks of Percona, LLC. OpenEverest is not affiliated with, endorsed by, or sponsored by Oracle Corporation or Percona, LLC. These names are used for identification purposes only."
---
