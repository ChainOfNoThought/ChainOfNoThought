# CHAINOFNOTHOUGHT MAINTENANCE GUIDE

## INTRODUCTION

This guide covers maintaining a sophisticated Jekyll writing website with dark mode, font size controls, and advanced content organization. The site features thoughts (essays), stories (creative writing), archive functionality, and accessibility features.

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

## SITE ARCHITECTURE

### Current Implementation Status

#### ✅ IMPLEMENTED FEATURES
- **Dark Mode System**: Default dark theme with light mode toggle
- **Font Size Controls**: Granular control over base, heading, content, and meta text sizes
- **URL-Based Persistence**: Settings maintained across pages via URL parameters
- **Collections System**: Separate `_thoughts/` and `_stories/` collections
- **Archive Functionality**: Complete archive with search in `prosterity.md`
- **Responsive Design**: Mobile-first approach with print optimization
- **Accessibility Features**: High contrast themes, scalable fonts, keyboard navigation
- **Custom Layout System**: Override of Minima theme with custom `default.html`
- **Settings Interface**: Comprehensive controls in About page
- **Multi-Chapter Stories**: Support for story series with chapter organization

#### 📁 CURRENT DIRECTORY STRUCTURE
```
ChainOfNoThought/
├── docs/                     # 📚 Documentation
│   ├── guides/              # 📖 User guides (maintenance, images)
│   └── reference/           # 📋 Technical reference
├── scripts/                 # 🔧 Automation and validation scripts
├── _layouts/                # 🎨 Jekyll layouts
│   ├── default.html         # Main layout with theme/font system
│   └── post.html            # Post layout with metadata
├── _includes/               # 🧩 Reusable components
│   ├── head.html            # HTML head section
│   ├── header.html          # Site navigation
│   ├── footer.html          # Site footer
│   ├── components/          # UI components
│   │   └── quote-styles.css # Quote styling
│   └── scripts/             # JavaScript includes
│       └── random-quote.js  # Random quote functionality
├── _thoughts/               # ✍️ Essays and blog posts collection
├── _stories/                # 📖 Creative writing collection
├── assets/                  # 🎯 Static assets
│   ├── css/
│   │   └── style.scss       # Main stylesheet with CSS custom properties
│   ├── js/
│   │   └── settings.js      # Theme and font size management
│   └── images/              # Site images
├── _data/                   # 📊 Data files (quotes, etc.)
├── .github/                 # ⚙️ GitHub configuration
│   └── workflows/           # GitHub Actions
├── _config.yml              # Jekyll configuration with collections
├── index.md                 # Home page with recent content
├── thoughts.md              # Thoughts archive page
├── stories.md               # Stories archive page
├── prosterity.md            # Complete archive with search
├── about.md                 # About page with settings controls
└── 404.html                 # Custom 404 page
```

#### 🎨 THEME SYSTEM DETAILS
- **CSS Custom Properties**: All colors and sizes use CSS variables
- **Automatic Persistence**: Settings carried via URL parameters
- **Print Optimization**: Automatic light theme for printing
- **No Storage**: No cookies or localStorage used
- **Shareable Settings**: URLs can be shared with preferred settings

#### 📝 FONT SYSTEM DETAILS
- **Base Font Size**: 12px - 32px range
- **Scale Factors**: Heading, content, and meta text independently scalable
- **Real-time Updates**: Changes apply instantly
- **Responsive**: Scales appropriately on mobile devices

## CONTENT MANAGEMENT

### Adding New Thoughts (Essays/Blog Posts)

1. Create file in `_thoughts/` directory
2. Use naming convention: `YYYY-MM-DD-title-with-hyphens.md`
3. Add front matter:
   ```yaml
   ---
   layout: post
   title: "Your Thought Title"
   date: 2024-01-20 10:00:00 -0500
   categories: [thoughts]
   excerpt: "Brief summary for listings"
   tags: [philosophy, writing, personal]
   author: "ChainOfNoThought"
   ---
   ```
4. Write content in Markdown below front matter
5. Commit and push to GitHub

### Adding New Stories (Creative Writing)

#### For Standalone Stories:
1. Create file in `_stories/` directory
2. Name descriptively: `story-title.md`
3. Add front matter:
   ```yaml
   ---
   layout: post
   title: "Story Title"
   excerpt: "Brief description for listings"
   tags: [fiction, short-story, fantasy]
   date: 2024-01-20
   ---
   ```

