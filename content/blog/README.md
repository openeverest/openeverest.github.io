
# Blog Post Structure

Each blog post should be in its own folder (page bundle) to allow storing images and other assets alongside the post.

## Creating a New Blog Post

To create a new blog post, use:

```bash
hugo new content/blog/your-post-slug/index.md
```

This will create a folder structure like:

```
content/blog/your-post-slug/
├── index.md          # The blog post content
├── image1.jpg        # Any images used in the post
├── diagram.png       # Other static files
└── attachment.pdf    # Any downloadable files
```

## Referencing Assets

Since assets are in the same folder as your blog post, you can reference them with relative paths:

```markdown
![Description](image1.jpg)
[Download PDF](attachment.pdf)
```

## Example Structure

```
content/blog/
├── _index.md
├── welcome-to-everest/
│   └── index.md
├── getting-started/
│   ├── index.md
│   ├── screenshot.png
│   └── config-example.yaml
└── advanced-tutorial/
    ├── index.md
    ├── diagram.svg
    └── sample-data.csv
```
