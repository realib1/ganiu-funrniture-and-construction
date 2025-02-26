document.addEventListener("DOMContentLoaded", function () {
  // Navigation toggle menu
  const navMenu = document.querySelector(".nav-menuItems");
  // const navItems = document.querySelector('.nav-menuItem');
  const navToggle = document.querySelector(".nav-btn");

  const toggleMenu = (navMenu) => {
    navMenu.classList.toggle("hidden");
  };

  navToggle.addEventListener("click", () => {
    toggleMenu(navMenu);
  });


   // Footer Year
   const year = new Date().getFullYear();
   const footerYear = document.getElementById('footer-year');
   footerYear.textContent = year;

  const carousel = document.getElementById("testimonialCarousel");
  const prevBtn = document.getElementById("prevButton");
  const nextBtn = document.getElementById("nextButton");
  const container = document.querySelector(".group"); // Carousel container

  let currentPosition = 0;
  let itemWidth = 0;
  let gap = 0;
  let autoPlayInterval;
  let isHovering = false;

  // Auto-play function
  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      if (!isHovering) {
        const itemsToMove = itemsPerView();
        const maxPosition =
          carousel.scrollWidth - itemsToMove * (itemWidth + gap);

        if (currentPosition >= maxPosition) {
          // Reset to first position without animation
          carousel.style.transition = "none";
          currentPosition = 0;
          moveCarousel();
          // Force reflow to apply reset
          void carousel.offsetWidth;
          // Restore transition
          carousel.style.transition = "transform 500ms ease-in-out";
        } else {
          currentPosition += (itemWidth + gap) * itemsToMove;
          moveCarousel();
        }
      }
    }, 3000); // 3 seconds interval
  }

  function calculateLayout() {
    itemWidth = carousel.children[0].offsetWidth;
    gap =
      parseInt(window.getComputedStyle(carousel).gap.replace("px", "")) || 0;
  }

  function itemsPerView() {
    return window.innerWidth >= 768 ? 3 : 1;
  }

  function updateButtons() {
    const maxPosition =
      carousel.scrollWidth - itemsPerView() * (itemWidth + gap);
    prevBtn.disabled = currentPosition <= 0;
    nextBtn.disabled = currentPosition >= maxPosition;
  }

  function moveCarousel() {
    carousel.style.transform = `translateX(-${currentPosition}px)`;
    updateButtons();
  }

  // Modified click handlers
  function handleNext() {
    clearInterval(autoPlayInterval);
    calculateLayout();
    const itemsToMove = itemsPerView();
    const maxPosition = carousel.scrollWidth - itemsToMove * (itemWidth + gap);

    if (currentPosition < maxPosition) {
      currentPosition += (itemWidth + gap) * itemsToMove;
      moveCarousel();
    }
    startAutoPlay();
  }

  function handlePrev() {
    clearInterval(autoPlayInterval);
    calculateLayout();
    const itemsToMove = itemsPerView();
    if (currentPosition > 0) {
      currentPosition -= (itemWidth + gap) * itemsToMove;
      if (currentPosition < 0) currentPosition = 0;
      moveCarousel();
    }
    startAutoPlay();
  }

  // Event listeners
  nextBtn.addEventListener("click", handleNext);
  prevBtn.addEventListener("click", handlePrev);

  // Pause on hover
  container.addEventListener("mouseenter", () => {
    isHovering = true;
    clearInterval(autoPlayInterval);
  });
  container.addEventListener("mouseleave", () => {
    isHovering = false;
    startAutoPlay();
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    calculateLayout();
    const maxPosition =
      carousel.scrollWidth - itemsPerView() * (itemWidth + gap);
    if (currentPosition > maxPosition) currentPosition = maxPosition;
    moveCarousel();
  });

  // Initial setup
  calculateLayout();
  updateButtons();
  startAutoPlay();

});
