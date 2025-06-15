// Navigation Fix for 1000px Breakpoint
document.addEventListener('DOMContentLoaded', function() {
    // Define essential elements outside any functions for global scope
    let menuToggle = document.getElementById('menu-toggle');
    let navMenu = document.getElementById('nav-menu');
    const breakpoint = 1000; // Single source of truth for the breakpoint
    
    // Function to initialize/refresh element references
    function refreshElementReferences() {
        menuToggle = document.getElementById('menu-toggle');
        navMenu = document.getElementById('nav-menu');
    }
    
    // Function to toggle the menu with proper error handling
    function toggleMobileMenu(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        refreshElementReferences();
        
        if (!navMenu || !menuToggle) {
            console.error('Navigation elements not found');
            return;
        }
        
        const isExpanded = navMenu.classList.toggle('show');
        menuToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        console.log('Menu toggle clicked, menu is now:', isExpanded ? 'shown' : 'hidden');
    }
    
    // Function to set up the menu toggle button
    function setupMenuToggle() {
        refreshElementReferences();
        
        if (menuToggle && navMenu) {
            // Remove any existing click handlers by cloning and replacing
            const newMenuToggle = menuToggle.cloneNode(true);
            menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
            menuToggle = newMenuToggle;
            
            // Add click handler
            menuToggle.addEventListener('click', toggleMobileMenu);
            
            // Add touch feedback
            menuToggle.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            }, { passive: true });
            
            menuToggle.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 300);
            }, { passive: true });
            
            // Set proper visibility
            updateToggleButtonVisibility();
        }
    }
    
    // Function to update toggle button visibility based on screen width
    function updateToggleButtonVisibility() {
        if (!menuToggle) return;
        
        // Make sure display property is correctly set based on window width
        if (window.innerWidth <= breakpoint) {
            menuToggle.style.display = 'block';
        } else {
            menuToggle.style.display = 'none';
            
            // If transitioning to desktop, hide mobile menu
            if (navMenu && navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
            }
        }
    }
    
    // Function to close the menu when clicking outside
    function setupClickOutsideHandler() {
        document.addEventListener('click', function(event) {
            refreshElementReferences();
            
            if (!menuToggle || !navMenu) return;
            
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Initialize everything
    setupMenuToggle();
    setupClickOutsideHandler();
    
    // Update on resize with debouncing for performance
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            updateToggleButtonVisibility();
        }, 100);
    });
});
