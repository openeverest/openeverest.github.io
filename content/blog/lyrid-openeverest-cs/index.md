---
title: "Lyrid case study: DBaaS powered by OpenEverest to the rescue!"
date: 2026-02-12T12:00:00
draft: false
image:
    url: lyrid_openeverest.png
authors:
  - gwozdzm
  - hsutano
tags:
  - blog
  - casestudy
  - kubernetes
  - community
  - dbaas 
summary: The case study explaining how OpenEverest supports the Lyrid.io platform team.
---

# The problem

Database deployment in Kubernetes is fragmented, and there’s no single solution for all the different DBs.

# Introduction

Building a Database as a Service for your customers is not a trivial task, especially if you are a public cloud provider. Choosing Kubernetes to run your workloads has a lot of advantages: it gives you flexibility, and there are plenty of different solutions on the market that can be a part of your perfect technology stack. The real challenge is to build a solid, reliable foundation that will be possible to maintain without causing a headache for your platform team. With databases, it’s even more important to use proven in battle technology, as no one wants to see their data unavailable and their application down.  And here comes OpenEverest!

## Lyrid's journey

While Lyrid was working on DBaaS implementation, the team came across several obstacles:
1. Teams must design and maintain their own patterns for persistent volumes, clustering, failover, and upgrades for databases.
2. High operational overhead for backups and disaster recovery. Without DBaaS, engineers must script and monitor backups, test restores, manage point‑in‑time recovery, and design cross‑region DR themselves, increasing the risk of data loss or long outages.
3. Scaling and performance tuning are manual and fragile. Capacity planning, sharding/replication strategies, index tuning, and query optimization all fall on the team, often without deep database expertise, leading to over‑provisioning or performance bottlenecks.
4. Security, compliance, and access control become a patchwork. Encryption, secret management, network policies, database user management, and audit trails must be assembled from multiple tools and kept in sync across clusters and environments.
5. Observability is fragmented. Metrics, logs, and traces for Kubernetes and databases live in different silos, making it difficult to quickly pinpoint whether an incident is infrastructure‑, app‑, or database‑related.
5. Skill gap and context switching for DevOps teams. The same team is expected to be expert in Kubernetes, multiple cloud providers, and several database engines at once, stretching capacity and slowing down feature delivery.

Problems above forced the Lyrid’s team to find a better way than building the service from scratch, and here comes OpenEverest for a rescue: by installing the software, the IT team was able to create a Unified API to direct to DBaaS dedicated infrastructures with pricing. The result is an easy-to-consume public Database-as-a-Service solution for Lyrid’s customers and reduced complex tasks for the platform team.

## Quote from Lyrid CEO:

“By integrating OpenEverest natively into Lyrid, we deliver a fully managed, cloud‑agnostic data platform that lets developers launch production-grade, scalable databases in minutes instead of weeks.”

## Future expectations:

While successful OpenEverest is already supporting Lyrid’s customers, there are still expectations that will be implemented in future releases:
1. Support for more database technologies
2. Managing workloads across multiple Kubernetes clusters - databases that can span/replicate to more than one location
3. Fully Automated Disaster Recovery solutions: offsite standby cluster that can automatically become a primary

## Conclusion:

Successful implementation of DBaaS can be easier than you thought, and Lyrid’s case is a great example of that. OpenEverest is still evolving, so you can expect more databases and database-related technologies to be implemented in the future. Currently, the maintainers team is working on adding features like Clickhouse support, a first vector database, and a replacement for MinIO. Multi-cluster support and more advanced DR solutions are on the [roadmap](https://github.com/openeverest/roadmap) as well. Last but not least, OpenEverest is a community-driven project, so anyone can influence the direction by submitting an [issue](https://github.com/openeverest/openeverest/issues) or participating in the [Community Slack](https://cloud-native.slack.com/archives/C09RRGZL2UX) discussions. And if community support is not enough for you, you can count on the [Solanica](https://solanica.io/) team to provide you support services.

## About Lyrid:

[Lyrid](https://www.lyrid.io/) is a cloud‑agnostic, Kubernetes‑native platform that lets customers deploy applications across public clouds and local datacenters, with managed Kubernetes, databases, and object storage in a single platform.