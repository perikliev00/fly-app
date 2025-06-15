/**
 * Simple Mobile Navigation Fix
 * This script ensures the mobile dropdown menus work properly in all scenarios
 */

(function() {
    // Run immediately to ensure it works on direct mobile load
    setupMobileNav();
    
    // Also run when the DOM is fully loaded
    window.addEventListener('DOMContentLoaded', setupMobileNav);
    
    // Track changes between mobile and desktop modes
    let isMobileMode = window.innerWidth <= 1000;
    
    // Set up resize handler
    window.addEventListener('resize', function() {
        const wasMobile = isMobileMode;
        isMobileMode = window.innerWidth <= 1000;
        
        // If transitioning between modes, re-setup
        if (wasMobile !== isMobileMode) {
            setupMobileNav();
        }
    });
    
    // Core function to set up navigation
    function setupMobileNav() {
        // Clean up any existing click handlers
        cleanupExistingHandlers();
        
        // Mobile mode
        if (window.innerWidth <= 1000) {
            setupMobileClickHandlers();
        }
    }
    
    // Remove existing event listeners by cloning elements
    function cleanupExistingHandlers() {
        const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
        
        dropdownTriggers.forEach(function(trigger) {
            const parent = trigger.parentNode;
            if (parent) {
                const clone = trigger.cloneNode(true);
                parent.replaceChild(clone, trigger);
            }
        });
    }
    
    // Set up mobile click handlers
    function setupMobileClickHandlers() {
        const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
        
        dropdownTriggers.forEach(function(trigger) {
            // Add click handler for mobile
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Find parent and dropdown
                const parentLi = this.closest('.has-dropdown');
                if (!parentLi) return;
                
                const dropdownMenu = parentLi.querySelector('.dropdown-menu');
                if (!dropdownMenu) return;
                
                // Toggle dropdown visibility
                const isVisible = dropdownMenu.classList.toggle('show');
                
                // Toggle active classes
                this.classList.toggle('active');
                parentLi.classList.toggle('active');
                
                // Rotate icon based on state
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = isVisible ? 'rotate(180deg)' : '';
                }
                
                // Close other open dropdowns
                dropdownTriggers.forEach(function(otherTrigger) {
                    if (otherTrigger !== trigger) {
                        const otherLi = otherTrigger.closest('.has-dropdown');
                        if (!otherLi || otherLi === parentLi) return;
                        
                        const otherMenu = otherLi.querySelector('.dropdown-menu');
                        if (!otherMenu) return;
                        
                        if (otherMenu.classList.contains('show')) {
                            otherMenu.classList.remove('show');
                            otherTrigger.classList.remove('active');
                            otherLi.classList.remove('active');
                            
                            const otherIcon = otherTrigger.querySelector('i');
                            if (otherIcon) {
                                otherIcon.style.transform = '';
                            }
                        }
                    }
                });
            });
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            if (e.target.closest('.dropdown-menu') || e.target.closest('.dropdown-trigger')) {
                return;
            }
            
            document.querySelectorAll('.dropdown-menu.show').forEach(function(menu) {
                menu.classList.remove('show');
                
                const parentLi = menu.closest('.has-dropdown');
                if (parentLi) {
                    parentLi.classList.remove('active');
                    
                    const trigger = parentLi.querySelector('.dropdown-trigger');
                    if (trigger) {
                        trigger.classList.remove('active');
                        
                        const icon = trigger.querySelector('i');
                        if (icon) {
                            icon.style.transform = '';
                        }
                    }
                }
            });
        });
    }
})();
