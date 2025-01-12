document.addEventListener("DOMContentLoaded", function () {
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
  
    //Create icons
    lucide.createIcons();
    //Dark/light mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    //Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
    //Change based on system preference (idk if this works)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
    //Toggle listener
    themeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
    });
    //Carousel
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
      //Button state
      updateButtons();
    });
    
    window.addEventListener("scroll", reveal);
    reveal();
  });