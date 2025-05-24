# PHASED IMPLEMENTATION PLAN

## PHASE 1: REPOSITORY SETUP & CONFIGURATION

**Objective**: Create foundation with proper constraints handling.

### Step 1.1: Create Essential Files

**.gitignore** (CRITICAL for Actions):
```
_site/
.sass-cache/
.jekyll-cache/
.jekyll-metadata
Gemfile.lock
vendor/
.bundle/
.DS_Store
*.swp
*~
.vscode/
.idea/
node_modules/
```

**Gemfile** with EXACT version pinning:
```ruby
source "https://rubygems.org"

# Get current version from https://pages.github.com/versions/
gem "github-pages", "= 232", group: :jekyll_plugins
gem "webrick", "~> 1.7"  # Required for Ruby 3.0+

group :development do
  gem "html-proofer", "~> 3.19"
end

# Windows compatibility
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1", :install_if => Gem.win_platform?
```

### Step 1.2: Configure Jekyll with Edge Cases

**_config.yml** with baseurl handling:
```yaml
# CRITICAL: Detect and set baseurl correctly
# For user site (username.github.io):
url: "https://username.github.io"
baseurl: ""

# For project site:
# url: "https://username.github.io" 
# baseurl: "/repository-name"  # MUST match exactly

title: "My Writing Site"
description: "Personal essays and creative writing"
lang: "en"
timezone: "America/New_York"

# Build settings
markdown: kramdown
theme: minima

# CRITICAL: Only whitelisted plugins
plugins:
  - jekyll-feed
  - jekyll-seo-tag
  - jekyll-sitemap
  - jekyll-github-metadata

# Exclude from processing (performance)
exclude:
  - Gemfile
  - Gemfile.lock
  - vendor/
  - .bundle/
  - node_modules/
  - README.md
  - setup.sh
  - check-size.sh

# Enable strict mode for debugging
strict_front_matter: true
```

### Step 1.3: Create Initial Content

**index.md**:
```markdown
---
layout: home
title: Home
---

Welcome to my writing site.
```

**404.html** (recommended):
```html
---
layout: default
permalink: /404.html
---

<h1>404 - Page not found</h1>
<p><a href="{{ "/" | relative_url }}">Return home</a></p>
```

### Verification Point
- Push to GitHub
- Check Actions tab for build status
- Site should be live at configured URL

---

## PHASE 2: GITHUB ACTIONS SETUP

**Objective**: Configure modern Actions-based deployment.

### Step 2.1: Enable GitHub Actions

Create `.github/workflows/pages.yml`:
```yaml
name: Deploy Jekyll site to Pages

on:
  push:
    branches: ["main", "master"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.1'
          bundler-cache: true
          
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v4
        
      - name: Build with Jekyll
        run: bundle exec jekyll build --baseurl "${{ steps.pages.outputs.base_path }}"
        env:
          JEKYLL_ENV: production
          
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Step 2.2: Update Repository Settings
1. Settings → Pages
2. Source: GitHub Actions
3. Save

### Step 2.3: Add Build Checks

Add to workflow before upload:
```yaml
- name: Check site size
  run: |
    SITE_SIZE=$(du -sb _site | cut -f1)
    MAX_SIZE=$((950 * 1024 * 1024))
    if [ $SITE_SIZE -gt $MAX_SIZE ]; then
      echo "ERROR: Site size exceeds 950MB"
      exit 1
    fi
    
- name: HTML Proofer
  run: bundle exec htmlproofer ./_site --disable-external --allow-hash-href
  continue-on-error: true
```

---

## PHASE 3: CONTENT STRUCTURE WITH COLLECTIONS

**Objective**: Implement content organization with proper front matter.

### Step 3.1: Configure Collections

Update `_config.yml`:
```yaml
collections:
  creative_writing:
    output: true  # CRITICAL: Required for page generation
    permalink: /creative-writing/:path/
    
