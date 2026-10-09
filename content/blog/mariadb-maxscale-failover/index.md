---
title: "Breaking MariaDB on Purpose: Failover with MaxScale on OpenEverest"
date: 2026-10-09T00:00:00
draft: false
image:
    url: blog-mariadb-failover.png
authors:
  - spron-in
tags:
  - blog
  - mariadb
  - maxscale
  - high-availability
  - kubernetes
  - provider
summary: "We added MaxScale to the MariaDB provider. I killed primaries in a few different ways to see how failover behaves, what clients see, and what still needs fixing."
---

Recently we added [MariaDB MaxScale](https://mariadb.com/docs/maxscale/) support to [`provider-mariadb`](https://github.com/openeverest/provider-mariadb). You set `enabled: true` on the `proxy` component, and OpenEverest puts MaxScale in front of your Galera or replication cluster. Clients get one endpoint, and MaxScale sends writes to the primary and spreads reads across replicas.

Soon after, a contributor left [a detailed comment](https://github.com/openeverest/provider-mariadb/issues/37) on the original issue. They had tested MaxScale with mariadb-operator and saw a race: MaxScale promotes a replica, and a moment later the operator turns it back into a read-only replica. The result is a cluster with no writable primary. The advice was to keep MaxScale's automatic failover on and to have a manual recovery plan ready.

Our provider does the opposite and turns MaxScale's failover off. So either we got it wrong, or we are looking at different setups. I wanted to see it myself, so I deployed a cluster and started killing primaries.

## The setup

* LKE cluster, 6 nodes, Kubernetes 1.36
* OpenEverest v2.0.0-dev.4
* `provider-mariadb` with mariadb-operator 26.10.1
* MariaDB 12.3, MaxScale 23.08
* Replication topology: 3 MariaDB nodes, 2 MaxScale pods

The `Instance` is the same one you would create from the UI. The only MaxScale-specific part is this:

```yaml
    proxy:
      replicas: 2
      parameters:
        enabled: true
```

## Who is in charge of failover

This is the most important question in this setup. There are two components that know how to promote a replica: mariadb-operator and MaxScale's `mariadbmon` monitor. If both try to do it at the same time, you get the race from the issue.

mariadb-operator supports both models. Click through them:

<div class="mxf-tabs">
  <input type="radio" name="mxf-owner" id="mxf-owner-mxs">
  <input type="radio" name="mxf-owner" id="mxf-owner-op" checked>
  <div class="mxf-tabbar">
    <label for="mxf-owner-mxs" data-tab="mxs">MaxScale owns failover</label>
    <label for="mxf-owner-op" data-tab="op">Operator owns failover (OpenEverest)</label>
  </div>
  <div class="mxf-panel" data-panel="mxs">
    <p>The <code>MariaDB</code> resource references MaxScale through <code>spec.maxScaleRef</code>. The operator then switches off its own failover and leaves it to MaxScale (<code>auto_failover=true</code>, <code>auto_rejoin=true</code>).</p>
    <ul>
      <li>MaxScale promotes a replica on its own schedule.</li>
      <li>The operator still reconfigures replicas, and nothing tells it that MaxScale just promoted one. This is where the race from the issue comes from: the freshly promoted node can be pointed back at the dead primary and set to read-only.</li>
      <li>If you switch MaxScale's failover off in this mode, nobody promotes anything. The primary dies and the cluster stays without one.</li>
    </ul>
    <p>That is the setup the issue comment describes, and the advice in it makes sense for it.</p>
  </div>
  <div class="mxf-panel" data-panel="op">
    <p>The <code>MariaDB</code> resource does <strong>not</strong> reference MaxScale. The operator keeps its own failover, exactly as without a proxy. MaxScale gets <code>auto_failover</code>, <code>auto_rejoin</code> and <code>switchover_on_low_disk_space</code> set to <code>false</code>.</p>
    <ul>
      <li>Only the operator promotes, demotes and sets <code>read_only</code>.</li>
      <li>MaxScale watches the servers and routes traffic to whatever the operator made the primary.</li>
      <li>There is one decision maker, so there is nothing to race with.</li>
    </ul>
    <p>This is what <code>provider-mariadb</code> does. Turning MaxScale's failover off does not leave you without failover, because the operator still has it.</p>
  </div>
</div>

So we were not looking at the same setup. The rest of the post is about whether the "operator owns failover" model holds up in practice.

## How I tested

I needed two things: a client that tells me exactly when writes stop and start, and a way to check that no data is lost.

The client is a small pod that connects through the MaxScale Service every half a second. Each time it opens a new connection, inserts a row in a transaction and asks which host it landed on. It only logs changes, so the output looks like this:

```
08:01:18.363 OK mdb-mxs-0
08:01:45.968 ERR ERROR 1815 (HY000): Internal error: Session creation failed
08:02:08.079 OK mdb-mxs-1
```

Next to it I had a script polling the operator status, both MaxScale pods and `read_only` plus replication state on every MariaDB node. After every run I compared a checksum of the table across all three nodes.

The scenarios:

* **Graceful delete** of the primary pod (`kubectl delete pod`). MariaDB shuts down cleanly, and Kubernetes starts the pod again right away.
* **Force delete** of the primary pod (`--grace-period=0 --force`).
* **Kill one of the two MaxScale pods.**
* **The same graceful delete without MaxScale**, as a control.
* **A planned switchover**, which the operator does during a rolling update.

## The numbers

This is the time between the first failed write and the first successful write after it. The client polls every 0.5 s, so take the decimals with a grain of salt. Hover over a row for details.

<div class="mxf-chart">
  <div class="mxf-row" data-note="Clients connect through the Service, so they just land on the other MaxScale pod. Not a single failed write.">
    <span class="mxf-label">MaxScale pod killed (1 of 2)</span><span class="mxf-track"><span class="mxf-bar mxf-ok" style="width:0.6%"></span></span><span class="mxf-val">0 s</span>
  </div>
  <div class="mxf-row" data-note="The fastest run. Writes were back in under 4 seconds, with one more failed write in between.">
    <span class="mxf-label">Force delete primary</span><span class="mxf-track"><span class="mxf-bar" style="width:10.3%"></span></span><span class="mxf-val">3.6 s</span>
  </div>
  <div class="mxf-row" data-note="Planned switchover during a rolling update. The operator locks the old primary, waits for the replica to catch up and only then promotes it.">
    <span class="mxf-label">Planned switchover</span><span class="mxf-track"><span class="mxf-bar mxf-plan" style="width:39.4%"></span></span><span class="mxf-val">13.8 s</span>
  </div>
  <div class="mxf-row" data-note="Same scenario, but this time the old pod came back before the promotion finished. With the fixed provider it came back read-only.">
    <span class="mxf-label">Force delete primary</span><span class="mxf-track"><span class="mxf-bar" style="width:47.1%"></span></span><span class="mxf-val">16.5 s</span>
  </div>
  <div class="mxf-row" data-note="Plus one extra failed write a few seconds later, when the second MaxScale pod caught up.">
    <span class="mxf-label">Graceful delete primary</span><span class="mxf-track"><span class="mxf-bar" style="width:57.1%"></span></span><span class="mxf-val">20.0 s</span>
  </div>
  <div class="mxf-row" data-note="With the fixed provider (nodes boot read-only).">
    <span class="mxf-label">Graceful delete primary</span><span class="mxf-track"><span class="mxf-bar" style="width:63.1%"></span></span><span class="mxf-val">22.1 s</span>
  </div>
  <div class="mxf-row" data-note="The run where the restarted old primary came back writable and MaxScale briefly picked it as primary. See below.">
    <span class="mxf-label">Graceful delete primary</span><span class="mxf-track"><span class="mxf-bar mxf-warn" style="width:71.1%"></span></span><span class="mxf-val">24.9 s</span>
  </div>
  <div class="mxf-row" data-note="No MaxScale. Clients use the primary Service directly. Only one run, so don't read too much into the difference.">
    <span class="mxf-label">Graceful delete primary, no MaxScale</span><span class="mxf-track"><span class="mxf-bar mxf-ctrl" style="width:93.7%"></span></span><span class="mxf-val">32.8 s</span>
  </div>
  <div class="mxf-legend">
    <span><i class="mxf-ok"></i>no outage</span>
    <span><i></i>unplanned failover</span>
    <span><i class="mxf-plan"></i>planned switchover</span>
    <span><i class="mxf-warn"></i>the run walked through below</span>
    <span><i class="mxf-ctrl"></i>without MaxScale</span>
  </div>
</div>

A few things stand out:

* **Failover works.** In every run the operator picked the most advanced replica, promoted it, and MaxScale started routing writes to it.
* **MaxScale is not the slow part.** It usually followed the operator's promotion within 1 to 3 seconds. Most of the time goes into the operator noticing the failure and running the switchover steps.
* **The spread is wide.** Anything from 3.6 to 25 seconds for an unplanned failover. It depends on timing: how fast the operator notices, and whether the old pod comes back in the middle of the switchover. This is a handful of runs, not a benchmark.
* **Losing a MaxScale pod is a non-event** with two replicas.

### And the data?

For me this is the important part. **In every run, the table checksum matched on all three nodes.** No acknowledged write was lost, and no write ended up on one node only. The operator enables semi-synchronous replication by default, so a commit on the primary waits until at least one replica has the transaction. That is what makes promoting a replica safe. One caveat: if no replica answers within the timeout (10 seconds by default), the primary falls back to asynchronous replication. It never happened in my tests, but it is the thing to keep in mind when you think about losing data.

## What was breaking

The happy path is fine, but two things happened after the failover that I did not like. The easiest way to show them is to walk through the slowest graceful delete run (the red bar above) second by second. This run was done before the fix.

<div class="mxf-steps">
  <input type="radio" name="mxf-step" id="mxf-s1" checked>
  <input type="radio" name="mxf-step" id="mxf-s2">
  <input type="radio" name="mxf-step" id="mxf-s3">
  <input type="radio" name="mxf-step" id="mxf-s4">
  <input type="radio" name="mxf-step" id="mxf-s5">
  <input type="radio" name="mxf-step" id="mxf-s6">
  <input type="radio" name="mxf-step" id="mxf-s7">
  <div class="mxf-stepbar">
    <label for="mxf-s1" data-step="1">0 s</label>
    <label for="mxf-s2" data-step="2">+3 s</label>
    <label for="mxf-s3" data-step="3">+13 s</label>
    <label for="mxf-s4" data-step="4">+24 s</label>
    <label for="mxf-s5" data-step="5">+25 s</label>
    <label for="mxf-s6" data-step="6">+27 s</label>
    <label for="mxf-s7" data-step="7">+3 min</label>
  </div>

  <div class="mxf-step" data-step="1">
    <div class="mxf-nodes">
      <div class="mxf-node mxf-down"><b>mariadb-0</b><span>shutting down</span></div>
      <div class="mxf-node mxf-ro"><b>mariadb-1</b><span>replica, read-only</span></div>
      <div class="mxf-node mxf-ro"><b>mariadb-2</b><span>replica, read-only</span></div>
    </div>
    <p class="mxf-mxs">MaxScale: primary is <b>mariadb-0</b>. Writes: <b class="mxf-bad">failing</b></p>
    <p>I delete the primary pod. MariaDB shuts down cleanly. Clients in the middle of a transaction get an error.</p>
  </div>

  <div class="mxf-step" data-step="2">
    <div class="mxf-nodes">
      <div class="mxf-node mxf-down"><b>mariadb-0</b><span>down</span></div>
      <div class="mxf-node mxf-busy"><b>mariadb-1</b><span>being promoted</span></div>
      <div class="mxf-node mxf-ro"><b>mariadb-2</b><span>replica, read-only</span></div>
    </div>
    <p class="mxf-mxs">MaxScale: <b>no primary</b>, "Couldn't find suitable Primary". Writes: <b class="mxf-bad">failing</b></p>
    <p>The operator sees that the primary pod is not ready, picks the replica with the most data (mariadb-1) and starts the switchover.</p>
  </div>

  <div class="mxf-step" data-step="3">
    <div class="mxf-nodes">
      <div class="mxf-node mxf-danger"><b>mariadb-0</b><span>back, <u>writable</u>, no replication</span></div>
      <div class="mxf-node mxf-busy"><b>mariadb-1</b><span>being promoted</span></div>
      <div class="mxf-node mxf-ro"><b>mariadb-2</b><span>replica, read-only</span></div>
    </div>
    <p class="mxf-mxs">MaxScale: <b>no primary</b>. Writes: <b class="mxf-bad">failing</b></p>
    <p>Kubernetes has already restarted the old primary's pod. MariaDB does not remember <code>read_only</code> across a restart, so the node boots <strong>writable</strong>, with no replication configured. To anyone looking at it, it is a standalone primary.</p>
    <p class="mxf-fix">With the fix: mariadb-0 boots read-only and stays that way until the operator decides what it is.</p>
  </div>

  <div class="mxf-step" data-step="4">
    <div class="mxf-nodes">
      <div class="mxf-node mxf-danger"><b>mariadb-0</b><span>writable, MaxScale says <u>Master</u></span></div>
      <div class="mxf-node mxf-busy"><b>mariadb-1</b><span>being promoted</span></div>
      <div class="mxf-node mxf-ro"><b>mariadb-2</b><span>replica, read-only</span></div>
    </div>
    <p class="mxf-mxs">MaxScale: primary is <b class="mxf-bad">mariadb-0</b> (the old one)</p>
    <p>This is the scary moment. MaxScale has no primary, sees a writable node with no replication, and picks it: <code>master_up [Down] -> [Master, Running]</code>. For about a second, any write MaxScale routed would land on a node that is about to be thrown out of the cluster. In my run no write got there, but nothing prevented it.</p>
    <p class="mxf-fix">With the fix: this step does not happen. A read-only node is never picked as primary.</p>
  </div>

  <div class="mxf-step" data-step="5">
    <div class="mxf-nodes">
      <div class="mxf-node mxf-ro"><b>mariadb-0</b><span>set to read-only</span></div>
      <div class="mxf-node mxf-ok"><b>mariadb-1</b><span>primary, writable</span></div>
      <div class="mxf-node mxf-ro"><b>mariadb-2</b><span>replica of mariadb-1</span></div>
    </div>
    <p class="mxf-mxs">MaxScale: primary is <b>mariadb-0</b>, about to change</p>
    <p>The operator finishes: mariadb-1 becomes writable, mariadb-2 replicates from it, mariadb-0 gets <code>read_only</code> and is pointed at the new primary.</p>
  </div>

  <div class="mxf-step" data-step="6">
    <div class="mxf-nodes">
      <div class="mxf-node mxf-ro"><b>mariadb-0</b><span>read-only</span></div>
      <div class="mxf-node mxf-ok"><b>mariadb-1</b><span>primary</span></div>
      <div class="mxf-node mxf-ro"><b>mariadb-2</b><span>replica</span></div>
    </div>
    <p class="mxf-mxs">MaxScale: primary is <b>mariadb-1</b>. Writes: <b class="mxf-good">OK</b></p>
    <p>MaxScale notices that mariadb-0 is read-only, switches to mariadb-1, and writes resume. 25 seconds in total.</p>
  </div>

  <div class="mxf-step" data-step="7">
    <div class="mxf-nodes">
      <div class="mxf-node mxf-down"><b>mariadb-0</b><span>CrashLoopBackOff</span></div>
      <div class="mxf-node mxf-ok"><b>mariadb-1</b><span>primary</span></div>
      <div class="mxf-node mxf-ro"><b>mariadb-2</b><span>replica</span></div>
    </div>
    <p class="mxf-mxs">MaxScale: primary is <b>mariadb-1</b>. Writes: <b class="mxf-good">OK</b>, but only 2 of 3 nodes</p>
    <p>The old primary never catches up. Its replication fails with error 1236, "the slave has diverged", its startup probe fails, and the pod restarts again and again. The cluster serves traffic, but it has lost a node, and it will not get it back without help.</p>
  </div>
</div>

So there are two separate problems here. Open the cards for the details.

<details class="mxf-card">
  <summary><span class="mxf-badge mxf-b-ok">Avoided by design</span> MaxScale and the operator racing each other</summary>
  <p><b>What happens:</b> MaxScale promotes a replica, and the operator reconfigures it back into a read-only replica. You end up with no writable node.</p>
  <p><b>Where:</b> only when MaxScale owns failover (<code>maxScaleRef</code> set, <code>auto_failover=true</code>).</p>
  <p><b>Status:</b> the provider never sets <code>maxScaleRef</code> and keeps MaxScale's failover off. In all my runs MaxScale did not run a single failover or rejoin by itself. It only followed. The <a href="https://github.com/mariadb-operator/mariadb-operator/issues/1944">upstream issue</a> for the other mode is open.</p>
</details>

<details class="mxf-card">
  <summary><span class="mxf-badge mxf-b-ok">Fixed</span> A restarted primary boots writable</summary>
  <p><b>What happens:</b> the old primary comes back after a restart with <code>read_only=OFF</code> and no replication. Until the operator gets to it, it looks exactly like a primary. MaxScale picked it once in my tests.</p>
  <p><b>Why it matters:</b> any write that lands there is a write the new primary will never see. That is real divergence, the kind you only find out about later.</p>
  <p><b>Fix:</b> the provider now sets <code>semiSyncBootAsReplica: true</code> on replication clusters. Every node boots read-only with primary-side semi-sync off, and the operator makes only the actual primary writable. I repeated the failover tests with this change, and the restarted old primary stayed read-only every time. MaxScale never marked it as primary.</p>
  <p><b>Upgrade note:</b> the setting changes the pod template, so the first provider upgrade does one rolling restart of every replication cluster. The operator restarts the replicas first and switches the primary over last. In my test that was one write pause of about 14 seconds, plus a 1 to 2 second blip when each replica restarted. Plan the upgrade for a quiet time.</p>
</details>

<details class="mxf-card">
  <summary><span class="mxf-badge mxf-b-pending">Pending upstream</span> The old primary cannot rejoin after failover</summary>
  <p><b>What happens:</b> after an unplanned failover, the old primary tries to replicate from the new one and fails with error 1236: <i>"connecting slave requested to start from GTID 0-10-421, which is not in the master's binlog ... the slave has diverged"</i>. The pod crash-loops and the cluster runs on 2 of 3 nodes.</p>
  <p><b>The node has not diverged.</b> I decoded the old primary's binary log: GTID <code>0-10-421</code> was a normal insert, and the new primary had applied it before it was promoted. The data matched.</p>
  <p><b>Why it fails anyway:</b> replicas don't write replicated events to their own binary log (<code>log_slave_updates</code> is off), and when the operator promotes a replica it clears that node's <code>gtid_slave_pos</code>. After that the new primary has no record that it ever applied <code>0-10-421</code>, and MariaDB refuses the connection. During a planned switchover the operator handles this. After an unplanned failover it doesn't.</p>
  <p><b>Not MaxScale's fault:</b> I reproduced it on a cluster without MaxScale. Same error.</p>
  <p><b>Status:</b> reported as <a href="https://github.com/mariadb-operator/mariadb-operator/issues/1948">mariadb-operator#1948</a>. Until it is fixed, see the manual recovery below.</p>
</details>

<details class="mxf-card">
  <summary><span class="mxf-badge mxf-b-minor">Minor</span> The two MaxScale pods don't agree for a few seconds</summary>
  <p>Each MaxScale pod monitors the servers on its own. In one run one pod switched to the new primary 5 seconds after the other one, which cost one extra failed write. It is a small thing, but it explains the occasional extra blip.</p>
</details>

<details class="mxf-card">
  <summary><span class="mxf-badge mxf-b-minor">On our list</span> Instance status says "Provisioning" while a node is stuck</summary>
  <p>When the old primary is crash-looping, the operator marks the <code>MariaDB</code> as not ready, and OpenEverest shows the instance as <code>Provisioning</code>. The database is serving reads and writes at that point, so the status is misleading. We plan to fix it in the provider.</p>
</details>

## Manual recovery

Until the upstream fix lands, a stuck former primary needs a hand. The recipe below worked every time in my tests, but it is only safe when two things are true. If you are not sure about either of them, don't run it.

1. **The stuck node has nothing the new primary is missing.** Compare a checksum of your important tables, or at least row counts and the latest rows. If the node really diverged, this recipe would hide the problem.
2. **The new primary's binary log starts at its promotion.** Look at the first GTID in its oldest binary log (`SHOW BINARY LOGS`, then `SHOW BINLOG EVENTS IN '<oldest file>'`). Its sequence number must directly follow the stuck node's last GTID. In my case the stuck node stopped at `0-10-421` and the new primary's log started at `0-11-422`. If the new primary still has binary logs from an earlier time when it was primary, the recipe would replay old transactions.

If both hold, run this on the stuck node:

```sql
STOP SLAVE;
RESET MASTER;
SET GLOBAL gtid_slave_pos='';
CHANGE MASTER TO MASTER_USE_GTID=slave_pos;
START SLAVE;
```

`RESET MASTER` drops the node's own binary log, which is what confuses the new primary. With an empty position, the node starts replicating from the beginning of the new primary's binary log, which is exactly the promotion point. Within a minute the pod becomes ready and the operator takes it from there.

One thing not to do: don't delete the stuck node's volume and expect the operator to rebuild it. New replicas are seeded from a physical backup, and without one configured there is nothing to copy the data from.

The cleaner path is to let the operator rebuild the replica from a physical backup. mariadb-operator can do this automatically ([replica recovery](https://github.com/mariadb-operator/mariadb-operator/blob/main/docs/replication.md#replica-recovery)), but it needs backup storage configured. We are looking into turning it on in the provider when backup storage is available.

## Practical advice

If you run MariaDB replication with MaxScale on OpenEverest:

* **Leave MaxScale's failover settings alone.** The provider sets them on purpose. In our model the operator owns failover, and MaxScale only routes traffic.
* **Upgrade the provider** to get `semiSyncBootAsReplica`, and plan for one rolling restart.
* **Watch for a MariaDB pod in `CrashLoopBackOff`** with error 1236 in its logs after a failover. It means the cluster runs with one node less than you think.
* **Run two MaxScale pods.** That is the default, and losing one costs nothing.
* **Expect up to 25 seconds of failed writes** on an unplanned failover, and make sure your application retries.

## What's next

The most important missing piece is [mariadb-operator#1948](https://github.com/mariadb-operator/mariadb-operator/issues/1948). Once it is fixed upstream, the old primary will rejoin on its own, and we will pick up the new operator version in the provider. On our side, we will fix the misleading status and look into automatic replica recovery.

If you try this yourself and see different behavior, please comment on [the issue](https://github.com/openeverest/provider-mariadb/issues/37) or open a new one. Failover bugs mostly show up under timing nobody has tried yet, so every report helps.

<style>
.mxf-tabs,.mxf-steps{margin:1.5rem 0;border:1px solid rgba(127,127,127,0.25);border-radius:12px;overflow:hidden;}
.mxf-tabs>input,.mxf-steps>input{position:absolute;opacity:0;pointer-events:none;}
.mxf-tabbar,.mxf-stepbar{display:flex;flex-wrap:wrap;border-bottom:1px solid rgba(127,127,127,0.25);background:rgba(127,127,127,0.06);}
.mxf-tabbar label,.mxf-stepbar label{flex:1;white-space:nowrap;text-align:center;padding:12px 8px;font-size:14px;font-weight:600;color:#6b7280;cursor:pointer;user-select:none;border-bottom:2px solid transparent;transition:color .15s,border-color .15s,background .15s;}
.mxf-tabbar label:hover,.mxf-stepbar label:hover{color:#0f172a;}
.mxf-panel,.mxf-step{display:none;padding:18px 22px;}
.mxf-panel p,.mxf-step p{margin:.5rem 0;}
#mxf-owner-mxs:checked~.mxf-tabbar label[data-tab="mxs"],
#mxf-owner-op:checked~.mxf-tabbar label[data-tab="op"]{color:#0aa66e;border-bottom-color:#0aa66e;background:#fff;}
#mxf-owner-mxs:checked~.mxf-panel[data-panel="mxs"],
#mxf-owner-op:checked~.mxf-panel[data-panel="op"]{display:block;}
#mxf-s1:checked~.mxf-stepbar label[data-step="1"],#mxf-s2:checked~.mxf-stepbar label[data-step="2"],
#mxf-s3:checked~.mxf-stepbar label[data-step="3"],#mxf-s4:checked~.mxf-stepbar label[data-step="4"],
#mxf-s5:checked~.mxf-stepbar label[data-step="5"],#mxf-s6:checked~.mxf-stepbar label[data-step="6"],
#mxf-s7:checked~.mxf-stepbar label[data-step="7"]{color:#0aa66e;border-bottom-color:#0aa66e;background:#fff;}
#mxf-s1:checked~.mxf-step[data-step="1"],#mxf-s2:checked~.mxf-step[data-step="2"],
#mxf-s3:checked~.mxf-step[data-step="3"],#mxf-s4:checked~.mxf-step[data-step="4"],
#mxf-s5:checked~.mxf-step[data-step="5"],#mxf-s6:checked~.mxf-step[data-step="6"],
#mxf-s7:checked~.mxf-step[data-step="7"]{display:block;}
.mxf-nodes{display:flex;gap:10px;flex-wrap:wrap;margin:6px 0 12px;}
.mxf-node{flex:1 1 150px;border:2px solid #9ca3af;border-radius:10px;padding:10px 12px;background:#f3f4f6;font-size:14px;}
.mxf-node b{display:block;font-size:15px;color:#111827;}
.mxf-node span{color:#4b5563;}
.mxf-ok{border-color:#0aa66e;background:#e8f7f0;}
.mxf-ro{border-color:#9ca3af;background:#f3f4f6;}
.mxf-busy{border-color:#d97706;background:#fff7e6;}
.mxf-down{border-color:#9ca3af;border-style:dashed;background:#fafafa;opacity:.75;}
.mxf-danger{border-color:#dc2626;background:#fdecec;}
.mxf-mxs{font-size:14px;padding:8px 12px;border-radius:8px;background:#eef2ff;color:#312e81;}
.mxf-bad{color:#b91c1c;}
.mxf-good{color:#047857;}
.mxf-fix{font-size:14px;border-left:4px solid #0aa66e;padding:6px 12px;background:rgba(10,166,110,0.08);border-radius:4px;}
.mxf-chart{margin:1.5rem 0;border:1px solid rgba(127,127,127,0.25);border-radius:12px;padding:14px 18px;}
.mxf-row{position:relative;display:flex;align-items:center;gap:12px;padding:7px 0;font-size:14px;cursor:default;}
.mxf-label{flex:0 0 250px;color:#374151;}
.mxf-track{flex:1;height:16px;background:rgba(127,127,127,0.10);border-radius:8px;overflow:hidden;}
.mxf-bar{display:block;height:100%;background:#1a8cff;border-radius:8px;min-width:4px;transition:filter .15s;}
.mxf-bar.mxf-ok{background:#0aa66e;}
.mxf-bar.mxf-plan{background:#6366f1;}
.mxf-bar.mxf-warn{background:#dc2626;}
.mxf-bar.mxf-ctrl{background:#9ca3af;}
.mxf-val{flex:0 0 56px;text-align:right;font-variant-numeric:tabular-nums;font-weight:600;}
.mxf-row:hover .mxf-bar{filter:brightness(1.15);}
.mxf-legend{display:flex;flex-wrap:wrap;gap:6px 16px;margin-top:10px;padding-top:10px;border-top:1px solid rgba(127,127,127,0.2);font-size:12px;color:#4b5563;}
.mxf-legend i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:6px;background:#1a8cff;border:0;}
.mxf-legend i.mxf-ok{background:#0aa66e;}
.mxf-legend i.mxf-plan{background:#6366f1;}
.mxf-legend i.mxf-warn{background:#dc2626;}
.mxf-legend i.mxf-ctrl{background:#9ca3af;}
.mxf-row:hover::after{content:attr(data-note);position:absolute;left:262px;right:0;top:100%;z-index:5;background:#111827;color:#f9fafb;font-size:13px;line-height:1.4;padding:8px 12px;border-radius:8px;box-shadow:0 6px 18px rgba(0,0,0,0.2);}
.mxf-card{border:1px solid rgba(127,127,127,0.25);border-radius:10px;margin:12px 0;padding:2px 18px;background:rgba(127,127,127,0.05);}
.mxf-card>summary{cursor:pointer;font-weight:600;padding:14px 0;list-style:none;}
.mxf-card>summary::-webkit-details-marker{display:none;}
.mxf-card>summary::before{content:"▸";display:inline-block;margin-right:10px;transition:transform .15s ease;}
.mxf-card[open]>summary::before{transform:rotate(90deg);}
.mxf-card p{margin:.5rem 0 .8rem;}
.mxf-badge{display:inline-block;font-size:12px;font-weight:700;padding:2px 8px;border-radius:999px;margin-right:8px;vertical-align:1px;}
.mxf-b-ok{background:#e8f7f0;color:#047857;}
.mxf-b-pending{background:#fff7e6;color:#b45309;}
.mxf-b-minor{background:#f3f4f6;color:#4b5563;}
@media (max-width:640px){.mxf-label{flex-basis:140px;font-size:13px;}.mxf-row:hover::after{left:0;}.mxf-stepbar label{padding:10px 4px;font-size:13px;}}
</style>
