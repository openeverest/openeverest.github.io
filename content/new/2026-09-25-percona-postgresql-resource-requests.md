---
title: "Percona PostgreSQL provider adds Kubernetes resource request support"
date: 2026-09-25T10:04:07
draft: false
topics:
 - percona-postgresql
n - postgresql
 - kubernetes
 - releases
link: https://github.com/openeverest/provider-percona-postgresql/releases/tag/v0.3.0
summary: The Percona PostgreSQL provider now lets you set Kubernetes CPU and memory resource requests through the OpenEverest UI.
---

The Percona PostgreSQL provider now supports Kubernetes resource requests, so you can control how much CPU and memory the PostgreSQL pods reserve on your cluster nodes.

OpenEverest surfaces these fields in the instance creation and edit flows, letting you balance density, performance, and cost without switching to kubectl or Helm. The provider passes the values through to the underlying Percona Operator.

Resource request support is available now in Percona PostgreSQL provider v0.3.0.
