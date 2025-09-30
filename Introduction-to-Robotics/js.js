document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const container = document.querySelector('.container');
    
    // Check if user previously collapsed the sidebar
    const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    
    if (isCollapsed) {
        sidebar.classList.add('sidebar-collapsed');
        sidebarToggle.classList.add('collapsed');
        container.classList.remove('sidebar-open');
    } else {
        container.classList.add('sidebar-open');
    }
    
    // Toggle sidebar
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('sidebar-collapsed');
        sidebarToggle.classList.toggle('collapsed');
        container.classList.toggle('sidebar-open');
        
        // Save state to localStorage
        localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('sidebar-collapsed'));
    });
    
    // Update active link in sidebar when scrolling
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Mobile menu toggle
    if (window.innerWidth <= 768) {
        sidebar.classList.add('sidebar-collapsed');
        sidebarToggle.classList.add('collapsed');
        container.classList.remove('sidebar-open');
        
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
});// Make benefits table responsive
function makeTableResponsive() {
    if (window.innerWidth <= 600) {
        const table = document.querySelector('.benefits-timeline');
        if (table) {
            const headers = ['Category', 'Past', 'Present', 'Future'];
            const cells = table.querySelectorAll('td');
            
            cells.forEach((cell, index) => {
                const headerIndex = index % 4;
                if (headerIndex !== 0) { // Skip first column (category)
                    cell.setAttribute('data-label', headers[headerIndex]);
                }
            });
        }
    }
}

// Run on load and resize
makeTableResponsive();
window.addEventListener('resize', makeTableResponsive);
document.addEventListener('DOMContentLoaded', function() {
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'image-overlay';
    overlay.innerHTML = '<span class="close-overlay">&times;</span><img src="" alt="Enlarged view">';
    document.body.appendChild(overlay);

    // Handle image clicks
    document.querySelectorAll('.classification-cell img').forEach(img => {
        img.addEventListener('click', function() {
            const overlayImg = overlay.querySelector('img');
            overlayImg.src = this.src;
            overlayImg.alt = this.alt + ' (enlarged)';
            overlay.classList.add('active');
        });
    });

    // Close overlay
    overlay.querySelector('.close-overlay').addEventListener('click', function() {
        overlay.classList.remove('active');
    });

    // Close when clicking outside image
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.classList.remove('active');
        }
    });

    // Close with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            overlay.classList.remove('active');
        }
    });
});
