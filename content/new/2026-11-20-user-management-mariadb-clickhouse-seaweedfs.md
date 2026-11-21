---
title: "User Management plugin now supports MariaDB, ClickHouse, and SeaweedFS"
date: 2026-11-20T08:31:13
draft: false
topics:
 - user-management
 - security
 - releases
link: https://github.com/openeverest/plugin-user-management/releases/tag/v0.2.7
summary: The User Management plugin can now manage MariaDB users, ClickHouse users and databases, and SeaweedFS S3 users, bucket grants, and instance buckets.
---

The User Management plugin extends its engine coverage: operators can now manage MariaDB users, ClickHouse users and databases, and SeaweedFS S3 identities — all from the same interface they already use for day-2 user administration.

For SeaweedFS, the plugin handles the full S3 identity lifecycle: creating S3 users, granting and revoking access to buckets, and managing the buckets attached to an instance. For ClickHouse, it manages both users and databases, and for MariaDB it brings the same user lifecycle management the plugin already provides for the other supported engines.

The result is one consistent, auditable flow for granting and revoking access across more of the stack — no engine-specific scripts required.

To learn more, visit the [User Management plugin v0.2.7 release notes](https://github.com/openeverest/plugin-user-management/releases/tag/v0.2.7).

<!-- release-key: openeverest/plugin-user-management@v0.2.7 -->
