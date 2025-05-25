# ChainOfNoThought

[![Deploy Jekyll site to Pages](https://github.com/ChainOfNoThought/ChainOfNoThought/actions/workflows/pages.yml/badge.svg)](https://github.com/ChainOfNoThought/ChainOfNoThought/actions/workflows/pages.yml)

A sophisticated, accessible writing website built with Jekyll and hosted on GitHub Pages. Features dark mode, customizable font sizing, and a clean, distraction-free reading experience.

> **✨ Recently Reorganized**: The repository has been restructured for better organization, maintainability, and developer experience. All functionality is preserved while improving the codebase structure.

## Overview

This is a feature-rich writing website designed to showcase:
- Personal essays and blog posts (in `_thoughts/` collection)
- Creative writing pieces and stories (in `_stories/` collection)
- Archive functionality with search capabilities
- **Dark mode with automatic persistence across pages**
- **Granular font size controls for accessibility**
- Simple, distraction-free reading experience
- Mobile-responsive design

## Key Features

### 🎨 Theme System
- **Dark mode by default** with light mode option
- Seamless theme switching via the About page
- Theme preferences persist across page navigation
- Print-friendly automatic light theme override

### 📝 Font Size Controls
- **Base font size control** (12px - 32px)
- **Heading scale adjustment** (50% - 200%)
- **Content scale adjustment** (50% - 200%)
- **Meta text scale adjustment** (50% - 200%)
- One-click reset to defaults
- All changes apply instantly and persist across pages

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

## Local Development

### Prerequisites
- Ruby (version 2.7 or higher)
- Bundler gem (`gem install bundler`)

### Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/ChainOfNoThought/ChainOfNoThought.git
   cd ChainOfNoThought
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Run the site locally:
   ```bash
   bundle exec jekyll serve
   ```

4. Visit `http://localhost:4000/ChainOfNoThought` in your browser

### Validation

Before pushing changes, run the validation scripts:

**Structure Validation:**
```bash
./scripts/validate-structure.sh
```

**Build Validation:**
```bash
./scripts/validate-build.sh
```

These will check:
- Repository structure is properly organized
- All files are correctly wired and referenced
- Site builds successfully
- Site size is under GitHub Pages limits
- No files exceed 25MB
- All content has proper front matter
- Basic HTML validation

## Site Structure

```
ChainOfNoThought/
├── docs/                     # 📚 Documentation
│   ├── guides/              # 📖 User guides (maintenance, images)
│   └── reference/           # 📋 Technical reference
├── scripts/                 # 🔧 Automation scripts
├── _layouts/                # 🎨 Jekyll layouts
│   ├── default.html         # Main layout with theme/font controls
│   └── post.html            # Post layout with metadata
├── _includes/               # 🧩 Reusable components
│   ├── head.html            # HTML head section
│   ├── header.html          # Site navigation
│   ├── footer.html          # Site footer
│   ├── quote-styles.css     # Quote styling
│   └── random-quote.js      # Random quote functionality
├── _thoughts/               # ✍️ Essays and blog posts
├── _stories/                # 📖 Creative writing and stories
├── assets/                  # 🎯 Static assets
│   ├── css/
│   │   └── style.scss       # Main stylesheet with theme support
│   ├── js/
│   │   └── settings.js      # Theme and font size management
│   └── images/              # Site images
├── _data/                   # 📊 Data files (quotes, etc.)
├── .github/                 # ⚙️ GitHub configuration
│   └── workflows/           # GitHub Actions
├── _config.yml              # Jekyll configuration
├── index.md                 # Home page
├── thoughts.md              # Thoughts archive page
├── stories.md               # Stories archive page
├── prosterity.md            # Complete archive with search
├── about.md                 # About page with settings controls
└── 404.html                 # Custom 404 page
```

## Adding Content

### New Thought/Essay
Create a file in `_thoughts/` with the format `YYYY-MM-DD-title.md`:

```markdown
---
layout: post
title: "Your Thought Title"
date: 2024-01-20 10:00:00 -0500
categories: [thoughts]
excerpt: "A brief description of your thought"
tags: [tag1, tag2]
---

Your content here...
```

### New Story/Creative Writing
Create a file in `_stories/` with any name ending in `.md`:

For standalone stories:
```markdown
---
layout: post
title: "Story Title"
excerpt: "A brief description"
tags: [fiction, short-story]
date: 2024-01-20
---

Your story here...
```

For multi-chapter stories:
```markdown
---
layout: post
title: "Chapter 1: Beginning"
story_id: "my-epic-story"
story_title: "My Epic Story"
chapter: 1
chapter_number: 1
excerpt: "The beginning of an epic tale"
tags: [fiction, novel]
date: 2024-01-20
---

Chapter content here...
```

### Adding Images
1. Place images in `assets/images/`
2. Keep images under 5MB for best performance
3. Use in your content:
   ```markdown
   ![Description]({{ "/assets/images/your-image.jpg" | relative_url }})
   ```

## Customization

### Theme Colors
Edit the CSS custom properties in `assets/css/style.scss`:

```scss
:root {
  // Light theme colors
  --bg-color: #ffffff;
  --text-color: #333333;
  --accent-color: #0366d6;
  // ... other colors
}

[data-theme="dark"] {
  // Dark theme colors
  --bg-color: #0d1117;
  --text-color: #e6edf3;
  --accent-color: #58a6ff;
  // ... other colors
}
```

### Font Settings
Default font settings can be modified in `_layouts/default.html`:

```javascript
const defaultSettings = {
  theme: 'dark', // 'light' or 'dark'
  fontSize: {
    base: 18,      // Base font size in pixels
    heading: 1.0,  // Heading scale multiplier
    content: 1.0,  // Content scale multiplier
    meta: 1.0      // Meta text scale multiplier
  }
};
```

## Deployment

This site automatically deploys via GitHub Actions when you push to the `main` branch:

1. Make your changes locally
2. Run `./validate-build.sh` to check for issues
3. Commit and push:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```
4. Check the Actions tab in GitHub to monitor deployment
5. Your site will be live at: `https://ChainOfNoThought.github.io/ChainOfNoThought`

## Configuration

Key files:
- `_config.yml` - Site configuration and collections
- `_layouts/default.html` - Main layout with settings system
- `assets/css/style.scss` - Comprehensive theming and responsive design
- `assets/js/settings.js` - Settings management and persistence
- `.github/workflows/pages.yml` - GitHub Actions deployment

## Recent Improvements

### 🗂️ Repository Reorganization
The codebase has been restructured for better maintainability:

- **📚 Organized Documentation**: All docs moved to `docs/` with clear categorization
- **🔧 Centralized Scripts**: Build and validation scripts organized in `scripts/`
- **🧩 Structured Includes**: Components and scripts properly organized in `_includes/`
- **✅ Enhanced Validation**: New structure validation ensures everything stays wired correctly
- **🚫 Eliminated Redundancy**: Removed duplicate files and consolidated functionality

### 🔧 Missing Files Restored
- **`_layouts/default.html`**: Created the missing main layout with theme system
- **`_includes/head.html`**: Added proper HTML head section
- **`_includes/header.html`**: Created navigation header
- **`assets/js/settings.js`**: Implemented the referenced settings management system

## Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[Documentation Index](docs/README.md)** - Overview of all documentation
- **[Maintenance Guide](docs/guides/maintenance_guide.md)** - Complete maintenance and content management guide
- **[Image Guide](docs/guides/IMAGE_GUIDE.md)** - Best practices for images
- **[Implementation Plan](docs/reference/implementation_plan.md)** - Technical implementation details
- **[Security Policy](docs/SECURITY.md)** - Security measures and best practices

## Accessibility Features

- **High contrast themes** for better readability
- **Scalable font sizes** for vision accessibility
- **Keyboard navigation** support
- **Screen reader friendly** markup
- **Print-optimized** styles
- **Mobile responsive** design

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers
- JavaScript required for theme/font controls

## Important Limits

GitHub Pages has the following constraints:
- Site size: 1 GB maximum
- File size: 100 MB per file maximum  
- Bandwidth: 100 GB per month
- Build time: 10 minutes maximum

## Troubleshooting

### Settings Not Persisting
- Ensure JavaScript is enabled
- Check that URL parameters are being preserved
- Verify no browser extensions are interfering

### Theme Not Switching
- Check browser console for JavaScript errors
- Ensure `assets/js/settings.js` is loading correctly
- Verify CSS custom properties are supported

### Build Failures
1. Check the Actions tab for error messages
2. Run `./validate-build.sh` locally
3. Ensure all content files have valid front matter
4. Check that no files exceed size limits

### Performance Issues
- Optimize images before uploading
- Check total site size with validation script
- Consider using image compression tools

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `bundle exec jekyll serve`
5. Run validation with `./validate-build.sh`
6. Submit a pull request

## License

This project is for personal, non-commercial use only, in accordance with GitHub Pages terms of service.

## Technical Details

- **Jekyll Version**: Compatible with GitHub Pages
- **Theme**: Minima with extensive customizations
- **CSS**: SCSS with CSS custom properties for theming
- **JavaScript**: Vanilla JS for settings management
- **Persistence**: URL parameter-based (no cookies/localStorage)
- **Responsive**: Mobile-first design approach
