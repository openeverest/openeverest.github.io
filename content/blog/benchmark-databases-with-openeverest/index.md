---
title: "Introducing Plugin Bench: Database Benchmarking in OpenEverest"
date: 2026-11-17T00:00:00+05:00
draft: false
image:
    url: plugin-bench-cover-mountain.jpg
    attribution:
authors:
  - amh1k
tags:
  - blog
  - plugins
  - benchmarking
  - postgresql
  - mysql
  - mongodb
summary: "Meet Plugin Bench: run PostgreSQL, MySQL, and MongoDB workloads from OpenEverest, review run details, and revisit previous results."
---

Your database is running. How does it respond under load? Whether you are exploring a new deployment or checking the effect of a configuration change, a benchmark can provide a useful starting point.

Plugin Bench brings database benchmarking into OpenEverest. You can configure a workload, launch a run, inspect the outcome, and return to earlier results from the same interface you use to manage your database instances. It integrates established benchmark tools for PostgreSQL, MySQL, and MongoDB, making them accessible without assembling a separate command-line workflow. **Support for more databases is coming soon**, expanding the range of instances you can benchmark from OpenEverest.

## Three databases, one familiar interface

The Performance Benchmark page brings your supported database instances together in one place. Each entry identifies the instance, its namespace, and its benchmark tool. Benchmarking is also available through the Performance Benchmark tab on an individual instance.

[![Performance Benchmark overview listing PostgreSQL with pgbench, MySQL with Sysbench, and MongoDB with go-ycsb.](overview-all-instances.png)](overview-all-instances.png)

*Find PostgreSQL/pgbench, MySQL/Sysbench, and MongoDB/go-ycsb instances in one place.*

A workload is the mix of operations a benchmark performs against a database. Plugin Bench currently offers three combinations, according to the supported provider and the tools enabled by your administrator:

- **PostgreSQL with pgbench:** runs the standard built-in transaction workload.
- **MySQL with Sysbench:** runs an OLTP read/write workload, exercising a mix of reads and writes.
- **MongoDB with go-ycsb:** runs Workload A, configured for 50% reads and 50% updates.

These are the first supported databases. More database integrations are planned soon, extending the same configuration, results, and history experience to additional technologies.

## Control the workload from the UI

The benchmark form exposes the settings relevant to the selected tool. You can adjust concurrency and dataset size, choose how much work to perform, and prepare fresh benchmark data or reuse an existing dataset.

PostgreSQL and MySQL runs use a measured duration. MongoDB runs use an operation count, with the elapsed time depending on how quickly the database completes that work. The controls differ, while the experience of configuring and launching a run stays familiar.

<a href="mysql-sysbench-configuration.png" style="display:block;max-width:680px;margin:0 auto;" aria-label="Open full-size MySQL Sysbench configuration screenshot">
  <img src="mysql-sysbench-configuration.png" alt="MySQL Sysbench configuration form showing duration, threads, table count, dataset size, and optional runner settings." style="display:block;width:100%;height:auto;" />
</a>

*MySQL with Sysbench: tailor the workload to the test you want to run.*

Optional CPU and memory settings control the benchmark workload generator. Node affinity lets users select runner nodes by label, while administrators can configure tolerations through Helm to allow runners onto tainted nodes, such as a dedicated benchmark node pool. These settings do not change the database instance’s resources or placement. Connection details come through OpenEverest, so there is no database password field to fill in before each run.

Use disposable test data: benchmarks generate real database load, and preparation creates or modifies benchmark datasets. Those datasets remain available afterward for reuse.

## Inspect results without digging through logs

Completed runs can report throughput and average latency alongside the settings used. Throughput shows how much work the database completes per second, while average latency shows how long an operation takes. PostgreSQL and MySQL report transactions per second; MongoDB reports operations per second.

Each result card also records the run’s status and effective workload settings. Expandable **Raw logs** provide the underlying tool output, helping you investigate a failed run or check that a completed run used the configuration you intended. If metrics are unavailable, you can still inspect the status and logs.

<a href="mongodb-goycsb-result.png" style="display:block;max-width:440px;margin:0 auto;" aria-label="Open full-size MongoDB go-ycsb result screenshot">
  <img src="mongodb-goycsb-result.png" alt="One successful MongoDB go-ycsb result card showing effective settings, throughput, average latency, and expandable raw logs." style="display:block;width:100%;height:auto;" />
</a>

*MongoDB with go-ycsb: review the workload settings alongside throughput and latency.*

Measurements such as throughput and latency depend on the tool, dataset, resources, and other activity in the environment. The screenshots show local demonstration runs; your results may differ. Use repeated runs with consistent settings to explore your own deployment, and interpret results within the same workload rather than treating different tools as a ranking of databases.

## Return to earlier runs

Each instance has its own recent benchmark history. The list displays its 20 most recent runs, showing when a run started, its tool, status, elapsed duration, and available results. You can reopen previous run details to review their settings and output.

[![MySQL Sysbench history listing successful and failed runs, elapsed durations, result summaries, and links to details.](mysql-3.png)](mysql-3.png)

*MySQL with Sysbench: revisit earlier settings and outcomes when planning your next test.*

History includes failed runs as well as successful ones, keeping their outcomes visible for investigation. Its duration represents the overall elapsed time, including startup and preparation, so it can be longer than the measured test period. By default, history is held in memory, disappears on restart, and completed records expire after one hour. For durable history, configure the plugin’s [PostgreSQL storage backend](https://github.com/openeverest/plugin-bench#run-history-storage).

## Try it on a test instance

Plugin Bench extends OpenEverest v2 with database benchmarking. This introduction covers Plugin Bench **v0.3.0**. See the [Plugin Bench repository](https://github.com/openeverest/plugin-bench) for requirements and installation details.

For MySQL, provide an existing disposable database. The included go-ycsb version currently benchmarks only the `ycsb` MongoDB database, and the instance credentials need read/write access to it.

Start with a small workload on a test instance and explore the results. As support for more databases arrives, the goal is to keep benchmarking accessible through this familiar interface. If you have feedback about the experience or a workload you would like to see supported, [share it with the project](https://github.com/openeverest/plugin-bench/issues).
