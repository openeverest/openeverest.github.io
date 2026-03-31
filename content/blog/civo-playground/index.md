---
title: "Sovereign DBaaS on Civo: Running OpenEverest in Minutes"
date: 2026-03-30T10:00:00Z
draft: false
image:
    url: openeverest-and-civo.png
    attribution:
authors:
  - spron-in
tags:
  - blog
  - kubernetes
  - civo
  - database
  - dbaas
  - cloud
summary: Deploy OpenEverest on Civo Kubernetes in minutes. A step-by-step guide to running a sovereign, self-controlled DBaaS platform on Civo's fast and simple cloud infrastructure — plus a ready-to-use Taskfile for full automation.
---

When Civo launched a few years ago, it stood out for one thing: speed and simplicity. Spinning up a Kubernetes cluster took at most two minutes and a single command. That's still true today — but Civo has grown into something more. A strong focus on **data sovereignty** has been added to the mix, which is exactly what we care about at OpenEverest.

With growing legal requirements, compliance mandates, and geopolitical tensions, knowing *where* your workloads and data run is no longer optional — it's a requirement. You need to be in control.

**OpenEverest** is built on this same principle: your databases run where you want them, managed by you, with no lock-in. In this post, we show you how to spin up OpenEverest on Civo Kubernetes and get a fully sovereign DBaaS running in minutes.

## TL;DR

Want to fully automate the setup from your terminal? Grab the [Taskfile.yml](#automate-with-taskfile) included with this post.

---

## Prerequisites

You'll need the following tools installed:

- **[Civo CLI](https://www.civo.com/docs/overview/civo-cli)** — to manage your Civo resources from the terminal
- **[kubectl](https://kubernetes.io/docs/tasks/tools/)** — to interact with your Kubernetes cluster
- **[everestctl](https://openeverest.io/documentation/current/quick-install.html)** — the OpenEverest CLI

Install `everestctl` on macOS:

```bash
brew tap openeverest/tap
brew install everestctl
```

Install `civo` CLI on macOS:

```bash
brew install civo
```

---

## 1. Configure Civo

### API Key

Get your API key from the Civo dashboard. A pre-generated key is usually already waiting for you. If you can't find it, follow the [Civo API keys guide](https://www.civo.com/docs/account/api-keys).

Save your key to the Civo CLI:

```bash
civo apikey save playground <YOUR_API_KEY>
```

### Region

For sovereign deployments, picking the right region matters. List available regions:

```bash
civo region list
```

Set your preferred region:

```bash
civo region current lon1
```

---

## 2. Object Storage (Optional)

If you plan to use database backups and restores, you need S3-compatible object storage. Civo provides its own managed solution — here's how to set it up:

Create storage credentials:

```bash
civo objectstore credential create openeverest-creds
```

Create the backup bucket:

```bash
civo objectstore create openeverest-backups --owner-name openeverest-creds
```

You can also use any other S3-compatible storage, including self-hosted solutions like [RustFS](https://rustfs.com/).

---

## 3. Create a Kubernetes Cluster

Create a Civo Kubernetes cluster and automatically merge its kubeconfig:

```bash
civo kubernetes create openeverest --wait --save --switch
```

Your cluster will be ready in 1–2 minutes. The `--wait` flag holds until it's fully provisioned, `--save` writes the kubeconfig locally, and `--switch` sets it as the active context.

Need a custom setup? You can specify node size, count, Kubernetes version, and more. See the [Civo cluster creation docs](https://www.civo.com/docs/kubernetes/create-a-cluster).

---

## 4. Install OpenEverest

Install OpenEverest using `everestctl`. We use `--skip-wizard` here for a non-interactive installation, and expose the UI via a `LoadBalancer` service so it's reachable from outside the cluster:

```bash
everestctl install \
  --namespaces everest \
  --operator.mongodb=true \
  --operator.postgresql=true \
  --operator.mysql=true \
  --skip-wizard \
  --helm.set server.service.type=LoadBalancer
```

> **Security note:** Exposing OpenEverest via `LoadBalancer` is convenient for a playground. The UI and API are protected by authentication, but for production workloads it's recommended to keep OpenEverest internal and use a VPN or ingress with proper access controls.

---

## 5. Access the UI

Once installation completes, get the external IP of the LoadBalancer:

```bash
kubectl get svc everest -n everest-system \
  -o jsonpath='{.status.loadBalancer.ingress[0].ip}'
```

Open a browser and navigate to `http://<IP>:8080`.

Log in with:
- **Username:** `admin`
- **Password:** retrieve it with:

```bash
everestctl accounts initial-admin-password
```

---

## Automate with Taskfile

We've put together a `Taskfile.yml` that automates the entire workflow above. It supports configuration via environment variables and falls back to interactive prompts when they aren't set.

Download: [Taskfile.yml](https://raw.githubusercontent.com/openeverest/openeverest.github.io/main/content/blog/civo-playground/Taskfile.yml)

### Install Task

```bash
brew install go-task
```

### Environment Variables

| Variable | Default | Description |
|---|---|---|
| `CIVO_API_KEY` | *(prompted)* | Your Civo API key |
| `CIVO_REGION` | *(prompted)* | Civo region code (e.g. `lon1`) |
| `CLUSTER_NAME` | `openeverest` | Name for the Kubernetes cluster |
| `SERVICE_TYPE` | `LoadBalancer` | Kubernetes service type for the OpenEverest UI |

### Available Tasks

| Task | Description |
|---|---|
| `task configure` | Save Civo API key and set region |
| `task cluster:create` | Create the Civo Kubernetes cluster |
| `task storage:create` | Create object storage for backups (optional) |
| `task openeverest:install` | Install OpenEverest on the cluster |
| `task openeverest:url` | Print the UI URL |
| `task openeverest:password` | Print the initial admin password |
| `task deploy` | Run the full deployment end-to-end |
| `task teardown` | **Destroy** the Civo cluster (prompts for confirmation) |

### Full Deployment

Run everything with a single command:

```bash
task deploy
```

Or with environment variables pre-set:

```bash
CIVO_API_KEY=your-key CIVO_REGION=lon1 task deploy
```

### Teardown

To remove the cluster and free up resources:

```bash
task teardown
```

You'll be prompted to confirm before anything is deleted.

---

## Civo Marketplace

We're also [working on adding OpenEverest](https://github.com/civo/kubernetes-marketplace/pull/1067) to the Civo Marketplace, which will make the installation even simpler — a one-click deploy directly from the Civo dashboard. Stay tuned.

---

Running OpenEverest on Civo gives you fast provisioning, a clean developer experience, and the data sovereignty your teams and compliance frameworks require. The Civo infrastructure paired with OpenEverest's operator-based database management means you're not handing control over to anyone — your data stays where you put it.

Clone the Taskfile and run it yourself. Questions or feedback? Join the [OpenEverest community](/#community).
