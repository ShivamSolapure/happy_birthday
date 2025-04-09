document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const sections = document.querySelectorAll('.service-section');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const weaponCategories = document.querySelectorAll('.weapon-category');

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        // Search in sections
        sections.forEach(section => {
            const sectionTitle = section.querySelector('h2').textContent.toLowerCase();
            const sectionContent = section.textContent.toLowerCase();
            const isVisible = sectionTitle.includes(searchTerm) || sectionContent.includes(searchTerm);
            section.style.display = isVisible ? 'block' : 'none';
        });

        // Search in timeline items
        timelineItems.forEach(item => {
            const itemTitle = item.querySelector('h4').textContent.toLowerCase();
            const itemContent = item.textContent.toLowerCase();
            const isVisible = itemTitle.includes(searchTerm) || itemContent.includes(searchTerm);
            item.style.display = isVisible ? 'block' : 'none';
        });

        // Search in weapon categories
        weaponCategories.forEach(category => {
            const categoryTitle = category.querySelector('h4').textContent.toLowerCase();
            const categoryContent = category.textContent.toLowerCase();
            const isVisible = categoryTitle.includes(searchTerm) || categoryContent.includes(searchTerm);
            category.style.display = isVisible ? 'block' : 'none';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effect to weapon categories
    weaponCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        });

        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Add animation to timeline items when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
});

// Initialize Swiper instances for each section
const swiperInstances = {};

function initializeSwiper(sectionId, imagePaths) {
    const swiperWrapper = document.querySelector(`#${sectionId} .swiper-wrapper`);
    
    // Clear existing slides
    swiperWrapper.innerHTML = '';
    
    // Add new slides
    imagePaths.forEach(path => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        
        const img = document.createElement('img');
        img.src = path;
        img.alt = sectionId;
        
        slide.appendChild(img);
        swiperWrapper.appendChild(slide);
    });
    
    // Initialize Swiper
    swiperInstances[sectionId] = new Swiper(`#${sectionId} .swiper`, {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: `#${sectionId} .swiper-pagination`,
            clickable: true,
        },
        navigation: {
            nextEl: `#${sectionId} .swiper-button-next`,
            prevEl: `#${sectionId} .swiper-button-prev`,
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });
}

// Image paths for each section
const imagePaths = {
    radhika: [
        'C:/Users/shrir/OneDrive/Pictures/文档/radhika/img1.jpg',
        'C:/Users/shrir/OneDrive/Pictures/文档/radhika/img2.jpg',
        'C:/Users/shrir/OneDrive/Pictures/文档/radhika/img3.jpg',
        'C:/Users/shrir/OneDrive/Pictures/文档/radhika/img4.jpg',
        'C:/Users/shrir/OneDrive/Pictures/文档/radhika/img5.jpg'
    ],
    hariom: [
        'C:/Users/shrir/OneDrive/Pictures/文档/hariom/img1.jpg',
        'C:/Users/shrir/OneDrive/Pictures/文档/hariom/img2.jpg',
        'C:/Users/shrir/OneDrive/Pictures/文档/hariom/img3.jpg',
        'C:/Users/shrir/OneDrive/Pictures/文档/hariom/img4.jpg',
        'C:/Users/shrir/OneDrive/Pictures/文档/hariom/img5.jpg'
    ],
    twins: [
        'C:/Users/shrir/OneDrive/Pictures/文档/hariom/twin1.jpg',
        'C:/Users/shrir/OneDrive/Pictures/文档/hariom/twin2.jpg',
        'C:/Users/shrir/OneDrive/Pictures/文档/hariom/twin3.jpg',
        'C:/Users/shrir/OneDrive/Pictures/文档/hariom/twin4.jpg',
        'C:/Users/shrir/OneDrive/Pictures/文档/hariom/twin5.jpg'
    ],
    squad: [
        'C:/Users/shrir/Downloads/quad/squad1.jpg',
        'C:/Users/shrir/Downloads/quad/squad2.jpg',
        'C:/Users/shrir/Downloads/quad/squad3.jpg',
        'C:/Users/shrir/Downloads/quad/squad4.jpg',
        'C:/Users/shrir/Downloads/quad/squad5.jpg'
    ]
};

// Initialize all sections
Object.keys(imagePaths).forEach(sectionId => {
    initializeSwiper(`${sectionId}-section`, imagePaths[sectionId]);
});

// Navigation function
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const selectedSection = document.getElementById(`${sectionId}-section`);
    selectedSection.classList.add('active');
    
    // Update Swiper if it exists
    if (swiperInstances[`${sectionId}-section`]) {
        swiperInstances[`${sectionId}-section`].update();
    }
}

