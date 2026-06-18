/* ===========================================================
   KubeCrisis — The 3 AM Pager Simulator (v2)
   Vanilla JS, no build step. Mounts into #kubecrisis-app.
   =========================================================== */
(function () {
    "use strict";

    const ROOT_ID = "kubecrisis-app";
    const TOTAL_DAYS = 7;
    const MAX_CREDITS = 5;
    const START_CREDITS = 3;

    /* ===========================================================
       SCENARIOS
       Each day: pager → symptoms (terminal dump) → optional trivia
       (geek bait, earns OE Credits) → choose one of 3 actions.
       =========================================================== */
    const SCENARIOS = [
        {
            day: 1,
            time: "03:14",
            title: "pg-2 in CrashLoopBackOff",
            alert: "PagerDuty: postgres replica pg-2 has restarted 17 times in the last hour. Replication is degraded.",
            symptoms: [
                { type: "info", text: "$ kubectl get pods -l app=postgres" },
                { type: "out",  text: "NAME   READY   STATUS    RESTARTS       AGE" },
                { type: "out",  text: "pg-0   1/1     Running   0              4d" },
                { type: "out",  text: "pg-1   1/1     Running   0              4d" },
                { type: "warn", text: "pg-2   0/1     Running   17 (2m ago)    4d" },
                { type: "info", text: "$ kubectl logs pg-2 --previous --tail=1" },
                { type: "bad",  text: "LOG: server process (PID 1) was terminated by signal 9: Killed" }
            ],
            trivia: {
                question: "Signal 9 on Linux is...",
                options: [
                    "SIGTERM — polite, can be trapped",
                    "SIGKILL — cannot be caught or ignored",
                    "SIGHUP — reload config",
                    "SIGSEGV — segfault"
                ],
                correctIndex: 1,
                explainCorrect: "Correct. SIGKILL = kernel OOMKill smoking gun.",
                explainWrong: "Nope. Signal 9 is SIGKILL — sent by the OOMKiller. No credit, no harm."
            },
            actions: {
                hotfix: {
                    label: "kubectl delete pod --force",
                    blurb: "Just nuke pg-2. Maybe it'll come back happier.",
                    log: [
                        { type: "info", text: "$ kubectl delete pod pg-2 --force --grace-period=0" },
                        { type: "warn", text: "warning: Immediate deletion does not wait for confirmation." },
                        { type: "out",  text: "pg-2 ready in 14s" },
                        { type: "dim",  text: "It will OOMKill again before lunch. Future-you problem." }
                    ],
                    effects: { uptime: -1, stress: 15, budget: 0 }
                },
                runbook: {
                    label: "Edit StatefulSet, bump memory",
                    blurb: "Increase limits 2Gi→4Gi. Rolling restart all 3 pods. By hand.",
                    log: [
                        { type: "info", text: "$ kubectl edit statefulset postgres" },
                        { type: "dim",  text: "...rolling pg-2... rolling pg-1... rolling pg-0..." },
                        { type: "out",  text: "all pods reconciled in 7m22s" },
                        { type: "warn", text: "Slack: 'why are connection counts spiking??' — sorry team." }
                    ],
                    effects: { uptime: -2, stress: 25, budget: -200 }
                },
                everest: {
                    label: "OpenEverest VPA auto-tune",
                    blurb: "OpenEverest right-sizes resources from observed usage.",
                    log: [
                        { type: "info", text: "$ everest tune postgres --auto" },
                        { type: "good", text: "[everest] memory: 2Gi → recommended 4.5Gi" },
                        { type: "good", text: "[everest] rolled in 18s, zero connection drops" },
                        { type: "good", text: "You closed the pager. Back to sleep." }
                    ],
                    effects: { uptime: 0, stress: 0, budget: -100 }
                }
            }
        },
        {
            day: 2,
            time: "01:48",
            title: "Standby replication lag is unbounded",
            alert: "Replication lag on pg-2 is 4.2 GB and climbing. Read-after-write is breaking for half the API.",
            symptoms: [
                { type: "info", text: "$ psql -c \"SELECT pg_wal_lsn_diff(pg_current_wal_lsn(), replay_lsn) FROM pg_stat_replication\"" },
                { type: "warn", text: " ?column?  " },
                { type: "warn", text: "------------" },
                { type: "bad",  text: " 4218497152" },
                { type: "info", text: "$ kubectl top pod -l app=postgres" },
                { type: "out",  text: "pg-0    340m   3.2Gi" },
                { type: "out",  text: "pg-1    180m   2.1Gi" },
                { type: "bad",  text: "pg-2   1850m   7.8Gi   <-- standby pegged" }
            ],
            trivia: {
                question: "In Postgres streaming replication, lag is measured in...",
                options: ["Rows", "Bytes (WAL LSN diff)", "Seconds since last commit", "Pages dirtied"],
                correctIndex: 1,
                explainCorrect: "Correct. pg_wal_lsn_diff returns a byte distance between LSNs.",
                explainWrong: "Not quite. Lag is a byte distance in the WAL stream (LSN diff)."
            },
            actions: {
                hotfix: {
                    label: "pg_cancel_backend on the heaviest query",
                    blurb: "There's a 40-min analytics query holding it back. Murder it.",
                    log: [
                        { type: "info", text: "$ psql -c \"SELECT pg_cancel_backend(pid) FROM pg_stat_activity ORDER BY query_start LIMIT 1\"" },
                        { type: "good", text: " pg_cancel_backend " },
                        { type: "good", text: " t" },
                        { type: "warn", text: "Lag down to 80MB. Data analyst posts a 😡 in #data." }
                    ],
                    effects: { uptime: -1, stress: 15, budget: 0 }
                },
                runbook: {
                    label: "Tune max_standby_streaming_delay + restart",
                    blurb: "Edit postgresql.conf, justify it in the PR, schedule a 30-min change.",
                    log: [
                        { type: "info", text: "$ git commit -m 'tune replica lag'" },
                        { type: "dim",  text: "...waiting for 2 PR reviewers at 2am..." },
                        { type: "out",  text: "merged. rolling restart applied in 11m." },
                        { type: "warn", text: "Lag fixed. You answered 6 'are we down?' DMs." }
                    ],
                    effects: { uptime: -1, stress: 30, budget: 0 }
                },
                everest: {
                    label: "OpenEverest read-routing + tune",
                    blurb: "Drain reads off the lagging replica, re-tune, re-route when healed.",
                    log: [
                        { type: "info", text: "$ everest replica drain pg-2 --auto-heal" },
                        { type: "good", text: "[everest] reads rerouted to pg-1 (latency +3ms)" },
                        { type: "good", text: "[everest] pg-2 caught up, returned to pool" },
                        { type: "good", text: "Total intervention: 0 humans paged." }
                    ],
                    effects: { uptime: 0, stress: 0, budget: -50 }
                }
            }
        },
        {
            day: 3,
            time: "00:11",
            title: "SSL connection has been closed unexpectedly",
            alert: "App pods are spamming TLS errors. Connection success rate dropped from 99.9% to 12% at midnight.",
            symptoms: [
                { type: "info", text: "$ kubectl logs api-7d4f-x2q --tail=4" },
                { type: "bad",  text: "ERROR: connection to \"pg-rw.db.svc\" failed: SSL connection has been closed unexpectedly" },
                { type: "bad",  text: "ERROR: connection to \"pg-rw.db.svc\" failed: SSL connection has been closed unexpectedly" },
                { type: "bad",  text: "PANIC: max retries (5) exceeded — shutting down worker" },
                { type: "info", text: "$ echo | openssl s_client -connect pg-rw.db.svc:5432 -starttls postgres 2>&1 | grep -i verify" },
                { type: "warn", text: "verify error:num=10:certificate has expired" }
            ],
            trivia: {
                question: "Default Let's Encrypt cert lifetime is...",
                options: ["30 days", "60 days", "90 days", "1 year"],
                correctIndex: 2,
                explainCorrect: "Correct. 90 days — which is why everyone automates renewal.",
                explainWrong: "It's 90 days. Which is exactly why nobody renews them manually."
            },
            actions: {
                hotfix: {
                    label: "sslmode=disable on all clients",
                    blurb: "Push a config flag, redeploy 12 services. Security team won't notice. Right?",
                    log: [
                        { type: "info", text: "$ helm upgrade api --set db.sslmode=disable" },
                        { type: "warn", text: "12 services redeploying..." },
                        { type: "bad",  text: "Connections restored. Plaintext over the wire." },
                        { type: "bad",  text: "[security-bot] non-TLS DB connection detected. SEC-4419 opened." }
                    ],
                    effects: { uptime: -2, stress: 20, budget: 0 }
                },
                runbook: {
                    label: "SSH every node, regenerate certs by hand",
                    blurb: "openssl, scp, restart, repeat. For 11 nodes. At midnight.",
                    log: [
                        { type: "info", text: "$ for n in $(nodes); do ssh $n 'openssl req ...'; done" },
                        { type: "dim",  text: "...node 1/11... 4/11... 8/11..." },
                        { type: "warn", text: "Forgot to update the truststore on pg-2. Connection storms." },
                        { type: "out",  text: "Eventually fixed. 2h13m later." }
                    ],
                    effects: { uptime: -4, stress: 35, budget: 0 }
                },
                everest: {
                    label: "OpenEverest cert-rotation (auto)",
                    blurb: "If you had this enabled, this incident never fires. Enable it now.",
                    log: [
                        { type: "info", text: "$ everest tls enable --auto-rotate --renew-before 30d" },
                        { type: "good", text: "[everest] issuing fresh cert chain..." },
                        { type: "good", text: "[everest] cert distributed cluster-wide, hot-reloaded" },
                        { type: "good", text: "Total connection drops during fix: 0." }
                    ],
                    effects: { uptime: 0, stress: 0, budget: 0 }
                }
            }
        },
        {
            day: 4,
            time: "02:33",
            title: "Split-brain: two primaries detected",
            alert: "After a 30s network partition healed, both pg-0 AND pg-1 think they are the primary. Writes are diverging.",
            symptoms: [
                { type: "info", text: "$ kubectl logs pg-0 | grep -i promot | tail -1" },
                { type: "warn", text: "[pg-0] promoting myself to primary (no quorum response)" },
                { type: "info", text: "$ kubectl logs pg-1 | grep -i promot | tail -1" },
                { type: "warn", text: "[pg-1] promoting myself to primary (no quorum response)" },
                { type: "info", text: "$ kubectl get pods -l role=primary --no-headers" },
                { type: "bad",  text: "pg-0   1/1   Running" },
                { type: "bad",  text: "pg-1   1/1   Running   <-- uh oh" }
            ],
            trivia: {
                question: "Patroni's distributed config store (DCS) is most commonly...",
                options: ["MySQL", "etcd / Consul / Zookeeper", "Redis", "PostgreSQL itself"],
                correctIndex: 1,
                explainCorrect: "Correct. etcd is the usual pick. (Consul and ZK also supported.)",
                explainWrong: "Patroni uses a DCS — etcd, Consul, or Zookeeper. Not Redis."
            },
            actions: {
                hotfix: {
                    label: "kubectl delete pg-1 and pray",
                    blurb: "Pick a primary, terminate the other. Hope you picked the one with more writes.",
                    log: [
                        { type: "info", text: "$ kubectl delete pod pg-1" },
                        { type: "warn", text: "pg-1 terminated. pg-0 remains primary." },
                        { type: "bad",  text: "DIVERGED ROWS: orders #88401-#88523 lost." },
                        { type: "bad",  text: "Support is drafting refund emails." }
                    ],
                    effects: { uptime: -6, stress: 40, budget: -500 }
                },
                runbook: {
                    label: "pg_rewind to sync the loser",
                    blurb: "Stop both, identify source-of-truth via WAL LSN, pg_rewind the other.",
                    log: [
                        { type: "info", text: "$ pg_rewind --source-server='host=pg-0' --target-pgdata=/var/lib/pg" },
                        { type: "dim",  text: "rewinding 8742 segments..." },
                        { type: "out",  text: "pg-1 caught up, restarted as replica." },
                        { type: "warn", text: "47 minutes of read-only mode. Customers cranky." }
                    ],
                    effects: { uptime: -3, stress: 30, budget: 0 }
                },
                everest: {
                    label: "OpenEverest fencing + auto-rewind",
                    blurb: "DCS-backed fencing prevents double-promotion; auto-rewind reconciles the loser.",
                    log: [
                        { type: "info", text: "$ everest cluster heal --strategy=auto-fence" },
                        { type: "good", text: "[everest] LSN compared: pg-0 ahead by 12MB → demote pg-1" },
                        { type: "good", text: "[everest] auto-rewind complete, pg-1 streaming again" },
                        { type: "good", text: "Zero data lost. Zero customers refunded." }
                    ],
                    effects: { uptime: -1, stress: 5, budget: -100 }
                }
            }
        },
        {
            day: 5,
            time: "04:02",
            title: "etcd is failing health checks",
            alert: "kube-apiserver is timing out. New pod scheduling has stopped. Existing pods running, but the cluster is frozen.",
            symptoms: [
                { type: "info", text: "$ kubectl get nodes" },
                { type: "out",  text: "node-1   Ready      30d" },
                { type: "bad",  text: "node-2   NotReady   30d" },
                { type: "bad",  text: "node-3   NotReady   30d" },
                { type: "info", text: "$ kubectl logs -n kube-system etcd-node-1 --tail=2" },
                { type: "warn", text: "{\"level\":\"warn\",\"msg\":\"server is likely overloaded\",\"took\":\"4.2s\"}" },
                { type: "bad",  text: "{\"level\":\"error\",\"msg\":\"slow fdatasync\",\"took\":\"7.1s\"}" }
            ],
            trivia: {
                question: "etcd recommends WAL fdatasync latency stays under...",
                options: ["1 ms", "10 ms", "50 ms", "200 ms"],
                correctIndex: 1,
                explainCorrect: "Correct. ~10ms is the sweet spot. Above that, leader churn.",
                explainWrong: "etcd wants fdatasync under ~10ms. Slower → leader elections."
            },
            actions: {
                hotfix: {
                    label: "Scale etcd to a single node",
                    blurb: "Kill quorum to stop the timeouts. Now you have 1 etcd. No HA. What could go wrong?",
                    log: [
                        { type: "info", text: "$ kubectl scale etcd --replicas=1" },
                        { type: "warn", text: "quorum=1. Cluster responsive again." },
                        { type: "bad",  text: "[#sre] 'are we... single-node etcd in prod?'" },
                        { type: "bad",  text: "Yes. Yes we are." }
                    ],
                    effects: { uptime: -2, stress: 35, budget: 0 }
                },
                runbook: {
                    label: "Defrag + move etcd to NVMe",
                    blurb: "Compact, defrag, then migrate the etcd data dir to fast local disk. Per node.",
                    log: [
                        { type: "info", text: "$ etcdctl defrag --cluster" },
                        { type: "dim",  text: "...defragmenting node-1... node-2... node-3..." },
                        { type: "out",  text: "Latency back under 5ms. 6h of effort. Coffee #11." },
                        { type: "warn", text: "Your back hurts. You miss your hobbies." }
                    ],
                    effects: { uptime: -2, stress: 45, budget: -800 }
                },
                everest: {
                    label: "OpenEverest control-plane scaling",
                    blurb: "Hand etcd ops off; OpenEverest sizes the control plane to the workload.",
                    log: [
                        { type: "info", text: "$ everest controlplane scale --auto" },
                        { type: "good", text: "[everest] migrating etcd data to NVMe-backed PVC" },
                        { type: "good", text: "[everest] quorum stable, fdatasync p99=3.2ms" },
                        { type: "good", text: "You went and made breakfast." }
                    ],
                    effects: { uptime: 0, stress: 0, budget: -300 }
                }
            }
        },
        {
            day: 6,
            time: "05:51",
            title: "Disk usage 99% on primary",
            alert: "WAL writes are starting to fail on pg-0. Writes will halt cluster-wide in minutes.",
            symptoms: [
                { type: "info", text: "$ kubectl exec pg-0 -- df -h /var/lib/postgresql" },
                { type: "out",  text: "Filesystem    Size  Used Avail Use% Mounted" },
                { type: "bad",  text: "/dev/nvme1n1  200G  198G  2.0G  99% /var/lib/postgresql" },
                { type: "info", text: "$ kubectl exec pg-0 -- du -sh /var/lib/postgresql/pg_wal" },
                { type: "warn", text: "84G   /var/lib/postgresql/pg_wal" },
                { type: "info", text: "$ kubectl exec pg-0 -- psql -c \"SELECT slot_name, active FROM pg_replication_slots\"" },
                { type: "bad",  text: " analytics_slot | f    <-- inactive slot pinning WAL!" }
            ],
            trivia: {
                question: "An inactive Postgres replication slot will...",
                options: [
                    "Be auto-cleaned after 24h",
                    "Retain WAL forever until dropped",
                    "Only retain 1GB max",
                    "Silently fall back to async mode"
                ],
                correctIndex: 1,
                explainCorrect: "Correct. Inactive slots pin WAL indefinitely. Classic disk-full cause.",
                explainWrong: "Inactive slots retain WAL forever. Drop the slot or set max_slot_wal_keep_size."
            },
            actions: {
                hotfix: {
                    label: "DROP REPLICATION SLOT + rm old WAL",
                    blurb: "Drop the dead analytics slot, then pg_archivecleanup. Crosses fingers.",
                    log: [
                        { type: "info", text: "$ psql -c \"SELECT pg_drop_replication_slot('analytics_slot')\"" },
                        { type: "good", text: " pg_drop_replication_slot " },
                        { type: "good", text: " " },
                        { type: "warn", text: "84GB freed. Analytics team's CDC pipeline now broken." }
                    ],
                    effects: { uptime: -1, stress: 20, budget: 0 }
                },
                runbook: {
                    label: "VACUUM FULL + manual PVC resize",
                    blurb: "VACUUM FULL holds an ACCESS EXCLUSIVE lock. Then resize PVC + filesystem.",
                    log: [
                        { type: "info", text: "$ psql -c 'VACUUM FULL big_table'" },
                        { type: "bad",  text: "ACCESS EXCLUSIVE lock held for 23 minutes." },
                        { type: "bad",  text: "All writes blocked. Checkout returning 500s." },
                        { type: "warn", text: "PVC resized to 400G. Customers... displeased." }
                    ],
                    effects: { uptime: -6, stress: 35, budget: -400 }
                },
                everest: {
                    label: "OpenEverest storage autoscale",
                    blurb: "Online PVC expansion + slot policy enforcement.",
                    log: [
                        { type: "info", text: "$ everest storage autoscale --on" },
                        { type: "good", text: "[everest] PVC 200Gi → 400Gi (online, zero downtime)" },
                        { type: "good", text: "[everest] slot policy: max_slot_wal_keep_size=8GB applied" },
                        { type: "good", text: "You never opened the laptop." }
                    ],
                    effects: { uptime: 0, stress: 0, budget: -200 }
                }
            }
        },
        {
            day: 7,
            time: "23:30",
            title: "Postgres 14 → 16 mandatory by morning",
            alert: "Compliance: EOL deadline is 09:00. CTO has joined the war-room and is watching. No pressure.",
            symptoms: [
                { type: "info", text: "$ everest db inspect pg-prod" },
                { type: "out",  text: "engine:        postgresql:14.10" },
                { type: "out",  text: "pending plan:  postgresql:16.4  (strategy: rolling)" },
                { type: "out",  text: "extensions:" },
                { type: "good", text: "  pgvector     0.5.1   (pg16: compatible)" },
                { type: "bad",  text: "  pg_partman   4.7     (pg16: NOT compatible)  <-- blocker" }
            ],
            trivia: {
                question: "Postgres major-version upgrade with the LEAST downtime is...",
                options: [
                    "pg_dump | psql",
                    "pg_upgrade --link",
                    "rsync the data dir",
                    "Logical replication (e.g. pglogical)"
                ],
                correctIndex: 3,
                explainCorrect: "Correct. Logical replication enables near-zero-downtime cutover.",
                explainWrong: "Logical replication is the standard near-zero-downtime path."
            },
            actions: {
                hotfix: {
                    label: "DROP EXTENSION pg_partman; upgrade in place",
                    blurb: "Just yeet the extension. The quarterly billing job is fine without it. Probably.",
                    log: [
                        { type: "info", text: "$ psql -c 'DROP EXTENSION pg_partman CASCADE'" },
                        { type: "bad",  text: "DROP EXTENSION CASCADE: removed 84 partitions, 22 triggers" },
                        { type: "bad",  text: "billing_events_archive: 1.2B rows lost partition structure" },
                        { type: "bad",  text: "CTO is silently typing in #incident." }
                    ],
                    effects: { uptime: -8, stress: 50, budget: -2000 }
                },
                runbook: {
                    label: "4-hour maintenance window + pg_upgrade",
                    blurb: "Schedule, comms, status page, pg_upgrade --link, hold breath.",
                    log: [
                        { type: "info", text: "$ pg_upgrade --old-bindir=/pg14 --new-bindir=/pg16 --link" },
                        { type: "warn", text: "Maintenance mode ON. 4 hours of read-only." },
                        { type: "out",  text: "Upgrade complete in 3h47m. Off by a hair." },
                        { type: "warn", text: "Status page green again. You missed sunrise." }
                    ],
                    effects: { uptime: -4, stress: 40, budget: -1500 }
                },
                everest: {
                    label: "OpenEverest rolling upgrade (logical)",
                    blurb: "Logical replication + extension shim. Replicas first, primary last.",
                    log: [
                        { type: "info", text: "$ everest upgrade --to 16.4 --strategy rolling" },
                        { type: "good", text: "[everest] pgvector confirmed compatible" },
                        { type: "good", text: "[everest] pg_partman 4.7 → 5.0 shim activated" },
                        { type: "good", text: "[everest] cutover in 1.8s. CTO sends 👏." }
                    ],
                    effects: { uptime: 0, stress: -5, budget: -300 }
                }
            }
        }
    ];

    /* ===========================================================
       STATE
       =========================================================== */
    const state = {
        phase: "title",
        dayIndex: 0,
        choices: [],
        triviaAnswered: [],
        uptime: 99.99,
        stress: 0,
        budget: 10000,
        credits: START_CREDITS,
        lastEffect: null,
        lastLog: null,
        triviaPhase: "pending",
        triviaResult: null,
        ended: false
    };

    function resetGame() {
        state.phase = "day";
        state.dayIndex = 0;
        state.choices = [];
        state.triviaAnswered = [];
        state.uptime = 99.99;
        state.stress = 0;
        state.budget = 10000;
        state.credits = START_CREDITS;
        state.lastEffect = null;
        state.lastLog = null;
        state.triviaPhase = "pending";
        state.triviaResult = null;
        state.ended = false;
    }

    function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

    function applyEffects(eff) {
        state.uptime = clamp(+(state.uptime + (eff.uptime || 0)).toFixed(2), 0, 100);
        state.stress = clamp(state.stress + (eff.stress || 0), 0, 100);
        state.budget = state.budget + (eff.budget || 0);
    }

    function checkGameOver() {
        if (state.uptime < 90)   return { reason: "fired",    banner: "GAME OVER", rank: "FIRED",                  tagline: "Uptime dropped below 90%. HR scheduled a 1:1." };
        if (state.stress >= 100) return { reason: "burnout",  banner: "BURNOUT",   rank: "THE BURNOUT",            tagline: "You filed PTO and never returned." };
        if (state.budget <= 0)   return { reason: "bankrupt", banner: "BANKRUPT",  rank: "THE OVER-PROVISIONER",   tagline: "CFO terminated the cluster. And the team." };
        return null;
    }

    function rankFor() {
        const total = state.choices.length;
        const counts = { hotfix: 0, runbook: 0, everest: 0 };
        state.choices.forEach(c => counts[c]++);
        const ratio = (k) => total === 0 ? 0 : counts[k] / total;

        if (ratio("everest") >= 0.7) {
            return { banner: "VICTORY!", victoryClass: "kc-endgame-victory",
                rank: "THE AUTOMATION ZEN MASTER",
                tagline: "You slept 8 hours a night. Cluster purrs. Promotion incoming." };
        }
        if (ratio("hotfix") >= 0.55) {
            return { banner: "YOU SURVIVED", victoryClass: "kc-endgame-victory",
                rank: "THE COWBOY",
                tagline: "All wounds healed by `kubectl --force`. Tech debt is screaming." };
        }
        if (ratio("runbook") >= 0.55) {
            return { banner: "YOU SURVIVED", victoryClass: "kc-endgame-victory",
                rank: "THE RUNBOOK MARTYR",
                tagline: "Every change reviewed. Every step documented. You aged 12 years." };
        }
        return { banner: "YOU SURVIVED", victoryClass: "kc-endgame-victory",
            rank: "THE TIRED OPERATOR",
            tagline: "A bit of everything. Mostly caffeine." };
    }

    /* ---------- DOM helpers ---------- */
    function el(tag, attrs, children) {
        const node = document.createElement(tag);
        if (attrs) {
            for (const k in attrs) {
                if (k === "class") node.className = attrs[k];
                else if (k === "html") node.innerHTML = attrs[k];
                else if (k.startsWith("on")) node.addEventListener(k.substring(2), attrs[k]);
                else node.setAttribute(k, attrs[k]);
            }
        }
        if (children) {
            (Array.isArray(children) ? children : [children]).forEach(c => {
                if (c == null || c === false) return;
                node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
            });
        }
        return node;
    }

    /* ===========================================================
       RENDER
       =========================================================== */
    function render() {
        const root = document.getElementById(ROOT_ID);
        if (!root) return;
        root.innerHTML = "";

        if (state.phase === "title") {
            root.appendChild(renderTitle());
            return;
        }

        const stage = el("div", { class: "kc-console" });
        stage.appendChild(renderHud());

        if (state.phase === "day") {
            stage.appendChild(renderPager(false));
            stage.appendChild(renderSymptoms());
            stage.appendChild(renderTrivia());
            stage.appendChild(renderActions());
        } else if (state.phase === "result") {
            stage.appendChild(renderPager(true));
            stage.appendChild(renderTerminal(state.lastLog, true));
            stage.appendChild(renderNextButton());
            const eff = state.lastEffect;
            if (eff) {
                if ((eff.uptime || 0) < -2 || (eff.stress || 0) >= 30) {
                    stage.classList.add("kc-shake");
                    stage.classList.add("kc-flash-red");
                } else if ((eff.uptime || 0) === 0 && (eff.stress || 0) <= 5) {
                    stage.classList.add("kc-flash-green");
                }
            }
        } else if (state.phase === "end") {
            stage.appendChild(renderEndgame());
        }

        root.appendChild(stage);
    }

    function renderTitle() {
        const wrap = el("div", { class: "kc-console kc-title-screen" });
        wrap.appendChild(el("div", { class: "kc-title", html: "KUBE<br>CRISIS" }));
        wrap.appendChild(el("div", { class: "kc-subtitle" }, "The 3 AM Pager Simulator"));

        const rules = el("div", { class: "kc-rules" });
        rules.appendChild(el("div", { class: "kc-rules-title" }, "MISSION BRIEF"));
        const ul = el("ul");
        [
            "Survive 7 days on-call.",
            "Each pager: read the symptoms, pick a fix.",
            "HOTFIX = fast & dirty.  RUNBOOK = textbook toil.",
            "OPENEVEREST = clean — costs 1 \u26A1 credit.",
            "Answer the geek-check right → earn \u26A1.",
            "Game over if Uptime < 90%, Stress = 100%, or Budget = $0."
        ].forEach(t => ul.appendChild(el("li", null, t)));
        rules.appendChild(ul);
        wrap.appendChild(rules);

        wrap.appendChild(el("button", { class: "kc-start-btn", onclick: startGame }, "Press Start"));
        return wrap;
    }

    function renderHud() {
        const hud = el("div", { class: "kc-hud" });

        const dayBadge = el("div", { class: "kc-day-badge" });
        dayBadge.appendChild(el("span", { class: "kc-day-label" }, "DAY"));
        const dayNum = state.dayIndex < SCENARIOS.length ? SCENARIOS[state.dayIndex].day : TOTAL_DAYS;
        dayBadge.appendChild(el("span", { class: "kc-day-value" }, `${dayNum} / ${TOTAL_DAYS}`));
        hud.appendChild(dayBadge);

        hud.appendChild(metricBar({
            label: "UPTIME",
            value: state.uptime.toFixed(2) + "%",
            pct: clamp((state.uptime - 80) / 20 * 100, 0, 100),
            tier: state.uptime >= 99 ? "good" : (state.uptime >= 95 ? "warn" : "bad")
        }));

        hud.appendChild(metricBar({
            label: "STRESS",
            value: state.stress + "%",
            pct: state.stress,
            tier: state.stress < 40 ? "cyan" : (state.stress < 75 ? "warn" : "bad")
        }));

        hud.appendChild(metricBar({
            label: "BUDGET",
            value: "$" + state.budget.toLocaleString("en-US"),
            pct: clamp(state.budget / 10000 * 100, 0, 100),
            tier: state.budget > 5000 ? "good" : (state.budget > 2000 ? "warn" : "bad")
        }));

        hud.appendChild(renderCredits());

        return hud;
    }

    function metricBar({ label, value, pct, tier }) {
        const m = el("div", { class: "kc-metric" });
        const top = el("div", { class: "kc-metric-label" });
        top.appendChild(el("span", null, label));
        top.appendChild(el("span", { class: "kc-metric-value" }, value));
        m.appendChild(top);
        const bar = el("div", { class: "kc-bar" });
        const fill = el("div", { class: `kc-bar-fill kc-fill-${tier}` });
        fill.style.width = pct + "%";
        bar.appendChild(fill);
        m.appendChild(bar);
        return m;
    }

    function renderCredits() {
        const m = el("div", { class: "kc-metric kc-credits-metric" });
        const top = el("div", { class: "kc-metric-label" });
        top.appendChild(el("span", null, "OE CREDITS"));
        top.appendChild(el("span", { class: "kc-metric-value" }, state.credits + " / " + MAX_CREDITS));
        m.appendChild(top);
        const row = el("div", { class: "kc-credits-row" });
        for (let i = 0; i < MAX_CREDITS; i++) {
            row.appendChild(el("span", { class: "kc-zap " + (i < state.credits ? "kc-zap-on" : "kc-zap-off") }, "\u26A1"));
        }
        m.appendChild(row);
        return m;
    }

    function renderPager(passive) {
        const sc = SCENARIOS[state.dayIndex];
        const card = el("div", { class: "kc-pager" });
        const head = el("div", { class: "kc-pager-head" });
        const tag = el("span", { class: "kc-pager-tag" }, passive ? "RESOLVING" : "PAGER ALERT");
        if (passive) tag.style.animation = "none";
        head.appendChild(tag);
        head.appendChild(el("span", { class: "kc-pager-time" }, `DAY ${sc.day}  ${sc.time}`));
        card.appendChild(head);
        card.appendChild(el("div", { class: "kc-pager-title" }, sc.title));
        card.appendChild(el("div", { class: "kc-pager-body" }, sc.alert));
        return card;
    }

    function renderSymptoms() {
        const sc = SCENARIOS[state.dayIndex];
        const wrap = el("div", { class: "kc-symptoms" });
        wrap.appendChild(el("div", { class: "kc-symptoms-head" }, "SHELL  /  on-call.local"));
        sc.symptoms.forEach(line => {
            wrap.appendChild(el("div", { class: "kc-terminal-line kc-log-" + line.type }, line.text));
        });
        return wrap;
    }

    function renderTrivia() {
        const sc = SCENARIOS[state.dayIndex];
        const trivia = sc.trivia;
        if (!trivia) return document.createComment("no trivia");

        const wrap = el("div", { class: "kc-trivia" });
        const head = el("div", { class: "kc-trivia-head" });
        head.appendChild(el("span", { class: "kc-trivia-badge" }, "GEEK CHECK"));
        head.appendChild(el("span", { class: "kc-trivia-prize" }, "Reward: +1 \u26A1"));
        wrap.appendChild(head);
        wrap.appendChild(el("div", { class: "kc-trivia-q" }, trivia.question));

        if (state.triviaPhase === "pending") {
            const grid = el("div", { class: "kc-trivia-opts" });
            trivia.options.forEach((opt, i) => {
                grid.appendChild(el("button", {
                    class: "kc-trivia-opt",
                    onclick: () => answerTrivia(i)
                }, opt));
            });
            wrap.appendChild(grid);
            wrap.appendChild(el("button", {
                class: "kc-trivia-skip",
                onclick: skipTrivia
            }, "Skip — fire is more important"));
        } else {
            const correct = state.triviaResult === "correct";
            const msg = correct
                ? trivia.explainCorrect
                : (state.triviaResult === "skipped" ? "Skipped. Maybe next pager." : trivia.explainWrong);
            wrap.appendChild(el("div", {
                class: "kc-trivia-result " + (correct ? "kc-trivia-good" : "kc-trivia-bad")
            }, msg));
        }

        return wrap;
    }

    function renderActions() {
        const wrap = el("div", { class: "kc-actions kc-actions-3" });
        const sc = SCENARIOS[state.dayIndex];
        wrap.appendChild(actionBtn("hotfix",  sc.actions.hotfix,  "[ HOTFIX ]"));
        wrap.appendChild(actionBtn("runbook", sc.actions.runbook, "[ RUNBOOK ]"));
        wrap.appendChild(actionBtn("everest", sc.actions.everest, "[ OPENEVEREST  -1 \u26A1 ]", state.credits <= 0));
        return wrap;
    }

    function actionBtn(kind, action, label, disabled) {
        const btn = el("button", {
            class: "kc-btn kc-btn-" + kind,
            onclick: disabled ? null : () => choose(kind)
        });
        if (disabled) {
            btn.setAttribute("disabled", "true");
            btn.title = "Out of OpenEverest credits. Answer geek checks to earn more.";
        }
        btn.appendChild(el("span", { class: "kc-btn-label" }, label));
        btn.appendChild(document.createTextNode(action.label));
        btn.appendChild(el("div", { class: "kc-btn-blurb" }, action.blurb));
        return btn;
    }

    function renderTerminal(lines, animate) {
        const term = el("div", { class: "kc-terminal" });
        if (!animate) {
            (lines || []).forEach(l => {
                term.appendChild(el("div", { class: "kc-terminal-line kc-log-" + l.type }, l.text));
            });
            return term;
        }
        let i = 0;
        function nextLine() {
            if (i >= lines.length) {
                const last = term.lastChild;
                if (last) last.classList.add("kc-cursor");
                return;
            }
            const line = lines[i++];
            const node = el("div", { class: "kc-terminal-line kc-log-" + line.type }, "");
            term.appendChild(node);
            typeText(node, line.text, 18, nextLine);
        }
        nextLine();
        return term;
    }

    function typeText(node, text, speed, done) {
        let i = 0;
        node.classList.add("kc-cursor");
        const id = setInterval(() => {
            if (i >= text.length) {
                clearInterval(id);
                node.classList.remove("kc-cursor");
                if (done) setTimeout(done, 80);
                return;
            }
            i += 1;
            if (node.firstChild) node.firstChild.nodeValue = text.substring(0, i);
            else node.appendChild(document.createTextNode(text.substring(0, i)));
        }, speed);
    }

    function renderNextButton() {
        const wrap = el("div", { class: "kc-next" });
        const isLast = state.ended || state.dayIndex >= SCENARIOS.length - 1;
        wrap.appendChild(el("button", {
            class: "kc-start-btn",
            onclick: nextDay
        }, isLast ? "See Results >>" : "Next Day >>"));
        return wrap;
    }

    function renderEndgame() {
        const wrap = el("div", { class: "kc-endgame" });
        let banner, tagline, victoryClass, rankLabel;

        if (state.ended) {
            const r = checkGameOver();
            banner = r ? r.banner : "GAME OVER";
            victoryClass = "kc-endgame-defeat";
            rankLabel = r ? r.rank : "FIRED";
            tagline = r ? r.tagline : "It all fell apart.";
        } else {
            const r = rankFor();
            banner = r.banner;
            victoryClass = r.victoryClass;
            rankLabel = r.rank;
            tagline = r.tagline;
        }

        wrap.appendChild(el("div", { class: `kc-endgame-banner ${victoryClass}` }, banner));
        wrap.appendChild(el("div", { class: "kc-rank" }, rankLabel));
        wrap.appendChild(el("div", { class: "kc-rank-tagline" }, tagline));

        const counts = { hotfix: 0, runbook: 0, everest: 0 };
        state.choices.forEach(c => counts[c]++);
        const triviaCorrect = state.triviaAnswered.filter(t => t.correct).length;

        const card = el("div", { class: "kc-scorecard" });
        [
            ["UPTIME",           state.uptime.toFixed(2) + "%"],
            ["FINAL STRESS",     state.stress + "%"],
            ["BUDGET LEFT",      "$" + state.budget.toLocaleString("en-US")],
            ["DAYS SURVIVED",    `${state.choices.length} / ${TOTAL_DAYS}`],
            ["HOTFIX / RUNBOOK / EVEREST", `${counts.hotfix} / ${counts.runbook} / ${counts.everest}`],
            ["GEEK CHECK SCORE", `${triviaCorrect} / ${state.triviaAnswered.length}`]
        ].forEach(([k, v]) => {
            const row = el("div", { class: "kc-score-row" });
            row.appendChild(el("span", null, k));
            row.appendChild(el("span", null, v));
            card.appendChild(row);
        });
        wrap.appendChild(card);

        const shareUrl = "https://openeverest.io/kubecrisis/";
        const bareUrl = "openeverest.io/kubecrisis/";
        const scoreLine =
            `My KubeCrisis score is "${rankLabel}" — uptime ${state.uptime.toFixed(2)}%, ` +
            `stress ${state.stress}%, geek-check ${triviaCorrect}/${state.triviaAnswered.length}. Try to beat me!`;
        const shareMsgX = `${scoreLine} ${shareUrl}`;
        const shareMsgLinkedIn = `${scoreLine}\n\nPlay it: ${bareUrl}`;
        const enc = encodeURIComponent;

        const shareLabel = el("div", { class: "kc-share-label" }, "SHARE YOUR SCORE");
        wrap.appendChild(shareLabel);

        const shareRow = el("div", { class: "kc-cta-row kc-share-row" });
        shareRow.appendChild(el("a", {
            class: "kc-cta kc-cta-linkedin",
            href: "https://www.linkedin.com/feed/?shareActive=true&text=" + enc(shareMsgLinkedIn),
            target: "_blank",
            rel: "noopener"
        }, "in  LinkedIn"));
        shareRow.appendChild(el("a", {
            class: "kc-cta kc-cta-x",
            href: "https://twitter.com/intent/tweet?text=" + enc(shareMsgX),
            target: "_blank",
            rel: "noopener"
        }, "X / Twitter"));
        wrap.appendChild(shareRow);

        const ctas = el("div", { class: "kc-cta-row" });
        ctas.appendChild(el("a", {
            class: "kc-cta kc-cta-learn",
            href: "/"
        }, "How OpenEverest Does This"));
        ctas.appendChild(el("button", {
            class: "kc-cta kc-cta-replay",
            onclick: startGame
        }, "Play Again"));
        wrap.appendChild(ctas);
        return wrap;
    }

    /* ===========================================================
       GAME FLOW
       =========================================================== */
    function startGame() {
        resetGame();
        render();
    }

    function answerTrivia(i) {
        if (state.triviaPhase !== "pending") return;
        const sc = SCENARIOS[state.dayIndex];
        const correct = i === sc.trivia.correctIndex;
        state.triviaPhase = "answered";
        state.triviaResult = correct ? "correct" : "wrong";
        state.triviaAnswered.push({ dayIndex: state.dayIndex, correct });
        if (correct) state.credits = Math.min(MAX_CREDITS, state.credits + 1);
        render();
    }

    function skipTrivia() {
        if (state.triviaPhase !== "pending") return;
        state.triviaPhase = "answered";
        state.triviaResult = "skipped";
        render();
    }

    function choose(kind) {
        const sc = SCENARIOS[state.dayIndex];
        const action = sc.actions[kind];
        if (!action) return;
        if (kind === "everest" && state.credits <= 0) return;
        if (kind === "everest") state.credits -= 1;

        state.choices.push(kind);
        applyEffects(action.effects);
        state.lastEffect = action.effects;

        const header = { type: "info", text: `> RESOLVING DAY ${sc.day}: ${sc.title}` };
        const effectLine = {
            type: (action.effects.uptime || 0) < 0 ? "warn" : "good",
            text: `[effect] uptime ${signed(action.effects.uptime || 0)}%, stress ${signed(action.effects.stress || 0)}%, budget ${signed(action.effects.budget || 0, true)}` +
                  (kind === "everest" ? "  (-1 \u26A1)" : "")
        };
        state.lastLog = [header, ...action.log, effectLine];

        if (checkGameOver()) state.ended = true;

        state.phase = "result";
        render();
    }

    function signed(n, money) {
        if (n === 0) return money ? "$0" : "0";
        if (money) return (n > 0 ? "+$" : "-$") + Math.abs(n).toLocaleString("en-US");
        return (n > 0 ? "+" : "") + n;
    }

    function nextDay() {
        if (state.ended) {
            state.phase = "end";
            render();
            return;
        }
        state.dayIndex += 1;
        if (state.dayIndex >= SCENARIOS.length) {
            state.phase = "end";
            render();
            return;
        }
        state.phase = "day";
        state.triviaPhase = "pending";
        state.triviaResult = null;
        render();
    }

    /* ---------- Boot ---------- */
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", render);
    } else {
        render();
    }
})();