#### For Multi-Chapter Stories:
1. Create info file: `story-name-info.md`
   ```yaml
   ---
   layout: post
   title: "Story Title"
   story_id: "unique-story-identifier"
   story_title: "The Complete Story Title"
   story_description: "A brief description of the story"
   chapter: "info"
   excerpt: "Story description"
   tags: [fiction, novel, series]
   date: 2024-01-20
   ---
   ```

2. Create chapter files: `story-name-chapter-1.md`
   ```yaml
   ---
   layout: post
   title: "Chapter 1: The Beginning"
   story_id: "unique-story-identifier"
   story_title: "The Complete Story Title"
   chapter: 1
   chapter_number: 1
   excerpt: "Chapter summary"
   tags: [fiction, novel, series]
   date: 2024-01-20
   ---
   ```

### Adding Images

#### Image Guidelines:
- **Compress images** before uploading (use TinyPNG, ImageOptim)
- Keep images under 1 MB each for performance
- Total site must stay under 1 GB
- Use descriptive filenames
- NO Git LFS - it won't work with GitHub Pages

#### Adding Images:
1. Place images in `assets/images/`
2. Reference using Jekyll's relative_url filter:
   ```markdown
   ![Description]({{ "/assets/images/your-image.jpg" | relative_url }})
   ```
3. **NEVER** use absolute paths like `/assets/images/` (breaks on project sites)

### Navigation Management

Navigation is controlled in `_config.yml`:
```yaml
header_pages:
  - thoughts.md
  - stories.md
  - prosterity.md
  - about.md
```

To modify:
1. Edit the `header_pages` list in `_config.yml`
2. Ensure referenced files exist
3. Changes require site rebuild (automatic on push)

## THEME AND SETTINGS CUSTOMIZATION

### Modifying Default Theme
Edit CSS custom properties in `assets/css/style.scss`:

```scss
:root {
  // Light theme colors
  --bg-color: #ffffff;
  --text-color: #333333;
  --accent-color: #0366d6;
  --border-color: #e1e4e8;
  // ... other properties
}

[data-theme="dark"] {
  // Dark theme colors
  --bg-color: #0d1117;
  --text-color: #e6edf3;
  --accent-color: #58a6ff;
  --border-color: #30363d;
  // ... other properties
}
```

### Modifying Default Font Settings
Edit the `defaultSettings` object in `_layouts/default.html`:

```javascript
const defaultSettings = {
  theme: 'dark', // Change to 'light' for light default
  fontSize: {
    base: 18,      // Default base font size
    heading: 1.0,  // Default heading scale
    content: 1.0,  // Default content scale
    meta: 1.0      // Default meta text scale
  }
};
```

### Adding New Theme Colors
1. Add CSS custom properties to both `:root` and `[data-theme="dark"]`
2. Use the variables throughout the stylesheet
3. Test in both light and dark modes

## LOCAL DEVELOPMENT

### Prerequisites (One-time Setup)
1. Install Ruby 2.7+ (check with `ruby --version`)
2. Install Bundler: `gem install bundler`
3. In site directory: `bundle install`

### Development Commands
```bash
# Serve site locally with live reload
bundle exec jekyll serve

# Serve on different port
bundle exec jekyll serve --port 4001

# Build without serving
bundle exec jekyll build

# Build with future posts
bundle exec jekyll serve --future

# For Ruby 3.0+ (if you get webrick error)
bundle add webrick
```

### Testing Settings System
1. Start local server: `bundle exec jekyll serve`
2. Visit `http://localhost:4000/ChainOfNoThought/about/`
3. Test theme toggle and font controls
4. Navigate between pages to verify persistence
5. Check that URLs contain settings parameters

### Common Local Issues
- **Port in use**: Use `--port 4001` flag
- **Config changes**: Restart server (Ctrl+C then re-run)
- **Gemfile.lock conflicts**: Delete and run `bundle install`
- **JavaScript errors**: Check browser console
- **CSS not updating**: Hard refresh (Ctrl+Shift+R)

## TROUBLESHOOTING

### Settings System Issues

#### Settings Not Persisting
1. Check JavaScript console for errors
2. Verify `assets/js/settings.js` is loading
3. Ensure URL parameters are being added to links
4. Check that no browser extensions are blocking JavaScript

#### Theme Not Switching
1. Verify CSS custom properties are supported (modern browsers)
2. Check that `data-theme` attribute is being set on `<html>`
3. Ensure CSS variables are properly defined
4. Test in different browsers

