// Add fallback images for destination cards
document.addEventListener('DOMContentLoaded', function() {
    const destinationImages = document.querySelectorAll('.card-image img');
    
    destinationImages.forEach(img => {
        img.onerror = function() {
            // Create placeholder with destination name as text
            const destinationName = this.closest('.destination-card').querySelector('.destination-name').textContent;
            const canvas = document.createElement('canvas');
            canvas.width = 300;
            canvas.height = 180;
            
            const ctx = canvas.getContext('2d');
            
            // Generate random color based on destination name
            const hash = destinationName.split('').reduce((acc, char) => {
                return char.charCodeAt(0) + ((acc << 5) - acc);
            }, 0);
            
            const color = `hsl(${Math.abs(hash % 360)}, 70%, 60%)`;
            
            // Draw background
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw destination name
            ctx.fillStyle = 'white';
            ctx.font = 'bold 24px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(destinationName, canvas.width / 2, canvas.height / 2);
            
            // Set as fallback image
            this.src = canvas.toDataURL();
        };
    });
});
