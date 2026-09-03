---
title: "ClickHouse"
technology: "ClickHouse"
summary: "Provision, scale, and secure production-grade ClickHouse clusters on any Kubernetes cluster. Standalone or replicated topologies through a single UI and API, powered by the Altinity Kubernetes Operator for ClickHouse."
logo: "/images/for/clickhouse/logo.svg"
weight: 4
draft: true

# Carousel: screenshots are required; add a slide with `youtube:` for an embedded video.
# TODO(#143): slides 2-4 still need to be captured against a live
# provider-altinity-clickhouse instance. See static/images/for/clickhouse/README.txt.
slides:
  - image: "/images/for/clickhouse/for-clickhouse-0.png"
    title: "Guided ClickHouse Provisioning"
    description: "Pick a standalone or replicated topology, ClickHouse version, and resources in a few clicks — no manual manifests."
  - image: "/images/for/clickhouse/for-clickhouse-1.png"
    title: "Advanced Configuration"
    description: "Fine tune your ClickHouse instances, storage class, and resource allocation."
  - image: "/images/for/clickhouse/for-clickhouse-2.png"
    title: "Cluster Overview"
    description: "After creation get the connection details and high level overview of the instance."

# Key capabilities. `icon` maps to layouts/partials/feature-icon.html keywords.
capabilities:
  - icon: "multi-cloud"
    title: "Guided Provisioning"
    description: "Create a ClickHouse database from the OpenEverest UI by choosing a namespace, display name, and topology — no manual manifests."
  - icon: "scaling"
    title: "Standalone or Replicated"
    description: "Run a single-node ClickHouse instance or a replicated topology with a configurable number of replicas."
  - icon: "database-engines"
    title: "Version Selection"
    description: "Pick the ClickHouse version for your cluster directly from the provisioning flow."
  - icon: "monitoring"
    title: "Monitoring"
    description: "A Prometheus metrics endpoint is always exposed, with an optional PodMonitor managed for you from the provisioning flow."
  - icon: "private-deploy"
    title: "Secure Connections"
    description: "Opt in to TLS for encrypted client connections, backed by cert-manager, and connect with an automatically provisioned admin user."
  - icon: "config"
    title: "Advanced Configuration"
    description: "Tune CPU, memory, disk, storage class, external access, and ClickHouse server settings without touching kubectl or the underlying ClickHouseInstallation directly."

# Open-source repositories powering this integration.
repos:
  - label: "provider-altinity-clickhouse"
    url: "https://github.com/openeverest/provider-altinity-clickhouse"
    description: "The OpenEverest provider that integrates ClickHouse into the platform, built on the Provider SDK."

# Attribution to the operator that powers the databases.
powered_by:
  - name: "Altinity/clickhouse-operator"
    url: "https://github.com/Altinity/clickhouse-operator"
    description: "ClickHouse clusters on OpenEverest are powered by the open-source Altinity Kubernetes Operator for ClickHouse, which manages the full lifecycle of ClickHouse on Kubernetes."

# FAQ: rendered as an accordion and emitted as FAQPage structured data for SEO.
faq:
  - question: "Is ClickHouse free to run on OpenEverest?"
    answer: "Yes. OpenEverest is open-source with no licensing fees, and it runs ClickHouse on your own Kubernetes cluster, in the cloud or on-premises."
  - question: "How does OpenEverest run ClickHouse under the hood?"
    answer: "ClickHouse clusters are managed by the open-source [Altinity Kubernetes Operator for ClickHouse](https://github.com/Altinity/clickhouse-operator), wrapped by the [provider-altinity-clickhouse](https://github.com/openeverest/provider-altinity-clickhouse) provider, which handles provisioning and lifecycle management on Kubernetes."
  - question: "Does OpenEverest support high availability for ClickHouse?"
    answer: "Yes. You can choose a replicated topology with multiple replicas in addition to a standalone single-node deployment."
  - question: "Does OpenEverest support TLS and authentication for ClickHouse?"
    answer: "Yes. Each cluster is provisioned with a dedicated admin user, and you can opt in to TLS for encrypted client connections (this requires cert-manager in the cluster)."
  - question: "Can I back up and restore ClickHouse?"
    answer: "Not yet. Backups, point-in-time recovery, and restore are on the roadmap for the ClickHouse provider but are not available today."
  - question: "Which ClickHouse versions are supported?"
    answer: "OpenEverest tracks the versions supported by the underlying provider-altinity-clickhouse. See the provider repository for the current version matrix."

# Trademark attribution for the upstream projects named on this page.
trademark_note: "ClickHouse® is a registered trademark of ClickHouse, Inc. Altinity and the Altinity Kubernetes Operator for ClickHouse are trademarks or names of Altinity, Inc. OpenEverest is not affiliated with, endorsed by, or sponsored by these organizations."
---