defaults:
  - scope:
      path: ""
    values:
      layout: "default"
      image: "/assets/images/default.jpg"  # Open Graph fallback
      
  - scope:
      path: ""
      type: "posts"
    values:
      layout: "post"
      author: "Your Name"
      
  - scope:
      path: ""
      type: "creative_writing"
    values:
      layout: "post"
```

### Step 3.2: Create Directory Structure
```bash
mkdir -p _posts _creative_writing _layouts _includes assets/{css,images}
```

### Step 3.3: Create Collection Index Pages

**creative-writing.md**:
```markdown
---
layout: page
title: Creative Writing
permalink: /creative-writing/
---

{% for story in site.creative_writing %}
<article>
  <h2>
    <a href="{{ story.url | relative_url }}">
      {{ story.title | escape }}
    </a>
  </h2>
  {% if story.excerpt %}
    {{ story.excerpt }}
  {% endif %}
</article>
{% endfor %}
```

**essays.md**:
```markdown
---
layout: page
title: Essays
permalink: /essays/
---

{% for post in site.posts %}
<article>
  <h2>
    <a href="{{ post.url | relative_url }}">
      {{ post.title | escape }}
    </a>
  </h2>
  <time>{{ post.date | date: "%B %-d, %Y" }}</time>
  {% if post.excerpt %}
    {{ post.excerpt }}
  {% endif %}
</article>
{% endfor %}
```

### Step 3.4: Configure Navigation

Update `_config.yml`:
```yaml
header_pages:
  - about.md
  - essays.md
  - creative-writing.md
```

---

## PHASE 4: THEMING WITH OVERRIDES

**Objective**: Implement theme customization properly.

### Step 4.1: Create Custom Styles

**assets/css/style.scss**:
```scss
---
# Front matter required
---

@import "{{ site.theme }}";

// Custom overrides after theme import
body {
  font-family: Georgia, serif;
  line-height: 1.7;
}

// Fix for project sites
.site-header .site-title {
  &:hover {
    text-decoration: none;
  }
}

// Responsive images
.post-content img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 2rem auto;
}

// Print styles
@media print {
  .site-header, .site-footer {
    display: none;
  }
}
```

### Step 4.2: Override Theme Files (if needed)

To override Minima files:
1. Find file location: `bundle info --path minima`
2. Copy file to same path in your repo
3. Modify as needed

Example for header:
```bash
cp $(bundle info --path minima)/_includes/header.html _includes/
```

---

## PHASE 5: SAMPLE CONTENT WITH VALIDATION

**Objective**: Add properly formatted content.

### Step 5.1: Create Sample Post

**_posts/2024-01-15-first-post.md**:
```markdown
---
layout: post
title: "Welcome to My Writing Site"
date: 2024-01-15 10:00:00 -0500
categories: [essays, meta]
excerpt: "An introduction to this site and my writing journey."
author: "Your Name"
---

This is my first post. Images use the relative_url filter:

![Description]({{ "/assets/images/sample.jpg" | relative_url }})

## Markdown Examples

Here's a [link](https://example.com) and some **bold** text.

> A thoughtful quote

```code
# Code blocks work too
```
```

### Step 5.2: Create Sample Creative Writing

**_creative_writing/first-story.md**:
```markdown
---
layout: post
title: "The Beginning"
excerpt: "A short story about starting something new."
tags: [fiction, short-story]
---

The story begins here...
```

### Step 5.3: Add Test Image

1. Add image to `assets/images/`
2. Compress using TinyPNG or similar
3. Verify file size < 25MB

---

## PHASE 6: LOCAL TESTING & VALIDATION

**Objective**: Set up local environment for testing.

### Step 6.1: Install Dependencies
```bash
# Install Ruby (if needed)
# macOS: brew install ruby
# Ubuntu: sudo apt-get install ruby-full
# Windows: use RubyInstaller

# Install bundler
gem install bundler

# Install project dependencies
bundle install
```

### Step 6.2: Test Locally
```bash
# Serve with live reload
bundle exec jekyll serve --livereload

# For Ruby 3.0+ webrick error:
bundle add webrick

