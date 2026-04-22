---
title: "Contributor Spotlight: Rishi Mondal"
date: 2026-04-22T06:00:00
draft: false
image:
    url: rishi-mondal-cover.png
    attribution:
authors:
  - spron-in
tags:
  - community
  - open-source
  - spotlight
  - kubernetes
  - databases
summary: "Meet Rishi Mondal — Docker Captain, CNCF maintainer, two-time GSoC alum turned mentor, and an SRE who joined OpenEverest because the database problem on Kubernetes is one he lives every day."
---

Some contributors show up with a question. Rishi Mondal showed up with merged pull requests worth of context.

<img src="rishi-mondal-headshot.jpeg" alt="OpenEverest Contributor - Rishi Mondal photo" style="max-width: 480px; width: 100%; height: auto;">


He's a Site Reliability Engineer at Obmondo, a CNCF project maintainer, and a Docker Captain — a designation that puts him in the top 1% of contributors and community leaders in the global container ecosystem. That's not a collection of titles. It's the output of someone who has spent years doing the actual work across Kubernetes, distributed systems, and open-source infrastructure, and who keeps showing up after the patch lands.

### The arc from participant to mentor

Rishi completed Google Summer of Code twice. That means he's been through the full experience: landing in an unfamiliar codebase, shipping real changes under real deadlines, and earning trust from maintainers who have no reason to give it until you do.

What's more telling is what came next. Rather than move on, he came back as a mentor — now serving as a GSoC Mentor with CNCF and OWASP, and as an LFX Mentor with the Linux Foundation. That's a different kind of contribution. It's not about shipping features; it's about making sure the next person in has a cleaner path than you did.

That instinct — build the contributor, not just the code — is exactly what open source needs more of at scale, and it's part of why Rishi's presence in the community carries weight beyond his commit count.

### Visibility that was earned

Rishi has spoken at KubeCon India and KCD Delhi 2026, and his contributions have been recognized by CNCF leadership at KubeCon India. He's been selected as a delegate for the Harvard Project for Asian and International Relations (HPAIR) and as a Linux Foundation LIFT Scholar. He's completing a Master of Computer Applications at Techno College Hooghly under Makaut University — apparently while doing everything else listed above.

None of this happened overnight. The visibility followed the work, which is the right order.

### Why the database problem is personal

Rishi's interest in OpenEverest isn't theoretical. As an SRE who manages stateful workloads on Kubernetes, he runs directly into the problem the project exists to solve.

Kubernetes handles stateless services well. Databases are a different story. Teams end up patching together multiple operators with inconsistent APIs and fragile operational patterns. The alternative — managed DBaaS — trades away control and introduces vendor dependency. Neither option is satisfying when you're the one carrying the pager.

OpenEverest takes a different approach: a single, Kubernetes-native control plane with declarative APIs for provisioning, scaling, backups, and recovery across multiple database engines. Vendor-neutral by design, which means it runs the same way whether you're on cloud or on-premises, without locking you into anyone's ecosystem.

As a CNCF Sandbox project, it also operates with open governance and community-driven development — the kind of foundation that makes long-term investment sensible.

"Contributing to OpenEverest aligns directly with the real-world challenges I solve as an SRE," Rishi says. "It represents a meaningful step toward building a unified, open, and scalable data infrastructure layer within the Kubernetes ecosystem."

### The other stuff

When he's not in front of a terminal, Rishi plays cricket, builds robots, and runs Raspberry Pi experiments. He approaches hardware the way a good SRE approaches production: break it deliberately, figure out why, rebuild it better.

He roams the city with friends when the debugging sessions run long enough to warrant it. And he has a well-documented habit of dropping *Family Guy* references into conversations that had absolutely nothing to do with *Family Guy*. Whether perfectly timed or entirely unnecessary is, apparently, beside the point.

---

We're glad to have Rishi in the OpenEverest community. Connect with him on [GitHub](https://github.com/MAVRICK-1), [LinkedIn](https://www.linkedin.com/in/rishi-mondal-5238b2282/), or his [LFX Mentorship profile](https://mentorship.lfx.linuxfoundation.org/mentor/711a2840-0900-42c7-b115-b59799027e80). 

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
