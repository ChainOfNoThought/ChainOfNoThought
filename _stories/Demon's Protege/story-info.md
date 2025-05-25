---
layout: page
title: "Demon's Protege"
story_id: "Demon's Protege"
story_title: "Demon's Protege"
story_description: "You have a duty to define me as evil, for my very existence is an afront to your definition of good."
chapter: "info"
date: 2025-05-26 00:00:00
permalink: /stories/demons-protege/
---

What is evil? Such is the question posed by the Demon of the Red Blade as he reawakens from the centuries of slumber. But most do not know of his return - instead, they are concerned of crisis of their own times. Lange Whitten is one such individual, chosen to be a Hero, to carry on a story of triumph and faith into the future. Chosen by the Eternal Garden. Chosen by the Hallow. Chosen by the Demon. Willing or not, he must provide an answer to the question which will shape how the world will end.

### Story Details
- **Genre**: Dark Fantasy
- **Themes**: power, nature of good and evil, faith
- **Status**: In progress
- **Planned Chapters**: TBD

### Content Notes
Contains graphic depictions of violence and engages with themes of sacrilage and amorality.

---

## Chapters

{% comment %} Get all chapters for this story, sorted by chapter number {% endcomment %}
{% assign story_chapters = site.stories | where: 'story_id', page.story_id | where_exp: 'item', 'item.chapter != "info"' | sort: 'chapter_number' %}

{% if story_chapters.size > 0 %}
<div class="story-chapters-list">
  {% for chapter in story_chapters %}
  <div class="chapter-entry">
    <h3><a href="{{ chapter.url | relative_url }}">Chapter {{ chapter.chapter_number }}: {{ chapter.title | escape }}</a></h3>
    <p class="chapter-meta">
      <time datetime="{{ chapter.date | date_to_xmlschema }}">{{ chapter.date | date: "%B %-d, %Y" }}</time>
      {% if chapter.tags.size > 0 %}
        • Tagged: 
        {% for tag in chapter.tags %}
          <span class="tag">{{ tag }}</span>{% unless forloop.last %}, {% endunless %}
        {% endfor %}
      {% endif %}
    </p>
    {% if chapter.excerpt and chapter.excerpt != "" %}
      <p class="chapter-excerpt">{{ chapter.excerpt }}</p>
    {% endif %}
  </div>
  {% endfor %}
</div>
{% else %}
<p class="no-chapters">No chapters available yet. Check back soon!</p>
{% endif %} 