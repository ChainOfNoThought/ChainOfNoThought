document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation toggle
  const navTrigger = document.querySelector('.nav-trigger');
  const navLinks = document.querySelector('.nav-links');
  
  if (navTrigger && navLinks) {
    navTrigger.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      navTrigger.classList.toggle('active');
    });
  }
  
  // Dropdown menus
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(function(dropdown) {
    const trigger = dropdown.querySelector('.dropdown-trigger');
    const content = dropdown.querySelector('.dropdown-content');
    
    // If we have content, set up the event listeners
    if (trigger && content) {
      // On larger screens, use hover
      if (window.innerWidth > 768) {
        dropdown.addEventListener('mouseenter', function() {
          content.style.display = 'block';
        });
        
        dropdown.addEventListener('mouseleave', function() {
          content.style.display = 'none';
        });
      } 
      // On smaller screens, use click
      else {
        trigger.addEventListener('click', function(e) {
          e.preventDefault();
          content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
      }
    }
  });
  
  // Hide navigation on scroll down, show on scroll up
  let lastScrollTop = 0;
  const header = document.querySelector('.site-header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scroll down
        header.style.transform = 'translateY(-100%)';
      } else {
        // Scroll up
        header.style.transform = 'translateY(0)';
      }
      
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);
  }
}); 