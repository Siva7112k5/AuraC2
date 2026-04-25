let currentPage = 'home';

function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    document.getElementById(pageId).classList.add('active');

    // Update navigation active state
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick') === `showPage('${pageId}')`) {
            link.classList.add('active');
        }
    });

    currentPage = pageId;

    // Move footer to the active page
    const footer = document.getElementById('footer');
    const activePage = document.getElementById(pageId);
    activePage.appendChild(footer);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize footer position
window.addEventListener('DOMContentLoaded', () => {
    const footer = document.getElementById('footer');
    const homePage = document.getElementById('home');
    homePage.appendChild(footer);
});

// Add interactive parallax effect to background shapes
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const xPos = (x - 0.5) * speed * 20;
        const yPos = (y - 0.5) * speed * 20;
        shape.style.transform = `translate(${xPos}px, ${yPos}px)`;
    });
});

// Add scroll-based animations
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.bg-shapes');
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
});

// Add click ripple effect to glass elements
document.querySelectorAll('.glass').forEach(element => {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1000;
        `;

        this.style.position = 'relative';
        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Form submission handling
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Create success message
    const successMsg = document.createElement('div');
    successMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(46, 204, 113, 0.9);
        color: white;
        padding: 20px 40px;
        border-radius: 10px;
        backdrop-filter: blur(20px);
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    successMsg.textContent = "Message sent successfully! We'll get back to you soon.";
    document.body.appendChild(successMsg);

    // Remove message after 3 seconds
    setTimeout(() => {
        successMsg.remove();
    }, 3000);
});
window.addEventListener('load', () => {
  new cursoreffects.bubbleCursor();
});

// Dark / Light mode toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check saved theme
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    // Save preference
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
});
const logoImg = document.querySelector('.logo-icon img');
themeToggle.addEventListener('click', () => {
  if (body.classList.contains('light-mode')) {
    logoImg.src = 'logo-dark.png';
  } else {
    logoImg.src = 'logo.png';
  }
});
// ===== Testimonials Carousel Logic =====
(function() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    let currentSlide = 0;
    let autoPlayInterval;
    const delay = 4000; // 4 seconds

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function startAutoPlay() {
        stopAutoPlay(); // clear any existing
        autoPlayInterval = setInterval(nextSlide, delay);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Dot click events
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.slide);
            currentSlide = index;
            showSlide(currentSlide);
            // Pause auto-play on manual interaction
            stopAutoPlay();
            startAutoPlay(); // restart timer
        });
    });

    // Pause auto-play when hovering over carousel
    const sliderContainer = document.querySelector('.testimonials');
    sliderContainer.addEventListener('mouseenter', stopAutoPlay);
    sliderContainer.addEventListener('mouseleave', startAutoPlay);

    // Initialise
    showSlide(0);
    startAutoPlay();
})();
// ===== Floating Chat Pill Logic =====
(function() {
    const chatToggle = document.getElementById('chatToggle');
    const chatPopup = document.getElementById('chatPopup');
    const chatClose = document.getElementById('chatClose');
    const chatForm = document.getElementById('chatForm');

    // Toggle popup
    chatToggle.addEventListener('click', () => {
        chatPopup.classList.toggle('open');
    });

    // Close button
    chatClose.addEventListener('click', () => {
        chatPopup.classList.remove('open');
    });

    // Close when clicking outside the popup (optional but nice)
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.chat-pill') && chatPopup.classList.contains('open')) {
            chatPopup.classList.remove('open');
        }
    });

    // Handle form submit (front-end only for now)
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Show success message inside popup
        const originalContent = chatForm.innerHTML;
        chatForm.innerHTML = '<p style="text-align:center; color:white; padding:20px 0;">✅ Message sent!<br>We’ll get back to you soon.</p>';
        setTimeout(() => {
            chatForm.innerHTML = originalContent;
            chatForm.reset();
            chatPopup.classList.remove('open');
        }, 2500);
    });
})();
// ===== Animated Hero Typing Effect =====
(function() {
    const target = document.getElementById('hero-typing');
    if (!target) return;

    const message = "Welcome to AURA CODE CORE";
    let index = 0;
    const speed = 70; // milliseconds per character

    function type() {
        if (index < message.length) {
            target.textContent += message.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    // Start typing after a tiny delay to ensure the page is fully rendered
    window.addEventListener('load', () => {
        setTimeout(type, 300);
    });
})();

// ===== Work Filter =====
(function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workCards = document.querySelectorAll('.work-card');

    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            workCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
})();


/* // ===== Hero Particles =====
(function() {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const maxParticles = 70;

    // Colours for dark / light mode
    function getColor() {
        return document.body.classList.contains('light-mode') ? 'rgba(30,30,50,0.5)' : 'rgba(255,255,255,0.5)';
    }
    function getGlowColor() {
        return document.body.classList.contains('light-mode') ? 'rgba(30,30,50,0.8)' : 'rgba(255,255,255,0.8)';
    }

    function resizeCanvas() {
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    function createParticle() {
        const rect = canvas.parentElement.getBoundingClientRect();
        return {
            x: Math.random() * rect.width,
            y: rect.height + Math.random() * 50,           // start just below the section
            size: Math.random() * 2.5 + 1,                // 1 – 3.5px
            speedY: Math.random() * 0.4 + 0.2,            // drift up speed
            speedX: (Math.random() - 0.5) * 0.3,          // horizontal wobble
            opacity: Math.random() * 0.5 + 0.3
        };
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < maxParticles; i++) {
            particles.push(createParticle());
        }
    }

    function drawParticles() {
        const rect = canvas.parentElement.getBoundingClientRect();
        ctx.clearRect(0, 0, rect.width, rect.height);

        const color = getColor();
        const glowColor = getGlowColor();

        particles.forEach(p => {
            // Move
            p.y -= p.speedY;
            p.x += p.speedX;

            // Reset if top is reached
            if (p.y < -10) {
                p.y = rect.height + 10;
                p.x = Math.random() * rect.width;
            }

            // Draw glowing circle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.shadowColor = glowColor;
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.shadowBlur = 0;  // reset so it doesn't bleed
        });
    }

    function animate() {
        drawParticles();
        requestAnimationFrame(animate);
    }

    // Boot up
    resizeCanvas();
    initParticles();
    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();  // fresh distribution
    });

    // Re‑colour on theme toggle (quick refresh of colours is enough)
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // No need to recreate, colours are read live each frame
        });
    }
})(); */
// ===== Scroll‑to‑top Button =====
(function() {
    const btn = document.getElementById('scrollToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
})();