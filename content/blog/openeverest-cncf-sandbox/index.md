---
title: "OpenEverest Is Now a CNCF Sandbox Project"
date: 2026-03-27T12:00:00
draft: false
image:
    url: openeverest-cncf-sandbox.png
    attribution:
authors:
 - spron-in
tags:
 - announcement
 - community
 - open-source
 - cncf
summary: OpenEverest has been accepted as a CNCF Sandbox project — an important milestone on the path toward open, community-driven governance.
---

Back in the days when we just started working on OpenEverest in Percona, we were already thinking about donating it to [Cloud Native Computing Foundation (CNCF)](https://www.cncf.io/). We thought that it just makes sense. But as it usually happens a lot of other priorities popped up and the CNCF "project" was put on hold.

After we renamed Percona Everest into OpenEverest and created [Solanica](https://solanica.io) — a separate entity to drive [OpenEverest](https://openeverest.io) — we shared the [new vision](https://vision.openeverest.io) with the world. One of the most important pieces of that vision is fostering the community. Becoming truly open source. And donation to CNCF is an important milestone on this journey.

Today we are happy to share that OpenEverest is now a CNCF Sandbox project.

## Why donate at all?

[CNCF](https://www.cncf.io/) provides a neutral home for cloud-native projects. For OpenEverest, that means decisions are made in the open, not behind corporate walls. The [governance policy](https://github.com/openeverest/governance/blob/main/GOVERNANCE.md) is public, the [list of maintainers](https://github.com/openeverest/governance/blob/main/MAINTAINERS.md) is public, and the [project code](https://github.com/openeverest/openeverest) is there for anyone to read, fork, and contribute to.

It also means sustainability. CNCF projects have access to foundation resources, events, and marketing channels. Users can invest in OpenEverest knowing it has institutional backing — it won't disappear or change licensing overnight.

And there's the network effect. Operating inside the same foundation as Kubernetes, Prometheus, Vitess, and etcd creates natural integration opportunities and puts OpenEverest in front of the right audience.

## What does it mean for users?

Projects inside a foundation are harder to kill and harder to capture. If any single company behind OpenEverest changes direction, the project keeps going under CNCF stewardship. That's a meaningful stability guarantee.

With CNCF oversight, OpenEverest stays truly multi-vendor. You're not tied to [Solanica](https://solanica.io) or [Percona](https://percona.com) or anyone else's roadmap.

It also matters for enterprise adoption. Many organizations have procurement policies that require CNCF-backed projects for production workloads. That door is now open.

## What does it mean for the community?

The [governance model](https://github.com/openeverest/governance/blob/main/GOVERNANCE.md) we've published is the real deal. The project runs on maintainer consensus — decisions and roadmap direction are in the hands of [active maintainers](https://github.com/openeverest/governance/blob/main/MAINTAINERS.md), not any single company. Anyone can get there by contributing and earning a nomination. No single company controls the direction.

CNCF events — KubeCon, CloudNativeCon — give the project a regular stage to meet contributors and users face to face. That kind of exposure compounds over time.

Being inside the foundation also makes collaboration with adjacent CNCF projects more natural. When OpenEverest integrates with Prometheus or Vitess, we're building inside a shared ecosystem rather than knocking on doors from the outside.

## What does it mean for contributors?

Your contributions to [OpenEverest](https://openeverest.io) are now part of the CNCF ecosystem. The [governance document](https://github.com/openeverest/governance/blob/main/GOVERNANCE.md) spells out how to become a maintainer, how decisions are made, and how to propose changes. There's a clear path, not a black box.

Contributions are also protected under [CNCF's IP policies](https://lfprojects.org/policies/) — worth something if you're contributing on behalf of an employer or just care about the legal hygiene around your work.

One practical change that comes with this: all commits now require a [Developer Certificate of Origin (DCO)](https://github.com/apps/dco) sign-off. It's a lightweight mechanism — a `Signed-off-by` line in your commit message — that certifies you have the right to submit the code under the project's license. Standard practice across serious open source projects.

## Thank you

None of this happens without people who showed up. Contributors who sent PRs and reviewed code, users who filed issues and pushed back when things didn't work, early customers who bet on us before the project had a foundation logo. The CNCF acceptance is the result of that collective effort, not just ours. We're grateful.

## Get involved

If you want to get involved, the [repository](https://github.com/openeverest/openeverest) is the place to start.

Come say hello, file an issue, or just lurk for a while.

<div style="display:flex;gap:12px;margin-top:24px;flex-wrap:wrap;">
  <a href="https://openeverest.io/#community" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:8px;background-color:#0f6fec;color:#fff;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;font-size:15px;">
    Join the Community
  </a>
  <a href="https://cloud-native.slack.com/archives/C09RRGZL2UX" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:8px;background-color:#4A154B;color:#fff;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;font-size:15px;">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 122.8 122.8"><path d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z" fill="#e01e5a"/><path d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z" fill="#36c5f0"/><path d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z" fill="#2eb67d"/><path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z" fill="#ecb22e"/></svg>
    Chat on Slack
  </a>
  <a href="https://github.com/openeverest/openeverest" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:8px;background-color:#24292f;color:#fff;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:600;font-size:15px;">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="#fff"><path d="M8 .25a7.75 7.75 0 1 0 0 15.5A7.75 7.75 0 0 0 8 .25zm0 1.5a6.25 6.25 0 0 1 1.97 12.18c-.31.06-.42-.13-.42-.3v-1.05c0-.36-.01-1.02-.49-1.4 1.62-.18 2.5-.88 2.5-2.57 0-.57-.2-1.1-.53-1.49.05-.14.23-.7-.05-1.47 0 0-.44-.14-1.44.54a5.02 5.02 0 0 0-2.62 0C5.93 6.6 5.49 6.74 5.49 6.74c-.28.77-.1 1.33-.05 1.47-.33.39-.53.92-.53 1.49 0 1.69.88 2.39 2.5 2.57-.31.27-.43.67-.47 1.04-.42.19-1.5.52-2.16-.62 0 0-.39-.71-1.13-.76 0 0-.72-.01-.05.45 0 0 .48.23.82 1.08 0 0 .43 1.32 2.49.87v.75c0 .17-.11.36-.42.3A6.25 6.25 0 0 1 8 1.75z"/></svg>
    ⭐ Star on GitHub
  </a>
</div>

