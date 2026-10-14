---
title: "provider-milvus introduces credential isolation and root password rotation for Milvus"
date: 2026-10-13T15:02:14Z
draft: false
topics:
 - milvus
 - openeverest
 - security
 - releases
link: https://github.com/openeverest/provider-milvus/releases/tag/v0.2.0
summary: provider-milvus 0.2.0 keeps root and bundled MinIO credentials out of the Milvus CR and rotates the Milvus root password from the credentials Secret.
---

provider-milvus 0.2.0 keeps root and bundled MinIO credentials out of the Milvus custom resource, and can rotate the Milvus root password from the credentials Secret.

Previously, credentials could end up inside the Milvus CR, where any reader of the resource could see them. Sensitive values now stay in Secrets, and root password rotation is driven from the credentials Secret rather than the CR itself.

To learn more, visit the [provider-milvus release notes](https://github.com/openeverest/provider-milvus/releases/tag/v0.2.0).
