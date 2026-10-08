---
title: "OpenEverest introduces a plugin theme package for UIs that match the core"
date: 2026-10-07T13:48:21Z
draft: false
topics:
 - openeverest
 - plugins
 - ui
 - releases
link: https://openeverest.io/documentation/2.0.0-dev.4/
summary: The new @openeverest/plugin-theme package themes a plugin's own MUI bundle from the host's design tokens, including live dark mode.
---

Plugins can now match the core's look without depending on its internals. The host shares only React, through an import map, and its design tokens — the `--everest-*` CSS variables. Each plugin bundles its own MUI, and the new `@openeverest/plugin-theme` package themes it from those tokens.

Previously, a plugin either pinned its own component library and drifted from the core's appearance, or reached into host internals that could change between previews. Now a plugin wraps its UI in `<PluginThemeProvider cacheKey="my-plugin" nonce={api.cssNonce}>` and follows the host's design tokens, including live dark mode.

`@openeverest/plugin-theme` 0.1.0 is available with OpenEverest 2.0.0 Developer Preview 4, alongside `@openeverest/plugin-sdk` 0.4.0. To learn more, visit the [documentation](https://openeverest.io/documentation/2.0.0-dev.4/).

<!-- release-key: openeverest/openeverest@v2.0.0-dev.4 -->