/**
 * Settings Management for ChainOfNoThought
 * Handles theme switching with URL persistence
 */

(function() {
  'use strict';

  // Default settings
  const defaultSettings = {
    theme: 'dark'
  };

  let currentSettings = { ...defaultSettings };

  /**
   * Get settings from sessionStorage
   */
  function getSettingsFromStorage() {
    try {
      const stored = sessionStorage.getItem('chainOfNoThoughtSettings');
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          theme: parsed.theme || defaultSettings.theme
        };
      }
    } catch (e) {
      console.warn('Failed to load settings from sessionStorage:', e);
    }
    return { ...defaultSettings };
  }

  /**
   * Save settings to sessionStorage
   */
  function saveSettingsToStorage(settings) {
    try {
      sessionStorage.setItem('chainOfNoThoughtSettings', JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save settings to sessionStorage:', e);
    }
  }

  /**
   * Get settings from URL parameters
   */
  function getSettingsFromURL() {
    const params = new URLSearchParams(window.location.search);
    const settings = { ...defaultSettings };
    
    if (params.has('theme')) {
      settings.theme = params.get('theme');
    }
    
    return settings;
  }

  /**
   * Get settings with priority: sessionStorage → URL → defaults
   */
  function getCurrentSettings() {
    // First check sessionStorage for normal browsing persistence
    const storedSettings = getSettingsFromStorage();
    
    // Only use URL parameters if they're different from stored settings (for sharing/bookmarking)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('theme')) {
      const urlSettings = getSettingsFromURL();
      // If URL theme is different from stored, use URL (someone shared a link)
      if (urlSettings.theme !== storedSettings.theme) {
        return urlSettings;
      }
    }
    
    // Use sessionStorage settings for normal browsing
    return storedSettings;
  }

  /**
   * Apply settings to the page
   */
  function applySettings(settings, saveToStorage = true) {
    // Apply theme
    document.documentElement.setAttribute('data-theme', settings.theme);
    
    // Save to sessionStorage unless explicitly disabled
    if (saveToStorage) {
      saveSettingsToStorage(settings);
    }
  }

  /**
   * Clean theme parameters from internal links (let sessionStorage handle persistence)
   */
  function cleanInternalLinks() {
    // Remove theme parameters from internal links - let sessionStorage handle persistence
    document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]').forEach(link => {
      try {
        const url = new URL(link.href);
        url.searchParams.delete('theme');
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
    cleanInternalLinks();
    cleanCurrentURL();
  }

  /**
   * Reset all settings to defaults
   */
  function resetSettings() {
    currentSettings = { ...defaultSettings };
    applySettings(currentSettings);
    cleanInternalLinks();
    cleanCurrentURL();
    
    // Update form controls if they exist
    updateFormControls();
  }

  /**
   * Update settings from settings page controls
   */
  function updateSettingsFromForm() {
    // Get theme from radio buttons
    const themeRadios = document.querySelectorAll('input[name="theme"]');
    for (const radio of themeRadios) {
      if (radio.checked) {
        currentSettings.theme = radio.value;
        break;
      }
    }
    
    // Apply and persist settings
    applySettings(currentSettings);
    cleanInternalLinks();
    cleanCurrentURL();
    updateFormControls();
  }

  /**
   * Clean theme parameters from current URL (let sessionStorage handle persistence)
   */
  function cleanCurrentURL() {
    const url = new URL(window.location);
    url.searchParams.delete('theme');
    const newURL = url.pathname + (url.search || '');
    window.history.replaceState({}, '', newURL);
  }

  /**
   * Update form controls to match current settings
   */
  function updateFormControls() {
    // Theme radio buttons
    const themeRadios = document.querySelectorAll('input[name="theme"]');
    themeRadios.forEach(radio => {
      radio.checked = radio.value === currentSettings.theme;
    });
    
    // Legacy theme toggle (if it exists)
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.checked = currentSettings.theme === 'light';
    }
  }

  /**
   * Initialize settings system
   */
  function init() {
    // Get settings with priority: sessionStorage → URL → defaults
    currentSettings = getCurrentSettings();
    
    // Apply settings and ensure they're saved to sessionStorage
    applySettings(currentSettings, true);
    cleanInternalLinks();
    cleanCurrentURL();
    
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
      
      if (e.target.id === 'apply-settings-btn') {
        e.preventDefault();
        updateSettingsFromForm();
      }
    });
    
    document.addEventListener('change', function(e) {
      // Settings page theme radio buttons
      if (e.target.name === 'theme') {
        updateSettingsFromForm();
      }
      
      // Legacy theme toggle
      if (e.target.id === 'theme-toggle') {
        toggleTheme();
      }
    });
    
    // Update form controls to match current settings
    updateFormControls();
    
    // Make settings available globally
    window.ChainOfNoThoughtSettings = {
      current: currentSettings,
      toggle: toggleTheme,
      reset: resetSettings,
      apply: applySettings,
      updateFromForm: updateSettingsFromForm
    };
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})(); 