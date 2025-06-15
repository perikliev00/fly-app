// Tab Functionality Fix
window.addEventListener('load', function() {
    // Get fresh references to all tabs and content
    const tabButtons = document.querySelectorAll('.tab-btn');
    const formContents = document.querySelectorAll('.form-content');
    
    // Make sure the first tab is active by default
    if (tabButtons.length > 0 && formContents.length > 0) {
        // Activate first tab if none are active
        let activeFound = false;
        tabButtons.forEach(btn => {
            if (btn.classList.contains('active')) {
                activeFound = true;
            }
        });
        
        if (!activeFound && tabButtons[0]) {
            tabButtons[0].classList.add('active');
            const targetFormId = tabButtons[0].getAttribute('data-form');
            if (targetFormId) {
                const targetForm = document.getElementById(targetFormId);
                if (targetForm) {
                    targetForm.classList.add('active');
                }
            }
        }
    }
    
    // Reinstall click handlers on all tab buttons with stronger implementation
    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Remove active class from all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the form content ID to show
            const targetFormId = this.getAttribute('data-form');
            
            // Hide all form content
            formContents.forEach(form => {
                form.classList.remove('active');
                form.style.display = 'none';
            });
            
            // Show the selected form with both class and direct style
            if (targetFormId) {
                const targetForm = document.getElementById(targetFormId);
                if (targetForm) {
                    targetForm.classList.add('active');
                    targetForm.style.display = 'block';
                    console.log('Activated form:', targetFormId);
                }
            }
        });
    });
    
    console.log('Tab functionality fix initialized');
});
