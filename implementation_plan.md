# DETAILED IMPLEMENTATION PLAN

## CRITICAL CONSTRAINTS & REQUIREMENTS

### GitHub Pages Platform Limits
- **Site Size**: 1 GB maximum
- **Bandwidth**: 100 GB/month soft limit
- **File Size**: 100 MB per file maximum  
- **Build Frequency**: 10 builds/hour
- **Build Duration**: 10 minutes maximum
- **Repository Size**: 1 GB recommended, 5 GB hard limit
- **Git LFS**: NOT supported - will cause deployment failure

### Build Environment Constraints
- **Jekyll Version**: Locked to GitHub's version (currently 3.9.5)
- **Plugins**: ONLY [whitelisted plugins](https://pages.github.com/versions/) allowed
- **Ruby Version**: 2.7.4 (as of 2024)
- **Build Method**: GitHub Actions (default), not branch-based
- **Safe Mode**: Always enabled (no custom plugins in standard build)

### Policy Requirements
- **Commercial Use**: Prohibited for e-commerce, SaaS, or primarily commercial purposes
- **Private Repos**: Require paid GitHub plan for Pages
- **User Sites**: Only ONE `username.github.io` per account
- **HTTPS**: Enforced for custom domains

## REPOSITORY STRUCTURE WITH CONSTRAINTS

```
username.github.io/                # For user site OR
repository-name/                   # For project site (requires baseurl config)
├── _config.yml                    # CRITICAL: Must handle baseurl correctly
├── .gitignore                     # MUST exclude _site/, Gemfile.lock for Actions
├── .nojekyll                      # ONLY if disabling Jekyll processing
├── CNAME                          # ONLY for custom domains
├── Gemfile                        # MUST pin exact github-pages version
├── Gemfile.lock                   # Git-ignored but used locally
├── README.md                      # Developer documentation
├── 404.html                       # Custom 404 page (optional but recommended)
├── index.md                       # Home page with proper front matter
│
├── _layouts/                      # Custom layouts (override theme carefully)
│   ├── default.html               # Base template
│   ├── home.html                  # Homepage layout
│   ├── page.html                  # Static page layout
│   └── post.html                  # Blog post layout
│
├── _includes/                     # Reusable components
│   ├── header.html                # Navigation with relative_url filter
│   └── footer.html                # Site footer
│
├── assets/                        # Static assets
│   ├── css/
│   │   └── style.scss             # MUST import theme first
│   └── images/                    # Compressed images only (no Git LFS)
│
├── _posts/                        # Blog posts (Jekyll convention)
│   └── YYYY-MM-DD-title.md        # Date format REQUIRED
│
├── _creative_writing/             # Custom collection
│   ├── story1.md                  # MUST have front matter
│   └── story2.md                  # output: true required in config
│
├── .github/                       # GitHub-specific files
│   └── workflows/                 # Custom Actions (advanced)
│       └── jekyll.yml             # Custom build workflow (optional)
│
├── _data/                         # Data files (YAML/JSON/CSV)
├── _drafts/                       # Unpublished posts (local only)
└── _site/                         # Generated site (git-ignored)
```

## CONFIGURATION WITH EDGE CASE HANDLING

### Critical _config.yml Structure

```yaml
# Site Settings - Affect SEO and functionality
title: "Your Writing Site"
email: your-email@example.com      # Optional but recommended
description: >-
  A personal collection of essays and creative writing.
  Limited to non-commercial use per GitHub Pages terms.

# CRITICAL: URL Configuration
# For user sites (username.github.io):
url: "https://username.github.io"
baseurl: ""                        # MUST be empty for user sites

# For project sites (username.github.io/project-name):
# url: "https://username.github.io"
# baseurl: "/project-name"         # MUST match repository name

# Language and timezone
lang: "en"
timezone: "America/New_York"       # Use IANA timezone

# Build settings
markdown: kramdown                 # Only supported processor
theme: minima                      # Or other whitelisted theme
exclude:                           # Optimize build performance
  - Gemfile
  - Gemfile.lock
  - node_modules/
  - vendor/bundle/
  - vendor/cache/
  - vendor/gems/
  - vendor/ruby/
  - .sass-cache/
  - .jekyll-cache/
  - "*.log"
  - .git/
  - .github/

# Permalinks - Critical for URL structure
permalink: /:categories/:year/:month/:day/:title/

# GitHub Pages approved plugins ONLY
plugins:
  - jekyll-feed                    # RSS/Atom feeds
  - jekyll-seo-tag                 # SEO meta tags
  - jekyll-sitemap                 # sitemap.xml generation
  - jekyll-github-metadata         # GitHub repo metadata
  - jekyll-relative-links          # Convert .md links
  - jekyll-optional-front-matter   # Make front matter optional
  - jekyll-readme-index            # Use README as index
  - jekyll-default-layout          # Default layouts
  - jekyll-titles-from-headings    # Extract title from first heading

# Collections Configuration
collections:
  creative_writing:
    output: true                   # REQUIRED for page generation
    permalink: /creative-writing/:path/
    sort_by: date                  # Optional sorting
  
# Front Matter Defaults - Reduces repetition
defaults:
  # Global defaults
  - scope:
      path: ""                     # All files
    values:
      layout: "default"
      image: /assets/images/default-og.jpg  # Open Graph default
  
  # Posts defaults
  - scope:
      path: ""
      type: "posts"
    values:
      layout: "post"
      author: "Your Name"
      comments: false              # Disqus not included by default
  
  # Collection defaults
  - scope:
      path: ""
      type: "creative_writing"
    values:
      layout: "post"
      category: "creative"
  
  # Image files
  - scope:
      path: "assets/images"
    values:
      image: true

# Theme Configuration (Minima-specific)
minima:
  date_format: "%B %-d, %Y"
  skin: classic                    # Options: classic, dark, solarized

# Navigation
header_pages:
  - about.md
  - creative-writing.md
  - essays.md

# Jekyll SEO Tag settings
twitter:
  username: yourusername
  card: summary
social:
  name: Your Name
  links:
    - https://twitter.com/yourusername
    - https://github.com/yourusername

# Analytics (optional, privacy-conscious)
google_analytics: UA-XXXXXXXX-X    # If desired

# Feed settings
feed:
  posts_limit: 20
  
# Pagination (requires jekyll-paginate in whitelisted plugins)
# paginate: 10
# paginate_path: "/page:num/"

# CRITICAL: Jekyll 4 preparation (future-proofing)
future: true                       # Publish future-dated posts
strict_front_matter: true          # Fail on front matter errors
```

### Gemfile with Version Pinning

```ruby
source "https://rubygems.org"

# CRITICAL: Pin to exact GitHub Pages version
# Check https://pages.github.com/versions/ for current version
gem "github-pages", "= 232", group: :jekyll_plugins

# Required for Ruby 3.0+
gem "webrick", "~> 1.7"

# Development dependencies
group :development do
  gem "html-proofer", "~> 3.19"   # Link/HTML validation
end

# Windows-specific dependencies
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance booster for watching directories on Windows
gem "wdm", "~> 0.1", :install_if => Gem.win_platform?

# Jekyll plugins (must be in github-pages whitelist)
group :jekyll_plugins do
  # All plugins are included in github-pages gem
end
```

## AUTOMATED SETUP SCRIPT

### setup.sh - Single Command Scaffolding

```bash
#!/bin/bash
# GitHub Pages Jekyll Site Automated Setup
# Usage: ./setup.sh [username] [repository-name]

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Parse arguments
USERNAME=${1:-}
REPO_NAME=${2:-}

if [ -z "$USERNAME" ]; then
    echo -e "${RED}Error: Username required${NC}"
    echo "Usage: $0 [username] [repository-name]"
    exit 1
fi

# Determine if user site or project site
IS_USER_SITE=false
BASEURL=""
if [ "$REPO_NAME" == "$USERNAME.github.io" ] || [ -z "$REPO_NAME" ]; then
    IS_USER_SITE=true
    REPO_NAME="$USERNAME.github.io"
    SITE_URL="https://$USERNAME.github.io"
else
    BASEURL="/$REPO_NAME"
    SITE_URL="https://$USERNAME.github.io$BASEURL"
fi

echo -e "${GREEN}Setting up GitHub Pages site: $REPO_NAME${NC}"
echo "Site URL will be: $SITE_URL"

# Get current GitHub Pages version
echo "Fetching current GitHub Pages version..."
PAGES_VERSION=$(curl -s https://pages.github.com/versions.json | grep '"github-pages"' | cut -d'"' -f4)
echo -e "${GREEN}GitHub Pages version: $PAGES_VERSION${NC}"

# Create directory structure
mkdir -p "$REPO_NAME"/{_layouts,_includes,_posts,_creative_writing,assets/{css,images},_data,.github/workflows}

cd "$REPO_NAME"

# Create .gitignore
cat > .gitignore << 'EOF'
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
npm-debug.log*
EOF

# Create Gemfile with exact version
cat > Gemfile << EOF
source "https://rubygems.org"

# GitHub Pages gem with exact version
gem "github-pages", "= $PAGES_VERSION", group: :jekyll_plugins
gem "webrick", "~> 1.7" # Required for Ruby 3.0+

# Development tools
group :development do
  gem "html-proofer", "~> 3.19"
end

# Windows compatibility
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1", :install_if => Gem.win_platform?
EOF

# Create _config.yml with proper baseurl handling
cat > _config.yml << EOF
# Site Settings
title: "My Writing Site"
email: your-email@example.com
description: >-
  A personal collection of essays and creative writing.
  Built with Jekyll and hosted on GitHub Pages.
url: "$SITE_URL"
baseurl: "$BASEURL"
lang: "en"
timezone: "America/New_York"

# Build settings
markdown: kramdown
theme: minima
exclude:
  - Gemfile
  - Gemfile.lock
  - node_modules/
  - vendor/
  - .sass-cache/
  - .jekyll-cache/
  - setup.sh
  - README.md

# Permalinks
permalink: /:categories/:year/:month/:day/:title/

# GitHub Pages plugins
plugins:
  - jekyll-feed
  - jekyll-seo-tag
  - jekyll-sitemap
  - jekyll-github-metadata
  - jekyll-relative-links

# Collections
collections:
  creative_writing:
    output: true
    permalink: /creative-writing/:path/

# Front Matter Defaults
defaults:
  - scope:
      path: ""
    values:
      layout: "default"
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

# Navigation
header_pages:
  - about.md
  - creative-writing.md
  - essays.md

# Minima theme settings
minima:
  date_format: "%B %-d, %Y"

# Feed settings
feed:
  posts_limit: 20
EOF

# Create index.md
cat > index.md << 'EOF'
---
layout: home
title: Home
---

Welcome to my writing site. Here you'll find my essays and creative writing pieces.

This site is built with Jekyll and hosted on GitHub Pages.
EOF

# Create about.md
cat > about.md << 'EOF'
---
layout: page
title: About
permalink: /about/
---

This is a personal writing website showcasing essays and creative writing.

## About the Author

[Your bio here]

## About This Site

This site is built using:
- Jekyll static site generator
- GitHub Pages hosting
- Minima theme

Feel free to explore the essays and creative writing sections.
EOF

# Create creative-writing.md
cat > creative-writing.md << 'EOF'
---
layout: page
title: Creative Writing
permalink: /creative-writing/
---

A collection of short stories, fiction, and creative pieces.

{% for story in site.creative_writing %}
<article class="post-entry">
  <h2><a href="{{ story.url | relative_url }}">{{ story.title | escape }}</a></h2>
  {% if story.excerpt %}
    {{ story.excerpt }}
  {% endif %}
  <p class="post-meta">
    {% if story.date %}
      <time datetime="{{ story.date | date_to_xmlschema }}">{{ story.date | date: "%B %-d, %Y" }}</time>
    {% endif %}
  </p>
</article>
{% endfor %}
EOF

# Create essays.md
cat > essays.md << 'EOF'
---
layout: page
title: Essays
permalink: /essays/
---

A collection of essays and blog posts on various topics.

{% for post in site.posts %}
<article class="post-entry">
  <h2><a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></h2>
  <p class="post-meta">
    <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %-d, %Y" }}</time>
  </p>
  {% if post.excerpt %}
    {{ post.excerpt }}
  {% endif %}
</article>
{% endfor %}
EOF

# Create 404.html
cat > 404.html << 'EOF'
---
layout: default
title: "404: Page not found"
permalink: 404.html
---

<div class="container">
  <h1>404: Page not found</h1>
  <p>Sorry, the page you were looking for doesn't exist.</p>
  <p><a href="{{ "/" | relative_url }}">Go back home</a></p>
</div>
EOF

# Create sample post
CURRENT_DATE=$(date +%Y-%m-%d)
cat > "_posts/${CURRENT_DATE}-welcome.md" << EOF
---
layout: post
title: "Welcome to My Writing Site"
date: $CURRENT_DATE 10:00:00 -0500
categories: [meta, welcome]
excerpt: "An introduction to this writing site and what you'll find here."
---

Welcome to my new writing site! This is where I'll be sharing my essays and creative writing pieces.

## What to Expect

You'll find two main types of content here:

1. **Essays** - Thoughts and reflections on various topics
2. **Creative Writing** - Short stories and fiction pieces

## Technical Notes

This site is built with Jekyll and hosted on GitHub Pages. It uses the Minima theme with minimal customization to keep the focus on the content.

Stay tuned for more content!
EOF

# Create sample creative writing
cat > "_creative_writing/sample-story.md" << 'EOF'
---
layout: post
title: "The Library at the End of Time"
excerpt: "A short story about the last library in existence."
tags: [fiction, sci-fi]
---

The dust motes danced in the amber light that filtered through the tall windows of the library. Sarah ran her fingers along the spines of ancient books, their leather bindings cracked with age.

This was the last library. The very last one.

In an age of neural implants and instant data transfer, physical books had become curiosities, then antiques, then forgotten relics. But here, at the edge of the known universe, this library stood as a monument to the written word.

Sarah pulled a volume from the shelf. "The Complete Works of Shakespeare," she read aloud, her voice echoing in the empty halls.

She was the last librarian, and perhaps, the last reader.

But she would keep reading until the stars themselves forgot how to shine.
EOF

# Create minimal custom CSS
cat > assets/css/style.scss << 'EOF'
---
---

@import "minima";

// Custom variables
$content-width: 800px;
$on-laptop: 800px;
$on-palm: 600px;

// Custom styles
body {
  font-family: Georgia, "Times New Roman", serif;
  line-height: 1.7;
  color: #333;
}

.post-content {
  margin-bottom: 2rem;
  
  h1, h2, h3, h4, h5, h6 {
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }
  
  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 2rem auto;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  blockquote {
    font-style: italic;
    border-left: 4px solid #ddd;
    padding-left: 1rem;
    margin-left: 0;
    color: #666;
  }
  
  pre {
    background-color: #f6f8fa;
    border-radius: 6px;
    padding: 1rem;
    overflow-x: auto;
  }
  
  code {
    background-color: #f6f8fa;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-size: 0.9em;
  }
}

// Post list styling
.post-list {
  list-style: none;
  margin-left: 0;
  
  > li {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #eee;
    
    &:last-child {
      border-bottom: none;
    }
  }
}

.post-meta {
  font-size: 0.875rem;
  color: #828282;
  margin-bottom: 0.5rem;
}

.post-link {
  font-size: 1.25rem;
  font-weight: 600;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
}

// Navigation improvements
.site-nav {
  @include media-query($on-palm) {
    position: absolute;
    top: 9px;
    right: 15px;
    background-color: #fdfdfd;
    border: 1px solid #e8e8e8;
    border-radius: 5px;
    text-align: right;
  }
}

// Footer adjustments
.site-footer {
  border-top: 1px solid #e8e8e8;
  padding: 30px 0;
}

// Print styles
@media print {
  .site-header, .site-footer, .site-nav {
    display: none;
  }
  
  .post-content {
    font-size: 12pt;
    line-height: 1.5;
  }
}
EOF

# Create GitHub Actions workflow for custom builds (optional)
cat > .github/workflows/jekyll.yml << 'EOF'
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
EOF

# Create README.md
cat > README.md << EOF
# $REPO_NAME

A personal writing website built with Jekyll and hosted on GitHub Pages.

## Quick Start

1. Install Ruby and Bundler
2. Run \`bundle install\`
3. Run \`bundle exec jekyll serve\`
4. Visit http://localhost:4000$BASEURL

## Structure

- \`_posts/\` - Blog posts and essays
- \`_creative_writing/\` - Creative writing pieces
- \`assets/\` - Images and stylesheets
- \`_layouts/\` - Page templates
- \`_includes/\` - Reusable components

## Adding Content

### New Essay/Post
Create file in \`_posts/\` with name \`YYYY-MM-DD-title.md\`

### New Creative Writing
Create file in \`_creative_writing/\` with any name ending in \`.md\`

## Deployment

Push to GitHub and the site will automatically build and deploy.

## GitHub Pages Version

Currently using GitHub Pages version: $PAGES_VERSION
EOF

# Create size check script
cat > check-size.sh << 'EOF'
#!/bin/bash
# Check site size before deployment

echo "Building site..."
bundle exec jekyll build --quiet

SITE_SIZE=$(du -sh _site | cut -f1)
SITE_SIZE_BYTES=$(du -sb _site | cut -f1)
MAX_SIZE_BYTES=$((950 * 1024 * 1024)) # 950 MB warning threshold

echo "Site size: $SITE_SIZE"

if [ $SITE_SIZE_BYTES -gt $MAX_SIZE_BYTES ]; then
    echo "WARNING: Site size exceeds 950 MB!"
    echo "GitHub Pages limit is 1 GB"
    
    # Find large files
    echo -e "\nLargest files:"
    find _site -type f -size +5M -exec ls -lh {} \; | sort -k5 -rh | head -10
    
    exit 1
else
    echo "Site size OK (under 950 MB)"
fi

# Check for individual large files
LARGE_FILES=$(find _site -type f -size +25M)
if [ ! -z "$LARGE_FILES" ]; then
    echo -e "\nWARNING: Files over 25 MB found:"
    echo "$LARGE_FILES"
fi
EOF

chmod +x check-size.sh

echo -e "\n${GREEN}✓ Setup complete!${NC}"
echo -e "\nNext steps:"
echo "1. cd $REPO_NAME"
echo "2. bundle install"
echo "3. bundle exec jekyll serve"
echo "4. Visit http://localhost:4000$BASEURL"
echo -e "\n${YELLOW}Remember to:${NC}"
echo "- Update _config.yml with your information"
echo "- Replace sample content with your own"
echo "- Commit and push to GitHub to deploy"
echo -e "\n${YELLOW}Important limits:${NC}"
echo "- Site size: 1 GB maximum"
echo "- Bandwidth: 100 GB/month"
echo "- No commercial use allowed"
```

## LAYOUT TEMPLATES WITH EDGE CASE HANDLING

### Default Layout (_layouts/default.html)

```html
<!DOCTYPE html>
<html lang="{{ page.lang | default: site.lang | default: "en" }}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {%- seo -%}
    <link rel="stylesheet" href="{{ "/assets/css/style.css" | relative_url }}">
    {%- feed_meta -%}
    
    {%- if jekyll.environment == 'production' and site.google_analytics -%}
      {%- include google-analytics.html -%}
    {%- endif -%}
    
    {%- if site.favicon -%}
      <link rel="icon" type="image/x-icon" href="{{ site.favicon | relative_url }}">
    {%- endif -%}
  </head>
  <body>
    {%- include header.html -%}
    
    <main class="page-content" aria-label="Content">
      <div class="wrapper">
        {{ content }}
      </div>
    </main>
    
    {%- include footer.html -%}
  </body>
</html>
```

### Post Layout with Microdata (_layouts/post.html)

```html
---
layout: default
---
<article class="post h-entry" itemscope itemtype="http://schema.org/BlogPosting">
  <header class="post-header">
    <h1 class="post-title p-name" itemprop="name headline">{{ page.title | escape }}</h1>
    <p class="post-meta">
      {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
      <time class="dt-published" datetime="{{ page.date | date_to_xmlschema }}" itemprop="datePublished">
        {{ page.date | date: date_format }}
      </time>
      {%- if page.modified_date -%}
        ~ 
        <time class="dt-modified" datetime="{{ page.modified_date | date_to_xmlschema }}" itemprop="dateModified">
          {{ page.modified_date | date: date_format }}
        </time>
      {%- endif -%}
      {%- if page.author -%}
        • <span itemprop="author" itemscope itemtype="http://schema.org/Person">
          <span class="p-author h-card" itemprop="name">{{ page.author | escape }}</span>
        </span>
      {%- endif -%}
      {%- if page.categories.size > 0 -%}
        • 
        {%- for category in page.categories -%}
          <span class="post-category">{{ category }}</span>
          {%- unless forloop.last -%}, {% endunless -%}
        {%- endfor -%}
      {%- endif -%}
    </p>
  </header>

  <div class="post-content e-content" itemprop="articleBody">
    {{ content }}
  </div>

  {%- if page.tags.size > 0 -%}
  <div class="post-tags">
    <p>
      <strong>Tags:</strong>
      {%- for tag in page.tags -%}
        <span class="post-tag">{{ tag }}</span>
        {%- unless forloop.last -%}, {% endunless -%}
      {%- endfor -%}
    </p>
  </div>
  {%- endif -%}

  {%- if site.disqus.shortname -%}
    {%- include disqus_comments.html -%}
  {%- endif -%}

  <a class="u-url" href="{{ page.url | relative_url }}" hidden></a>
</article>
```

### Include Components with Baseurl Handling

#### Header Include (_includes/header.html)

```html
<header class="site-header" role="banner">
  <div class="wrapper">
    {%- assign default_paths = site.pages | map: "path" -%}
    {%- assign page_paths = site.header_pages | default: default_paths -%}
    {%- assign titles_size = site.pages | map: 'title' | join: '' | size -%}
    
    <a class="site-title" rel="author" href="{{ "/" | relative_url }}">{{ site.title | escape }}</a>

    {%- if titles_size > 0 -%}
    <nav class="site-nav">
      <input type="checkbox" id="nav-trigger" class="nav-trigger" />
      <label for="nav-trigger">
        <span class="menu-icon">
          <svg viewBox="0 0 18 15" width="18px" height="15px">
            <path d="M18,1.484c0,0.82-0.665,1.484-1.484,1.484H1.484C0.665,2.969,0,2.304,0,1.484l0,0C0,0.665,0.665,0,1.484,0 h15.032C17.335,0,18,0.665,18,1.484L18,1.484z M18,7.516C18,8.335,17.335,9,16.516,9H1.484C0.665,9,0,8.335,0,7.516l0,0 c0-0.82,0.665-1.484,1.484-1.484h15.032C17.335,6.031,18,6.696,18,7.516L18,7.516z M18,13.516C18,14.335,17.335,15,16.516,15H1.484 C0.665,15,0,14.335,0,13.516l0,0c0-0.82,0.665-1.483,1.484-1.483h15.032C17.335,12.031,18,12.695,18,13.516L18,13.516z"/>
          </svg>
        </span>
      </label>

      <div class="trigger">
        {%- for path in page_paths -%}
          {%- assign my_page = site.pages | where: "path", path | first -%}
          {%- if my_page.title -%}
            {%- if page.url == my_page.url -%}
              <a class="page-link active" href="{{ my_page.url | relative_url }}">{{ my_page.title | escape }}</a>
            {%- else -%}
              <a class="page-link" href="{{ my_page.url | relative_url }}">{{ my_page.title | escape }}</a>
            {%- endif -%}
          {%- endif -%}
        {%- endfor -%}
      </div>
    </nav>
    {%- endif -%}
  </div>
</header>
```

## TROUBLESHOOTING GUIDE FOR AUTOMATION

### Common Build Errors and Solutions

| Error Message | Cause | Solution |
|--------------|-------|----------|
| "Unknown tag 'plugin_name'" | Using non-whitelisted plugin | Remove plugin or use Actions workflow |
| "Liquid syntax error" | Malformed Liquid template | Check for unclosed tags, typos |
| "No such file or directory" | Missing include/layout | Verify file exists and path is correct |
| "Invalid date" | Malformed date in front matter | Use format: YYYY-MM-DD HH:MM:SS +/-TTTT |
| "Error: YAML Exception" | Invalid YAML syntax | Use YAML validator, check indentation |
| "Conversion error" | Invalid Markdown/content | Check for special characters, encoding |

### Automation Considerations

1. **Repository Name Detection**:
   ```bash
   if [[ "$REPO_NAME" == "$USERNAME.github.io" ]]; then
     BASEURL=""
   else
     BASEURL="/$REPO_NAME"
   fi
   ```

2. **Version Checking**:
   ```bash
   # Get current GitHub Pages versions
   curl -s https://pages.github.com/versions.json
   ```

3. **Pre-deployment Validation**:
   ```bash
   # Check for common issues
   bundle exec jekyll doctor
   bundle exec htmlproofer ./_site --disable-external
   ```

4. **Size Monitoring**:
   ```bash
   # Check if approaching limits
   SITE_SIZE=$(du -sb _site | cut -f1)
   if [ $SITE_SIZE -gt 943718400 ]; then  # 900MB
     echo "WARNING: Site approaching 1GB limit"
   fi
   ```

## EXPANSION PATHWAYS

### Adding New Collections

1. Define in `_config.yml`:
   ```yaml
   collections:
     poetry:
       output: true
       permalink: /poetry/:name/
       sort_by: date
   ```

2. Create directory: `_poetry/`

3. Add defaults:
   ```yaml
   defaults:
     - scope:
         path: ""
         type: "poetry"
       values:
         layout: "poem"  # custom layout
   ```

4. Create index page: `poetry.md`

5. Update navigation in `header_pages`

### Custom Build Workflows

For features beyond whitelisted plugins, use GitHub Actions:

```yaml
# .github/workflows/jekyll-advanced.yml
name: Build and deploy Jekyll site with custom plugins

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.1'
          bundler-cache: true
      
      - name: Install custom dependencies
        run: |
          # Add any custom plugin installation here
          
      - name: Build site
        run: bundle exec jekyll build
        env:
          JEKYLL_ENV: production
          
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

### Performance Optimization

1. **Image Optimization Pipeline**:
   ```yaml
   # Add to workflow
   - name: Optimize images
     run: |
       find _site -name "*.jpg" -o -name "*.jpeg" | xargs -I {} jpegoptim --strip-all {}
       find _site -name "*.png" | xargs -I {} optipng -o7 {}
   ```

2. **Asset Minification**:
   ```yaml
   # Use jekyll-minifier (requires custom workflow)
   plugins:
     - jekyll-minifier
   ```

3. **CDN Integration** (for high-traffic sites):
   - Use Cloudflare Pages or Netlify as a CDN layer
   - Keep GitHub Pages as origin

This implementation plan addresses all critical constraints, edge cases, and automation needs for building a robust GitHub Pages site that won't fail during autonomous implementation. 