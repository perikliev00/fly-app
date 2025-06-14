// Enhanced touch and small screen interactions
document.addEventListener('DOMContentLoaded', function() {
    // Improved touch handling for small screens
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Add a class to the body for touch-specific styling
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
    }
    
    // Add hover effects for destination cards on touch devices
    const destinationCards = document.querySelectorAll('.destination-card');
    if (destinationCards.length > 0) {
        destinationCards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.classList.add('touch-hover');
            }, { passive: true });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-hover');
                }, 300);
            }, { passive: true });
        });
    }
    
    // Enhanced dropdown handling for very small screens
    function enhanceSmallScreenInteractions() {
        const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
        
        // Create larger tap targets on very small screens
        if (window.innerWidth <= 375) {
            dropdownTriggers.forEach(trigger => {
                trigger.classList.add('enhanced-tap-target');
                
                // Add prominent visual feedback
                trigger.addEventListener('touchstart', function() {
                    this.classList.add('touch-active');
                }, { passive: true });
                
                trigger.addEventListener('touchend', function() {
                    setTimeout(() => {
                        this.classList.remove('touch-active');
                    }, 300); // Leave the visual feedback a bit longer
                }, { passive: true });
            });
            
            // Make buttons easier to tap
            document.querySelectorAll('button, .app-button, .search-btn, .cta-button').forEach(btn => {
                btn.classList.add('enhanced-tap-target');
            });
        } else {
            // Remove enhancements if screen size increases
            document.querySelectorAll('.enhanced-tap-target').forEach(el => {
                el.classList.remove('enhanced-tap-target');
            });
        }
        
        // Optimize dropdown positioning for tiny screens
        if (window.innerWidth <= 320) {
            // Make sure dropdowns don't overflow the screen
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.add('compact-dropdown');
            });
        } else {
            document.querySelectorAll('.compact-dropdown').forEach(menu => {
                menu.classList.remove('compact-dropdown');
            });
        }
    }
    
    // Automatically close dropdown menus when another area is tapped on very small screens
    if (isTouchDevice && window.innerWidth <= 375) {
        document.addEventListener('touchstart', function(e) {
            const dropdownMenus = document.querySelectorAll('.dropdown-menu.show');
            dropdownMenus.forEach(menu => {
                const parentLi = menu.closest('li');
                if (!parentLi.contains(e.target)) {
                    menu.classList.remove('show');
                    
                    // Reset the icon rotation
                    const icon = parentLi.querySelector('.dropdown-trigger i');
                    if (icon) {
                        icon.style.transform = '';
                    }
                }
            });
        }, { passive: true });
    }
    
    // Initial setup and window resize handler
    enhanceSmallScreenInteractions();
    window.addEventListener('resize', enhanceSmallScreenInteractions);
    
    // Improve scrolling behavior when virtual keyboard appears on mobile
    const inputFields = document.querySelectorAll('input, textarea');
    inputFields.forEach(field => {
        field.addEventListener('focus', function() {
            if (window.innerWidth <= 375) {
                // Small timeout to let the keyboard appear
                setTimeout(() => {
                    // Scroll the element into view
                    this.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        });
    });
});
