---
layout: page
title: Stories
permalink: /stories/
---

A collection of creative writing, stories, and fictional works.

<div class="stories-list">
{% comment %}
  Group stories by story_id to create story collections
  Stories should have 'story_id' in their front matter to group chapters
{% endcomment %}

{% assign all_stories = site.stories | sort: 'date' | reverse %}
{% assign story_groups = all_stories | group_by: 'story_id' %}

{% for story_group in story_groups %}
  {% if story_group.name and story_group.name != "" %}
    <div class="story-collection">
      {% comment %} Find the story info file for this story_id {% endcomment %}
      {% assign story_info = story_group.items | where: 'chapter', 'info' | first %}
      {% assign chapters = story_group.items | where_exp: 'item', 'item.chapter != "info"' | sort: 'chapter_number' %}
      
      <h2 class="story-title">
        {% if story_info %}
          {{ story_info.story_title | default: story_group.name }}
        {% else %}
          {{ story_group.name }}
        {% endif %}
      </h2>
      
      {% if story_info and story_info.story_description %}
        <p class="story-description">{{ story_info.story_description }}</p>
      {% endif %}
      
      <div class="chapters-list">
        <h3>Chapters:</h3>
        <ul>
          {% for chapter in chapters %}
            <li>
              <a href="{{ chapter.url | relative_url }}">
                Chapter {{ chapter.chapter_number }}: {{ chapter.title | escape }}
              </a>
              <span class="chapter-date">({{ chapter.date | date: "%B %-d, %Y" }})</span>
            </li>
          {% endfor %}
        </ul>
        
        {% if chapters.size > 3 %}
          <p class="recent-chapters">
            <strong>Most Recent:</strong>
            {% assign recent_chapters = chapters | reverse | limit: 3 | reverse %}
            {% for chapter in recent_chapters %}
              <a href="{{ chapter.url | relative_url }}">Ch.{{ chapter.chapter_number }}</a>
              {%- unless forloop.last -%}, {% endunless -%}
            {% endfor %}
          </p>
        {% endif %}
      </div>
    </div>
  {% else %}
    {% comment %} Standalone stories without story_id {% endcomment %}
    {% for story in story_group.items %}
      <article class="standalone-story">
        <h2>
          <a href="{{ story.url | relative_url }}">
            {{ story.title | escape }}
          </a>
        </h2>
        <p class="post-meta">
          <time datetime="{{ story.date | date_to_xmlschema }}">
            {{ story.date | date: "%B %-d, %Y" }}
          </time>
          {% if story.tags %}
            • 
            {% for tag in story.tags %}
              <span class="tag">{{ tag }}</span>
              {%- unless forloop.last -%}, {% endunless -%}
            {% endfor %}
          {% endif %}
        </p>
        {% if story.excerpt %}
          <div class="story-excerpt">
            {{ story.excerpt }}
          </div>
        {% endif %}
      </article>
    {% endfor %}
  {% endif %}
{% endfor %}
</div>

{% if all_stories.size == 0 %}
  <p class="no-content">No stories yet. Check back soon!</p>
{% endif %} 