// Smooth scroll reveal effect
function reveal() {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Smooth scrolling for the entire page
document.addEventListener('DOMContentLoaded', () => {
    // Initial check
    reveal();

    // Check on scroll
    window.addEventListener('scroll', reveal);

    // Smooth scroll behavior
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
});

// Optional: Add parallax effect to images
window.addEventListener('scroll', () => {
    const images = document.querySelectorAll('.image-container');
    images.forEach(img => {
        const speed = 0.5;
        const yPos = -(window.pageYOffset * speed);
        img.style.transform = `translateY(${yPos}px)`;
    });
});