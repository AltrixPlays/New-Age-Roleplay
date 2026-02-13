// Update current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });

            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Gallery Modal Functionality
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('gallery-modal');
const modalImage = document.getElementById('modal-image');
const captionText = document.getElementById('caption');
const closeButton = document.querySelector('.close-button');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImage.src = item.dataset.full;
        captionText.innerHTML = item.alt;
    });
});

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
    }
});

// --- ENHANCED SCRIPTS ---

// Scroll Indicator
window.onscroll = function() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("scroll-indicator").style.width = scrolled + "%";
};

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});


// Section Entrance Animations using Intersection Observer
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Trigger h2 animation for the current section
            const h2 = entry.target.querySelector('h2');
            if (h2) {
                h2.style.animation = 'none'; // Reset animation
                void h2.offsetWidth; // Trigger reflow
                h2.style.animation = null; // Reapply animation
            }
            // If you want sections to animate only once, uncomment next line
            // observer.unobserve(entry.target);
        } else {
            // Optional: remove 'is-visible' to re-animate on scroll back up
            // entry.target.classList.remove('is-visible');
        }
    });
}, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }); // Trigger when 20% visible, or 10% from bottom

sections.forEach(section => {
    observer.observe(section);
});

// Optional: Header text fade on scroll
const headerContent = document.querySelector('header .container');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const headerHeight = document.querySelector('header').offsetHeight;

    const opacity = 1 - (scrollPosition / (headerHeight * 0.4)); // Fades faster
    headerContent.style.opacity = Math.max(0, opacity);
    headerContent.style.transform = `translateY(${scrollPosition * 0.3}px)`; // More pronounced upward movement
});


// Ripple effect for buttons (NEW)
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);

        const diameter = Math.max(this.clientWidth, this.clientHeight);
        const radius = diameter / 2;

        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${e.clientX - this.getBoundingClientRect().left - radius}px`;
        ripple.style.top = `${e.clientY - this.getBoundingClientRect().top - radius}px`;

        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    });
});
