# OpenEverest Website

## Overview
This is the official website for the OpenEverest project, built with Hugo static site generator, Node.js, and Tailwind CSS. The site is configured to be hosted on GitHub Pages (github.io).

## Project Structure

```
.
├── archetypes/          # Content templates
│   ├── default.md       # Default content template
│   └── blog.md          # Blog post template with custom frontmatter
├── assets/              # Source assets for processing
│   └── css/
│       └── main.css     # Tailwind CSS entry point
│   └── documentation    # Release Notes builded Documentation 
├── content/             # Website content (Markdown files)
│   └── blog/            # Blog posts directory
│       ├── _index.md    # Blog section page
│       └── *.md         # Individual blog posts
├── layouts/             # HTML templates
│   ├── _default/        # Default layouts
│   │   ├── baseof.html  # Base template
│   │   ├── list.html    # List page template
│   │   └── single.html  # Single page template
│   ├── partials/        # Reusable components
│   │   ├── header.html  # Site header
│   │   └── footer.html  # Site footer
│   └── index.html       # Homepage template
├── static/              # Static files (copied as-is to public)
│   ├── images/          # Image files
│   ├── fonts/           # Font files
│   └── documents/       # PDF and other documents
├── hugo.toml            # Hugo configuration
├── package.json         # Node.js dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
└── postcss.config.js    # PostCSS configuration
```

## Technologies

- **Hugo v0.147.3** (Extended) - Static site generator
- **Node.js v20** - JavaScript runtime
- **Tailwind CSS v4** - CSS framework
- **PostCSS** - CSS processing tool

## Development

### Running the Development Server

```bash
npm run dev
```

This will start the Hugo development server on port 5000 with live reload enabled.

### Building for Production

```bash
npm run build
```

This generates the static site in the `public/` directory.

## Blog Posts

### Creating a New Blog Post

Use Hugo's content command with the blog archetype:

```bash
hugo new content/blog/your-post-title.md
```

### Blog Post Frontmatter Structure

```yaml
---
title: "Your Post Title"
date: 2023-11-08T11:29:52
draft: false
image:
    url: image-filename.jpg
    attribution: https://source-url.com
authors:
 - author-name
tags:
 - blog
 - information
 - programming
summary: Brief description of your post
---
```

### Adding Images to Blog Posts

1. Place images in `static/images/`
2. Reference them in the frontmatter using just the filename
3. Images will be accessible at `/images/filename.jpg`

## Deployment

The site is configured for GitHub Pages deployment:

- **Repository**: openeverest/everest.github.io
- **Branch**: main
- **URL**: https://openeverest.github.io/everest.github.io/

### BaseURL Configuration

The site uses different baseURL settings for development and production:

- **Development (Replit)**: The `npm run dev` command overrides the baseURL to `/` for local development
- **Production (GitHub Pages)**: The `hugo.toml` file is configured with `baseURL = 'https://openeverest.github.io/everest.github.io/'`

This ensures that:
- Local development works correctly in Replit's environment
- Production builds generate correct absolute URLs for GitHub Pages

**Important**: The `baseURL` in `hugo.toml` must match your GitHub Pages URL for production deployment to work correctly.

## Configuration Files

### hugo.toml
Main Hugo configuration file containing:
- Site metadata (title, language, baseURL)
- Build settings
- Markup configuration

### package.json
Node.js configuration with scripts:
- `dev`: Run development server
- `build`: Build production site

### tailwind.config.js
Tailwind CSS configuration specifying content paths for purging unused styles.

### postcss.config.js
PostCSS configuration for Tailwind CSS processing.

## Recent Changes

- 2025-11-11: Initial Hugo site setup with Tailwind CSS v4
- 2025-11-11: Created blog structure with custom archetype
- 2025-11-11: Added sample blog post and homepage layout

## Notes

- The site uses Tailwind CSS v4 which requires `@tailwindcss/postcss` plugin
- Hugo processes CSS through PostCSS pipeline
- Development server binds to 0.0.0.0:5000 for Replit compatibility
- Draft posts are shown in development mode with `-D` flag
