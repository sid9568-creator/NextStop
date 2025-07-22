// JavaScript for Packages Page functionality

document.addEventListener('DOMContentLoaded', function() {
    initializePackageFilters();
    initializePackageGrid();
});

// Package filtering functionality
function initializePackageFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const packageItems = document.querySelectorAll('.package-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Show/hide packages based on filter
            packageItems.forEach(item => {
                const categories = item.getAttribute('data-category');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    item.style.display = 'block';
                    // Re-trigger AOS animation
                    if (item.hasAttribute('data-aos')) {
                        item.classList.remove('aos-animate');
                        setTimeout(() => {
                            item.classList.add('aos-animate');
                        }, 100);
                    }
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Enhanced package grid functionality
function initializePackageGrid() {
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach(card => {
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Search functionality (if needed in future)
function initializePackageSearch() {
    const searchInput = document.getElementById('packageSearch');
    const packageItems = document.querySelectorAll('.package-item');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            packageItems.forEach(item => {
                const title = item.querySelector('.package-title').textContent.toLowerCase();
                const description = item.querySelector('.package-description').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

// Price range filter (for future enhancement)
function initializePriceFilter() {
    const priceRange = document.getElementById('priceRange');
    const packageItems = document.querySelectorAll('.package-item');
    
    if (priceRange) {
        priceRange.addEventListener('input', function() {
            const maxPrice = parseInt(this.value);
            
            packageItems.forEach(item => {
                const priceText = item.querySelector('.price-tag').textContent;
                const price = parseInt(priceText.replace(/[^\d]/g, ''));
                
                if (price <= maxPrice) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}