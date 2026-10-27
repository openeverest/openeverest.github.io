---
title: "KServe provider now scopes AI Gateway API keys to their namespace"
date: 2026-10-25T07:46:04Z
draft: false
topics:
 - kserve
 - ai-gateway
 - security
 - releases
link: https://github.com/openeverest/provider-kserve/releases/tag/v0.4.4
summary: AI Gateway API keys in the KServe provider are now scoped to their own namespace, and key collisions fail closed instead of leaking across namespaces.
---

The KServe provider now scopes AI Gateway API keys to the namespace where they
were created. A key defined in one namespace can no longer be resolved or used
from another, so teams sharing a cluster no longer need to worry about key
collisions or cross-namespace exposure of their gateway credentials.

The provider also fails closed when two namespaces define the same key: instead
of silently picking one winner, the conflicting key is rejected outright, so
misconfiguration is surfaced immediately rather than papered over.

To learn more, visit the [provider-kserve v0.4.4 release notes](https://github.com/openeverest/provider-kserve/releases/tag/v0.4.4).