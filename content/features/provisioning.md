---
title: "Database Provisioning"
date: 2025-01-15T10:00:00
draft: false
weight: 2
feature_icon: "scaling"
summary: "Scale horizontally or vertically, manage storage tiers, and recover from disasters through a single API."

sections:
  - title: "Flexible Scaling"
    icon: "scaling"
    description: "Match your database topology to your workload. OpenEverest supports both horizontal and vertical scaling for any traffic pattern."
    items:
      - title: "Horizontal Scaling"
        description: "Add or remove replica nodes to distribute read traffic and increase availability. Multi-node clusters are a first-class concept."
      - title: "Vertical Scaling"
        description: "Adjust CPU and memory for existing nodes without reprovisioning. With Kubernetes 1.35+, in-place resizing means zero downtime."
      - title: "Topology-Aware Placement"
        description: "Control anti-affinity, zone spread, and node selectors to keep your database resilient to infrastructure failures."

  - title: "Storage Management"
    icon: "storage"
    description: "Databases live and die by their storage layer. OpenEverest gives you fine-grained control over storage classes to balance performance, durability, and cost."
    items:
      - title: "Storage Class Selection"
        description: "Choose the right Kubernetes storage class per cluster: fast NVMe for OLTP, cost-effective HDD for archival, or cloud-native options like gp3 and pd-ssd."
      - title: "Dynamic Volume Expansion"
        description: "Grow persistent volumes on the fly when your data outgrows the initial allocation. No migration required."
      - title: "Cost Optimization"
        description: "Right-size storage allocations instead of over-provisioning. Pay for what you actually use."

  - title: "Disaster Recovery"
    icon: "backup"
    description: "Backups are not optional. OpenEverest provides on-demand and scheduled backups with point-in-time recovery, so you can restore to any moment, not just the last snapshot."
    items:
      - title: "On-Demand Backups"
        description: "Trigger a full backup at any time through the UI, API, or a Custom Resource."
      - title: "Point-in-Time Recovery (PITR)"
        description: "Restore your database to any second within the retention window. Critical for recovering from accidental writes or data corruption."
      - title: "Backup-to-Database"
        description: "Spin up a new cluster directly from a backup, useful for staging environments, testing migrations, or forensic analysis."
      - title: "Scheduled Retention"
        description: "Configure automated backup schedules and retention policies. Set it once and stop worrying."

  - title: "Advanced Configuration"
    icon: "config"
    description: "Production databases need tuning. OpenEverest exposes engine-level parameters and network controls without requiring kubectl access."
    items:
      - title: "Engine Parameters"
        description: "Override PostgreSQL, MySQL, or MongoDB configuration knobs directly in the cluster spec."
      - title: "External Access"
        description: "Expose databases via LoadBalancer, NodePort, or keep them cluster-internal. Control ingress per cluster."
      - title: "Custom Sidecars"
        description: "Attach monitoring agents, log forwarders, or custom init containers to your database pods."
---
