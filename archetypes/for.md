---
title: "{{ replace .Name "-" " " | title }}"
technology: "{{ replace .Name "-" " " | title }}"
summary: "One or two sentences describing what OpenEverest delivers for this technology."
logo: "/images/for/{{ .Name }}/logo.svg"
weight: 10
draft: true

# Carousel: screenshots are required; add a slide with `youtube:` for an embedded video.
slides:
  - image: "/images/for/{{ .Name }}/screen-1.png"
    title: "Screenshot title"
    description: "Short description of what this screen shows."

# Key capabilities. `icon` maps to layouts/partials/feature-icon.html keywords.
capabilities:
  - icon: "scaling"
    title: "Capability title"
    description: "Short description of the capability."

# Open-source repositories powering this integration.
repos:
  - label: "provider-{{ .Name }}"
    url: "https://github.com/openeverest/provider-{{ .Name }}"
    description: "The OpenEverest provider for this technology."

# Attribution to the operator that powers the databases.
powered_by:
  name: "operator name"
  url: "https://github.com/org/operator"
  description: "Credit the open-source operator that powers this technology."

# FAQ: rendered as an accordion and emitted as FAQPage structured data for SEO.
faq:
  - question: "A common question about this technology on OpenEverest?"
    answer: "A concise, plain-language answer. Markdown links are allowed."
---
