---
title: "Plugin Bench brings pgbench benchmarks to the OpenEverest UI"
date: 2026-10-07T15:25:22Z
draft: false
topics:
 - plugins
 - postgresql
 - releases
link: https://github.com/openeverest/plugin-bench/releases/tag/v0.1.0
summary: A new plugin runs pgbench against your PostgreSQL instances from the cluster page and shows the results, no kubectl needed.
---

How fast is this PostgreSQL instance, really? [Plugin Bench](https://github.com/openeverest/plugin-bench) v0.1.0 answers that from inside OpenEverest. It adds a **Performance Benchmark** tab to PostgreSQL cluster pages. Pick a database, set the duration, number of clients and threads, and the scale factor, then start a [pgbench](https://www.postgresql.org/docs/current/pgbench.html) run.

Each run gets its own short-lived Kubernetes Job. The plugin fetches the instance's connection details through the OpenEverest API, passes them to the runner in a temporary Secret, collects the output, and deletes both when the run ends. Runs are asynchronous, so you can watch the status while the benchmark works.

This first release is an MVP. It supports PostgreSQL only and doesn't keep a run history yet. The **initialize** option drops and recreates the pgbench tables, so point it at a disposable database. Install it from the [Extension Hub](https://openeverest.io/documentation/2.0.0-dev.4/extend/hub.html), or run `helm install plugin-bench oci://ghcr.io/openeverest/charts/plugin-bench --version 0.1.0 -n everest-system`. Requires OpenEverest v2.0.0-dev.4 or later.
