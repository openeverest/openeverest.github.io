---
title: "MongoDB provider now spreads pods across nodes and zones for high availability"
date: 2026-10-07T12:06:25Z
draft: false
topics:
 - mongodb
 - high-availability
 - releases
link: https://docs.openeverest.io/
summary: MongoDB clusters now default to spreading pods across nodes and availability zones, with mongod pods required to run on separate hosts.
---

The OpenEverest MongoDB provider now defaults to placing cluster pods across different nodes and availability zones using Kubernetes topology spread constraints. It also enforces that mongod pods must run on separate hosts, improving resilience against single-node failures without manual anti-affinity rules.

Previously, pod placement was left mostly to the default scheduler with limited HA guidance, which could leave multiple replicas on the same node depending on cluster autoscaler behavior.

High-availability pod placement is available now for all Percona Server for MongoDB clusters managed through OpenEverest. To learn more, visit the [MongoDB provider documentation](https://docs.openeverest.io/).
