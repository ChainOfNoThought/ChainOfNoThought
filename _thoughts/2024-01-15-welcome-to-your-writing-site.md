---
layout: post
title: "Welcome to Your Writing Site"
date: 2024-01-15 10:00:00 -0500
categories: [meta, welcome]
excerpt: "Everything you need to know to start publishing your writing on your new Jekyll-powered website."
---

Welcome to your new writing website! This post will help you get started with creating and publishing your content.

## How This Site Works

Your website is powered by Jekyll and hosted on GitHub Pages. This means:
- Write in simple Markdown files
- Changes automatically publish when you push to GitHub
- No databases or complex setup required

### For Thoughts and Essays

1. Create a new file in the `_thoughts` folder
2. Name it with the date format: `YYYY-MM-DD-your-title.md`
3. Add the required front matter (see example below)
4. Write your content in Markdown

Example front matter for thoughts:
```yaml
---
layout: post
title: "Your Essay Title"
date: 2024-01-15 10:00:00 -0500
tags: [philosophy, writing]
excerpt: "A brief description of your essay."
---
```

### For Stories and Creative Writing

Stories can be standalone or organized into multi-chapter works:

**Standalone Story:**
1. Create a file directly in `_stories/` folder
2. Name it: `your-story-title.md`

**Multi-Chapter Story:**
1. Create a folder in `_stories/` (e.g., `_stories/my-novel/`)
2. Add a `story-info.md` file with story metadata
3. Add chapters as `chapter-1.md`, `chapter-2.md`, etc.

Example story info:
```yaml
---
story_id: "my-novel"
story_title: "My Novel Title"
story_description: "A brief description of your story"
chapter: "info"
published: false
---
```

Example chapter front matter:
```yaml
---
layout: post
title: "Chapter Title"
story_id: "my-novel"
chapter_number: 1
date: 2024-01-15
tags: [fiction, adventure]
---
```

## Writing in Markdown

### Basic Formatting

- **Bold text**: `**bold**`
- *Italic text*: `*italic*`
- [Links](https://example.com): `[text](url)`
- `Code`: `` `code` ``

### Headers

```markdown
# Header 1
## Header 2
### Header 3
```

### Lists

```markdown
- Bullet point
- Another point
  - Nested point

1. Numbered list
2. Second item
```

### Quotes

> "The first draft of anything is shit." — Ernest Hemingway

```markdown
> Quote text
```

### Images

If you want to include images in your content:

1. Add images to `assets/images/`
2. Reference them in your posts:

```markdown
![Alt text]({{ "/assets/images/your-image.jpg" | relative_url }})
```

## Tips for Success

1. **Write regularly**: Even short posts help build momentum
2. **Don't overthink**: You can always edit later
3. **Use excerpts**: Help readers decide what to read
4. **Tag consistently**: Makes content easier to find
5. **Keep images small**: Under 1MB for faster loading

## Next Steps

1. Delete this welcome post when you're ready
2. Create your first thought or story
3. Customize the About page
4. Start writing!

Remember: the best writing happens when you just start. Don't wait for perfection!

---

*Happy writing! If you have questions, check the [GitHub Pages documentation](https://docs.github.com/en/pages) or the [Jekyll docs](https://jekyllrb.com/docs/).* 