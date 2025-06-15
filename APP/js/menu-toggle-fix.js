// Menu Toggle Fix
document.addEventListener('DOMContentLoaded', function() {
    // This script is focused on ensuring the menu toggle button works
    // consistently, especially when resizing the screen without refreshing
    
    function initializeMenuToggle() {
        // Get fresh references to the toggle button and menu
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (menuToggle && navMenu) {
            // First, remove any existing click handlers to prevent duplication
            const newMenuToggle = menuToggle.cloneNode(true);
            menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
            
            // Add a new click handler with proper event stopping
            newMenuToggle.addEventListener('click', function(event) {
                // Prevent default and stop propagation to avoid conflicts
                event.preventDefault();
                event.stopPropagation();
                
                // Toggle the menu visibility
                const isExpanded = navMenu.classList.toggle('show');
                newMenuToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
                
                // Log for debugging
                console.log('Menu toggle clicked, menu is now:', isExpanded ? 'shown' : 'hidden');
            });
            
            // Add visual feedback for touch devices
            newMenuToggle.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            }, { passive: true });
            
            newMenuToggle.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 300);
            }, { passive: true });
        }
    }
    
    // Initialize the menu toggle on page load
    initializeMenuToggle();
    
    // Re-initialize on resize to ensure it works after window resizing
    window.addEventListener('resize', function() {
        initializeMenuToggle();
    });
});
