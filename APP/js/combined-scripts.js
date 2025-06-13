// Combined scripts for SkyJet website
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
        });
        
        // Add touch events for mobile
        button.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, { passive: true });
        
        button.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        }, { passive: true });
    });

    // Date picker placeholder functionality
    const dateDisplays = document.querySelectorAll('.date-display');
    
    dateDisplays.forEach(display => {
        display.addEventListener('click', function() {
            alert('Date picker would open here in a real application');
        });
        
        // Add mobile touch ripple effect
        display.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, { passive: true });
        
        display.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        }, { passive: true });
    });

    // Passenger selection placeholder functionality
    const passengerDisplay = document.querySelector('.passenger-display');
    
    if (passengerDisplay) {
        passengerDisplay.addEventListener('click', function() {
            alert('Passenger selection would open here in a real application');
        });
    }

    // Search button functionality
    const searchButton = document.querySelector('.search-btn');
    
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const origin = document.getElementById('origin').value;
            const destination = document.getElementById('destination').value;
            
            if (!origin || !destination) {
                alert('Please enter both origin and destination');
                return;
            }
            
            alert(`Searching for flights from ${origin} to ${destination}`);
        });
    }

    // Create a placeholder logo if real logo is not available
    const logoPlaceholder = document.getElementById('logo-placeholder');
    if (logoPlaceholder && logoPlaceholder.tagName === 'IMG') {
        // We'll create a simple SVG logo as a placeholder
        logoPlaceholder.outerHTML = `<svg id="logo-placeholder" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" fill="#0066cc"/>
            <path d="M20 8L32 32H8L20 8Z" fill="white"/>
            <circle cx="20" cy="20" r="5" fill="#ff6600"/>
        </svg>`;
    }
    
    // Mobile menu toggle functionality
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = navMenu.classList.toggle('show');
            menuToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        });
        
        // Close the mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                
                // Also close any open dropdowns
                dropdownTriggers.forEach(trigger => {
                    trigger.classList.remove('active');
                    const dropdownMenu = trigger.nextElementSibling;
                    if (dropdownMenu && dropdownMenu.classList.contains('show')) {
                        dropdownMenu.classList.remove('show');
                    }
                });
            }
        });
    }
    
    // Mobile dropdown functionality (when screen width <= 768px)
    if (window.innerWidth <= 768) {
        dropdownTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                
                const dropdownMenu = this.nextElementSibling;
                
                // Close all other dropdowns
                dropdownTriggers.forEach(otherTrigger => {
                    if (otherTrigger !== trigger) {
                        const otherDropdown = otherTrigger.nextElementSibling;
                        if (otherDropdown && otherDropdown.classList.contains('show')) {
                            otherDropdown.classList.remove('show');
                        }
                    }
                });
                
                // Toggle this dropdown
                dropdownMenu.classList.toggle('show');
            });
        });
    }
    
    // Close mobile menu and dropdowns when window is resized to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (navMenu && navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
            }
            
            // Reset active states for dropdowns
            document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });
    
    // Newsletter form validation
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim()) {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address');
            }
        });
    }
});
