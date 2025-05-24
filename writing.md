---
layout: page
title: Writing
permalink: /writing/
---

# All Writing

Here you'll find all my writing pieces, ordered by date. Browse through essays, stories, and thoughts.

## Essays & Blog Posts

<div class="post-list">
  {% for post in site.posts %}
    <article class="post-item">
      <h3>
        <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
      </h3>
      <p class="post-meta">
        <time datetime="{{ post.date | date_to_xmlschema }}">
          {{ post.date | date: "%B %-d, %Y" }}
        </time>
        {% if post.categories.size > 0 %}
          • 
          {% for category in post.categories %}
            <span class="category">{{ category }}</span>{% unless forloop.last %}, {% endunless %}
          {% endfor %}
        {% endif %}
      </p>
      {% if post.excerpt %}
        <div class="post-excerpt">
          {{ post.excerpt | strip_html | truncatewords: 50 }}
        </div>
      {% endif %}
    </article>
    {% unless forloop.last %}<hr class="post-separator">{% endunless %}
  {% endfor %}
</div>

{% if site.posts.size == 0 %}
  <p class="no-posts">No posts yet. Start writing by creating markdown files in the <code>_posts</code> folder!</p>
{% endif %}

## Creative Writing

<div class="creative-list">
  {% for story in site.creative_writing %}
    <article class="post-item">
      <h3>
        <a href="{{ story.url | relative_url }}">{{ story.title | escape }}</a>
      </h3>
      {% if story.excerpt %}
        <div class="post-excerpt">
          {{ story.excerpt | strip_html | truncatewords: 50 }}
        </div>
      {% endif %}
    </article>
    {% unless forloop.last %}<hr class="post-separator">{% endunless %}
  {% endfor %}
</div>

{% if site.creative_writing.size == 0 %}
  <p class="no-posts">No creative writing yet. Add stories to the <code>_creative_writing</code> folder!</p>
{% endif %}

<style>
  /* Simple styling for the writing list */
  .post-item {
    margin-bottom: 2rem;
  }
  
  .post-item h3 {
    margin-bottom: 0.5rem;
  }
  
  .post-meta {
    color: #828282;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  
  .post-excerpt {
    margin-top: 0.5rem;
    line-height: 1.6;
  }
  
  .post-separator {
    border: none;
    border-top: 1px solid #e8e8e8;
    margin: 2rem 0;
  }
  
  .no-posts {
    font-style: italic;
    color: #828282;
    padding: 2rem;
    text-align: center;
    background-color: #f8f8f8;
    border-radius: 4px;
  }
  
  .category {
    font-size: 0.85rem;
    background-color: #f0f0f0;
    padding: 0.2rem 0.5rem;
    border-radius: 3px;
  }
</style> 