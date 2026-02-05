---
title: "Monitoring of Data Workload Operators"
date: 2026-02-05T00:00:00
draft: false
image:
    url: monitoring.png
authors:
 - chilagrow
tags:
 - blog
 - kubernetes
 - monitoring
summary: Explore how popular data workload operators expose metrics and integrate with Prometheus and Grafana for monitoring in Kubernetes environments.
---

## Introduction

Monitoring is a critical aspect of running data workloads in Kubernetes. As we develop the plugin ecosystem for OpenEverest, we are currently researching how various operators handle monitoring to ensure our integrations follow industry best practices. Different operators have adopted various approaches to expose metrics and integrate with monitoring stacks. This blog post explores how some operators implement monitoring and observability for their respective data workloads. We focus specifically on metrics collection and monitoring integration, while distributed tracing may be explored in a future post.

## Monitoring Integration Patterns

Many Kubernetes data workload operators follow similar patterns for monitoring:

- **Metrics Exporters**: Dedicated containers or sidecars that expose metrics
- **Prometheus Integration**: The de facto standard for metrics collection in Kubernetes
- **Service Discovery**: Automatic discovery of monitoring endpoints using Kubernetes service discovery
- **Grafana Dashboards**: Pre-built dashboards for visualizing metrics

## Operator Comparison

The following table summarizes monitoring capabilities across different operators:

<style>
.monitoring-table {
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
}
.monitoring-table thead tr {
  border-bottom: 2px solid #ddd;
}
.monitoring-table th {
  padding: 12px;
  text-align: left;
}
.monitoring-table tbody tr {
  border-bottom: 1px solid #eee;
}
.monitoring-table td {
  padding: 12px;
}
</style>

<div class="monitoring-table">

| Operator | Metrics Exposure | Monitoring | Dashboard |
|----------|------------------|------------|-----------|
| ClickHouse Operator | Built-in | Prometheus | Grafana |
| Milvus Operator | Built-in | Prometheus | Grafana |
| Kafka Operator (Strimzi) | JMX Exporter | Prometheus | Grafana |
| Redis Operator | Redis Exporter (sidecar) | Prometheus | Grafana |
| CloudNativePG Operator | Built-in | Prometheus | Grafana |
| TiDB Operator | Built-in | Prometheus / VictoriaMetrics | Grafana + Custom |

</div>

## Understanding Prometheus Operator Custom Resources

The [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator) introduces Custom Resources (CRs) that simplify the configuration of Prometheus monitoring in Kubernetes. Two key resources are ServiceMonitor and PodMonitor. Both CRs provide automatic service discovery, eliminating the need to manually update Prometheus configuration files when pods or services are added or removed.

### ServiceMonitor

ServiceMonitor is a CR that declaratively specifies how groups of Kubernetes services should be monitored. Instead of manually configuring Prometheus scrape targets, you define a ServiceMonitor that references services using label selectors.

ServiceMonitor is ideal when:
- Metrics are exposed via Kubernetes Services
- You want to monitor all pods behind a service uniformly

### PodMonitor

PodMonitor is similar to ServiceMonitor but directly targets pods instead of services. This is useful when you need to scrape metrics from pods that don't have a corresponding service, or when you need more granular control over individual pod monitoring.

PodMonitor is ideal when:
- Pods expose metrics without going through a service
- Metrics endpoints are pod-specific (e.g., individual database instances)

## Details of Operators

### ClickHouse Operator

The [ClickHouse Operator](https://github.com/Altinity/clickhouse-operator) exposes metrics directly from ClickHouse pods. It integrates with Prometheus Operator using Kubernetes service discovery and supports Grafana for visualization.

- **Metrics exposure**: Built-in metrics
- **Monitoring**: Prometheus Operator; [config template](https://github.com/Altinity/clickhouse-operator/blob/release-0.25.6/deploy/prometheus/prometheus-template.yaml)
- **Dashboards**: [Setup](https://github.com/Altinity/clickhouse-operator/blob/release-0.25.6/docs/grafana_setup.md) using Grafana Operator

### Milvus Operator

The [Milvus Operator](https://github.com/milvus-io/milvus) exposes metrics from each Milvus component. It integrates with Prometheus Operator using ServiceMonitor CR for component discovery.

- **Metrics exposure**: Built-in metrics
- **Monitoring**: Prometheus Operator using ServiceMonitor CR; [docs](https://milvus.io/docs/v2.4.x/monitor.md)
- **Dashboards**: [Visualize](https://milvus.io/docs/visualize.md) metrics using Grafana

### Kafka Operator (Strimzi)

The [Strimzi Kafka Operator](https://github.com/strimzi/strimzi-kafka-operator) exports metrics via [JMX Exporter](https://github.com/prometheus/jmx_exporter). It uses ServiceMonitor CR for Prometheus discovery and provides example Grafana dashboards.

- **Metrics exposure**: JMX Exporter (Java agent)
- **Monitoring**: Prometheus Operator using ServiceMonitor CR; [docs](https://strimzi.io/docs/operators/in-development/deploying#assembly-metrics-str)
- **Dashboards**: [Example](https://strimzi.io/docs/operators/in-development/deploying#ref-metrics-dashboards-str) of Grafana dashboards

### Redis Operator

The [Redis Operator](https://github.com/OT-CONTAINER-KIT/redis-operator) by Opstree Solutions uses a sidecar exporter. It integrates with Prometheus Operator via PodMonitor CR. Metrics can be visualized in Grafana.

- **Metrics exposure**: [Redis Exporter](https://github.com/oliver006/redis_exporter) sidecar
- **Monitoring**: Prometheus Operator + PodMonitor; [docs](https://redis-operator.opstree.dev/docs/monitoring/#podmonitor)
- **Dashboards**: [Grafana dashboards](https://redis-operator.opstree.dev/docs/monitoring/#grafana-dashboards)

### CloudNativePG Operator

[CloudNativePG](https://cloudnative-pg.io/) exposes metrics from each PostgreSQL instance. It works with Prometheus Operator using PodMonitor CR.

- **Metrics exposure**: Built-in
- **Monitoring**: Prometheus Operator + PodMonitor; [docs](https://cloudnative-pg.io/documentation/1.17/monitoring/)
- **Dashboards**: [Setup](https://cloudnative-pg.io/documentation/1.17/quickstart/#part-4-monitor-clusters-with-prometheus-and-grafana) Grafana dashboard to monitor CloudNativePG

### TiDB Operator

The [TiDB Operator](https://github.com/pingcap/tidb-operator) exposes metrics from each component. It supports both Prometheus Operator and VictoriaMetrics Operator for flexible monitoring backend selection.

- **Metrics exposure**: Built-in
- **Monitoring**: Prometheus Operator or VictoriaMetrics via custom resources; [docs](https://docs.pingcap.com/tidb-in-kubernetes/v2.0/monitor-a-tidb-cluster/)
- **Dashboards**: [TiDB Dashboard](https://docs.pingcap.com/tidb/stable/dashboard-intro/) and Grafana

## Best Practices

When implementing monitoring for operators, consider these best practices:

1. **Enable Service Discovery**: Automatic endpoint discovery reduces manual configuration
2. **Deploy Grafana Dashboards**: Pre-built dashboards provide immediate visibility

## Conclusion

Kubernetes operators for data workloads have converged on Prometheus as the standard for metrics collection, with many providing native integration through Prometheus Operator. The use of service discovery, pre-built exporters, and Grafana dashboards makes it easy to achieve comprehensive observability for data workloads running in Kubernetes.

By understanding the monitoring capabilities of each operator, you can make informed decisions about which solution best fits your observability requirements and existing monitoring infrastructure.