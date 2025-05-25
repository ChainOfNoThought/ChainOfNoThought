---
layout: page
title: Thoughts
permalink: /thoughts/
---

<div class="thoughts-list">
{% assign sorted_thoughts = site.thoughts | sort: 'date' | reverse %}
{% for thought in sorted_thoughts %}
  <article class="thought-entry">
    <h2>
      <a class="thought-link" href="{{ thought.url | relative_url }}">
        {{ thought.title | escape }}
      </a>
    </h2>
    <p class="post-meta">
      <time datetime="{{ thought.date | date_to_xmlschema }}">
        {{ thought.date | date: "%B %-d, %Y" }}
      </time>
      {% if thought.tags %}
        • 
        {% for tag in thought.tags %}
          <span class="tag">{{ tag }}</span>
          {%- unless forloop.last -%}, {% endunless -%}
        {% endfor %}
      {% endif %}
    </p>
    {% if thought.excerpt %}
      <div class="thought-excerpt">
        {{ thought.excerpt }}
      </div>
    {% endif %}
  </article>
{% endfor %}
</div>

{% if sorted_thoughts.size == 0 %}
  <p class="no-content">No thoughts yet. Check back soon!</p>
{% endif %} 