# Test with production environment
JEKYLL_ENV=production bundle exec jekyll serve
```

### Step 6.3: Validate Build

Create `validate.sh`:
```bash
#!/bin/bash
set -e

echo "Building site..."
bundle exec jekyll build

echo "Checking HTML..."
bundle exec htmlproofer ./_site \
  --disable-external \
  --allow-hash-href \
  --assume-extension

echo "Checking size..."
SITE_SIZE=$(du -sh _site | cut -f1)
echo "Site size: $SITE_SIZE"

echo "Finding large files..."
find _site -type f -size +1M -exec ls -lh {} \;

echo "Validation complete!"
```

---

## PHASE 7: DEPLOYMENT & MONITORING

**Objective**: Deploy and set up monitoring.

### Step 7.1: Pre-deployment Checklist
- [ ] All images compressed
- [ ] No files > 25MB
- [ ] Site builds locally without errors
- [ ] Relative URLs used everywhere
- [ ] Front matter valid on all content
- [ ] No commercial content

### Step 7.2: Deploy
```bash
git add .
git commit -m "Initial site setup"
git push origin main
```

### Step 7.3: Monitor Deployment
1. Go to repository → Actions tab
2. Watch the workflow progress
3. Check for any errors
4. If successful, visit site URL

### Step 7.4: Post-deployment Checks
- [ ] Home page loads
- [ ] Navigation works
- [ ] Posts display correctly
- [ ] Images load
- [ ] 404 page works
- [ ] Mobile responsive

### Step 7.5: Set Up Monitoring

Add to workflow:
```yaml
- name: Notify on failure
  if: failure()
  run: |
    echo "Build failed! Check Actions tab for details."
    # Add notification service integration here
```

---

## TROUBLESHOOTING DECISION TREE

```
Build Failed?
├── Check Actions tab for specific error
│   ├── "Unknown tag" → Remove unsupported plugin
│   ├── "Liquid error" → Check template syntax
│   ├── "YAML error" → Validate front matter
│   └── "Timeout" → Reduce site complexity
│
├── Site not appearing?
│   ├── Wrong URL? → Check baseurl config
│   ├── 404 on all pages? → Verify source branch
│   └── Blank page? → Check layouts exist
│
└── Local works, production fails?
    ├── Different plugin versions → Pin versions
    ├── Missing files → Check .gitignore
    └── Case sensitivity → Check filenames
```

---

## CONTINUOUS MAINTENANCE

### Weekly Tasks
- Check Actions tab for failed builds
- Monitor site size growth
- Review bandwidth usage in Insights

### Monthly Tasks  
- Update github-pages gem version
- Compress new images
- Archive old content if approaching limits

### Automation Scripts

**update-dependencies.sh**:
```bash
#!/bin/bash
# Update to latest GitHub Pages version

CURRENT=$(grep 'gem "github-pages"' Gemfile | grep -o '[0-9]\+')
LATEST=$(curl -s https://pages.github.com/versions.json | grep '"github-pages"' | grep -o '[0-9]\+')

if [ "$CURRENT" != "$LATEST" ]; then
  sed -i "s/gem \"github-pages\", \"= $CURRENT\"/gem \"github-pages\", \"= $LATEST\"/" Gemfile
  bundle update github-pages
  echo "Updated github-pages from $CURRENT to $LATEST"
else
  echo "Already on latest version: $LATEST"
fi
```

---

## MIGRATION PATHS

### From Branch to Actions Deployment
1. Create workflow file (Phase 2)
2. Change source to GitHub Actions in settings
3. Remove gh-pages branch if exists

### Adding Custom Plugins
1. Switch to custom workflow
2. Remove gem "github-pages"  
3. Add individual gems
4. Modify build step in workflow

### Exceeding Limits
1. **Size**: External image hosting
2. **Bandwidth**: Add CDN (Cloudflare)
3. **Build time**: Reduce plugins, simplify

This phased approach ensures a robust GitHub Pages implementation that handles all edge cases and platform constraints. 