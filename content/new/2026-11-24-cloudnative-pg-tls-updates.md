---
title: "CloudNativePG provider now manages TLS end to end"
date: 2026-11-24T13:36:16
draft: false
topics:
 - postgresql
 - tls
 - releases
link: https://github.com/openeverest/provider-cloudnative-pg/releases/tag/v0.4.2
summary: CloudNativePG provider v0.4.2 reworks TLS: common spec.parameters.tls shape, server certificates from cert-manager or a Secret, automatic reissue on CA changes, and the server CA published as ca.crt.
---

The CloudNativePG provider v0.4.2 delivers a full rework of TLS handling for PostgreSQL clusters, rounding out certificate management from issuance to client distribution:

- **Common TLS shape.** TLS settings now live under `spec.parameters.tls`, matching the configuration structure shared by every OpenEverest provider. This is a **breaking change**: the previous `requireTLS` and `certificates` fields are replaced by the common spec — migrate your cluster definitions when upgrading.
- **Server certificates from cert-manager or a Secret.** The server certificate can now be issued by a cert-manager issuer or supplied directly from a Kubernetes Secret.
- **Clearer certificate errors.** When CloudNativePG gets stuck on certificate Secrets, the provider now explains exactly which Secrets are the problem, so operators can resolve it without digging through logs.
- **Automatic reissue on CA changes.** Certificates are now reissued automatically when their CA changes, keeping encrypted connections healthy across CA rotations.
- **Server CA published as `ca.crt`.** The server CA certificate is now published as `ca.crt` in the connection Secret, so clients can verify the server without fetching the certificate out-of-band.

To learn more, see the [v0.4.2 release notes](https://github.com/openeverest/provider-cloudnative-pg/releases/tag/v0.4.2).

<!-- release-key: openeverest/provider-cloudnative-pg@v0.4.2 -->
