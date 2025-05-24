---
layout: page
title: Prosterity
permalink: /prosterity/
---

A complete archive of all writings, sorted by date.

{% comment %} 
  Note: Search functionality requires JavaScript which is not included in the basic Jekyll setup.
  This will be added in a future phase of implementation.
{% endcomment %}

<div class="archive-list">
  {% comment %} Combine all collections into one array {% endcomment %}
  {% assign all_posts = site.thoughts | concat: site.stories %}
  {% assign all_posts = all_posts | sort: 'date' | reverse %}
  
  {% comment %} Group posts by year {% endcomment %}
  {% assign posts_by_year = all_posts | group_by_exp: 'post', 'post.date | date: "%Y"' %}
  
  {% for year_group in posts_by_year %}
    <div class="archive-year">
      <h2>{{ year_group.name }}</h2>
      
      {% comment %} Group by month within each year {% endcomment %}
      {% assign posts_by_month = year_group.items | group_by_exp: 'post', 'post.date | date: "%B"' %}
      
      {% for month_group in posts_by_month %}
        <div class="archive-month">
          <h3>{{ month_group.name }}</h3>
          
          <ul class="archive-posts">
            {% for post in month_group.items %}
              <li>
                <span class="archive-date">
                  {{ post.date | date: "%d" }} -
                </span>
                <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
                <span class="archive-type">
                  {% if post.collection == 'thoughts' %}
                    [thought]
                  {% elsif post.collection == 'stories' %}
                    [story{% if post.chapter_number %}, ch.{{ post.chapter_number }}{% endif %}]
                  {% endif %}
                </span>
                {% if post.tags %}
                  <span class="archive-tags">
                    {% for tag in post.tags %}
                      #{{ tag }}
                      {%- unless forloop.last -%}, {% endunless -%}
                    {% endfor %}
                  </span>
                {% endif %}
              </li>
            {% endfor %}
          </ul>
        </div>
      {% endfor %}
    </div>
  {% endfor %}
</div>

{% if all_posts.size == 0 %}
  <p class="no-content">No writings archived yet.</p>
{% endif %}

<div class="archive-stats">
  <p>
    <strong>Total writings:</strong> {{ all_posts.size }}<br>
    <strong>Thoughts:</strong> {{ site.thoughts.size }}<br>
    <strong>Stories:</strong> {{ site.stories.size }}
  </p>
</div> 