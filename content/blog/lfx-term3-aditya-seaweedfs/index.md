---
title: "Less SELECT, More Buckets: Aditya’s LFX Term 3"
date: 2026-11-30T12:00:00
draft: true
image:
    url: lfx-term3-aditya-cover.png
    attribution:
authors:
  - spron-in
tags:
  - mentorship
  - lfx
  - seaweedfs
  - provider
  - object-storage
  - community
  - cloudnativepg
summary: "Aditya Pimpalkar’s LFX Mentorship Term 3 wrap-up — building the SeaweedFS object storage provider, keeping CloudNativePG moving, and poking at the rest of the OpenEverest stack along the way."
---

When [LFX Mentorship Term 3](https://openeverest.io/blog/lfx-mentorship-term3-2026/) kicked off in September, [Aditya Pimpalkar](/authors/adityapimpalkar/) already knew his way around an OpenEverest provider. He had built [provider-cloudnative-pg](https://github.com/openeverest/provider-cloudnative-pg) earlier in the year. This term asked for something different: **object storage**. Same provider model, different beast. Masters, volume servers, filers, S3 gateways. Less `SELECT`, more “where did my bucket go.”

The project: [Develop the Object Storage provider](https://openeverest.io/mentorship/). Mentors: [Diogo Recharte](/authors/recharte/) and [Sergey Pronin](/authors/spron-in/). Destination: [provider-seaweedfs](https://github.com/openeverest/provider-seaweedfs), with [Aditya](/authors/adityapimpalkar/) as the main maintainer.

## Why SeaweedFS?

After MinIO closed its doors to the community, OpenEverest needed an S3-compatible option that folks could actually run next to their databases — especially on-prem and at the edge. SeaweedFS won the shortlist for practical reasons: a usable Kubernetes operator, and a complexity level that does not require a Ceph support group on speed dial.

[Aditya](/authors/adityapimpalkar/)’s job was to turn that into a first-class OpenEverest provider — same UI, CLI, and API surface users already use for databases.

## Building provider-seaweedfs from empty repo to “it actually works”

September started the way these things usually start: a scaffold, a README that promises the future, and a hope that the first Instance would come up green.

It did — eventually.

### September: wire the stack

The early PRs read like a checklist of “does this piece even exist yet?”

- Scaffold the provider and land a `standalone` topology
- Wire **master**, **volume**, and **filer** components one by one
- Expose connection details so users are not guessing endpoints from pod logs
- Add the **S3** component essentials
- Stand up CI and a release pipeline (because shipping without a pipeline is just vibes)

By the end of the month, a SeaweedFS Instance could go from YAML to a reachable S3 gateway. Not fancy. Not finished. But real.

### October: make it feel like a product

October is when the provider stopped being a science experiment and started looking like something you might hand to a teammate.

Service exposure landed — ClusterIP, NodePort, LoadBalancer — because “it runs” is only half the story if nothing can talk to it. Storage class selection per component showed up in the UI. Replication policies got validations (the kind that save you from learning about replica counts the hard way). Hostname anti-affinity for master, volume, and filer followed, so Kubernetes would stop cheerfully co-locating everything on the one node that is about to sneeze.

Security got attention too: inter-component mTLS, S3 ingress, and default HTTPS on the S3 gateway when TLS is enabled. That last bit needed love upstream — [Aditya](/authors/adityapimpalkar/) opened and merged [https support for the S3 gateway](https://github.com/seaweedfs/seaweedfs-operator/pull/426) in `seaweedfs/seaweedfs-operator`. Provider work has a funny way of turning into “wait, the operator does not do that yet.”

There was also an admin UI toggle (`spec.admin`), storage size expansion, e2e smoke tests against the S3 gateway, and a design proposal for backup/restore — because deploying storage without a backup story is how you earn interesting weekends.

Somewhere in there, SeaweedFS also landed on the [OpenEverest Hub](https://github.com/openeverest/hub/pull/46), so discovering the provider did not require a scavenger hunt through GitHub.

Releases rolled: `v0.1.1`, `v0.1.2`, `v0.2.0`. MVP stickers still apply. Progress does not.

### November: backups, mirrors, and the restore rabbit hole

November went deep on data protection.

On-demand backups landed. Scheduled backups with mirror followed. Then `dataMirror` itself. Restore is in flight — the open PR is doing the careful, slightly paranoid work: filer emptiness probes, phase mapping, rejecting PITR for now, and making sure restore still works after backups get cleaned up. The glamorous stuff.

E2E cluster tests got fixed. The seaweedfs-operator dependency got bumped. Maintainer life: half features, half “why is CI red again.”

## But wait — there’s more (the rest of the ecosystem)

LFX had a clear focus. [Aditya](/authors/adityapimpalkar/)… had a second job that kept waving from the other tab.

### CloudNativePG provider refused to gather dust

While SeaweedFS was the mentorship headline, [provider-cloudnative-pg](https://github.com/openeverest/provider-cloudnative-pg) kept getting commits like it was still day one.

Across Term 3 he shipped scheduled backups, PITR, TimescaleDB extension support, better connection details (read / read-only services and `sslmode`), failed-status mapping, a pgBouncer pooler component, a read-only pooler, Barman plugin detection, restore/status fixes, example YAMLs, several point releases (`v0.3.0` through `v0.3.3`), and more cleanup and tests than anyone puts on a résumé.

And then the repo itself leveled up. On **November 16**, the provider [moved into the OpenEverest org as an official provider](https://openeverest.io/blog/provider-cloudnative-pg-official) — with [Aditya](/authors/adityapimpalkar/) staying on as maintainer. Not a bad side quest for a mentorship term that was supposedly about object storage.

Building one provider teaches you the SDK. Maintaining two at once teaches you where the SDK is lying to you.


### Core platform scratches that turned into PRs

Providers are excellent bug magnets. When something feels wrong in SeaweedFS or CNPG, it is often an OpenEverest core gap wearing a provider costume.

That turned into real work in [openeverest/openeverest](https://github.com/openeverest/openeverest):

- A breaking (but needed) change for v2 time-based backup **retention**
- UI for time-based retention on backup schedules
- A new UI field type: `quantity`
- Work on group-level form modes (hidden / disabled per FormMode)
- Instance status messages on the database overview
- A CLI `--yaml` output flag

Some of those are merged. Some are still open. All of them came from “I am trying to ship a provider and the platform is missing a knob.”

## The vibe check

Rough numbers for Sep–Nov, if you like scoreboards: on the order of **~30 PRs** into `provider-seaweedfs`, **~17** into `provider-cloudnative-pg`, a handful into core OpenEverest, plus Hub updates and that upstream SeaweedFS operator PR. The exact count depends on when you refresh GitHub. The pattern does not: scaffold → wire → harden → backup → fix the thing underneath.

It has not all been glamorous. There were validation edge cases, flaky e2e runs, unit conversions that somehow still say `m` when they mean millicores, and the eternal Kubernetes question of “is it Pending or is it *Pending*?” Mentorship helps here — [Diogo](/authors/recharte/) and [Sergey](/authors/spron-in/) have been the people you ping when the mental model and the CRD disagree.

## What’s next

Term 3 wraps at the end of November, but the work does not. Restore for SeaweedFS is the big plate still on the table. Bucket/user/role management may stay with SeaweedFS for now, or grow into something more generic later — the team is still figuring out where that line should sit. The provider is still an MVP: schemas move, charts move, and nobody is pretending this is production-hardened yet.

What *is* true after three months: OpenEverest users can deploy S3-compatible storage next to their databases through the same Instance model. That gap was the whole point of the mentorship project. September’s empty repo is November’s working provider.

## Come poke at it

If object storage on OpenEverest sounds fun (or if you just enjoy opening issues with excellent screenshots):

- Repo: [openeverest/provider-seaweedfs](https://github.com/openeverest/provider-seaweedfs)
- Mentorship overview: [openeverest.io/mentorship](https://openeverest.io/mentorship/)

[Aditya](/authors/adityapimpalkar/) is not disappearing when the term ends — SeaweedFS by day, CloudNativePG by “also day,” and core platform fixes whenever a provider trips over a missing piece. LFX Term 3 is done. The PR list, somehow, is not.


To get involved with OpenEverest yourself:

<div style="display:flex;gap:12px;margin-top:24px;flex-wrap:wrap;">
  <a href="https://cloud-native.slack.com/archives/C09RRGZL2UX" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:8px;background-color:#4A154B;color:#fff;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;font-size:15px;">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 122.8 122.8"><path d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z" fill="#e01e5a"/><path d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z" fill="#36c5f0"/><path d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z" fill="#2eb67d"/><path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z" fill="#ecb22e"/></svg>
    Join Slack
  </a>
  <a href="https://github.com/openeverest/openeverest" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:8px;background-color:#24292f;color:#fff;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;font-size:15px;">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="#fff"><path d="M8 .25a7.75 7.75 0 1 0 0 15.5A7.75 7.75 0 0 0 8 .25zm0 1.5a6.25 6.25 0 0 1 1.97 12.18c-.31.06-.42-.13-.42-.3v-1.05c0-.36-.01-1.02-.49-1.4 1.62-.18 2.5-.88 2.5-2.57 0-.57-.2-1.1-.53-1.49.05-.14.23-.7-.05-1.47 0 0-.44-.14-1.44.54a5.02 5.02 0 0 0-2.62 0C5.93 6.6 5.49 6.74 5.49 6.74c-.28.77-.1 1.33-.05 1.47-.33.39-.53.92-.53 1.49 0 1.69.88 2.39 2.5 2.57-.31.27-.43.67-.47 1.04-.42.19-1.5.52-2.16-.62 0 0-.39-.71-1.13-.76 0 0-.72-.01-.05.45 0 0 .48.23.82 1.08 0 0 .43 1.32 2.49.87v.75c0 .17-.11.36-.42.3A6.25 6.25 0 0 1 8 1.75z"/></svg>
    Star the Repo
  </a>
</div>
