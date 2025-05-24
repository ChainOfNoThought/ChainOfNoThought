# Image Usage Guide

This guide explains how to add images to your GitHub Pages writing website.

## Quick Start

1. Place your image in the `assets/images/` folder
2. In your post, use this code:
   ```markdown
   ![Description of image]({{ "/assets/images/your-image.jpg" | relative_url }})
   ```
3. That's it! The image will be automatically styled.

## Important Limits

- **Individual file size**: Keep each image under 25MB (GitHub Pages limit: 100MB)
- **Total site size**: Must stay under 1GB
- **Recommended image size**: Under 1MB for fast loading

## Image Optimization Tips

### Before uploading, optimize your images:

1. **Resize large photos**:
   - For full-width images: 1200px wide maximum
   - For inline images: 800px wide maximum
   
2. **Compress images**:
   - Use online tools like [TinyPNG](https://tinypng.com) or [Squoosh](https://squoosh.app)
   - Aim for 80-85% quality for photos
   
3. **Choose the right format**:
   - **JPEG**: Best for photographs
   - **PNG**: Best for graphics with transparency
   - **Avoid**: BMP, TIFF (too large)

## How Images Display

Your custom CSS automatically styles images with:
- Centered alignment
- Subtle border and shadow
- Responsive sizing (won't overflow on mobile)
- Nice spacing from text

## Example Usage

### Basic Image
```markdown
![Sunset over mountains]({{ "/assets/images/sunset.jpg" | relative_url }})
```

### Image with Link
```markdown
[![Click for larger view]({{ "/assets/images/thumbnail.jpg" | relative_url }})]({{ "/assets/images/full-size.jpg" | relative_url }})
```

### Multiple Images
Place them one after another with a blank line between:
```markdown
![First image]({{ "/assets/images/image1.jpg" | relative_url }})

![Second image]({{ "/assets/images/image2.jpg" | relative_url }})
```

## Checking Your Site Size

Run the validation script to check if you're approaching limits:
```bash
./validate-build.sh
```

This will show:
- Total site size
- Any files over 25MB
- Warning if approaching 1GB limit

## Tips for Writers

1. **Don't overuse images** - Your writing is the star
2. **Use meaningful alt text** - Helps with accessibility
3. **One or two images per post** is usually plenty
4. **Always optimize before uploading** - Saves bandwidth

## Common Issues

**Image not showing?**
- Check the filename (case-sensitive!)
- Ensure it's in `assets/images/`
- Use the `relative_url` filter

**Site building slowly?**
- Images might be too large
- Run the size check: `./validate-build.sh`

**Image looks blurry?**
- Original might be too small
- Use at least 800px wide for good quality 