---
title: "KServe AI Gateway can now use a rate-limit backend set through urlRef"
date: 2026-10-19T17:23:11Z
draft: false
topics:
 - kserve
 - ai-gateway
 - releases
link: https://github.com/openeverest/provider-kserve/releases/tag/v0.4.1
summary: The KServe AI Gateway now honours rate-limit backends defined by reference, and its authentication options are documented.
---

The KServe AI Gateway can now use a rate-limit backend defined through `urlRef`, so a single shared backend can be referenced from multiple routes instead of repeating connection details inline.

Alongside this change, the gateway's authentication options are now documented, making it easier to secure routes in front of your models.

Both are available in provider-kserve v0.4.1. To learn more, visit the [provider-kserve v0.4.1 release](https://github.com/openeverest/provider-kserve/releases/tag/v0.4.1).