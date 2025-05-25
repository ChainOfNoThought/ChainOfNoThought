# Story Navigation System

This document describes the story navigation system implemented for the Jekyll site, which provides chapter-based navigation within stories instead of chronological navigation across all posts.

## Overview

The story navigation system allows readers to navigate between chapters within the same story using "Previous" and "Next" buttons that respect chapter numbering rather than publication dates.

## Key Features

- **Chapter-based Navigation**: Navigate between chapters within the same story based on `chapter_number`
- **Story-aware**: Only shows navigation for posts that are part of a story (have `story_id` and `chapter_number`)
- **Fallback Support**: Non-story posts still use the default Jekyll navigation
- **Story Context**: Shows current story title and chapter information
- **Story Index Link**: Provides a link back to the story's chapter list
- **Responsive Design**: Works well on both desktop and mobile devices

## File Structure

```
_includes/
├── story-navigation.html     # Main navigation logic
└── story-helpers.html        # Utility functions for story management

_layouts/
└── post.html                 # Updated to use story navigation

assets/css/
└── style.scss               # Styles for story navigation

docs/
└── story-navigation.md      # This documentation file
```

## How It Works

### 1. Story Detection
The system checks if a post has both `story_id` and `chapter_number` in its front matter:

```yaml
---
layout: post
title: "Chapter Title"
story_id: "my-story"
chapter_number: 2
---
```

### 2. Chapter Discovery
For story posts, the system:
1. Finds all chapters with the same `story_id`
2. Excludes info pages (`chapter: "info"`)
3. Sorts chapters by `chapter_number`
4. Determines the current chapter's position
5. Calculates previous and next chapters

### 3. Navigation Rendering
The navigation displays:
- Story title and current chapter information
- Previous chapter link (if exists)
- Next chapter link (if exists)
- Link to view all chapters in the story
- "Back to Top" button for easy page navigation
- Disabled states for first/last chapters

### 4. Fallback Behavior
For non-story posts (thoughts, standalone articles), the system falls back to Jekyll's default chronological navigation.

## Front Matter Requirements

### Story Chapters
```yaml
---
layout: post
title: "Chapter Title"
story_id: "unique-story-identifier"
chapter_number: 1
date: 2024-01-01 10:00:00 -0400
tags: [tag1, tag2]
excerpt: "Chapter excerpt"
---
```

### Story Info Pages (Optional)
```yaml
---
layout: post
title: "Story Title - Info"
story_id: "unique-story-identifier"
story_title: "The Full Story Title"
story_description: "Description of the story"
chapter: "info"
date: 2024-01-01 00:00:00 -0400
published: false
---
```

## CSS Classes

The navigation system uses the following CSS classes:

- `.story-navigation` - Main navigation container
- `.story-nav-container` - Inner container for layout
- `.story-nav-info` - Story title and chapter info section
- `.story-nav-links` - Previous/next navigation links
- `.story-nav-index` - Container for story index and utility links
- `.story-index-link` - Link to story chapter list
- `.back-to-top-link` - Back to top button
- `.page-anchor` - Invisible anchor at top of page
- `.nav-previous`, `.nav-next` - Individual navigation items
- `.nav-disabled` - Disabled navigation states
- `.nav-link` - Navigation link styling
- `.nav-label` - "Previous"/"Next" labels
- `.nav-chapter` - Chapter number display
- `.nav-title` - Chapter title display

## Customization

### Styling
Modify the styles in `assets/css/style.scss` under the "Story Navigation" section to customize the appearance.

### Navigation Logic
The navigation logic is contained in `_includes/story-navigation.html` and can be modified to change behavior, such as:
- Adding chapter progress indicators
- Including chapter excerpts
- Modifying the story info display
- Adding keyboard navigation

### Helper Functions
The `_includes/story-helpers.html` file contains utility functions that can be extended for additional story management features.

## Best Practices

### Chapter Numbering
- Use sequential integer chapter numbers starting from 1
- Avoid gaps in chapter numbering
- Don't reuse chapter numbers within the same story

### Story IDs
- Use consistent, URL-friendly story identifiers
- Keep story IDs unique across all stories
- Use kebab-case for consistency (e.g., "my-story-title")

### File Organization
- Organize story files in subdirectories by story
- Use consistent naming conventions for chapter files
- Include story info files for better organization

### Example Structure
```
_stories/
├── lighthouse-keeper/
│   ├── story-info.md
│   ├── chapter-1.md
│   ├── chapter-2.md
│   └── chapter-3.md
└── memory-thief/
    ├── story-info.md
    ├── chapter-1.md
    └── chapter-2.md
```

## Troubleshooting

### Navigation Not Appearing
- Verify the post has both `story_id` and `chapter_number` in front matter
- Check that other chapters exist with the same `story_id`
- Ensure chapter numbers are integers, not strings

### Wrong Chapter Order
- Verify `chapter_number` values are correct
- Check for duplicate chapter numbers
- Ensure chapter numbers are integers

### Broken Story Index Links
- Verify the stories page has anchor IDs for each story
- Check that the story ID matches between chapters and the stories page
- Ensure the `slugify` filter produces the expected anchor ID

### Missing Story Information
- Add a story info file with `chapter: "info"`
- Verify the `story_title` is set in the info file
- Check that the info file has the correct `story_id`

## Performance Considerations

The navigation system performs several Liquid operations:
- Filtering stories by `story_id`
- Sorting chapters by `chapter_number`
- Finding current chapter position

For sites with many stories and chapters, consider:
- Using Jekyll's caching mechanisms
- Optimizing Liquid templates
- Pre-generating navigation data if needed

## Future Enhancements

Potential improvements to the system:
- Chapter progress indicators
- Keyboard navigation support
- Chapter bookmarking
- Reading time estimates per chapter
- Chapter-specific metadata display
- Integration with reading progress tracking 