document.addEventListener("DOMContentLoaded", function () {
    // Reveal animation
    const reveals = document.querySelectorAll(".reveal");
    function reveal() {
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 50;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            } else {
                reveals[i].classList.remove("active");
            }
        }
    }
    window.addEventListener("scroll", reveal);
    reveal();

    // Create Lucide icons
    lucide.createIcons();

    // Dark/light mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (e.matches) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    });
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
    });

    // Carousel logic
    document.querySelectorAll('.carousel-container').forEach(container => {
        const track = container.querySelector('.carousel-track');
        const prev = container.querySelector('.prev');
        const next = container.querySelector('.next');
        let position = 0;
        const cardWidth = container.querySelector('.feature-card, .review-card').offsetWidth;
        const gap = 32; // matches the CSS gap
        const visibleCards = 3;
        const totalCards = track.children.length;
        const maxPosition = -(totalCards - visibleCards) * (cardWidth + gap);
        function updateButtons() {
            prev.style.opacity = position === 0 ? '0.5' : '1';
            next.style.opacity = position <= maxPosition ? '0.5' : '1';
        }
        function slide(direction) {
            const shift = direction * (cardWidth + gap);
            position = Math.max(Math.min(position + shift, 0), maxPosition);
            track.style.transform = `translateX(${position}px)`;
            updateButtons();
        }
        prev.addEventListener('click', () => slide(1));
        next.addEventListener('click', () => slide(-1));
        updateButtons();
    });
});
