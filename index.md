---
# This is the front matter - Jekyll uses this to process the page
layout: home
title: Home
---

# and now, we drift

on the winds, the time, the faith, and the stars.

## Recent Thoughts

{% assign recent_thoughts = site.thoughts | sort: 'date' | reverse | limit: 3 %}
{% for thought in recent_thoughts %}
<article class="home-post-preview">
  <h3><a href="{{ thought.url | relative_url }}">{{ thought.title }}</a></h3>
  <time datetime="{{ thought.date | date_to_xmlschema }}">{{ thought.date | date: "%B %-d, %Y" }}</time>
  {% if thought.excerpt %}
    <p>{{ thought.excerpt }}</p>
  {% endif %}
</article>
{% endfor %}

[View all thoughts →]({{ "/thoughts/" | relative_url }})

## Recent Stories

{% assign all_stories = site.stories | sort: 'date' | reverse %}
{% assign story_groups = all_stories | group_by: 'story_id' %}

<div class="home-stories">
{% for story_group in story_groups limit: 2 %}
  {% if story_group.name and story_group.name != "" %}
    {% assign story_info = story_group.items | where: 'chapter', 'info' | first %}
    {% assign chapters = story_group.items | where_exp: 'item', 'item.chapter != "info"' | sort: 'chapter_number' | reverse | limit: 2 %}
    
    {% if chapters.size > 0 %}
    <div class="story-preview">
      <h3>{{ story_info.story_title | default: story_group.name }}</h3>
      {% if story_info.story_description %}
        <p class="story-desc">{{ story_info.story_description }}</p>
      {% endif %}
      <ul class="recent-chapters">
        {% for chapter in chapters %}
          <li>
            <a href="{{ chapter.url | relative_url }}">Chapter {{ chapter.chapter_number }}: {{ chapter.title }}</a>
          </li>
        {% endfor %}
      </ul>
    </div>
    {% endif %}
  {% endif %}
{% endfor %}
</div>

[View all stories →]({{ "/stories/" | relative_url }})

---

<p class="site-description">
A collection of thoughts, stories, and wanderings. Where essays drift into fiction, and memories become myths.
</p>