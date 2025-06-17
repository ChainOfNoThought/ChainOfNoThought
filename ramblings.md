---
layout: page
title: Ramblings
permalink: /ramblings/
---

<div class="ramblings-list">
{% if site.ramblings %}
  {% assign sorted_ramblings = site.ramblings | sort: 'date' | reverse %}
{% else %}
  {% assign sorted_ramblings = "" | split: "" %}
{% endif %}
{% for blog in sorted_ramblings %}
  <article class="blog-entry">
    <h2>
      <a class="blog-link" href="{{ blog.url | relative_url }}">
        {{ blog.title | escape }}
      </a>
    </h2>
    <p class="post-meta">
      <time datetime="{{ blog.date | date_to_xmlschema }}">
        {{ blog.date | date: "%B %-d, %Y" }}
      </time>
      {% if blog.tags %}
        • 
        {% for tag in blog.tags %}
          <span class="tag">{{ tag }}</span>
          {%- unless forloop.last -%}, {% endunless -%}
        {% endfor %}
      {% endif %}
    </p>
    {% if blog.excerpt %}
      <div class="blog-excerpt">
        {{ blog.excerpt }}
      </div>
    {% endif %}
  </article>
{% endfor %}
</div>

{% if sorted_ramblings.size == 0 %}
  <p class="no-content">No blog posts yet. Check back soon!</p>
{% endif %} 