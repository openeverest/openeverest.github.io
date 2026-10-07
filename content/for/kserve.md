---
title: "KServe"
technology: "KServe"
summary: "Run Model-as-a-Service on your own Kubernetes and GPUs. Deploy LLMs with vLLM in a few clicks and serve them behind one authenticated, OpenAI-compatible endpoint with per-model API keys, token quotas, and models that span several GPU nodes, powered by KServe."
description: "Self-hosted LLM serving on Kubernetes with OpenEverest and KServe: deploy models with vLLM, expose them through Envoy AI Gateway with per-model API keys, HTTPS and token quotas, and split large models across multiple GPU nodes."
tagline: "LLMs behind your own OpenAI-compatible API."
logo: "/images/for/kserve/logo.png"
weight: 9
draft: false
aliases:
  - "/for/llm/"
  - "/for/maas/"

# Carousel: screenshots are required; add a slide with `youtube:` for an embedded video.
slides:
  - image: "/images/for/kserve/for-kserve-0.png"
    title: "Start from a Preset"
    description: "Deploy a model with one click from a ready-made preset - a small GPU model or a CPU-only one for smoke tests - or configure everything from scratch."
  - image: "/images/for/kserve/for-kserve-1.png"
    title: "Pick a Model from the Catalog"
    description: "Choose from a curated catalog - Qwen3, Phi-4, Mistral Small, DeepSeek-R1, Gemma 3, Llama 4 - or point to any Hugging Face, S3, GCS, or PVC model URI."
  - image: "/images/for/kserve/for-kserve-2.png"
    title: "Expose Through the AI Gateway"
    description: "Put the model behind the shared Envoy AI Gateway with its own API key, and optionally cap how many tokens each key can spend per hour."
  - image: "/images/for/kserve/for-kserve-3.png"
    title: "Ready to Call"
    description: "Copy the HTTPS endpoint and API key straight into the OpenAI SDK or any OpenAI-compatible tool."
  - image: "/images/for/kserve/for-kserve-4.png"
    title: "Models Bigger Than One Node"
    description: "Split a model across GPU nodes with pipeline parallelism - here Qwen3 14B runs as a head and two workers on three 20 GB GPUs."

# Key capabilities. `icon` maps to layouts/partials/feature-icon.html keywords.
capabilities:
  - icon: "private-deploy"
    title: "Authenticated AI Gateway"
    description: "One HTTPS endpoint for all models. Each model gets its own API key, checked at the edge - a key for one model cannot call another."
  - icon: "database-engines"
    title: "OpenAI-Compatible"
    description: "vLLM serves the standard /v1 API, so the OpenAI SDK, LangChain, and other OpenAI-compatible tools work without code changes."
  - icon: "scaling"
    title: "Multi-Node Models"
    description: "Tensor parallelism across GPUs in a node and pipeline parallelism across nodes, so models bigger than one server still run as one endpoint."
  - icon: "resources"
    title: "Token Quotas"
    description: "Meter real prompt and completion tokens per API key, and enforce hourly budgets per model with a Redis or Valkey backend."
  - icon: "config"
    title: "Presets & Model Catalog"
    description: "Platform teams curate the models and ship known-good presets; users deploy with one click or a short Instance manifest."
  - icon: "monitoring"
    title: "Observability"
    description: "vLLM metrics through a managed PodMonitor, per-key token usage from the Gateway, and optional OpenTelemetry tracing."
  - icon: "multi-cloud"
    title: "Your GPUs, Anywhere"
    description: "Run on EKS, GKE, AKS, GPU clouds, or bare-metal clusters - your models, prompts, and data never leave your infrastructure."

# Open-source repositories powering this integration.
repos:
  - label: "provider-kserve"
    url: "https://github.com/openeverest/provider-kserve"
    description: "The OpenEverest provider that integrates KServe into the platform, built on the Provider SDK."

# Attribution to the projects that power model serving.
powered_by:
  - name: "kserve/kserve"
    url: "https://github.com/kserve/kserve"
    description: "Models on OpenEverest are served by KServe, the open-source, Kubernetes-native platform for generative and predictive AI inference."
  - name: "vllm-project/vllm"
    url: "https://github.com/vllm-project/vllm"
    description: "vLLM is the high-throughput inference engine that runs the LLMs, with tensor and pipeline parallelism across GPUs and nodes."
  - name: "envoyproxy/ai-gateway"
    url: "https://github.com/envoyproxy/ai-gateway"
    description: "Envoy AI Gateway routes requests by model name, checks API keys, and meters tokens at the edge."

# FAQ: rendered as an accordion and emitted as FAQPage structured data for SEO.
faq:
  - question: "Is KServe free to run on OpenEverest?"
    answer: "Yes. OpenEverest, KServe, vLLM, and Envoy AI Gateway are all open-source with no licensing fees, and everything runs on your own Kubernetes cluster and GPUs."
  - question: "What is Model-as-a-Service?"
    answer: "Model-as-a-Service (MaaS) means offering models to your teams the way a cloud AI API does - pick a model, get an endpoint and an API key - but running on your own infrastructure. OpenEverest does for models what it already does for databases."
  - question: "Is the API compatible with OpenAI?"
    answer: "Yes. Models are served through vLLM's OpenAI-compatible API. Point the OpenAI SDK's `base_url` at the endpoint from the connection details and use the API key as the key. Anthropic-style clients can send the key in the `x-api-key` header."
  - question: "Which models can I serve?"
    answer: "Any model vLLM supports, from Hugging Face (`hf://`), S3 (`s3://`), Google Cloud Storage (`gs://`), or a PersistentVolumeClaim (`pvc://`). The UI offers a curated catalog, and gated models work once you provide a Hugging Face token. Predictive models (scikit-learn, XGBoost, PyTorch, TensorFlow, ONNX, Triton) are supported too."
  - question: "How are models secured?"
    answer: "The shared Gateway terminates HTTPS with a certificate from cert-manager. Each model gets its own generated API key: requests without a valid key get `401`, and a key for a different model gets `403`. Rotating a key takes seconds."
  - question: "Can I serve a model that does not fit on one GPU or one node?"
    answer: "Yes. Use tensor parallelism to split a model across GPUs in one node, and set a worker count with pipeline parallelism to split it across nodes via LeaderWorkerSet. Clients still see one endpoint and one model name. See [Serve a model that does not fit on one node](https://github.com/openeverest/provider-kserve/blob/main/docs/llm-multi-node.md)."
  - question: "Do I need GPUs?"
    answer: "GPUs are recommended for real workloads. For development and smoke tests, a CPU compute profile runs small models such as SmolLM2 without a GPU."

# Optional override of the closing call-to-action text.
cta_description: "Deploy OpenEverest on any Kubernetes cluster and serve your first model behind an authenticated, OpenAI-compatible API in minutes."

# Trademark attribution, rendered at the bottom of the page.
trademark_note: "KServe, vLLM, and Envoy are trademarks of their respective owners. Model names are trademarks of their respective owners and are used for identification purposes only. OpenEverest is not affiliated with, endorsed by, or sponsored by these organizations."
---
