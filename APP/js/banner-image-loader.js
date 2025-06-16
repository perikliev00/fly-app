/**
 * Banner Image Loader
 * Ensures the promo banner loads properly with the right image
 */

document.addEventListener('DOMContentLoaded', function() {
    // High-quality mountain lake image
    const mountainLakeImage = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070';
    
    // Get the promo banner element
    const promoBanner = document.querySelector('.promo-banner');
    
    if (promoBanner) {
        // Set the background image directly
        promoBanner.style.backgroundImage = `url('${mountainLakeImage}')`;
        promoBanner.style.backgroundSize = 'cover';
        promoBanner.style.backgroundPosition = 'center';
        promoBanner.style.backgroundAttachment = 'fixed';
        
        // Create a more sophisticated overlay for better text contrast
        const existingOverlay = promoBanner.querySelector('.overlay');
        if (!existingOverlay) {
            const overlay = document.createElement('div');
            overlay.classList.add('overlay');
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%)';
            overlay.style.zIndex = '0';
            
            // Make sure the promo content is above the overlay
            const promoContent = promoBanner.querySelector('.promo-content');
            if (promoContent) {
                promoContent.style.position = 'relative';
                promoContent.style.zIndex = '1';
            }
            
            promoBanner.insertBefore(overlay, promoBanner.firstChild);
        }
        
        // Handle responsive issues
        function adjustForMobile() {
            if (window.innerWidth <= 768) {
                promoBanner.style.backgroundAttachment = 'scroll'; // Better performance on mobile
            } else {
                promoBanner.style.backgroundAttachment = 'fixed';
            }
        }
        
        // Initial call and window resize event
        adjustForMobile();
        window.addEventListener('resize', adjustForMobile);
    }
});
