# ChainOfNoThought Documentation

This directory contains comprehensive documentation for the ChainOfNoThought writing website.

## 📚 Documentation Structure

### 📖 Guides (`/guides/`)
Practical, step-by-step guides for common tasks:

- **[Maintenance Guide](guides/maintenance_guide.md)** - Complete guide for maintaining the site, adding content, and troubleshooting
- **[Image Guide](guides/IMAGE_GUIDE.md)** - Best practices for adding and optimizing images

### 📋 Reference (`/reference/`)
Technical reference documentation:

- **[Implementation Plan](reference/implementation_plan.md)** - Detailed technical implementation details and constraints

## 🚀 Quick Start

1. **For Content Creators**: Start with the [Maintenance Guide](guides/maintenance_guide.md)
2. **For Developers**: Review the [Implementation Plan](reference/implementation_plan.md)
3. **For Image Management**: Check the [Image Guide](guides/IMAGE_GUIDE.md)

## 🏗️ Site Architecture

The ChainOfNoThought site is built with:

- **Jekyll** - Static site generator
- **GitHub Pages** - Hosting platform
- **Minima Theme** - Base theme with extensive customizations
- **Dark Mode System** - Theme switching with URL persistence
- **Font Size Controls** - Accessibility features
- **Collections** - Organized content types (`_thoughts/`, `_stories/`)

## 📁 Repository Structure

```
ChainOfNoThought/
├── docs/                     # 📚 Documentation (this directory)
│   ├── guides/              # 📖 User guides
│   └── reference/           # 📋 Technical reference
├── scripts/                 # 🔧 Automation scripts
├── _layouts/                # 🎨 Jekyll layouts
├── _includes/               # 🧩 Reusable components
├── _thoughts/               # ✍️ Essays and blog posts
├── _stories/                # 📖 Creative writing
├── assets/                  # 🎯 Static assets
│   ├── css/                # 🎨 Stylesheets
│   ├── js/                 # ⚡ JavaScript
│   └── images/             # 🖼️ Images
├── _data/                   # 📊 Data files
└── .github/                 # ⚙️ GitHub configuration
```

## 🎯 Key Features

### 🌙 Theme System
- Dark mode by default with light mode option
- Seamless theme switching via About page
- Theme preferences persist across pages via URL parameters
- Print-friendly automatic light theme override

### 📝 Font Controls
- Base font size control (12px - 32px)
- Heading scale adjustment (50% - 200%)
- Content scale adjustment (50% - 200%)
- Meta text scale adjustment (50% - 200%)
- One-click reset to defaults

### 🔗 Privacy-Friendly Persistence
- No cookies or localStorage used
- Settings maintained via URL parameters
- Shareable links with preferred settings
- Works across all devices and browsers

### 📚 Content Organization
- **Thoughts**: Essays and blog posts with date-based organization
- **Stories**: Creative writing with support for multi-chapter works
- **Prosterity**: Complete archive with search functionality
- Automatic excerpt generation and reading time estimates

## 🛠️ Development Workflow

1. **Local Development**: Use `bundle exec jekyll serve` for local testing
2. **Content Addition**: Add files to `_thoughts/` or `_stories/` collections
3. **Validation**: Run `scripts/validate-build.sh` before pushing
4. **Deployment**: Automatic via GitHub Actions on push to main

## 📞 Support

For issues or questions:

1. Check the [Maintenance Guide](guides/maintenance_guide.md) for common solutions
2. Review the [Implementation Plan](reference/implementation_plan.md) for technical details
3. Use GitHub Issues for bug reports or feature requests

## 📄 License

This project is for personal, non-commercial use only, in accordance with GitHub Pages terms of service. 