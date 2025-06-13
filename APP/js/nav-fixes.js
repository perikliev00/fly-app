// Updated navigation and dropdown behavior
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            menuToggle.setAttribute('aria-expanded', navMenu.classList.contains('show'));
        });
    }
    
    // Mobile dropdown toggle
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            // Only handle dropdowns in mobile view
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdown = this.nextElementSibling;
                const icon = this.querySelector('i');
                
                // Close all other dropdowns
                dropdownTriggers.forEach(other => {
                    if (other !== trigger) {
                        const otherDropdown = other.nextElementSibling;
                        const otherIcon = other.querySelector('i');
                        
                        if (otherDropdown && otherDropdown.classList.contains('show')) {
                            otherDropdown.classList.remove('show');
                            if (otherIcon) {
                                otherIcon.style.transform = '';
                            }
                        }
                    }
                });
                
                // Toggle this dropdown
                dropdown.classList.toggle('show');
                
                // Toggle icon rotation
                if (icon) {
                    icon.style.transform = dropdown.classList.contains('show') ? 'rotate(180deg)' : '';
                }
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            const isClickInsideNav = navMenu && navMenu.contains(e.target);
            const isClickOnToggle = menuToggle && menuToggle.contains(e.target);
            
            if (!isClickInsideNav && !isClickOnToggle && navMenu && navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                menuToggle.setAttribute('aria-expanded', 'false');
                
                // Also close any open dropdowns
                document.querySelectorAll('.dropdown-menu.show').forEach(dropdown => {
                    dropdown.classList.remove('show');
                });
            }
        }
    });
    
    // Tab switching in search form
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Date picker placeholder
    const dateDisplays = document.querySelectorAll('.date-display');
    
    dateDisplays.forEach(display => {
        display.addEventListener('click', function() {
            alert('Date picker would open here in a real application');
        });
    });
    
    // Passenger selection placeholder
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
});
