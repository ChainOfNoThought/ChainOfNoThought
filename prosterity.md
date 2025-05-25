---
layout: page
title: Prosterity
permalink: /prosterity/
---

An archive of writings, sorted by date.

<!-- Search functionality - simple JavaScript filter -->
<div class="search-container">
  <input type="text" 
         id="archive-search" 
         class="search-input" 
         placeholder="Search writings by title, tags, or type..."
         aria-label="Search archive">
</div>

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
              <li class="archive-item" 
                  data-title="{{ post.title | downcase | escape }}"
                  data-tags="{% for tag in post.tags %}{{ tag | downcase }} {% endfor %}"
                  data-type="{{ post.collection }}">
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

<div class="no-results" style="display: none;">
  <p>No writings found matching "<span class="search-term"></span>"</p>
  <p><a href="#" class="clear-search">Clear search</a></p>
</div>

{% if all_posts.size == 0 %}
  <p class="no-content">No writings archived yet.</p>
{% endif %}

<div class="archive-stats">
  <p>
    <strong>Total writings:</strong> <span class="total-count">{{ all_posts.size }}</span><br>
    <strong>Showing:</strong> <span class="showing-count">{{ all_posts.size }}</span><br>
    <strong>Thoughts:</strong> {{ site.thoughts.size }}<br>
    <strong>Stories:</strong> {{ site.stories.size }}
  </p>
</div>

<!-- Simple search JavaScript -->
<script>
(function() {
  // Get elements
  var searchInput = document.getElementById('archive-search');
  var archiveItems = document.querySelectorAll('.archive-item');
  var archiveYears = document.querySelectorAll('.archive-year');
  var archiveMonths = document.querySelectorAll('.archive-month');
  var noResults = document.querySelector('.no-results');
  var searchTerm = document.querySelector('.search-term');
  var showingCount = document.querySelector('.showing-count');
  var clearLink = document.querySelector('.clear-search');
  
  // Search function
  function filterArchive() {
    var query = searchInput.value.toLowerCase();
    var visibleCount = 0;
    
    // If no search query, show everything
    if (query === '') {
      archiveItems.forEach(function(item) {
        item.style.display = '';
      });
      archiveYears.forEach(function(year) {
        year.style.display = '';
      });
      archiveMonths.forEach(function(month) {
        month.style.display = '';
      });
      noResults.style.display = 'none';
      showingCount.textContent = archiveItems.length;
      return;
    }
    
    // Filter items
    archiveItems.forEach(function(item) {
      var title = item.getAttribute('data-title') || '';
      var tags = item.getAttribute('data-tags') || '';
      var type = item.getAttribute('data-type') || '';
      
      // Check if query matches title, tags, or type
      if (title.indexOf(query) > -1 || 
          tags.indexOf(query) > -1 || 
          type.indexOf(query) > -1) {
        item.style.display = '';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });
    
    // Hide empty months and years
    archiveMonths.forEach(function(month) {
      var hasVisibleItems = month.querySelector('.archive-item[style=""]') !== null;
      month.style.display = hasVisibleItems ? '' : 'none';
    });
    
    archiveYears.forEach(function(year) {
      var hasVisibleMonths = year.querySelector('.archive-month[style=""]') !== null;
      year.style.display = hasVisibleMonths ? '' : 'none';
    });
    
    // Show/hide no results message
    if (visibleCount === 0) {
      noResults.style.display = 'block';
      searchTerm.textContent = query;
    } else {
      noResults.style.display = 'none';
    }
    
    // Update count
    showingCount.textContent = visibleCount;
  }
  
  // Event listeners
  searchInput.addEventListener('input', filterArchive);
  searchInput.addEventListener('keyup', filterArchive);
  
  // Clear search
  clearLink.addEventListener('click', function(e) {
    e.preventDefault();
    searchInput.value = '';
    filterArchive();
    searchInput.focus();
  });
  
  // Focus search input when page loads if there's a hash
  if (window.location.hash === '#search') {
    searchInput.focus();
  }
})();
</script> 