// Add confetti, balloon, and sprinkles animations on page load
window.addEventListener('load', () => {
    // Create confetti elements
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.animationDelay = Math.random() * 5 + 's';
        
        // Random confetti shapes and colors
        if (i % 5 === 0) {
            confetti.style.borderRadius = '50%';
            confetti.style.width = '12px';
            confetti.style.height = '12px';
        } else if (i % 5 === 1) {
            confetti.style.width = '7px';
            confetti.style.height = '7px';
            confetti.style.transform = 'rotate(45deg)';
        } else if (i % 5 === 2) {
            confetti.innerHTML = '🎉';
            confetti.style.background = 'transparent';
            confetti.style.fontSize = '15px';
        } else if (i % 5 === 3) {
            confetti.innerHTML = '🎊';
            confetti.style.background = 'transparent';
            confetti.style.fontSize = '15px';
        } else {
            confetti.innerHTML = '🎁';
            confetti.style.background = 'transparent';
            confetti.style.fontSize = '15px';
        }
        
        document.body.appendChild(confetti);
    }
    
    // Create sprinkles falling from top
    const sprinklesContainer = document.querySelector('.sprinkles-container');
    for (let i = 0; i < 200; i++) {
        const sprinkle = document.createElement('div');
        sprinkle.className = 'sprinkle';
        sprinkle.style.left = Math.random() * 100 + 'vw';
        sprinkle.style.animationDuration = (Math.random() * 4 + 3) + 's';
        sprinkle.style.animationDelay = Math.random() * 5 + 's';
        sprinklesContainer.appendChild(sprinkle);
    }
    
    // Create sparkles for added effect
    const sparklesContainer = document.querySelector('.sparkles-container');
    for (let i = 0; i < 30; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + 'vw';
        sparkle.style.top = Math.random() * 100 + 'vh';
        sparkle.style.animationDelay = (Math.random() * 5) + 's';
        sparkle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        sparklesContainer.appendChild(sparkle);
    }
    
    // Animate candle flames
    const flames = document.querySelectorAll('.flame');
    flames.forEach(flame => {
        flame.style.animation = `flicker ${1 + Math.random()}s ease-in-out infinite`;
    });
    
    // Title animation with typewriter effect
    const titleElement = document.querySelector('.birthday-title h1');
    if (titleElement) {
        const text = titleElement.textContent;
        titleElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                titleElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 150);
            } else {
                // Add a rainbow effect after typing completes
                titleElement.classList.add('rainbow-text');
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
    
    // Make sure home section is visible
    document.getElementById('home').style.display = 'flex';
    
    // Animate the names with a delay
    setTimeout(() => {
        const names = document.querySelectorAll('.names h1');
        names.forEach((name, index) => {
            name.style.opacity = '0';
            name.style.transform = 'scale(0.5)';
            name.style.transition = 'opacity 1s ease, transform 1s ease';
            
            setTimeout(() => {
                name.style.opacity = '1';
                name.style.transform = 'scale(1)';
            }, index * 800);
        });
    }, 2500);
    
    // Add 3D rotation effect on mousemove
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        const names = document.querySelector('.names');
        if (names) {
            names.style.transform = `perspective(1000px) rotateY(${mouseX * 10}deg) rotateX(${-mouseY * 10}deg)`;
        }
        
        const title = document.querySelector('.birthday-title');
        if (title) {
            title.style.transform = `perspective(1000px) rotateY(${mouseX * 5}deg) rotateX(${-mouseY * 5}deg)`;
        }
    });
    
    // Periodically add more sprinkles
    setInterval(() => {
        const sprinkle = document.createElement('div');
        sprinkle.className = 'sprinkle';
        sprinkle.style.left = Math.random() * 100 + 'vw';
        sprinkle.style.animationDuration = (Math.random() * 4 + 3) + 's';
        
        // Random color
        const colors = ['#ff1493', '#ffd700', '#00bfff', '#7fff00', '#ff4500', '#9400d3'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        sprinkle.style.background = color;
        sprinkle.style.width = Math.random() * 6 + 4 + 'px';
        sprinkle.style.height = sprinkle.style.width;
        
        sprinklesContainer.appendChild(sprinkle);
        
        // Remove old sprinkles to prevent too many elements
        setTimeout(() => {
            sprinkle.remove();
        }, 6000);
    }, 300);
});

// Add click event listeners to names
document.querySelector('.radhika').addEventListener('click', () => showSection('radhika'));
document.querySelector('.hariom').addEventListener('click', () => showSection('hariom')); 
