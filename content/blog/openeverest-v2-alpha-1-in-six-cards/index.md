---
title: "OpenEverest v2 Alpha 1 in six cards"
date: 2026-11-22T09:00:00
draft: false
authors:
  - spron-in
tags:
  - blog
  - v2
  - release
  - monitoring
  - backups
  - plugins
summary: "Monitoring and backup storage become integrations, every change leaves an event, presets get a team scope, and a backup in a bucket is enough to get a database back. Five features of OpenEverest 2.0.0 Alpha 1, each on one card with a demo from a real cluster and the code behind it."
---

OpenEverest 2.0.0 Alpha 1 is out. Explore five highlights in the cards below, or see the [release notes](https://openeverest.io/docs/2.0.0-alpha.1/release-notes/OpenEverest-2.0.0-alpha.1-2026-11-20/) for the full list.

{{< deck label="OpenEverest v2 Alpha 1 in six cards" >}}

{{< deck/card id="monitoring" nav="Monitoring" title="Choose your monitoring backend" docs="https://openeverest.io/docs/2.0.0-alpha.1/use/monitoring" >}}
Install a monitoring integration, connect it to your server, and add the destination to an instance. Each integration provides its own settings and form.

{{< deck/visual >}}
{{< deck/switcher label="Installed classes" >}}
{{< deck/option name="PMM" >}}
{{< deck/shot src="monitoring-form-pmm.png" alt="The Add monitoring destination form for the PMM class asks for a server URL and a service account token" caption="The provider runs the PMM agent next to the database; the integration only checks the server." />}}
{{< /deck/option >}}
{{< deck/option name="Prometheus" >}}
{{< deck/shot src="monitoring-form-prometheus.png" alt="The form for the Prometheus class asks for a scrape interval and PodMonitor labels" caption="No agent: the integration creates one `PodMonitor` per component from the endpoints the provider publishes." />}}
{{< /deck/option >}}
{{< deck/option name="VictoriaMetrics" >}}
{{< deck/shot src="monitoring-form-victoriametrics.png" alt="The form for the VictoriaMetrics class asks for a scrape interval and VMPodScrape labels" caption="Same idea as Prometheus, with `VMPodScrape` resources." />}}
{{< /deck/option >}}
{{< deck/option name="Coroot" >}}
{{< deck/shot src="monitoring-form-coroot.png" alt="The form for the Coroot class has no parameters" caption="A class also says which providers it works with. On this cluster Coroot reports `Incompatible` for the MongoDB provider, before anyone tries it." />}}
{{< /deck/option >}}
{{< deck/option name="On the instance" >}}
{{< deck/shot src="monitoring-instance.png" alt="The Monitoring card of an instance shows two destinations, prometheus and pmm-prod, both Ready" caption="One instance, two destinations, each with its own status. A broken destination never takes the database out of `Ready`." />}}
{{< /deck/option >}}
{{< /deck/switcher >}}
{{< /deck/visual >}}

{{< deck/example >}}
{{< deck/code name="Install" lang="sh" note="Integrations connect to a server you already run. They don't install one." >}}
helm install monitoring-pmm \
  oci://ghcr.io/openeverest/charts/monitoring-pmm -n everest-system
helm install monitoring-prometheus \
  oci://ghcr.io/openeverest/charts/monitoring-prometheus -n everest-system

kubectl get monitoringclasses
{{< /deck/code >}}
{{< deck/code name="Destinations" lang="yaml" note="Only `classRef`, `parameters` and `authentication` differ between backends." >}}
apiVersion: monitoring.openeverest.io/v1alpha1
kind: MonitoringDestination
metadata:
  name: pmm-prod
  namespace: team-a
spec:
  classRef:
    name: pmm
  parameters:
    url: https://pmm.monitoring.svc
  authentication:
    mode: ServiceAccountToken
    credentialsSecretRef:
      name: pmm-prod-token      # key: token
---
apiVersion: monitoring.openeverest.io/v1alpha1
kind: MonitoringDestination
metadata:
  name: prometheus
  namespace: team-a
spec:
  classRef:
    name: prometheus
  parameters:
    podMonitorLabels:
      release: kube-prometheus-stack
    interval: 30s
{{< /deck/code >}}
{{< deck/code name="Instance" lang="yaml" >}}
apiVersion: core.openeverest.io/v1alpha1
kind: Instance
metadata:
  name: orders
  namespace: team-a
spec:
  monitoring:
    destinations:
      - name: prometheus
        destinationRef:
          name: prometheus
      - name: pmm
        destinationRef:
          name: pmm-prod
{{< /deck/code >}}
{{< deck/code name="Result" lang="console" note="Core creates one `MonitoringBinding` per destination. The Prometheus integration answered with a `PodMonitor`." >}}
$ kubectl get monitoringclasses
NAME              ACCEPTED   AGE
coroot            Accepted   11m
pmm               Accepted   11m
prometheus        Accepted   11m
victoriametrics   Accepted   11m

$ kubectl get monitoringdestinations -n team-a
NAME         CLASS        AUTH                  ACCEPTED   READY   VERSION   INSTANCES   AGE
pmm-prod     pmm          ServiceAccountToken   Accepted   Ready   3.10.0    0           4m38s
prometheus   prometheus   Anonymous             Accepted   Ready             1           6m57s

$ kubectl get monitoringbindings -n team-a
NAME                         INSTANCE   DESTINATION   CLASS        ACCEPTED   CONFIGURED   READY   AGE
orders-prometheus-26264916   orders     prometheus    prometheus   Accepted   Configured   Ready   5m33s

$ kubectl get podmonitors -n team-a
NAME                                AGE
orders-prometheus-26264916-engine   4m12s
{{< /deck/code >}}
{{< /deck/example >}}
{{< /deck/card >}}

{{< deck/card id="backups" nav="Backup storage" title="Storage is no longer hard-coded" docs="https://openeverest.io/docs/2.0.0-alpha.1/backups_and_restore/backup_storage" >}}
Storage classes describe supported technologies and settings. OpenEverest checks compatibility with the provider before a backup is created.

{{< deck/visual >}}
{{< deck/switcher label="Demo" >}}
{{< deck/option name="Refused up front" >}}
{{< deck/term title="gcs-archive sets implementation: gcs" >}}
$ kubectl get backupstorages -n team-a
NAME          TYPE   BUCKET                AUTH        ACCEPTED   AGE
gcs-archive   s3     openeverest-backups   AccessKey   Accepted   6s
s3-prod       s3     openeverest-backups   AccessKey   Accepted   45m

$ kubectl get backupstorage gcs-archive -n team-a \
    -o jsonpath='{.status.backupClasses}' | jq -c '.[] | {name, compatibility, reason}'
{"name":"percona-backup-mongodb","compatibility":"[[Incompatible]]","reason":"[[ParameterUnsupported]]"}

$ kubectl apply -f backup-to-gcs.yaml
Error from server (Forbidden): error when creating "backup-to-gcs.yaml": admission webhook "vbackup-v1alpha1.backup.openeverest.io" [[denied the request]]: backup storage incompatible: BackupStorage "gcs-archive" is Incompatible with BackupClass "percona-backup-mongodb" (ParameterUnsupported): BackupClass "percona-backup-mongodb" does not support the parameters of the storage: schema validation failed: validation errors: implementation: implementation must be one of the following: "aws", "minio", "ceph", "other"
{{< /deck/term >}}
{{< /deck/option >}}
{{< deck/option name="Still in use" >}}
{{< deck/term title="deleting a storage that is still referenced" >}}
$ kubectl delete backupstorage s3-prod -n team-a --wait=false
backupstorage.backup.openeverest.io "s3-prod" deleted from team-a namespace

$ kubectl get backupstorages -n team-a
NAME      TYPE   BUCKET                AUTH        ACCEPTED   AGE
s3-prod   s3     openeverest-backups   AccessKey   Accepted   34m

$ kubectl get backupstorage s3-prod -n team-a \
    -o jsonpath='{.status.conditions}' | jq -c '.[] | {type,status,reason,message}'
{"type":"Accepted","status":"True","reason":"Accepted","message":"valid for BackupStorageClass \"s3\""}
{"type":"Deleting","status":"True","reason":"[[WaitingForReferrers]]","message":"[[still referenced by 1 Instance(s), 1 Backup(s), 2 BackupImport(s)]]"}
{{< /deck/term >}}
{{< /deck/option >}}
{{< deck/option name="The form" >}}
{{< deck/shot src="backup-storage-form.png" alt="The Add backup storage form, with fields for bucket, prefix, region, endpoint URL and implementation" caption="The UI doesn't know these fields. They come from the `s3` class, so another class brings another form." />}}
{{< /deck/option >}}
{{< /deck/switcher >}}
{{< /deck/visual >}}

{{< deck/example >}}
{{< deck/code name="BackupStorage" lang="yaml" note="Create the credentials Secret first, then the storage. The class and the location can't be changed later." >}}
apiVersion: v1
kind: Secret
metadata:
  name: s3-prod-credentials
  namespace: team-a
  labels:
    openeverest.io/backup-storage-class: s3
    openeverest.io/definition: AccessKey
stringData:
  AWS_ACCESS_KEY_ID: <access key>
  AWS_SECRET_ACCESS_KEY: <secret key>
---
apiVersion: backup.openeverest.io/v1alpha1
kind: BackupStorage
metadata:
  name: s3-prod
  namespace: team-a
spec:
  backupStorageClassRef:
    name: s3
  location:
    objectStore:
      bucket: openeverest-backups
      prefix: team-a
  parameters:
    region: us-east-1
    endpointURL: http://s3.objectstore.svc:9000
    implementation: other
    forcePathStyle: true
  authentication:
    mode: AccessKey
    credentialsSecretRef:
      name: s3-prod-credentials
{{< /deck/code >}}
{{< deck/code name="Classes" lang="console" note="One storage class from the core, one backup class from the MongoDB provider." >}}
$ kubectl get backupstorageclasses
NAME   DISPLAY NAME                   AGE
s3     S3-compatible object storage   18m

$ kubectl get backupclasses
NAME                     MODE              PROVIDER                 ACCEPTED   AGE
percona-backup-mongodb   ProviderManaged   percona-server-mongodb   Accepted   18m
{{< /deck/code >}}
{{< deck/code name="Backup" lang="console" note="Every backup records where it was written, so it can be restored after its instance is gone. The Import card uses that." >}}
$ kubectl get backups -n team-a
NAME                      INSTANCE   STORAGE   STATE
orders-before-migration   orders     s3-prod   Succeeded

$ kubectl get backup orders-before-migration -n team-a -o jsonpath='{.status.path}{"\n"}'
team-a/backups/team-a/orders/8c7f5808-b52e-420a-8491-aad314e4a91b/s3-prod
{{< /deck/code >}}
{{< /deck/example >}}
{{< /deck/card >}}

{{< deck/card id="events" nav="Events" title="See who changed what" docs="https://openeverest.io/docs/2.0.0-alpha.1/administer/events" >}}
Changes through the UI, API or Kubernetes produce events with an actor. Events expire with the cluster's Event TTL; [plugin-audit](https://github.com/solanicaio/plugin-audit) keeps a searchable audit log.

{{< deck/visual >}}
{{< deck/switcher label="Demo" >}}
{{< deck/option name="Audit log" >}}
{{< deck/shot src="audit-log.png" alt="The Audit Log page of plugin-audit: a chart of events over time, filters, and a table of events" caption="plugin-audit, filtered to the instances of this demo. Hover the numbers." >}}
{{< deck/spot x="95.5" y="31" >}}Warnings are events where an object moved into a failed state, such as a pod that can't be scheduled.{{< /deck/spot >}}
{{< deck/spot x="52" y="69" >}}Filter by name, engine, kind, event, namespace or actor, or search the text.{{< /deck/spot >}}
{{< deck/spot x="64.5" y="84" >}}The actor: a user, a Kubernetes client such as `kubectl-patch`, or the controller.{{< /deck/spot >}}
{{< deck/spot x="81.5" y="17" >}}Export what you filtered.{{< /deck/spot >}}
{{< /deck/shot >}}
{{< /deck/option >}}
{{< deck/option name="One event" >}}
{{< deck/shot src="audit-event.png" alt="The details of one event: an instance updated by kubectl-patch, with the raw event as JSON" caption="An update made with `kubectl patch`, not through the API. It is recorded all the same." />}}
{{< /deck/option >}}
{{< deck/option name="Console" >}}
{{< deck/term title="who changed what" >}}
$ kubectl patch instance orders-restored -n team-a --type merge \
    -p '{"spec":{"components":{"engine":{"resources":{"limits":{"cpu":"1"}}}}}}'
instance.core.openeverest.io/orders-restored patched

$ curl -s -H "Authorization: Bearer $TOKEN" \
    "$API/events?namespaces=team-a&kinds=Instance&reasons=Created,Updated" \
    | jq -c '.items[] | select(.instance=="orders-restored") | {at: .occurredAt[11:19], type, actor}'
{"at":"15:17:49","type":"instance.created","actor":{"id":"[[admin]]","type":"[[user]]"}}
{"at":"15:21:21","type":"instance.updated","actor":{"id":"kubectl-patch","type":"kubernetes-client"}}
{"at":"15:38:18","type":"instance.updated","actor":{"id":"kubectl-patch","type":"kubernetes-client"}}
{"at":"15:42:50","type":"instance.updated","actor":{"id":"[[kubectl-patch]]","type":"[[kubernetes-client]]"}}
{{< /deck/term >}}
{{< /deck/option >}}
{{< /deck/switcher >}}
{{< /deck/visual >}}

{{< deck/example >}}
{{< deck/code name="List and stream" lang="sh" note="List first, then stream from the list's `resourceVersion` so nothing is missed." >}}
API=http://localhost:8080/v1/clusters/main

curl -s -H "Authorization: Bearer $TOKEN" \
  "$API/events?namespaces=team-a&kinds=Instance,Backup" | jq

curl -sN -H "Authorization: Bearer $TOKEN" \
  "$API/events?watch=true&since=<resourceVersion>"
{{< /deck/code >}}
{{< deck/code name="kubectl" lang="console" note="They are ordinary Kubernetes Events, so `kubectl` reads them too." >}}
$ kubectl get events -n team-a --field-selector reportingComponent=openeverest.io/everest | tail -4
38m         Normal    Created             monitoringdestination/pmm-prod       MonitoringDestination team-a/pmm-prod created
40m         Normal    Created             monitoringdestination/prometheus     MonitoringDestination team-a/prometheus created
40m         Normal    Created             backupstorage/s3-prod                BackupStorage team-a/s3-prod created
6m33s       Normal    DeletionRequested   backupstorage/s3-prod                BackupStorage team-a/s3-prod deletion requested
{{< /deck/code >}}
{{< deck/code name="Auditor role" lang="text" note="Reading events is its own permission, `read-events`. `read` doesn't include it. This is the role plugin-audit runs with here." >}}
p, role:auditor, instances, read-events, */*/*
p, role:auditor, backups, read-events, */*/*
p, role:auditor, restores, read-events, */*/*
p, role:auditor, backup-imports, read-events, */*/*
p, role:auditor, backup-storages, read-events, */*/*
p, role:auditor, monitoring-destinations, read-events, */*/*
p, role:auditor, providers, read-events, */*
p, role:auditor, plugins, read-events, */*
p, role:auditor, installed-extensions, read-events, */*
p, role:auditor, namespaces, read-events, */*
p, role:auditor, platform-events, read, *
g, auditor, role:auditor
{{< /deck/code >}}
{{< deck/code name="Install plugin-audit" lang="sh" >}}
kubectl create secret generic audit-credentials -n everest-system \
  --from-file=username=./username --from-file=password=./password

helm install audit oci://ghcr.io/solanicaio/charts/audit \
  --version 0.2.0 \
  --namespace everest-system \
  --set image.repository=ghcr.io/solanicaio/plugin-audit \
  --set auth.credentialsSecretName=audit-credentials
{{< /deck/code >}}
{{< /deck/example >}}
{{< /deck/card >}}

{{< deck/card id="presets" nav="Presets" title="Give teams their own presets" docs="https://openeverest.io/docs/2.0.0-alpha.1/administer/instance_presets" >}}
Alongside provider-wide presets, teams can define instance configurations in their own namespace. Permissions can restrict users to creating instances that match a preset.

{{< deck/visual >}}
{{< deck/switcher label="Demo" >}}
{{< deck/option name="The guardrail" >}}
{{< deck/term title="alice may only create-from-preset" >}}
$ kubectl get instancepresets -A
NAMESPACE   NAME             AGE
team-a      team-a-mongodb   28m

$ curl -s -X POST $API/instances -H "Authorization: Bearer $ALICE" \
    -H 'Content-Type: application/json' -d @payments-xl.json \
    -o resp.json -w 'HTTP %{http_code}\n'; jq '{reason, differs: [.causes[].field]}' resp.json
HTTP [[403]]
{
  "reason": "[[PresetMismatch]]",
  "differs": [
    "spec.components[engine].storage.size",
    "spec.components[engine].resources.limits[memory]",
    "spec.monitoring"
  ]
}

$ curl -s -X POST $API/instances -H "Authorization: Bearer $ALICE" \
    -H 'Content-Type: application/json' -d @payments.json \
    -o resp.json -w 'HTTP %{http_code}\n'; jq -c '.metadata.annotations' resp.json
HTTP [[201]]
{"openeverest.io/instance-preset":"team-a-mongodb","openeverest.io/last-actor-id":"alice","openeverest.io/last-actor-type":"user"}
{{< /deck/term >}}
{{< /deck/option >}}
{{< deck/option name="In the wizard" >}}
{{< deck/shot src="presets-picker.png" alt="The Create an instance page with three tiles: Start from scratch, psmdb-replicaset and psmdb-sharded" caption="The cluster presets the MongoDB provider ships. Pick one and the deeper steps lock. In Alpha 1 the wizard lists cluster presets only; team presets work through the API and `kubectl`." />}}
{{< /deck/option >}}
{{< /deck/switcher >}}
{{< /deck/visual >}}

{{< deck/example >}}
{{< deck/code name="InstancePreset" lang="yaml" note="The spec has the same shape as an Instance spec." >}}
apiVersion: core.openeverest.io/v1alpha1
kind: InstancePreset
metadata:
  name: team-a-mongodb
  namespace: team-a
spec:
  providerRef:
    name: percona-server-mongodb
  version: "8.0.32"
  topology:
    type: replicaSet
  components:
    engine:
      replicas: 3
      resources:
        limits:
          cpu: "1"
          memory: 2Gi
      storage:
        size: 10Gi
  backup:
    enabled: true
    classRef:
      name: percona-backup-mongodb
    storages:
      - storageRef:
          name: s3-prod            # namespaced: only an InstancePreset can name it
        schedules:
          - name: nightly
            enabled: true
            cron: "0 2 * * *"
            retention:
              type: count
              count: 7
  monitoring:
    destinations:
      - name: prometheus
        destinationRef:
          name: prometheus         # namespaced as well
{{< /deck/code >}}
{{< deck/code name="RBAC" lang="text" note="No `create` on instances: alice can only copy a preset. She also needs to read what the preset references." >}}
p, role:developer, namespaces, read, main/team-a
p, role:developer, providers, read, */*
p, role:developer, instances, read, main/team-a/*
p, role:developer, instance-presets, read, main/team-a/*
p, role:developer, instances, create-from-preset, main/team-a/*
p, role:developer, backup-storages, read, main/team-a/*
p, role:developer, monitoring-destinations, read, main/team-a/*
p, role:developer, backup-classes, read, */*
g, alice, role:developer
{{< /deck/code >}}
{{< deck/code name="Request" lang="json" note="An exact copy: the preset's spec, a name, and the annotation that names the preset." >}}
{
  "apiVersion": "core.openeverest.io/v1alpha1",
  "kind": "Instance",
  "metadata": {
    "name": "payments",
    "namespace": "team-a",
    "annotations": {
      "openeverest.io/instance-preset": "team-a-mongodb"
    }
  },
  "spec": { "…": "the spec of the preset, unchanged" }
}
{{< /deck/code >}}
{{< /deck/example >}}
{{< /deck/card >}}

{{< deck/card id="import" nav="Import" title="Restore a backup from storage" docs="https://openeverest.io/docs/2.0.0-alpha.1/backups_and_restore/create_from_backup" >}}
Scan backup storage and create an instance from a discovered backup, even when the original cluster and its backup record are gone.

{{< deck/visual >}}
{{< deck/switcher label="Steps" >}}
{{< deck/option name="1. Scan" >}}
{{< deck/shot src="import-1-scan.png" alt="The Import database page lists one backup found in the storage, with its path, version 8.0.32-14, type logical and topology replicaSet" caption="Nothing in the cluster knows this backup. The scan found it in the bucket." />}}
{{< /deck/option >}}
{{< deck/option name="2. Configure" >}}
{{< deck/shot src="import-2-create.png" alt="The Create an instance page, with a note that version 8.0.32 is preselected because it matches the backup" caption="The version and topology are preselected from what the backup recorded." />}}
{{< /deck/option >}}
{{< deck/option name="3. Users" >}}
{{< deck/shot src="import-3-users.png" alt="The Database step with a Database users Secret selected" caption="A backup opens only with the credentials of the database it came from, so the wizard asks for them." />}}
{{< /deck/option >}}
{{< deck/option name="4. Ready" >}}
{{< deck/shot src="import-4-ready.png" alt="The overview page of the instance orders-restored with the status Ready" caption="The instance we created this way, `orders-restored`." />}}
{{< /deck/option >}}
{{< /deck/switcher >}}
{{< /deck/visual >}}

{{< deck/example >}}
{{< deck/code name="BackupImport" lang="yaml" note="The UI creates this for you. One scan, one storage, one backup class." >}}
apiVersion: backup.openeverest.io/v1alpha1
kind: BackupImport
metadata:
  name: import-2rpx7
  namespace: team-a
spec:
  classRef:
    name: percona-backup-mongodb
  storageRef:
    name: s3-prod
status:
  createdCount: 1
  discoveredCount: 1
  state: Succeeded
{{< /deck/code >}}
{{< deck/code name="Found backup" lang="yaml" note="Each backup found becomes a `Backup` with an external origin." >}}
apiVersion: backup.openeverest.io/v1alpha1
kind: Backup
metadata:
  name: import-8f56585f57b5e55e
  namespace: team-a
spec:
  classRef:
    name: percona-backup-mongodb
  storageRef:
    name: s3-prod
  deletionPolicy: Retain
  origin:
    type: External
    external:
      path: backups/team-a/orders/0696aeaf-5bfc-4456-ae05-050883164657/s3-prod/2026-11-22T15:15:28Z
      startedAt: "2026-11-22T15:15:29Z"
      completedAt: "2026-11-22T15:15:35Z"
      sourceMetadata:
        backupType: logical
        engineVersion: 8.0.32-14
        topology: replicaSet
{{< /deck/code >}}
{{< deck/code name="Instance" lang="yaml" note="The new instance points at the found backup and at the Secret with the original users." >}}
apiVersion: core.openeverest.io/v1alpha1
kind: Instance
metadata:
  name: orders-restored
  namespace: team-a
spec:
  providerRef:
    name: percona-server-mongodb
  version: 8.0.32
  topology:
    type: replicaSet
  userSecretRef:
    name: orders-users
  backup:
    enabled: true
    classRef:
      name: percona-backup-mongodb
    storages:
      - storageRef:
          name: s3-prod
  dataSource:
    type: Backup
    backup:
      backupRef:
        name: import-8f56585f57b5e55e
{{< /deck/code >}}
{{< deck/code name="Result" lang="console" >}}
$ kubectl get backupimports -n team-a
NAME           CLASS                    STORAGE   STATE       CREATED
import-2rpx7   percona-backup-mongodb   s3-prod   Succeeded   1
import-nxg4c   percona-backup-mongodb   s3-prod   Succeeded   0

$ kubectl get instances -n team-a
NAME              PROVIDER                 VERSION   AVAILABLE   STATUS   AGE
orders-restored   percona-server-mongodb   8.0.32    True        Ready    8m

$ kubectl get instance orders-restored -n team-a -o jsonpath='{.status.conditions[?(@.type=="DataSourceReady")]}' | jq -c '{type,status,reason,message}'
{"type":"DataSourceReady","status":"True","reason":"Succeeded","message":"Instance seeded from Backup \"import-8f56585f57b5e55e\" via Restore \"orders-restored-datasource\""}
{{< /deck/code >}}
{{< /deck/example >}}
{{< /deck/card >}}

{{< deck/card id="try-it" nav="Try it" title="Try Alpha 1" >}}
Alpha means not for production: install it on a fresh cluster, and read the [breaking changes](https://openeverest.io/docs/2.0.0-alpha.1/release-notes/OpenEverest-2.0.0-alpha.1-2026-11-20/#breaking-changes) if you ran a Developer Preview.

[Quickstart](https://openeverest.io/docs/2.0.0-alpha.1/quick-install) · [Release notes](https://openeverest.io/docs/2.0.0-alpha.1/release-notes/OpenEverest-2.0.0-alpha.1-2026-11-20/) · [GitHub](https://github.com/openeverest/openeverest)

{{< deck/visual >}}
{{< deck/term title="install" >}}
$ helm repo add openeverest https://openeverest.github.io/helm-charts/
$ helm install everest-core openeverest/openeverest \
    --version 2.0.0-alpha.1 \
    --namespace everest-system --create-namespace
$ helm install provider-percona-server-mongodb \
    oci://ghcr.io/openeverest/charts/provider-percona-server-mongodb \
    --namespace everest-system
{{< /deck/term >}}
{{< /deck/visual >}}
{{< /deck/card >}}

{{< /deck >}}

## What the cards have in common

Each of the five changes takes something the core used to decide and turns it into something that is declared and installed:

- A **monitoring integration** installs a class. The core no longer ships or knows a monitoring backend.
- A **backup storage class** describes a storage technology. The core no longer assumes S3.
- **Events** are stored in Kubernetes, so a plugin such as plugin-audit can build on them without a change in the core.
- **Presets** can live with the team that owns them.
- **Imports** make a backup usable without the cluster that took it.

That is the direction of v2: a small core, and providers, integrations and plugins around it.

## What we did not cover

Alpha 1 also reworks single sign-on, the instance status and conditions, the Secrets API and admission validation. Those are in the [release notes](https://openeverest.io/docs/2.0.0-alpha.1/release-notes/OpenEverest-2.0.0-alpha.1-2026-11-20/), together with the breaking changes and the known issues.

If you try Alpha 1, tell us what breaks: open an [issue](https://github.com/openeverest/openeverest/issues) or find us in the [community](https://openeverest.io/#community).
