---
title: "How OpenEverest works"
date: 2025-12-10T12:00:00
draft: false
image:
    url: blog-how-openeverest-works-cover.jpg
    attribution: https://unsplash.com/photos/a-piece-of-a-puzzle-with-a-missing-piece-cWMhxNmQVq0
authors:
  - chilagrow
tags:
  - blog
  - kubernetes
  - community
summary: This guide walks you through main components that make up OpenEverest and how they interact.
---

OpenEverest is a cloud-native database platform that simplifies database provisioning and management on Kubernetes. It consists of several key components that work together to provide a seamless experience for users. Here's an overview of how OpenEverest works:

## OpenEverest UI

The OpenEverest UI is a web-based interface that provides a user-friendly way to manage database deployments. It communicates with the OpenEverest API Server to display information about databases and perform management tasks.

## OpenEverest API Server

The OpenEverest API Server is the central component that exposes a RESTful API for managing database deployments. It handles requests from the UI, and interacts with the OpenEverest Operator to perform actions such as database provisioning, scaling, and configuring monitoring.

## OpenEverest CLI

The OpenEverest CLI is used to perform Kubernetes administrative tasks such as user account management, RBAC and namespace management. It also provisions and upgrades OpenEverest.

## OpenEverest Operator

The [OpenEverest Operator](github.com/percona/everest-operator) is a Kubernetes Operator that manages the lifecycle of database deployments. It uses Kubernetes Operators for [MySQL](github.com/percona/percona-xtradb-cluster-operator), [MongoDB](github.com/percona/percona-server-mongodb-operator), and [PostgreSQL](github.com/percona/percona-postgresql-operator) under the hood but provides a unified API and a single pane of glass for managing all three database types.

## Helm charts

OpenEverest uses [helm charts](github.com/percona/percona-helm-charts) to simplify the deployment of its components on Kubernetes. Helm is a package manager for Kubernetes that allows users to define, install, and upgrade complex Kubernetes applications.
