---
title: "The Retirement of Ingress NGINX Controller: What It Means and What's Next"
date: 2025-11-11T10:00:00Z
draft: false
image:
    url: blog-ingress.png
    attribution: 
authors:
 - spron-in
tags:
 - blog
 - kubernetes
 - ingress
 - gateway-api
summary: On November 11, 2025, the Ingress NGINX controller is retiring. Explore what this means, the alternatives available, and the future of ingress in Kubernetes.
---

On November 11, 2025, the Kubernetes community received [the news](https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/) that Ingress NGINX controller is retiring. It is one of the most important and widely-used components in the Cloud Native ecosystem.

In this blog post, we will delve deeper into what is happening, explore the alternatives, and discuss what the future holds.

## What is ingress and ingress NGINX?

"Ingress is the original user-friendly way to direct network traffic to workloads running on Kubernetes."

In simpler terms, it's the most common and straightforward method for exposing applications running within your Kubernetes cluster via HTTP(s). While TCP is also supported, HTTP(s) has been the primary use case.

For Ingress resources to function, an ingress controller is essential. Its role involves managing necessary resources (like secrets and services) and proxying traffic.

![The usual traffic path for websites exposed with Ingress](blog-ingress.png)

There are [numerous implementations](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/) of ingress controllers available. The most popular one was [ingress-nginx](https://github.com/kubernetes/ingress-nginx) (distinct from [F5 NGINX Ingress](https://docs.nginx.com/nginx-ingress-controller/)). It's NGINX-based and community-maintained. This is the controller that is slated for retirement in March 2026.

## The retirement

It's crucial to understand that only the controller is retiring, not the entire Ingress API. The retirement announcement can be a bit confusing initially, as it immediately recommends migrating to the Gateway API. However, as the blog states, your existing Ingress resources will continue to function; the cessation of new version development is the primary impact.

Despite its popularity, the Ingress NGINX project has persistently faced a severe lack of maintenance. For years, development was shouldered by only one or two individuals in their spare time. This led the maintainers to [announce plans](https://kccncna2024.sched.com/event/1hoxW/securing-the-future-of-ingress-nginx-james-strong-isovalent-marco-ebert-giant-swarm) last year to phase out Ingress NGINX and collaborate with the Gateway API community on a successor called InGate. Unfortunately, even this significant announcement failed to garner the necessary assistance to maintain Ingress NGINX or develop InGate, which has also stalled and will now be retired.

## What are the alternatives?

If you are currently using the ingress-nginx controller, you have two primary paths forward:

1.  **Adopt a different ingress controller.** A curated list can be found [here](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/).
2.  **Transition to the [Gateway API](https://gateway-api.sigs.k8s.io/).**

The Gateway API is positioned as the successor to Ingress, designed to address the critical limitations of the older API:

-   **Role-Oriented Design:** It clearly delineates network infrastructure configuration (managed by operators) from application routing rules (managed by developers), thereby enhancing security and reducing configuration conflicts.
-   **Built-in Advanced Features:** Unlike Ingress, which relied heavily on controller-specific annotations, the Gateway API natively supports advanced traffic management features such as canary rollouts, traffic mirroring, and header matching.
-   **Protocol Flexibility:** It natively supports standard routing for HTTP, HTTPS, TCP, UDP, and gRPC, whereas Ingress primarily focuses on HTTP/S.
-   **Portability and Extensibility:** Configurations are standardized, simplifying the process of switching between different Kubernetes controllers without extensive rule rewriting, ensuring a more future-proof and vendor-agnostic environment.

Migrating to the Gateway API can be a streamlined process using tools like [ingress2gateway](https://github.com/kubernetes-sigs/ingress2gateway).

## Conclusion

It's a regrettable moment for the community when a beloved project retires due to a lack of maintenance rather than obsolescence. However, the future is promising, with numerous alternatives available, including other ingress controllers and the Gateway API.

At Percona, we [support ingress exposure](https://docs.percona.com/everest/install/install_everest_and_expose_via_ingress.html) for Everest. You can configure specific flags to expose Everest via ingress without any additional complex setups. Stay tuned for upcoming blog posts and documentation articles that will delve deeper into the Gateway API.