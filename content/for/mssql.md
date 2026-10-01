---
title: "Microsoft SQL Server"
technology: "Microsoft SQL Server"
summary: "Solanica's Microsoft SQL Server solution for OpenEverest. Provision standalone instances or Always-On Availability Groups, with native backups and point-in-time recovery through a single UI and API, powered by the Solanica MSSQL Operator."
logo: "/images/for/mssql/logo.svg"
tagline: "Always-On Availability Groups on Kubernetes."
weight: 6
draft: false

# Carousel: screenshots are required; add a slide with `youtube:` for an embedded video.
slides:
  - image: "/images/for/mssql/for-mssql-0.png"
    title: "Guided SQL Server Provisioning"
    description: "Pick a standalone or Availability Group topology, SQL Server version, edition, and resources in a few clicks — no manual manifests."
  - image: "/images/for/mssql/for-mssql-1.png"
    title: "Instance Overview"
    description: "After creation get the connection details, Availability Group settings, and a high level overview of the instance."
  - image: "/images/for/mssql/for-mssql-2.png"
    title: "Backups & Recovery"
    description: "Schedule native SQL Server backups to S3-compatible storage with configurable retention."
  - image: "/images/for/mssql/for-mssql-3.png"
    title: "Provided by Solanica"
    description: "Once the Solanica MSSQL provider is installed, Microsoft SQL Server appears in the OpenEverest provider catalog."

# Key capabilities. `icon` maps to layouts/partials/feature-icon.html keywords.
capabilities:
  - icon: "scaling"
    title: "Always-On Availability Groups"
    description: "Run SQL Server as an Availability Group across replicas with synchronous replication, readable secondaries, and automatic failover."
  - icon: "backup"
    title: "Backups & PITR"
    description: "On-demand and scheduled native SQL Server backups to S3-compatible storage, with point-in-time recovery for standalone instances."
  - icon: "database-engines"
    title: "Versions & Editions"
    description: "Choose SQL Server 2019, 2022, or 2025 and the edition per instance — Developer, Express, Standard, or Enterprise."
  - icon: "private-deploy"
    title: "TLS by Default"
    description: "Encrypted client connections are on by default, with auto-generated or bring-your-own certificates and automatic rotation."
  - icon: "monitoring"
    title: "Monitoring"
    description: "Enable a metrics exporter sidecar and an optional Prometheus PodMonitor directly from the provisioning flow."
  - icon: "config"
    title: "Advanced Configuration"
    description: "Tune CPU, memory, disk, storage class, external access, and SQL Server settings without touching kubectl."

repos_title: "Documentation"
# Solanica documentation for the components powering this integration.
repos:
  - label: "Solanica MSSQL Provider"
    url: "https://solanica.io/docs/category/mssql-provider"
    description: "The OpenEverest provider by Solanica that integrates Microsoft SQL Server into the platform: installation, topologies, versions, and backups."
  - label: "Solanica MSSQL Operator"
    url: "https://solanica.io/docs/mssql-operator/overview"
    description: "The Kubernetes operator by Solanica that runs SQL Server instances and Availability Groups under the hood."

# Attribution to the operator that powers the databases.
powered_by:
  - name: "Solanica MSSQL Operator"
    url: "https://solanica.io/docs/mssql-operator/overview"
    description: "Microsoft SQL Server on OpenEverest is a Solanica solution. Instances are powered by the Solanica MSSQL Operator, which manages the full lifecycle of standalone SQL Server instances and Always-On Availability Groups on Kubernetes."

# FAQ: rendered as an accordion and emitted as FAQPage structured data for SEO.
faq:
  - question: "Who provides Microsoft SQL Server support for OpenEverest?"
    answer: "Microsoft SQL Server on OpenEverest is built and maintained by [Solanica](https://solanica.io). It is delivered as the Solanica [MSSQL provider](https://solanica.io/docs/category/mssql-provider), which plugs into the OpenEverest API and UI."
  - question: "How does OpenEverest run SQL Server under the hood?"
    answer: "The Solanica MSSQL provider translates an OpenEverest `Instance` into resources for the [Solanica MSSQL Operator](https://solanica.io/docs/mssql-operator/overview), which provisions and manages SQL Server on Kubernetes."
  - question: "Do I need a SQL Server license?"
    answer: "It depends on the edition. Developer (non-production) and Express are free; Standard and Enterprise require a license from Microsoft. Licensing and compliance are your responsibility."
  - question: "Does OpenEverest support high availability for SQL Server?"
    answer: "Yes. Choose the Availability Group topology to run SQL Server across multiple replicas with automatic failover. Availability Groups are not available on the Express edition."
  - question: "Can I back up and restore SQL Server?"
    answer: "Yes. OpenEverest supports on-demand and scheduled native SQL Server backups to S3-compatible storage, with point-in-time recovery for standalone instances. Backups require SQL Server 2022 or later."
  - question: "Which SQL Server versions are supported?"
    answer: "SQL Server 2019, 2022, and 2025, with 2025 as the default. See the [versions page](https://solanica.io/docs/extensions/mssql-provider/versions) for the current matrix."

# Trademark attribution, rendered at the bottom of the page.
trademark_note: "Microsoft and SQL Server are trademarks of the Microsoft group of companies. The MSSQL provider and MSSQL Operator are developed by Solanica. OpenEverest is not affiliated with, endorsed by, or sponsored by Microsoft. These names are used for identification purposes only."
---

Microsoft SQL Server on OpenEverest is a [Solanica](https://solanica.io) solution. Solanica develops and maintains both the [MSSQL provider](https://solanica.io/docs/category/mssql-provider) that plugs SQL Server into OpenEverest and the [MSSQL Operator](https://solanica.io/docs/mssql-operator/overview) that runs it on Kubernetes.
