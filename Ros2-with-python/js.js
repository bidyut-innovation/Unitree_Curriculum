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
});