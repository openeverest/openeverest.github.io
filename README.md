
# OpenEverest Website

This is the official website for [openeverest.io](https://openeverest.io) - the OpenEverest project. OpenEverest is the first open-source platform for automated database provisioning and management.

## Technologies

- **Hugo v0.147.3** (Extended) - Static site generator
- **Node.js v20** - JavaScript runtime
- **Tailwind CSS v4** - CSS framework

## Local Development

### Prerequisites

- Hugo Extended v0.147.3 or later
- Node.js v20 or later
- npm

### Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/openeverest/openeverest.github.io.git
   cd everest.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The site will be available at `http://localhost:5000` with live reload enabled.

4. **Build for production**
   ```bash
   npm run build
   ```

   This generates the static site in the `public/` directory.

## Contributing

We welcome contributions from the community! Here's how you can help:

### Contributing Blog Posts

1. Fork this repository
2. Create a new folder under `content/blog/` with your post slug
3. Add an `index.md` file with proper frontmatter (see `content/blog/README.md` for details)
4. Include any images or assets in the same folder
5. Submit a pull request

See the [Blog Contribution Guide](content/blog/README.md) for detailed instructions.

### Contributing Code or Content

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Open a pull request

### Reporting Issues

Found a bug or have a suggestion? Please [open an issue](https://github.com/openeverest/openeverest.github.io/issues) on GitHub.

## Project Structure

```
.
├── archetypes/          # Content templates
├── assets/              # Source assets (CSS, images)
│   ├── documentation/   # Release Notes builded Documentation
├── content/             # Website content (Markdown)
│   ├── blog/            # Blog posts
│   └── features/        # Feature pages
├── layouts/             # HTML templates
├── static/              # Static files (images, fonts, documents)
├── hugo.toml            # Hugo configuration
└── package.json         # Node.js dependencies
```

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.

## Learn More

- [OpenEverest Documentation](https://docs.percona.com/everest/)
- [OpenEverest GitHub](https://github.com/percona/everest)
- [Hugo Documentation](https://gohugo.io/documentation/)
