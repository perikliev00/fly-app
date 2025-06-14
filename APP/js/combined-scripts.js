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
            
            // Hide all form content
            const formContents = document.querySelectorAll('.form-content');
            formContents.forEach(form => form.classList.remove('active'));
            
            // Show the selected form
            const targetFormId = this.getAttribute('data-form');
            if (targetFormId) {
                const targetForm = document.getElementById(targetFormId);
                if (targetForm) {
                    targetForm.classList.add('active');
                }
            }
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
    });    // Passenger selection functionality
    const passengerDisplays = document.querySelectorAll('.passenger-display');
    
    if (passengerDisplays.length > 0) {
        passengerDisplays.forEach(display => {
            display.addEventListener('click', function() {
                // Show an enhanced UI instead of a basic alert
                const formType = this.closest('.form-content').id;
                let message = '';
                
                if (formType === 'flight-form') {
                    message = 'Select number of adults, children, and infants';
                } else if (formType === 'hotel-form') {
                    message = 'Select number of rooms and guests';
                } else if (formType === 'car-form') {
                    message = 'Select your preferred car type';
                }
                
                // Show a better UI instead of alert in a real application
                alert(message);
                
                // Animate the dropdown icon
                const icon = this.querySelector('.fa-chevron-down');
                if (icon) {
                    icon.style.transform = 'rotate(180deg)';
                    setTimeout(() => {
                        icon.style.transform = 'rotate(0)';
                    }, 1000);
                }
            });
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
      // Mobile dropdown functionality
    function setupMobileDropdowns() {
        if (window.innerWidth <= 768) {
            dropdownTriggers.forEach(trigger => {
                // Remove any previous event listeners first by cloning and replacing
                const newTrigger = trigger.cloneNode(true);
                if (trigger.parentNode) {
                    trigger.parentNode.replaceChild(newTrigger, trigger);
                }
                
                newTrigger.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const dropdownMenu = this.nextElementSibling;
                    const icon = this.querySelector('i');
                    
                    // Close all other dropdowns
                    dropdownTriggers.forEach(otherTrigger => {
                        if (otherTrigger !== newTrigger) {
                            const otherDropdown = otherTrigger.nextElementSibling;
                            const otherIcon = otherTrigger.querySelector('i');
                            
                            if (otherDropdown && otherDropdown.classList.contains('show')) {
                                otherDropdown.classList.remove('show');
                                if (otherIcon) {
                                    otherIcon.style.transform = '';
                                }
                            }
                        }
                    });
                    
                    // Toggle this dropdown
                    dropdownMenu.classList.toggle('show');
                    
                    // Toggle icon rotation
                    if (icon) {
                        icon.style.transform = dropdownMenu.classList.contains('show') ? 'rotate(180deg)' : '';
                    }
                });
            });
        }
    }
    
    // Initial setup
    setupMobileDropdowns();
    
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
    });    // Newsletter form validation with improved feedback
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        const emailInput = newsletterForm.querySelector('.newsletter-input');
        const submitButton = newsletterForm.querySelector('.newsletter-submit');
        
        // Add focus/blur effects
        if (emailInput) {
            emailInput.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
                if (submitButton) {
                    submitButton.style.color = 'var(--primary-color)';
                }
            });
            
            emailInput.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                if (submitButton) {
                    submitButton.style.color = '';
                }
            });
        }
        
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (emailInput && emailInput.value.trim()) {
                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(emailInput.value.trim())) {
                    // Success feedback
                    alert('Thank you for subscribing to our newsletter!');
                    emailInput.value = '';
                    emailInput.classList.remove('error');
                } else {
                    // Error feedback for invalid format
                    alert('Please enter a valid email address format');
                    emailInput.classList.add('error');
                }
            } else {
                // Error feedback for empty field
                alert('Please enter your email address');
                if (emailInput) {
                    emailInput.classList.add('error');
                    emailInput.focus();
                }
            }
        });
    }
});
