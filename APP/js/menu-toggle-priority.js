// Menu Toggle Priority Handler
// This script ensures that the menu toggle button always works,
// by adding a final event listener after all other scripts have loaded
window.addEventListener('load', function() {
    // Wait a short time to ensure all other scripts have initialized
    setTimeout(function() {
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (menuToggle && navMenu) {
            // Get a reference to the actual button element
            // (in case it's been replaced by other scripts)
            const currentMenuToggle = document.getElementById('menu-toggle');
            
            // Remove any existing click handlers by cloning and replacing
            const newMenuToggle = currentMenuToggle.cloneNode(true);
            currentMenuToggle.parentNode.replaceChild(newMenuToggle, currentMenuToggle);
            
            // Add our priority click handler
            newMenuToggle.addEventListener('click', function(event) {
                // Stop all other event handling
                event.preventDefault();
                event.stopPropagation();
                
                // Toggle the menu visibility
                const isExpanded = navMenu.classList.toggle('show');
                newMenuToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
                
                console.log('Priority menu toggle handler activated, menu is now:', isExpanded ? 'shown' : 'hidden');
            });
              // Force proper display style for menu toggle to ensure it's visible on mobile
            if (window.innerWidth <= 1000) {
                newMenuToggle.style.display = 'block';
            }
            
            console.log('Menu toggle priority handler initialized');
        }
    }, 100); // Short delay to ensure other scripts have run
});
