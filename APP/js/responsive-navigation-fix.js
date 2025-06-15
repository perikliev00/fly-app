// Responsive Navigation Fix
document.addEventListener('DOMContentLoaded', function() {
    // Variables for navigation elements
    // We don't redefine menuToggle and navMenu to avoid conflicts with combined-scripts.js
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    let currentMode = window.innerWidth <= 1000 ? 'mobile' : 'desktop';
    
    // Function to set up desktop dropdown behavior (hover)
    function setupDesktopDropdowns() {
        // Remove any click events from mobile mode
        dropdownTriggers.forEach(trigger => {
            const newTrigger = trigger.cloneNode(true);
            trigger.parentNode.replaceChild(newTrigger, trigger);
            
            // For desktop, we'll use CSS hover instead of JS click events
            const parentLi = newTrigger.closest('li');
            if (parentLi) {
                parentLi.addEventListener('mouseenter', function() {
                    const dropdownMenu = this.querySelector('.dropdown-menu');
                    if (dropdownMenu) {
                        dropdownMenu.classList.add('show');
                    }
                });
                
                parentLi.addEventListener('mouseleave', function() {
                    const dropdownMenu = this.querySelector('.dropdown-menu');
                    if (dropdownMenu) {
                        dropdownMenu.classList.remove('show');
                    }
                });
            }
        });
        
        // Close all dropdown menus when moving to desktop mode
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
            menu.classList.remove('show');
        });
    }
    
    // Function to set up mobile dropdown behavior (click/touch)
    function setupMobileDropdowns() {
        // Get latest reference to dropdown triggers (in case they've been replaced)
        const currentDropdownTriggers = document.querySelectorAll('.dropdown-trigger');
        
        currentDropdownTriggers.forEach(trigger => {
            // Remove any existing events by cloning and replacing
            const newTrigger = trigger.cloneNode(true);
            trigger.parentNode.replaceChild(newTrigger, trigger);
            
            // Add click/touch event for mobile dropdowns
            newTrigger.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const parentLi = this.closest('li');
                const dropdownMenu = parentLi.querySelector('.dropdown-menu');
                const icon = this.querySelector('i');
                
                // Close other open dropdowns
                document.querySelectorAll('.has-dropdown').forEach(item => {
                    if (item !== parentLi) {
                        const otherMenu = item.querySelector('.dropdown-menu');
                        const otherIcon = item.querySelector('.dropdown-trigger i');
                        
                        if (otherMenu && otherMenu.classList.contains('show')) {
                            otherMenu.classList.remove('show');
                            if (otherIcon) {
                                otherIcon.style.transform = '';
                            }
                        }
                    }
                });
                
                // Toggle the current dropdown
                dropdownMenu.classList.toggle('show');
                
                // Rotate icon if dropdown is shown
                if (icon) {
                    icon.style.transform = dropdownMenu.classList.contains('show') ? 'rotate(180deg)' : '';
                }
            });
            
            // Add touch feedback
            newTrigger.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            }, { passive: true });
            
            newTrigger.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 300);
            }, { passive: true });
        });
    }
    
    // We're removing the menu toggle handler to avoid conflict with combined-scripts.js    
    // We're removing the click outside handler to avoid conflict with combined-scripts.js
      // Initialize appropriate dropdown behavior based on screen size
    function initializeNavigationMode() {
        const newMode = window.innerWidth <= 1000 ? 'mobile' : 'desktop';
        
        // Only change if the mode has changed
        if (newMode !== currentMode) {
            currentMode = newMode;
            
            if (currentMode === 'desktop') {
                setupDesktopDropdowns();
                
                // Close mobile menu if it's open
                const navMenu = document.getElementById('nav-menu');
                const menuToggle = document.getElementById('menu-toggle');
                if (navMenu && navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                    if (menuToggle) {
                        menuToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            } else {
                setupMobileDropdowns();
            }
        }
    }
    
    // Initial setup
    initializeNavigationMode();
    
    // Update on resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        // Debounce the resize event
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(initializeNavigationMode, 250);
    });
});
