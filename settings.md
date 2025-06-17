---
layout: default
title: Settings
---

# Site Settings

Customize your reading experience with the controls below. Your preferences will be saved during your browsing session and reset when you close your browser.

---

## Theme Settings

<div class="settings-section">
  <h3>Display Theme</h3>
  <p class="setting-description">Choose between dark mode (default) and light mode for optimal reading comfort.</p>
  
  <div class="theme-controls">
    <label class="theme-option">
      <input type="radio" name="theme" value="dark" id="theme-dark" checked>
      <span class="theme-preview theme-dark-preview">
        <span class="preview-text">Dark Mode</span>
      </span>
    </label>
    
    <label class="theme-option">
      <input type="radio" name="theme" value="light" id="theme-light">
      <span class="theme-preview theme-light-preview">
        <span class="preview-text">Light Mode</span>
      </span>
    </label>
  </div>
</div>



<style>
/* Settings Page Specific Styles */
.settings-section {
  margin-bottom: 3rem;
  padding: 2rem;
  background-color: var(--bg-container);
  border-radius: 8px;
  border: 1px solid var(--border-primary);
}

.settings-section h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--text-secondary);
  font-size: 1.3rem;
}

.setting-description {
  margin-bottom: 1.5rem;
  color: var(--text-muted);
  font-style: italic;
}

/* Theme Controls */
.theme-controls {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.theme-option {
  cursor: pointer;
  display: block;
}

.theme-option input[type="radio"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.theme-preview {
  display: block;
  padding: 1.5rem;
  border: 2px solid var(--border-primary);
  border-radius: 8px;
  text-align: center;
  transition: all 0.2s ease-in-out;
  min-width: 120px;
}

.theme-option input[type="radio"]:checked + .theme-preview {
  border-color: var(--link-color);
  box-shadow: 0 0 0 3px rgba(102, 179, 255, 0.1);
}

.theme-dark-preview {
  background-color: #1a1a1a;
  color: #e6e6e6;
}

.theme-light-preview {
  background-color: #ffffff;
  color: #333333;
}

.preview-text {
  font-weight: 500;
  font-size: 0.875rem;
}



/* Mobile Adjustments */
@media screen and (max-width: 600px) {
  .settings-section {
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .theme-controls {
    flex-direction: column;
    gap: 1rem;
  }
  
  .theme-preview {
    min-width: auto;
    padding: 1rem;
  }
}
</style> 