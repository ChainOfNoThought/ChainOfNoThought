---
layout: page
title: "Second Dawn"
story_id: "Second Dawn"
story_title: "Second Dawn"
story_description: "What do you do with the knowledge that the world will end in twenty years? Follow the journey of Ortus for his answer to this conundrum."
chapter: "info"
date: 2025-05-26 00:00:00
permalink: /stories/second-dawn/
---

What do you do with the knowledge that the world will end in twenty years?

Polaris Umbra, one the last survivors of humanity, reincarnates back into his moment of birth as Ortus, a child of booksellers. In a world facing the changes of rapid industrialization, revolutions in magic, and socioeconomic upheaval, Ortus must prepare for the end of the world against those who would rather see it burn.


### Story Details
- **Genre**: Reincarnation Fantasy
- **Themes**: burden of knowledge, family bonds, industrial revolution
- **Status**: In progress
- **Planned Chapters**: TBD

### Content Notes
Contains themes of violence, loss, and the psychological trauma. However, the story is designed mainly to be lighthearted - an entry in the 'reincarnation' genre with emotional and intellectual depth.
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