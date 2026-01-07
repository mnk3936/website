
    // Smooth Scroll with Animation for Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Smooth scroll to section
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    // nav hamburger menu in mobile//
// Hamburger Menu Toggle
    const menuIcon = document.querySelector('.menu-icon');
    const navList = document.querySelector('.nav-list');

    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('open');
        navList.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('open');
            navList.classList.remove('active');
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Smooth Scroll Animation Observer
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

if (window.innerWidth > 768) {
    // Project Slider
    let currentSlide = 0;
    const container = document.getElementById('projectsContainer');
    const cards = document.querySelectorAll('.project-card');
    const totalSlides = cards.length;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('navDots');

    // Create navigation dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll('.dot');

    function updateSlider() {
        const cardWidth = cards[0].offsetWidth;
        const gap = 20;
        const offset = -(currentSlide * (cardWidth + gap));
        container.style.transform = `translateX(${offset}px)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchStartX - touchEndX > 50) nextSlide();
        if (touchEndX - touchStartX > 50) prevSlide();
    }

    window.addEventListener('resize', updateSlider);
}

    /* 🌈 Smooth Background Color Transition */
    const bgColors = ["#10100e", "#10100e", "#10100e", "#004aad"];

    function lerpColor(a, b, t) {
        const ah = parseInt(a.replace("#", ""), 16),
              ar = ah >> 16, ag = (ah >> 8) & 0xff, ab = ah & 0xff,
              bh = parseInt(b.replace("#", ""), 16),
              br = bh >> 16, bg = (bh >> 8) & 0xff, bb = bh & 0xff,
              rr = ar + t * (br - ar),
              rg = ag + t * (bg - ag),
              rb = ab + t * (bb - ab);
        return "#" + (((1 << 24) + (rr << 16) + (rg << 8) + rb) | 0).toString(16).slice(1);
    }

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const sectionHeight = window.innerHeight;
        const totalSections = bgColors.length;

        const index = Math.floor(scrollTop / sectionHeight);
        const nextIndex = Math.min(index + 1, totalSections - 1);
        const progress = (scrollTop % sectionHeight) / sectionHeight;

        const blended = lerpColor(bgColors[index], bgColors[nextIndex], progress);
        document.body.style.background = blended;
    });