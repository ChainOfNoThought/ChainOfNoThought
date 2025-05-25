/**
 * Settings Management for ChainOfNoThought
 * Handles theme switching and font size controls with URL persistence
 */

(function() {
  'use strict';

  // Default settings
  const defaultSettings = {
    theme: 'dark',
    fontSize: {
      base: 18,
      heading: 1.0,
      content: 1.0,
      meta: 1.0
    }
  };

  let currentSettings = { ...defaultSettings };

  /**
   * Get settings from URL parameters
   */
  function getSettingsFromURL() {
    const params = new URLSearchParams(window.location.search);
    const settings = { ...defaultSettings };
    
    if (params.has('theme')) {
      settings.theme = params.get('theme');
    }
    
    if (params.has('fontSize')) {
      settings.fontSize.base = parseInt(params.get('fontSize')) || defaultSettings.fontSize.base;
    }
    
    if (params.has('headingScale')) {
      settings.fontSize.heading = parseFloat(params.get('headingScale')) || defaultSettings.fontSize.heading;
    }
    
    if (params.has('contentScale')) {
      settings.fontSize.content = parseFloat(params.get('contentScale')) || defaultSettings.fontSize.content;
    }
    
    if (params.has('metaScale')) {
      settings.fontSize.meta = parseFloat(params.get('metaScale')) || defaultSettings.fontSize.meta;
    }
    
    return settings;
  }

  /**
   * Apply settings to the page
   */
  function applySettings(settings) {
    // Apply theme
    document.documentElement.setAttribute('data-theme', settings.theme);
    
    // Apply font sizes using CSS custom properties
    const root = document.documentElement;
    root.style.setProperty('--base-font-size', settings.fontSize.base + 'px');
    root.style.setProperty('--heading-scale', settings.fontSize.heading);
    root.style.setProperty('--content-scale', settings.fontSize.content);
    root.style.setProperty('--meta-scale', settings.fontSize.meta);
  }

  /**
   * Update all internal links with current settings
   */
  function updateAllLinks(settings) {
    const params = new URLSearchParams();
    
    if (settings.theme !== defaultSettings.theme) {
      params.set('theme', settings.theme);
    }
    
    if (settings.fontSize.base !== defaultSettings.fontSize.base) {
      params.set('fontSize', settings.fontSize.base);
    }
    
    if (settings.fontSize.heading !== defaultSettings.fontSize.heading) {
      params.set('headingScale', settings.fontSize.heading);
    }
    
    if (settings.fontSize.content !== defaultSettings.fontSize.content) {
      params.set('contentScale', settings.fontSize.content);
    }
    
    if (settings.fontSize.meta !== defaultSettings.fontSize.meta) {
      params.set('metaScale', settings.fontSize.meta);
    }
    
    const queryString = params.toString();
    
    // Update all internal links
    document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"], a[href^="#"]').forEach(link => {
      if (link.href.includes('#') && !link.href.includes('?')) {
        // Handle anchor links
        return;
      }
      
      try {
        const url = new URL(link.href);
        if (queryString) {
          url.search = queryString;
        } else {
          url.search = '';
        }
        link.href = url.toString();
      } catch (e) {
        // Skip invalid URLs
      }
    });
  }

  /**
   * Toggle theme between light and dark
   */
  function toggleTheme() {
    currentSettings.theme = currentSettings.theme === 'dark' ? 'light' : 'dark';
    applySettings(currentSettings);
    updateAllLinks(currentSettings);
    updateURL(currentSettings);
  }

  /**
   * Update font size setting
   */
  function updateFontSize(type, value) {
    if (type === 'base') {
      currentSettings.fontSize.base = parseInt(value);
    } else {
      currentSettings.fontSize[type] = parseFloat(value);
    }
    applySettings(currentSettings);
    updateAllLinks(currentSettings);
    updateURL(currentSettings);
  }

  /**
   * Reset all settings to defaults
   */
  function resetSettings() {
    currentSettings = { ...defaultSettings };
    applySettings(currentSettings);
    updateAllLinks(currentSettings);
    updateURL(currentSettings);
    
    // Update form controls if they exist
    updateFormControls();
  }

  /**
   * Update URL with current settings
   */
  function updateURL(settings) {
    const params = new URLSearchParams();
    
    if (settings.theme !== defaultSettings.theme) {
      params.set('theme', settings.theme);
    }
    
    if (settings.fontSize.base !== defaultSettings.fontSize.base) {
      params.set('fontSize', settings.fontSize.base);
    }
    
    if (settings.fontSize.heading !== defaultSettings.fontSize.heading) {
      params.set('headingScale', settings.fontSize.heading);
    }
    
    if (settings.fontSize.content !== defaultSettings.fontSize.content) {
      params.set('contentScale', settings.fontSize.content);
    }
    
    if (settings.fontSize.meta !== defaultSettings.fontSize.meta) {
      params.set('metaScale', settings.fontSize.meta);
    }
    
    const queryString = params.toString();
    const newURL = window.location.pathname + (queryString ? '?' + queryString : '');
    window.history.replaceState({}, '', newURL);
  }

  /**
   * Update form controls to match current settings
   */
  function updateFormControls() {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.checked = currentSettings.theme === 'light';
    }
    
    // Font size controls
    const fontSizeSlider = document.getElementById('font-size');
    if (fontSizeSlider) {
      fontSizeSlider.value = currentSettings.fontSize.base;
    }
    
    const headingScaleSlider = document.getElementById('heading-scale');
    if (headingScaleSlider) {
      headingScaleSlider.value = currentSettings.fontSize.heading;
    }
    
    const contentScaleSlider = document.getElementById('content-scale');
    if (contentScaleSlider) {
      contentScaleSlider.value = currentSettings.fontSize.content;
    }
    
    const metaScaleSlider = document.getElementById('meta-scale');
    if (metaScaleSlider) {
      metaScaleSlider.value = currentSettings.fontSize.meta;
    }
    
    // Update display values
    updateDisplayValues();
  }

  /**
   * Update display values for sliders
   */
  function updateDisplayValues() {
    const fontSizeValue = document.getElementById('font-size-value');
    if (fontSizeValue) {
      fontSizeValue.textContent = currentSettings.fontSize.base + 'px';
    }
    
    const headingScaleValue = document.getElementById('heading-scale-value');
    if (headingScaleValue) {
      headingScaleValue.textContent = Math.round(currentSettings.fontSize.heading * 100) + '%';
    }
    
    const contentScaleValue = document.getElementById('content-scale-value');
    if (contentScaleValue) {
      contentScaleValue.textContent = Math.round(currentSettings.fontSize.content * 100) + '%';
    }
    
    const metaScaleValue = document.getElementById('meta-scale-value');
    if (metaScaleValue) {
      metaScaleValue.textContent = Math.round(currentSettings.fontSize.meta * 100) + '%';
    }
  }

  /**
   * Initialize settings system
   */
  function init() {
    // Get settings from URL
    currentSettings = getSettingsFromURL();
    
    // Apply settings
    applySettings(currentSettings);
    updateAllLinks(currentSettings);
    
    // Set up event listeners
    document.addEventListener('click', function(e) {
      if (e.target.id === 'theme-toggle-btn') {
        e.preventDefault();
        toggleTheme();
      }
      
      if (e.target.id === 'reset-settings-btn') {
        e.preventDefault();
        resetSettings();
      }
    });
    
    document.addEventListener('input', function(e) {
      if (e.target.id === 'theme-toggle') {
        toggleTheme();
      }
      
      if (e.target.id === 'font-size') {
        updateFontSize('base', e.target.value);
        updateDisplayValues();
      }
      
      if (e.target.id === 'heading-scale') {
        updateFontSize('heading', e.target.value);
        updateDisplayValues();
      }
      
      if (e.target.id === 'content-scale') {
        updateFontSize('content', e.target.value);
        updateDisplayValues();
      }
      
      if (e.target.id === 'meta-scale') {
        updateFontSize('meta', e.target.value);
        updateDisplayValues();
      }
    });
    
    // Update form controls to match current settings
    updateFormControls();
    
    // Make settings available globally
    window.ChainOfNoThoughtSettings = {
      current: currentSettings,
      toggle: toggleTheme,
      updateFontSize: updateFontSize,
      reset: resetSettings,
      apply: applySettings
    };
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})(); 