#### Font Sizes Not Changing
1. Check that CSS custom properties for font sizes are being set
2. Verify calculations in CSS (e.g., `calc(var(--base-font-size) * var(--content-scale))`)
3. Ensure range inputs are properly connected to JavaScript
4. Check for CSS specificity conflicts

### Build Failures

#### Common Causes and Solutions:
- **Invalid YAML**: Use [YAML Validator](https://www.yamllint.com/)
- **Liquid syntax errors**: Check template syntax in layouts
- **Missing files**: Verify all referenced includes/layouts exist
- **Collection configuration**: Ensure collections are properly defined in `_config.yml`

#### Checking Build Status:
1. Go to repository on GitHub
2. Click "Actions" tab
3. Click on latest workflow run
4. Check logs for specific error messages

### Content Issues

#### Posts Not Appearing:
- **Thoughts**: Must be in `_thoughts/` directory with valid front matter
- **Stories**: Must be in `_stories/` directory with valid front matter
- **Date format**: Ensure dates are in correct YAML format
- **Future dates**: Use `--future` flag for local testing

#### Collections Not Working:
1. Verify `_config.yml` has correct collection configuration:
   ```yaml
   collections:
     thoughts:
       output: true
       permalink: /thoughts/:title/
     stories:
       output: true
       permalink: /stories/:path/
   ```
2. Ensure files are in correct directories
3. Check that front matter includes required fields

### Performance Issues

#### Site Loading Slowly:
1. Check total site size: `du -sh _site/` (after local build)
2. Compress images further
3. Optimize CSS and JavaScript
4. Consider reducing number of posts on index page

#### Build Timeouts:
1. Reduce number of files
2. Optimize large images
3. Simplify complex Liquid logic
4. Check for infinite loops in templates

## MONITORING & MAINTENANCE

### Regular Checks
- **Site Size**: Keep under 900 MB (buffer for 1 GB limit)
- **Build Status**: Monitor Actions tab for failures
- **Performance**: Test loading speed regularly
- **Accessibility**: Verify theme switching and font controls work
- **Mobile**: Test responsive design on various devices

### Pre-publish Checklist
- [ ] All images compressed and under 1 MB each
- [ ] No files over 25 MB
- [ ] Total site under 900 MB
- [ ] Theme switching works in both directions
- [ ] Font controls function properly
- [ ] Settings persist across page navigation
- [ ] Content displays correctly in both themes
- [ ] Mobile responsive design intact
- [ ] No JavaScript console errors
- [ ] All links work correctly

### Backup Strategy
1. Repository is automatically backed up on GitHub
2. Consider periodic local clones: `git clone --mirror`
3. Export important content to external formats if needed
4. Document any custom configurations

## ADVANCED CUSTOMIZATION

### Adding New Settings
1. Add control to `about.md`
2. Update JavaScript in `assets/js/settings.js`
3. Add CSS custom properties if needed
4. Update URL parameter handling
5. Test persistence across pages

### Modifying Layout Structure
1. Edit `_layouts/default.html` for overall structure
2. Edit `_layouts/post.html` for individual posts
3. Maintain theme and font size system integration
4. Test with various content types

### Adding New Collections
1. Define in `_config.yml`:
   ```yaml
   collections:
     new_collection:
       output: true
       permalink: /new-collection/:path/
   ```
2. Create directory: `_new_collection/`
3. Add archive page: `new-collection.md`
4. Update navigation if desired

## RESOURCES

### Official Documentation
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Jekyll Collections](https://jekyllrb.com/docs/collections/)
- [Liquid Template Language](https://shopify.github.io/liquid/)

### CSS and JavaScript
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [CSS calc() Function](https://developer.mozilla.org/en-US/docs/Web/CSS/calc)
- [URL API](https://developer.mozilla.org/en-US/docs/Web/API/URL)

### Tools
- [TinyPNG](https://tinypng.com/) - Image compression
- [YAML Validator](https://www.yamllint.com/) - Check YAML syntax
- [CSS Validator](https://jigsaw.w3.org/css-validator/) - Validate CSS
- [Accessibility Checker](https://wave.webaim.org/) - Test accessibility

### Troubleshooting Resources
- [GitHub Pages Troubleshooting](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/troubleshooting-jekyll-build-errors-for-github-pages-sites)
- [Jekyll Build Errors](https://jekyllrb.com/docs/troubleshooting/)
- [Browser Developer Tools](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools) 