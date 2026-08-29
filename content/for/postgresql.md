---
title: "PostgreSQL"
technology: "PostgreSQL"
summary: "Provision, scale, and operate production-grade PostgreSQL clusters on any Kubernetes cluster. High availability, automated backups, point-in-time recovery, and a choice of CloudNativePG or Percona through a single UI and API."
logo: "/images/for/postgresql/logo.svg"
weight: 3
draft: false

# The final annotated screenshots are stored under static/images/for/postgresql/.
slides:
  - image: "/images/for/postgresql/for-postgresql-0.png"
    title: "Guided PostgreSQL Provisioning"
    description: "Provision a PostgreSQL instance from the OpenEverest UI and choose the provider that best fits your workload."
  - image: "/images/for/postgresql/for-postgresql-3.png"
    title: "Cluster Overview"
    description: "Review cluster health, connection details, replicas, resources, and the current PostgreSQL topology."
  - image: "/images/for/postgresql/for-postgresql-1.png"
    title: "Backups & Recovery"
    description: "Configure backup storage, schedule backups, and recover PostgreSQL data with point-in-time recovery."
  - image: "/images/for/postgresql/for-postgresql-2.png"
    title: "CloudNativePG Advanced Configuration"
    description: "Configure PostgreSQL storage and engine settings through the CloudNativePG provider without writing Kubernetes manifests."

# Key capabilities. `icon` maps to layouts/partials/feature-icon.html keywords.
capabilities:
  - icon: "multi-cloud"
    title: "Two PostgreSQL Providers"
    description: "Choose between the CloudNativePG-based provider and the provider built on Percona Operator for PostgreSQL."
  - icon: "scaling"
    title: "High Availability"
    description: "Run PostgreSQL with replicas and operator-managed failover for resilient production workloads."
  - icon: "backup"
    title: "Backups & PITR"
    description: "Create on-demand and scheduled backups with point-in-time recovery to S3-compatible storage."
  - icon: "storage"
    title: "Flexible Storage"
    description: "Choose the storage class and expand cluster volumes as your PostgreSQL data grows."
  - icon: "config"
    title: "Advanced Configuration"
    description: "Tune PostgreSQL parameters, resources, topology, external access, and scheduling from the platform."
  - icon: "private-deploy"
    title: "TLS & Security"
    description: "Keep PostgreSQL on your own Kubernetes infrastructure with encrypted client and node connections."

# Open-source repositories powering this integration.
repos:
  - label: "provider-cloudnative-pg"
    url: "https://github.com/AdityaPimpalkar/provider-cloudnative-pg"
    description: "The OpenEverest provider that provisions PostgreSQL clusters through CloudNativePG."
  - label: "provider-percona-postgresql"
    url: "https://github.com/openeverest/provider-percona-postgresql"
    description: "The OpenEverest provider that integrates Percona Operator for PostgreSQL."

# PostgreSQL is powered by two supported upstream operators.
powered_by:
  - name: "cloudnative-pg/cloudnative-pg"
    url: "https://github.com/cloudnative-pg/cloudnative-pg"
    description: "The CloudNativePG operator manages PostgreSQL clusters on Kubernetes, including replication, failover, and PostgreSQL lifecycle operations."
  - name: "percona/percona-postgresql-operator"
    url: "https://github.com/percona/percona-postgresql-operator"
    description: "Percona Operator for PostgreSQL manages the lifecycle of highly available PostgreSQL clusters on Kubernetes."

# FAQ: rendered as an accordion and emitted as FAQPage structured data for SEO.
faq:
  - question: "Is PostgreSQL free to run on OpenEverest?"
    answer: "Yes. OpenEverest is open-source with no licensing fees, and it runs PostgreSQL on your own Kubernetes cluster, in the cloud or on-premises."
  - question: "Which PostgreSQL providers does OpenEverest support?"
    answer: "OpenEverest supports two PostgreSQL providers: one based on [CloudNativePG](https://github.com/cloudnative-pg/cloudnative-pg), and one based on [Percona Operator for PostgreSQL](https://github.com/percona/percona-postgresql-operator)."
  - question: "How do I choose between the PostgreSQL providers?"
    answer: "Both providers expose PostgreSQL through OpenEverest. Choose based on the operator features, supported versions, backup behavior, and operational requirements of your workload. Refer to each provider repository for its current capabilities and version matrix."
  - question: "Does OpenEverest support high availability for PostgreSQL?"
    answer: "Yes. PostgreSQL clusters can run with replicas and operator-managed failover. The exact topology and failover behavior depend on the provider you select."
  - question: "Can I back up and restore PostgreSQL?"
    answer: "OpenEverest supports on-demand and scheduled backups with point-in-time recovery to S3-compatible storage. The exact backup implementation depends on the selected provider."
  - question: "Which PostgreSQL versions are supported?"
    answer: "Supported PostgreSQL versions depend on the selected provider and its upstream operator. Check the [CloudNativePG provider](https://github.com/AdityaPimpalkar/provider-cloudnative-pg) or [Percona PostgreSQL provider](https://github.com/openeverest/provider-percona-postgresql) repository for the current version matrix."

# Trademark attribution for the upstream projects named on this page.
trademark_note: "PostgreSQL and CloudNativePG are trademarks or names of their respective owners. Percona and Percona Operator for PostgreSQL are trademarks or names of Percona, LLC. OpenEverest is not affiliated with, endorsed by, or sponsored by these organizations."
---

> Provider-specific note: these screenshots represent OpenEverest workflows across both PostgreSQL providers. Available configuration options may vary between the CloudNativePG and Percona PostgreSQL providers.
