# GITHUB PAGES MAINTENANCE GUIDE

## INTRODUCTION

This guide is designed for site owners to maintain a GitHub Pages writing website. It covers practical tasks, platform limitations, and troubleshooting common issues.

## CRITICAL GITHUB PAGES LIMITS & POLICIES

### Platform Limits (MUST KNOW)
- **Site Size**: Maximum 1 GB
- **Bandwidth**: 100 GB per month
- **Build Frequency**: 10 builds per hour maximum
- **File Size**: No single file should exceed 100 MB
- **Build Time**: 10 minutes maximum

### Important Restrictions
- **No Git LFS**: Large File Storage objects will NOT deploy
- **No Commercial Use**: Cannot use for e-commerce, SaaS, or primarily commercial purposes
- **Private Repos**: Require GitHub Pro/Team/Enterprise plan for Pages
- **One User Site**: Only one `username.github.io` site per account

### Build Process
- GitHub Pages now uses **Actions by default** (not branch-based builds)
- Only [whitelisted plugins](https://pages.github.com/versions/) are allowed
- Custom plugins require Actions workflow with custom build

## SITE OVERVIEW

Your writing website uses Jekyll on GitHub Pages, which automatically converts Markdown to HTML. The site is:
- Minimalist and content-focused
- Automatically deployed via GitHub Actions
- Limited to approved Jekyll plugins
- Subject to the platform limits above

## COMMON MAINTENANCE TASKS

### Adding New Content

#### To Add a New Essay/Blog Post:

1. Create a new file in the `_posts/` directory
2. Name it: `YYYY-MM-DD-title-with-hyphens.md` (date is REQUIRED)
3. Add front matter:
   ```yaml
   ---
   layout: post
   title: "Your Essay Title"
   date: YYYY-MM-DD HH:MM:SS +0000
   categories: essays
   excerpt: "Brief summary for index pages"
   ---
   ```
4. Write content in Markdown
5. Commit and push to GitHub

#### To Add a Creative Writing Piece:

1. Create a new file in the `_creative_writing/` directory
2. Name it descriptively: `story-title.md`
3. Add front matter:
   ```yaml
   ---
   layout: post
   title: "Your Story Title"
   excerpt: "Brief description"
   tags: [fiction, fantasy]
   ---
   ```
4. Write content below
5. Commit and push

#### To Add a Regular Page:

1. Create a new `.md` file in root directory
2. Add front matter:
   ```yaml
   ---
   layout: page
   title: "Page Title"
   permalink: /desired-url/
   ---
   ```
3. Add to navigation in `_config.yml` under `header_pages`

### Adding Images

#### Image Guidelines:
- **Compress images** before uploading (use tools like TinyPNG)
- Keep images under 1 MB each
- Total site must stay under 1 GB
- NO Git LFS - it won't work with GitHub Pages

#### Adding Images:
1. Place images in `assets/images/`
2. Reference using relative URLs with Liquid filter:
   ```markdown
   ![Description]({{ "/assets/images/your-image.jpg" | relative_url }})
   ```
   **NOT** `![Description](/assets/images/your-image.jpg)` (breaks on project sites)

### Modifying Navigation

1. Edit `_config.yml`
2. Find `header_pages` section:
   ```yaml
   header_pages:
     - about.md
     - creative-writing.md
     - essays.md
   ```
3. Add/remove pages as needed
4. Changes require site rebuild (automatic on push)

### Custom Domain Setup (Optional)

1. Create `CNAME` file in root with your domain:
   ```
   www.yourdomain.com
   ```
2. Configure DNS at your registrar:
   - For apex domain: A records to GitHub's IPs
   - For subdomain: CNAME record to `username.github.io`
3. Enable HTTPS in repository settings after DNS propagates

## LOCAL TESTING

### Prerequisites (One-time Setup)
1. Install Ruby 2.5+
2. Install Bundler: `gem install bundler`
3. In site directory: `bundle install`

### Testing Commands
```bash
# Serve site locally
bundle exec jekyll serve

# Build without serving
bundle exec jekyll build

# For Ruby 3.0+ (if you get webrick error)
bundle add webrick
```

### Common Local Testing Issues
- **Port in use**: Add `--port 4001` to serve command
- **Config changes**: Restart server (Ctrl+C then re-run)
- **Gemfile.lock conflicts**: Delete it and run `bundle install`

## MARKDOWN ESSENTIALS

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold** and *italic* text

[Link text](https://example.com)

![Image alt text]({{ "/assets/images/image.jpg" | relative_url }})

> Blockquote

- Bullet list
- Another item

1. Numbered list
2. Another item

---

`inline code`

```code block```
```

## TROUBLESHOOTING

### Build Failures

1. **Check Actions Tab**: Go to repository → Actions tab for error details
2. **Common Causes**:
   - Invalid YAML in `_config.yml` or front matter
   - Using non-whitelisted plugins
   - Syntax errors in Liquid templates
   - File encoding issues (use UTF-8)

### Content Not Appearing

- **Posts**: Must have correct date format in filename
- **Collections**: Verify `output: true` in `_config.yml`
- **Pages**: Check permalink doesn't conflict
- **All content**: Ensure valid front matter (even empty: `---\n---`)

### "Page Build Failed" Errors

Common error messages and fixes:
- **"Unknown tag"**: You're using an unsupported plugin
- **"Liquid syntax error"**: Check your template syntax
- **"No such file"**: Verify all include/layout references exist
- **Build timeout**: Reduce site complexity or file count

### Performance Issues

If your site is slow:
1. Check total size: `du -sh _site/` (after local build)
2. Compress images further
3. Reduce number of posts per page
4. Consider external image hosting if near 1 GB limit

### Version Mismatch Issues

To match GitHub's environment exactly:
1. Check current versions: https://pages.github.com/versions/
2. Update Gemfile:
   ```ruby
   source "https://rubygems.org"
   gem "github-pages", "= 232"  # Use current version number
   gem "webrick", "~> 1.7"
   ```
3. Run `bundle update`

## GITHUB WORKFLOW

### Basic Commands
```bash
# Clone repository (first time)
git clone https://github.com/USERNAME/REPOSITORY.git
cd REPOSITORY

# Daily workflow
git pull                        # Get latest changes
# Make your edits
git add .                       # Stage all changes
git commit -m "Add new essay"   # Commit with message
git push                        # Push to GitHub
```

### Checking Build Status
1. After pushing, go to repository on GitHub
2. Click "Actions" tab
3. Latest workflow should show as running/completed
4. If failed, click for details

## MONITORING & LIMITS

### Check Site Size
```bash
# After local build
du -sh _site/
# Should be well under 1 GB
```

### Monitor Usage
- GitHub will email warnings near bandwidth limits
- Check Insights → Traffic for bandwidth usage
- Stay under 100 GB/month

### Pre-publish Checklist
- [ ] All images compressed
- [ ] No files over 25 MB
- [ ] Total site under 900 MB
- [ ] No commercial content
- [ ] No sensitive data in public repo

## RESOURCES

### Official Documentation
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Pages Limits](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#usage-limits)
- [Supported Plugins](https://pages.github.com/versions/)
- [Jekyll Documentation](https://jekyllrb.com/docs/)

### Troubleshooting
- [GitHub Pages Troubleshooting](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/troubleshooting-jekyll-build-errors-for-github-pages-sites)
- [Jekyll Build Errors](https://jekyllrb.com/docs/troubleshooting/)

### Tools
- [TinyPNG](https://tinypng.com/) - Image compression
- [YAML Validator](https://www.yamllint.com/) - Check YAML syntax
- [Markdown Preview](https://markdownlivepreview.com/) - Test Markdown 