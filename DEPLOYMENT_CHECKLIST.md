# Deployment Checklist for GitHub Pages

This checklist guides you through deploying your ChainOfNoThought site to GitHub Pages.

## Prerequisites
- [ ] GitHub account
- [ ] Git installed locally
- [ ] Ruby and Bundler installed

## Initial Setup
- [ ] Run `./quick-setup.sh` to configure your username and author information
- [ ] Run `./validate-build.sh` to ensure the site builds correctly

## GitHub Repository Setup

### 1. Create Repository
- [ ] Go to https://github.com/new
- [ ] Repository name: `ChainOfNoThought` (must match exactly)
- [ ] Description: "Personal writing website"
- [ ] Set as Public (required for free GitHub Pages)
- [ ] Do NOT initialize with README, .gitignore, or license

### 2. Push Local Repository
```bash
git remote add origin https://github.com/YOUR-USERNAME/ChainOfNoThought.git
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Build and deployment**:
   - [ ] Source: Select **GitHub Actions**
   - [ ] The workflow will run automatically on push

### 4. Verify Deployment
- [ ] Go to the **Actions** tab in your repository
- [ ] You should see "Deploy Jekyll site to Pages" workflow running
- [ ] Wait for the green checkmark (usually 2-5 minutes)
- [ ] Check deployment status under Settings → Pages

### 5. Access Your Site
Your site will be available at:
```
https://YOUR-USERNAME.github.io/ChainOfNoThought
```

Note: First deployment may take up to 10 minutes to become accessible.

## Post-Deployment

### Verify Everything Works
- [ ] Home page loads correctly
- [ ] Navigation menu works
- [ ] About page displays
- [ ] Writing archive page shows sample content
- [ ] 404 page works (try a non-existent URL)
- [ ] Images load properly (if any)

### Customize Your Site
- [ ] Update `about.md` with your personal information
- [ ] Delete sample post in `_posts/`
- [ ] Delete sample story in `_creative_writing/`
- [ ] Add your own content

### Monitor Your Site
- [ ] Check Actions tab regularly for build status
- [ ] Enable email notifications for failed builds (Settings → Notifications)
- [ ] Monitor site size with `./validate-build.sh`

## Troubleshooting

### Build Fails
1. Check the Actions tab for specific error messages
2. Run `./validate-build.sh` locally
3. Common issues:
   - Invalid YAML in front matter
   - Missing layout files
   - Unsupported plugins

### Site Not Appearing
1. Ensure GitHub Pages is enabled in Settings
2. Check that source is set to "GitHub Actions"
3. Verify the workflow completed successfully
4. Wait up to 10 minutes for initial deployment

### 404 Errors on All Pages
1. Check `baseurl` in `_config.yml` matches repository name
2. Ensure you're using the correct URL format
3. Verify files were pushed to the correct branch

## Maintenance

### Regular Tasks
- Run `./validate-build.sh` before major updates
- Keep images under 5MB for best performance
- Monitor Actions tab for failed builds
- Check site size doesn't approach 1GB limit

### Updating Dependencies
Periodically update the GitHub Pages gem:
```bash
bundle update github-pages
git add Gemfile.lock
git commit -m "Update dependencies"
git push
```

## Additional Resources
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Minima Theme](https://github.com/jekyll/minima) 