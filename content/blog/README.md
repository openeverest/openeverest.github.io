# Contributing a Blog Post

Thank you for your interest in contributing to the OpenEverest blog! We welcome posts from the community about database management, Kubernetes, DevOps, tutorials, and experiences using OpenEverest.

## Submission Process

To contribute a blog post:

1. **Fork the repository** at [github.com/openeverest/openeverest.github.io](https://github.com/openeverest/openeverest.github.io)
2. **Create your blog post** following the structure below
3. **Submit a pull request** with your changes
4. **Wait for review** - our team will review and provide feedback

## Before You Write a Blog

First, add yourself to the list of authors:

```bash
hugo new authors/$your_github_handle
```

This will create a folder at `content/authors/$your_github_handle/` with:
- `index.md` - Your author profile
- `avatar.png` - A placeholder avatar image

Edit `content/authors/$your_github_handle/index.md` to add your information:

```yaml
---
title: "Your Full Name"
github: "your_github_handle"
bio: "A brief description about yourself"
avatar: "avatar.png"
---

Optional extended bio in Markdown format...
```

Replace the `avatar.png` with your own image (keep the same filename or update the frontmatter).

## Creating a New Blog Post

Each blog post **must** be in its own folder (page bundle) with an `index.md` file. This allows you to store images and other assets alongside your post.

### Creating Your Post Folder

Create a new folder under `content/blog/` with a descriptive slug:

```
content/blog/your-post-slug/
├── index.md          # Your blog post (required)
├── image1.jpg        # Images used in the post
├── diagram.png       # Other static files
└── attachment.pdf    # Any downloadable files
```

## Required Frontmatter

Every blog post **must** include frontmatter at the top of the `index.md` file with the following fields:

```yaml
---
title: "Your Blog Post Title"
date: 2025-01-15T10:00:00
draft: false
image:
    url: featured-image.jpg
    attribution: https://source-url.com
authors:
 - Your Name
tags:
 - relevant-tag
 - another-tag
summary: A brief one-sentence summary of your post that will appear in the blog list
---
```

### Frontmatter Field Descriptions

- **title**: The title of your blog post (required)
- **date**: Publication date in ISO format (required)
- **draft**: Set to `false` for published posts (required)
- **image.url**: Filename of the featured image in your post folder (optional)
- **image.attribution**: Source URL if using third-party images (optional)
- **authors**: List of author names (required)
- **tags**: Relevant tags for categorization (required)
- **summary**: Brief description shown in blog listings (required)

## Referencing Assets

Since your images and files are in the same folder as `index.md`, use relative paths:

```markdown
![Description](image1.jpg)
[Download PDF](attachment.pdf)
```

## Content Guidelines

- Write in clear, accessible language
- Include code examples when relevant
- Use proper Markdown formatting
- Credit sources and provide attributions for images
- Focus on topics relevant to Everest, databases, or cloud infrastructure

## Example Structure

Here's a complete example of a blog post folder:

```
content/blog/getting-started-with-everest/
├── index.md
├── dashboard-screenshot.png
└── architecture-diagram.svg
```

With `index.md` containing:

```yaml
---
title: "Getting Started with OpenEverest"
date: 2025-01-20T09:00:00
draft: false
image:
    url: dashboard-screenshot.png
    attribution: 
authors:
 - Jane Developer
tags:
 - tutorial
 - getting-started
summary: Learn how to deploy your first database cluster with OpenEverest in under 10 minutes
---

Your blog content here...

![OpenEverest Dashboard](dashboard-screenshot.png)
```

## Questions?

If you have questions about contributing, please open an issue in the repository or reach out to the OpenEverest community.

We look forward to your contribution!