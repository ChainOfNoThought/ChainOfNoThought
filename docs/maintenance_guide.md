# ChainOfNoThought Maintenance Guide
*A Complete Guide to Managing Your Writing Website*

## Quick Start Checklist

✅ **Before You Begin**
- [ ] Ruby installed (version 2.7+)
- [ ] Bundler gem installed (`gem install bundler`)
- [ ] Git repository cloned locally
- [ ] Dependencies installed (`bundle install`)

✅ **Daily Operations**
- [ ] Add new content to `_thoughts/` or `_stories/`
- [ ] Test locally with `bundle exec jekyll serve`
- [ ] Commit and push changes to GitHub
- [ ] Check deployment status in GitHub Actions

✅ **Weekly Maintenance**
- [ ] Run structure validation: `./scripts/validate-structure.sh`
- [ ] Run build validation: `./scripts/validate-build.sh`
- [ ] Check site size and performance
- [ ] Review and organize content

---

## Table of Contents

1. [Understanding Your Website](#understanding-your-website)
2. [Daily Content Management](#daily-content-management)
3. [Local Development Setup](#local-development-setup)
4. [Publishing and Deployment](#publishing-and-deployment)
5. [Customization Guide](#customization-guide)
6. [Troubleshooting Common Issues](#troubleshooting-common-issues)
7. [Performance and Monitoring](#performance-and-monitoring)
8. [Safety and Backup](#safety-and-backup)

---

## Understanding Your Website

### What You Have

Your website is a **static site** built with Jekyll that:
- Automatically generates HTML pages from your Markdown content
- Hosts your thoughts (essays) and stories (creative writing)
- Features dark/light themes and adjustable font sizes
- Deploys automatically when you push to GitHub

### How It Works (Simple Version)

1. **Content**: You write in Markdown files
2. **Processing**: Jekyll converts them to HTML pages
3. **Styling**: CSS makes everything look good
4. **Deployment**: GitHub automatically publishes your site

### Key Folders

```
ChainOfNoThought/
├── _thoughts/           # 📝 Your essays and blog posts
├── _stories/            # 📚 Your creative writing
├── _layouts/            # 🎨 Page templates (don't change unless you know what you're doing)
├── _includes/           # 🧩 Reusable components
├── assets/              # 🎯 Images, CSS, JavaScript
├── docs/                # 📖 Documentation (this file!)
└── scripts/             # 🔧 Maintenance scripts
```

---

## Daily Content Management

### Adding a New Thought (Essay/Blog Post)

1. **Create the file** in `_thoughts/` folder
2. **Name it**: `YYYY-MM-DD-your-title.md` (e.g., `2024-01-15-morning-reflections.md`)
3. **Add the header** (copy this template):

```markdown
---
layout: post
title: "Your Title Here"
date: 2024-01-15 10:00:00 -0500
categories: [thoughts]
excerpt: "A brief description that appears in listings"
tags: [philosophy, writing, personal]
---

Your content starts here...
```

4. **Write your content** in Markdown below the `---`
5. **Save and commit** your changes

### Adding a New Story

#### For a Single-Chapter Story:

1. **Create the file** in `_stories/` folder
2. **Name it**: `story-title.md`
3. **Add the header**:

```markdown
---
layout: post
title: "Your Story Title"
excerpt: "A brief description"
tags: [fiction, short-story, fantasy]
date: 2024-01-15
---

Your story content here...
```

#### For a Multi-Chapter Story:

1. **Create a folder** in `_stories/` (e.g., `My Epic Story/`)
2. **Create an info file**: `story-info.md`

```markdown
---
layout: post
title: "My Epic Story"
story_id: "my-epic-story"
story_title: "My Epic Story"
story_description: "A tale of adventure and discovery"
chapter: "info"
excerpt: "A tale of adventure and discovery"
tags: [fiction, novel, fantasy]
date: 2024-01-15
---

Optional: Add story introduction or notes here...
```

3. **Create chapter files**: `Chapter1.md`, `Chapter2.md`, etc.

```markdown
---
layout: post
title: "Chapter 1: The Beginning"
story_id: "my-epic-story"
story_title: "My Epic Story"
chapter: 1
chapter_number: 1
excerpt: "Our hero's journey begins"
tags: [fiction, novel, fantasy]
date: 2024-01-15
---

Chapter content here...
```

### Adding Images

1. **Optimize your images first** (keep under 1MB each)
   - Use [TinyPNG](https://tinypng.com/) to compress
   - Resize large images to reasonable dimensions
2. **Place images** in `assets/images/` folder
3. **Reference in your content**:

```markdown
![Description of image]({{ "/assets/images/your-image.jpg" | relative_url }})
```

**⚠️ Important**: Never use absolute paths like `/assets/images/` - they won't work!

---

## Local Development Setup

### First Time Setup

1. **Install Ruby** (version 2.7 or higher)
   - Windows: Use [RubyInstaller](https://rubyinstaller.org/)
   - Mac: Use [Homebrew](https://brew.sh/) (`brew install ruby`)
   - Linux: Use package manager (`apt install ruby` or similar)

2. **Install Bundler**:
   ```bash
   gem install bundler
   ```

3. **Clone your repository**:
   ```bash
   git clone https://github.com/YourUsername/ChainOfNoThought.git
   cd ChainOfNoThought
   ```

4. **Install dependencies**:
   ```bash
   bundle install
   ```

### Daily Development

1. **Start the local server**:
   ```bash
   bundle exec jekyll serve
   ```

2. **Open your browser** to `http://localhost:4000/ChainOfNoThought`

3. **Make changes** to your files

4. **Refresh browser** to see changes (server auto-reloads)

5. **Stop server** with `Ctrl+C` when done

### Testing Before Publishing

**Always run these before pushing to GitHub:**

```bash
# Check file structure
./scripts/validate-structure.sh

# Check build process
./scripts/validate-build.sh
```

---

## Publishing and Deployment

### How Publishing Works

1. **You push to GitHub**: `git push origin main`
2. **GitHub Actions triggers**: Automatically starts build process
3. **Site builds**: Jekyll generates HTML files
4. **Site deploys**: New version goes live automatically
5. **You're done**: Site is live at `https://yourusername.github.io/ChainOfNoThought`

### Publishing Steps

1. **Test locally first** (see above)
2. **Add your changes**:
   ```bash
   git add .
   ```
3. **Commit with a message**:
   ```bash
   git commit -m "Add new thought about morning coffee"
   ```
4. **Push to GitHub**:
   ```bash
   git push origin main
   ```
5. **Check deployment**:
   - Go to your repository on GitHub
   - Click "Actions" tab
   - Wait for green checkmark (usually 1-2 minutes)

### Checking Deployment Status

**Green checkmark** ✅ = Site deployed successfully
**Red X** ❌ = Build failed, check error logs
**Yellow circle** 🟡 = Build in progress

---

## Customization Guide

### Changing Colors and Themes

Edit `assets/css/style.scss`:

```scss
:root {
  /* Light theme colors */
  --bg-color: #ffffff;        /* Background */
  --text-color: #333333;      /* Text */
  --accent-color: #0366d6;    /* Links */
  --border-color: #e1e4e8;    /* Borders */
}

[data-theme="dark"] {
  /* Dark theme colors */
  --bg-color: #0d1117;        /* Background */
  --text-color: #e6edf3;      /* Text */
  --accent-color: #58a6ff;    /* Links */
  --border-color: #30363d;    /* Borders */
}
```

### Changing Default Settings

Edit `_layouts/default.html` (around line 20):

```javascript
const defaultSettings = {
  theme: 'dark',    // Change to 'light' for light default
  fontSize: {
    base: 18,       // Default font size
    heading: 1.0,   // Heading size multiplier
    content: 1.0,   // Content size multiplier
    meta: 1.0       // Meta text size multiplier
  }
};
```

### Adding Navigation Items

Edit `_config.yml`:

```yaml
header_pages:
  - thoughts.md
  - stories.md
  - prosterity.md
  - about.md
  - your-new-page.md    # Add this line
```

Then create `your-new-page.md` in the root directory.

### Changing Site Title and Description

Edit `_config.yml`:

```yaml
title: "Your New Site Title"
description: "Your new site description"
```

---

## Troubleshooting Common Issues

### Site Not Building

**Symptoms**: Red X in GitHub Actions, site not updating

**Solutions**:
1. Check the Actions tab for error messages
2. Verify all files have proper front matter (the `---` sections)
3. Check for YAML syntax errors in front matter
4. Ensure no files are too large (under 100MB each)

### Settings Not Working

**Symptoms**: Theme not switching, fonts not changing

**Solutions**:
1. Clear browser cache (Ctrl+Shift+R)
2. Check browser console for JavaScript errors (F12)
3. Verify JavaScript is enabled
4. Disable browser extensions temporarily

### Images Not Displaying

**Symptoms**: Broken image links, images not showing

**Solutions**:
1. Check image paths use `{{ "/assets/images/filename.jpg" | relative_url }}`
2. Verify image exists in `assets/images/` folder
3. Check image file size (keep under 1MB)
4. Ensure image filename has no spaces or special characters

### Content Not Appearing

**Symptoms**: New posts not showing on site

**Solutions**:
1. Check front matter format is correct
2. Verify date format: `YYYY-MM-DD HH:MM:SS -TIMEZONE`
3. Ensure file is in correct folder (`_thoughts/` or `_stories/`)
4. Check that collection is defined in `_config.yml`

### Local Server Won't Start

**Symptoms**: Errors when running `bundle exec jekyll serve`

**Solutions**:
1. Run `bundle install` to update dependencies
2. Check Ruby version: `ruby --version` (needs 2.7+)
3. Try different port: `bundle exec jekyll serve --port 4001`
4. Delete `Gemfile.lock` and run `bundle install` again

---

## Performance and Monitoring

### Site Size Limits

GitHub Pages has strict limits:
- **Total site size**: 1GB maximum
- **Individual file size**: 100MB maximum
- **Bandwidth**: 100GB per month
- **Build time**: 10 minutes maximum

### Monitoring Your Site

**Check site size** (after local build):
```bash
bundle exec jekyll build
du -sh _site/
```

**Keep it under 900MB** for safety buffer.

### Optimization Tips

1. **Compress images** before uploading
2. **Remove unused files** from assets
3. **Limit number of posts** on homepage
4. **Use image compression tools** like TinyPNG

### Performance Monitoring

**Regular checks**:
- Site loading speed (should be under 3 seconds)
- Mobile responsiveness
- All links working
- Theme switching functional
- Font controls working

---

## Safety and Backup

### Automatic Backups

Your site is automatically backed up:
- Full version history in Git
- GitHub stores complete repository
- All changes are tracked and reversible

### Manual Backup

Create periodic local backups:
```bash
git clone --mirror https://github.com/YourUsername/ChainOfNoThought.git backup-folder
```

### Disaster Recovery

**If something goes wrong**:
1. **Revert to previous version**:
   ```bash
   git log --oneline  # Find commit to revert to
   git reset --hard COMMIT_HASH
   git push --force origin main
   ```

2. **Restore from backup**:
   - Download repository ZIP from GitHub
   - Extract and recommit changes

### Best Practices

1. **Always test locally** before pushing
2. **Make small, incremental changes**
3. **Write descriptive commit messages**
4. **Don't edit files directly on GitHub** (use local development)
5. **Keep regular backups** of important content

---

## GitHub Pages Limits and Policies

### Technical Limits

| Limit | Value | Why It Matters |
|-------|-------|---------------|
| Site size | 1GB | Keep under 900MB for safety |
| File size | 100MB | Compress large images |
| Bandwidth | 100GB/month | Monitor if site gets popular |
| Build time | 10 minutes | Optimize build process |

### Content Policies

- **No commercial use** (no selling products/services)
- **No adult content** (keep it family-friendly)
- **No illegal content** (obvious but important)
- **No spam or malware** (write genuine content)

### Terms of Service

Your site must comply with:
- GitHub Terms of Service
- GitHub Pages Terms
- General internet content guidelines

---

## Quick Reference

### Essential Commands

```bash
# Start local development
bundle exec jekyll serve

# Build site locally
bundle exec jekyll build

# Check structure
./scripts/validate-structure.sh

# Check build
./scripts/validate-build.sh

# Git workflow
git add .
git commit -m "Description of changes"
git push origin main
```

### File Naming Conventions

- **Thoughts**: `YYYY-MM-DD-title.md`
- **Stories**: `story-title.md` or `ChapterN.md`
- **Images**: `descriptive-name.jpg` (no spaces)
- **Pages**: `page-name.md`

### Front Matter Templates

**Thought**:
```yaml
---
layout: post
title: "Title"
date: 2024-01-15 10:00:00 -0500
categories: [thoughts]
excerpt: "Brief description"
tags: [tag1, tag2]
---
```

**Story**:
```yaml
---
layout: post
title: "Story Title"
excerpt: "Brief description"
tags: [fiction, genre]
date: 2024-01-15
---
```

### Emergency Contacts

- **GitHub Support**: https://support.github.com/
- **Jekyll Documentation**: https://jekyllrb.com/docs/
- **Ruby Installation**: https://www.ruby-lang.org/en/documentation/installation/

---

## Need Help?

1. **Check this guide first** - most issues are covered here
2. **Search GitHub repository issues** - might be a known problem
3. **Check Jekyll documentation** - for technical details
4. **Contact support** - if all else fails

Remember: Your website is just files and folders. Nothing you do can permanently break it if you have backups! 