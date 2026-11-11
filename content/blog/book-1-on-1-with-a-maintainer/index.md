---
title: "Book 1:1 with an OpenEverest Maintainer"
date: 2026-11-09T11:00:00
draft: false
image:
    url: cover.jpg
    attribution:
authors:
  - spron-in
tags:
  - community
  - open-source
  - kubernetes
  - databases
summary: The banner at the top of openeverest.io keeps inviting you to talk to a maintainer. This post explains who those calls are for, what happens on them, and how to book one.
---

If you've spent more than a minute on [openeverest.io](https://openeverest.io/), you've met the banner. It sits at the top of every page and cycles through a handful of messages: "Need help with your OpenEverest setup? Chat 1-on-1 with a maintainer." "Evaluating OpenEverest for your team? Share your roadmap needs with maintainers." "Planning a migration to OpenEverest? Talk it through with a maintainer." The site header has its own version, filed under "Talk to maintainers."

Some of you click it. Some of you probably wonder what the catch is. Fair — so this post explains the program: who these calls are for, what happens on them, what to prepare, and how to book one.

## Who these calls are for

The short answer is anyone with questions about running databases on Kubernetes. In practice, calls cluster into a few groups:

* **Teams evaluating OpenEverest.** You're comparing options for database management on Kubernetes, you want to know whether a specific workload or topology is a fit, and vendor documentation can only take you so far. Thirty minutes with someone who knows the internals beats three days of forum archaeology.
* **Operators running OpenEverest in production.** Something is misbehaving, or you want to sanity-check your setup — backup schedules, storage classes, upgrade sequencing, resource sizing — before it misbehaves.
* **Teams planning a migration.** You're moving databases from self-managed operators, from a managed cloud service, or from Everest v1, and want to sketch the path — including the parts we'd tell you are still bumpy.
* **Anyone getting started.** Your first install is throwing an error, or you're stuck deciding between engines and topologies. Beginner questions are explicitly welcome; "stuck on day one" is one of the reasons the banner exists.
* **Contributors and aspiring contributors.** You want to start contributing, maybe build a provider, and want help picking an entry point — an issue, a mentorship program, a project that fits your stack.
* **Anyone with roadmap feedback.** You need a capability we don't have yet. We'd rather hear it directly — including how important it is to you and what you'd use it for — than guess.

## What happens on the call

It's a video call with an actual OpenEverest maintainer — someone who writes and reviews the code, not a sales engineer. The booking page describes it plainly: OpenEverest maintainers are there to review your architecture, talk about the roadmap, and address your questions.

There is no demo script and no pitch deck unless you ask for one. A typical call is your context, your questions, and our honest answers — architecture sketches, upgrade paths, workarounds, and where useful, a live walkthrough. That includes the answers nobody puts on a feature page: "that's not supported yet," "that's planned but not soon," "here's the ugly workaround people actually use."

The one thing these calls are *not* is a support contract. If that's what your team needs, tell us — we'll say so and point you at what does fit, rather than pretend a call is a substitute.

## What to prepare

You don't need to prepare anything. But calls go much further when you bring:

* **Your environment.** Kubernetes version and distribution, the database engines you run or plan to run, storage classes, and where backups would go. Even a rough sketch helps.
* **What you've already tried.** Error messages, resource definitions, operator logs — whatever you have. "We tried X and got Y" turns a vague call into a specific one.
* **Specific questions.** "Tell me about OpenEverest" is a fine opener, but you'll get more from "can OpenSearch provider backups restore into a fresh cluster" or "how do people handle multi-tenant Postgres on this."
* **For migration planning**, the current state: what you run, roughly what sizes, and how much downtime you can tolerate.
* **For contribution questions**, the technologies you know and how much time you have.

## How to book

Go to [talk.openeverest.tech/30min](https://talk.openeverest.tech/30min) — the same link behind every banner and the site header. Pick a slot that works for your timezone, tell us briefly what you'd like to cover, and you'll get a calendar invite with the video link. That's the entire funnel: no forms beyond the booking page, no follow-up sequence, and nobody adds you to a mailing list.

## When not to book a call

Some things live longer in a tracker than in anyone's calendar. Bug reports and feature requests should go to [GitHub](https://github.com/openeverest) as issues, where they get triaged, assigned, and fixed — a 1:1 can't give them a paper trail. And if your question is "what shipped recently," the [What's New](https://openeverest.io/new) page answers faster than either of us could.

If you'd rather talk to several of us at once, come to a [community meeting](https://github.com/openeverest) — they run on a bi-weekly schedule and everyone is welcome.

Otherwise: the banner is exactly what it says. [Book a slot](https://talk.openeverest.tech/30min), bring your questions, and talk to the people who build OpenEverest.
