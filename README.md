# ChainOfNoThought

[![Deploy Jekyll site to Pages](https://github.com/ChainOfNoThought/ChainOfNoThought/actions/workflows/pages.yml/badge.svg)](https://github.com/ChainOfNoThought/ChainOfNoThought/actions/workflows/pages.yml)

A simple, clean website for personal writing, built with Jekyll and hosted on GitHub Pages.

## Overview

This is a minimalist writing website designed to showcase:
- Personal essays and blog posts
- Creative writing pieces
- Simple, distraction-free reading experience

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

Before pushing changes, run the validation script:
```bash
./validate-build.sh
```

This will check:
- Site builds successfully
- Site size is under GitHub Pages limits
- No files exceed 25MB
- All content has proper front matter
- Basic HTML validation

## Adding Content

### New Blog Post/Essay
Create a file in `_posts/` with the format `YYYY-MM-DD-title.md`:

```markdown
---
layout: post
title: "Your Post Title"
date: 2024-01-20 10:00:00 -0500
categories: [essays]
excerpt: "A brief description of your post"
---

Your content here...
```

### New Creative Writing Piece
Create a file in `_creative_writing/` with any name ending in `.md`:

```markdown
---
layout: post
title: "Story Title"
excerpt: "A brief description"
tags: [fiction, short-story]
---

Your story here...
```

### Adding Images
1. Place images in `assets/images/`
2. Keep images under 5MB for best performance
3. Use in your content:
   ```markdown
   ![Description]({{ "/assets/images/your-image.jpg" | relative_url }})
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
- `_config.yml` - Site configuration
- `.github/workflows/pages.yml` - GitHub Actions deployment
- `Gemfile` - Ruby dependencies

## Important Limits

GitHub Pages has the following constraints:
- Site size: 1 GB maximum
- File size: 100 MB per file maximum  
- Bandwidth: 100 GB per month
- Build time: 10 minutes maximum

## Troubleshooting

If deployment fails:
1. Check the Actions tab for error messages
2. Run `./validate-build.sh` locally
3. Ensure all content files have valid front matter
4. Check that no files exceed size limits

## License

This project is for personal, non-commercial use only, in accordance with GitHub Pages terms of service.
