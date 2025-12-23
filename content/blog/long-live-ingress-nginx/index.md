---
title: "Ingress NGINX is dead. Long live... the Ingress NGINX fork?"
date: 2025-12-21T10:00:00Z
draft: false
image:
    url: ingress-revival-blog-min.png
    attribution: 
authors:
 - spron-in
tags:
 - blog
 - kubernetes
 - ingress
 - gateway-api
 - open-source
summary: The blog post discusses the unexpected revival of the retired Kubernetes `ingress-nginx` controller through Chainguard's EmeritOSS program. While Chainguard has forked the project to provide sustainable stewardship, they do not offer pre-built container images or Helm charts, requiring users to build and host these themselves.

---

Just when we thought the book was closed on the beloved `ingress-nginx` controller, a plot twist has emerged.

In my [previous post](https://openeverest.io/blog/ingress-nginx-retirement/), I discussed the retirement of the Kubernetes community’s `ingress-nginx` controller—a move that left many teams scrambling to plan migrations. The maintainers were stepping down, and the project was heading for the archives.

But as of this week, the story has changed. **Chainguard** [has stepped](https://www.chainguard.dev/unchained/introducing-chainguard-emeritoss) in to offer the project a lifeline via their new **EmeritOSS** program. They have officially forked the project to `chainguard-forks/ingress-nginx` with the goal of providing "sustainable stewardship."

## The "Fine Print": No Images, No Charts

Before you cancel your migration meetings, you need to read the fine print. **This is not a simple drop-in replacement.**

While Chainguard is maintaining the *code* (fixing CVEs and updating dependencies), they are **not providing free, pre-built container images or Helm charts** for the public.

You build and host images yourself.

## How to Switch (The DIY Route)

To use this fork, you must become your own release manager. You need to build the images from source and host them in your own registry.

### 1. Build the Image
You will need to clone the repository and use the provided `make` targets.

* **For testing (single architecture):**
    ```bash
    make build image
    make build image-chroot
    ```

* **For production (multi-arch upload):**
    ```bash
    REGISTRY=my.registry.com make release
    ```
    *(Note: To change the base image, you will need to modify the `NGINX_BASE` file).*

### 2. Update Your Helm Release
Since there are no new Helm charts, you continue using the official upstream charts but **override** the image settings to point to the artifacts you just built and hosted.

```bash
helm upgrade --install ingress-nginx ingress-nginx \
  --repo [https://kubernetes.github.io/ingress-nginx](https://kubernetes.github.io/ingress-nginx) \
  --namespace ingress-nginx --create-namespace \
  --set controller.image.registry=my-registry.io \
  --set controller.image.image=ingress-nginx/controller \
  --set controller.image.tag=v1.10.0 \
  ...
```

## A Reality Check: Is the panic really over?
In my initial assessment, I thought this fork would buy teams some time. Now, I am not so sure.

Does this remove the immediate panic? Yes, but with a heavy tax.

Switching to this fork isn't straightforward. It requires you to set up build pipelines, manage image registries, and effectively take ownership of the distribution process. For many DevOps teams, the effort required to maintain this "life support" version might be equal to, or greater than, the effort required to simply migrate to a modern alternative like the Gateway API or a different controller.

## The Future: A Second Life?
While the original maintainers have moved on, open source is unpredictable.

Right now, the ingress-nginx architecture is considered "finished" software. However, forks have a funny way of taking on a life of their own. It is entirely possible that this Chainguard fork becomes the new center of gravity for the community. If enough users rally around it, we might see community-maintained image builds, new feature requests, and a true revival of the project.

For now, though, it remains a maintenance-only harbor for those who have the resources to build their own boats.

## Conclusion
The ingress-nginx story isn't over, but the plot has become more complicated. You now have a third option: migrate to Gateway API, switch controllers, or build your own ingress-nginx from the supported fork.

Regardless of which path you choose, OpenEverest continues to support standard ingress exposure. You can configure specific flags to expose OpenEverest via ingress without any additional complex setups, ensuring your databases and platform remain accessible however you manage your traffic.