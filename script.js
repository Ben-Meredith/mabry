// Smooth scroll reveal effect for memory stops
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

// Draw the dotted path through all memory stops
function drawRoadmapPath() {
    const roadmap = document.querySelector('.roadmap');
    const memoryStops = document.querySelectorAll('.memory-stop');
    const svg = document.querySelector('.roadmap-path');
    const path = document.querySelector('.path-line');

    if (!roadmap || memoryStops.length === 0) return;

    // Set SVG height to match roadmap height
    svg.style.height = roadmap.scrollHeight + 'px';

    // Calculate path points
    let pathData = '';
    const centerX = 2; // Center of the SVG (4px wide / 2)

    memoryStops.forEach((stop, index) => {
        const rect = stop.getBoundingClientRect();
        const roadmapRect = roadmap.getBoundingClientRect();
        const y = rect.top + rect.height / 2 - roadmapRect.top + window.scrollY;

        if (index === 0) {
            pathData += `M ${centerX} ${y}`;
        } else {
            // Create a curvy path
            const prevStop = memoryStops[index - 1];
            const prevRect = prevStop.getBoundingClientRect();
            const prevY = prevRect.top + prevRect.height / 2 - roadmapRect.top + window.scrollY;

            const midY = (prevY + y) / 2;
            const curveOffset = (index % 2 === 0) ? 50 : -50;

            pathData += ` Q ${centerX + curveOffset} ${midY}, ${centerX} ${y}`;
        }
    });

    path.setAttribute('d', pathData);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initial reveal check
    reveal();

    // Draw the roadmap path
    setTimeout(drawRoadmapPath, 100);

    // Check on scroll
    window.addEventListener('scroll', reveal);

    // Redraw path on resize
    window.addEventListener('resize', drawRoadmapPath);
});