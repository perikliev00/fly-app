// Wait for DOM to be fully loaded
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
    if (logoPlaceholder) {
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
        
        // Handle dropdown toggles in mobile view
        dropdownTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                // Only handle dropdowns in mobile view
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const dropdownMenu = this.nextElementSibling;
                    
                    // Toggle this dropdown
                    this.classList.toggle('active');
                    dropdownMenu.classList.toggle('show');
                    
                    // Close other dropdowns
                    dropdownTriggers.forEach(otherTrigger => {
                        if (otherTrigger !== trigger) {
                            otherTrigger.classList.remove('active');
                            const otherMenu = otherTrigger.nextElementSibling;
                            if (otherMenu) otherMenu.classList.remove('show');
                        }
                    });
                }
            });
            
            // For touch devices in desktop view
            trigger.addEventListener('touchstart', function(e) {
                if (window.innerWidth > 768) {
                    // Prevent immediate link navigation on first touch
                    const hasBeenTouched = this.getAttribute('data-touched');
                    if (!hasBeenTouched) {
                        e.preventDefault();
                        
                        // Close all other open dropdowns first
                        dropdownTriggers.forEach(otherTrigger => {
                            if (otherTrigger !== trigger) {
                                otherTrigger.setAttribute('data-touched', 'false');
                            }
                        });
                        
                        this.setAttribute('data-touched', 'true');
                    }
                }
            }, { passive: false });
        });
        
        // Close the mobile menu and dropdowns when window is resized
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                if (navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                }
                
                // Reset active states for all dropdowns when switching to desktop
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
    }    // Enhanced navigation dropdown behavior
    const navItems = document.querySelectorAll('.has-dropdown');
    
    // For mobile dropdown behavior (handled by CSS for desktop)
    if (window.innerWidth <= 768) {
        navItems.forEach(item => {
            const trigger = item.querySelector('.dropdown-trigger');
            const dropdown = item.querySelector('.dropdown-menu');
            
            if (trigger) {
                trigger.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Close all other dropdowns
                    navItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            const otherDropdown = otherItem.querySelector('.dropdown-menu');
                            if (otherDropdown) {
                                otherDropdown.classList.remove('show');
                                
                                const otherTrigger = otherItem.querySelector('.dropdown-trigger');
                                if (otherTrigger && otherTrigger.querySelector('i')) {
                                    otherTrigger.querySelector('i').style.transform = 'rotate(0)';
                                }
                            }
                        }
                    });
                    
                    // Toggle this dropdown
                    dropdown.classList.toggle('show');
                    
                    // Toggle icon rotation
                    const icon = this.querySelector('i');
                    if (icon) {
                        if (dropdown.classList.contains('show')) {
                            icon.style.transform = 'rotate(180deg)';
                        } else {
                            icon.style.transform = 'rotate(0)';
                        }
                    }
                });
            }
        });
    }
});
