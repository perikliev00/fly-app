// Background image loader

document.addEventListener('DOMContentLoaded', function() {
    // Function to create and insert a placeholder image when a real image is not available
    function loadBackgroundImages() {
        console.log("Loading background images...");
        
        // Apply background to body
        const bodyBackground = 'https://images.unsplash.com/photo-1590523278191-995cbcda646b?q=80&w=2070';
        document.body.style.backgroundImage = `url('${bodyBackground}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundAttachment = 'fixed';
        
        // Create an overlay on the body
        const bodyOverlay = document.createElement('div');
        bodyOverlay.style.position = 'fixed';
        bodyOverlay.style.top = '0';
        bodyOverlay.style.left = '0';
        bodyOverlay.style.width = '100%';
        bodyOverlay.style.height = '100%';
        bodyOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        bodyOverlay.style.zIndex = '-1';
        document.body.prepend(bodyOverlay);
        
        // Apply background to promo banner
        const promoBanner = document.querySelector('.promo-banner');
        if (promoBanner) {
            const mountainBackground = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070';
            promoBanner.style.backgroundImage = `url('${mountainBackground}')`;
            promoBanner.style.backgroundSize = 'cover';
            promoBanner.style.backgroundPosition = 'center';
            promoBanner.style.backgroundAttachment = 'fixed';
            promoBanner.style.position = 'relative';
            
            // Create overlay for promo banner
            const promoOverlay = document.createElement('div');
            promoOverlay.style.position = 'absolute';
            promoOverlay.style.top = '0';
            promoOverlay.style.left = '0';
            promoOverlay.style.width = '100%';
            promoOverlay.style.height = '100%';
            promoOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
            promoOverlay.style.zIndex = '0';
            
            // Make sure the promo content is above the overlay
            const promoContent = promoBanner.querySelector('.promo-content');
            if (promoContent) {
                promoContent.style.position = 'relative';
                promoContent.style.zIndex = '1';
            }
            
            promoBanner.insertBefore(promoOverlay, promoBanner.firstChild);
        }
        
        // Apply styling to sections for better readability
        document.querySelectorAll('.search-section, .destinations-section, .promo-box-section').forEach(section => {
            section.style.position = 'relative';
            section.style.zIndex = '1';
        });
        
        document.querySelector('.search-section').style.backgroundColor = 'rgba(0, 51, 102, 0.9)';
        document.querySelector('.destinations-section').style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        
        // Style header and footer for better readability
        document.querySelector('.site-header').style.backgroundColor = 'rgba(0, 51, 102, 0.95)';
        document.querySelectorAll('.footer-wrapper, .footer-bottom').forEach(el => {
            el.style.backgroundColor = 'rgba(0, 51, 102, 0.95)';
            el.style.position = 'relative';
            el.style.zIndex = '1';
        });
    }
    
    // Call the function to load background images
    loadBackgroundImages();
});
