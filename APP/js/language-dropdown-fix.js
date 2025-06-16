/**
 * Language Dropdown Fix
 * This script ensures the language dropdown works correctly
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get the language dropdown trigger element
    const langTrigger = document.querySelector('.lang-item .dropdown-trigger');
    
    if (langTrigger) {
        // Make sure it's properly initialized for clicks
        setupLangDropdown();
        
        // Also handle resize events
        window.addEventListener('resize', function() {
            // Only re-setup on mobile
            if (window.innerWidth <= 1000) {
                setupLangDropdown();
            }
        });
    }
    
    // Function to set up the language dropdown
    function setupLangDropdown() {
        // Get a fresh reference to the language dropdown trigger
        const langTrigger = document.querySelector('.lang-item .dropdown-trigger');
        const langDropdown = document.querySelector('.lang-item .dropdown-menu');
        
        if (!langTrigger || !langDropdown) return;
        
        // Clean up by replacing with a clone
        const newLangTrigger = langTrigger.cloneNode(true);
        langTrigger.parentNode.replaceChild(newLangTrigger, langTrigger);
        
        // Add click handler
        newLangTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle the dropdown
            langDropdown.classList.toggle('show');
            this.classList.toggle('active');
            
            // Rotate icon
            const icon = this.querySelector('i.fa-chevron-down');
            if (icon) {
                icon.style.transform = langDropdown.classList.contains('show') ? 'rotate(180deg)' : '';
            }
        });
        
        // Add proper class to parent li
        const langItem = newLangTrigger.closest('.lang-item');
        if (langItem) {
            langItem.classList.add('has-dropdown');
        }
    }
    
    // Add click-outside handler
    document.addEventListener('click', function(e) {
        // Skip if click was on language dropdown
        if (e.target.closest('.lang-item .dropdown-menu') || e.target.closest('.lang-item .dropdown-trigger')) {
            return;
        }
        
        // Close language dropdown if it's open
        const langDropdown = document.querySelector('.lang-item .dropdown-menu');
        const langTrigger = document.querySelector('.lang-item .dropdown-trigger');
        
        if (langDropdown && langDropdown.classList.contains('show')) {
            langDropdown.classList.remove('show');
            
            if (langTrigger) {
                langTrigger.classList.remove('active');
                
                const icon = langTrigger.querySelector('i.fa-chevron-down');
                if (icon) {
                    icon.style.transform = '';
                }
            }
        }
    });
});
