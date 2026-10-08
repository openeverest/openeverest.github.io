---
title: "Optional instance settings can now sit behind an Enable switch"
date: 2026-10-07T13:48:21Z
draft: false
topics:
 - openeverest
 - ui
 - releases
link: https://openeverest.io/documentation/2.0.0-dev.4/
summary: Provider UI schemas can mark form sections as toggleable, hiding optional settings behind an Enable switch until they are needed.
---

Instance forms can now tuck optional settings behind an *Enable* switch. A provider marks a form section `groupType: toggleable` in its UI schema, and the section's fields appear only when the switch is on.

While a section is off, its fields are hidden, not validated, and not sent. A section starts on when the instance, preset, or source backup already sets one of its fields; otherwise it starts off and the overview shows it as *Disabled*. Turning a section off while editing an instance removes its saved values, and `groupType: bordered` draws the same card without the switch.

Toggleable sections are available in OpenEverest 2.0.0 Developer Preview 4. To learn more, visit the [documentation](https://openeverest.io/documentation/2.0.0-dev.4/).

<!-- release-key: openeverest/openeverest@v2.0.0-dev.4 -->