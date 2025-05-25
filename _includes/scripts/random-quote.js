/**
 * Random Quote Display Functionality
 * Selects and displays a random quote from the quotes data
 * Runs on page load and can be called for refresh
 */

(function() {
  'use strict';
  
  // Quote data - this will be populated by Jekyll
  const quotes = {{ site.data.quotes.quotes | jsonify }};
  
  /**
   * Selects a random quote from the quotes array
   * @returns {Object} Random quote object with text and author
   */
  function getRandomQuote() {
    if (!quotes || quotes.length === 0) {
      return {
        text: "There is no greater agony than bearing an untold story inside you.",
        author: "Maya Angelou"
      };
    }
    
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }
  
  /**
   * Updates the quote display in the footer
   * @param {Object} quote - Quote object with text and author properties
   */
  function displayQuote(quote) {
    const quoteElement = document.getElementById('footer-quote');
    if (quoteElement && quote) {
      quoteElement.innerHTML = `
        <blockquote class="footer-quote">
          <p class="quote-text">"${quote.text}"</p>
          <cite class="quote-author">— ${quote.author}</cite>
        </blockquote>
      `;
    }
  }
  
  /**
   * Initializes the random quote functionality
   * Called when the DOM is ready
   */
  function initRandomQuote() {
    const randomQuote = getRandomQuote();
    displayQuote(randomQuote);
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRandomQuote);
  } else {
    initRandomQuote();
  }
  
  // Expose function globally for potential manual refresh
  window.refreshQuote = function() {
    const randomQuote = getRandomQuote();
    displayQuote(randomQuote);
  };
  
})(); 