// Combined and cleaned up script for navbar toggle and image slider
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const slides = document.querySelector('.slides');
  const nextBtn = document.getElementById('next');
  const prevBtn = document.getElementById('prev');
  const slideImages = document.querySelectorAll('.slides img');
  const totalSlides = slideImages.length;
  let index = 0;
  let autoSlideInterval = null;

  // Navbar toggle (guarded)
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // If there are no slides, nothing more to do
  if (!slides || totalSlides === 0) return;

  // Ensure each slide occupies full slider viewport (in case CSS is missing)
  slideImages.forEach(img => {
    img.style.flex = '0 0 100%';
  });

  function updateSlider() {
    slides.style.transform = `translateX(-${index * 100}%)`;
  }

  // Next/Prev handlers (guarded)
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      index = (index + 1) % totalSlides;
      updateSlider();
      restartAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      index = (index - 1 + totalSlides) % totalSlides;
      updateSlider();
      restartAutoSlide();
    });
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      index = (index + 1) % totalSlides;
      updateSlider();
    }, 4000);
  }

  function restartAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Start auto sliding
  startAutoSlide();
});


// 3D tilt effect for modern cards
document.querySelectorAll(".modern-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // Mouse X inside card
    const y = e.clientY - rect.top;  // Mouse Y inside card

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10; // max 10deg tilt
    const rotateY = ((x - centerX) / centerX) * -10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  });
});



// ===== SCROLL-TRIGGERED COUNTER ANIMATION (with + sign) =====
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const speed = 100; // Lower = faster
  let started = false; // Ensures animation runs once

  // Function to animate counting
  const startCounting = () => {
    counters.forEach((counter) => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText.replace("+", "");
        const increment = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment).toLocaleString() + "+";
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target.toLocaleString() + "+"; // Add + at the end
        }
      };
      updateCount();
    });
  };

  // Observe when the stats section becomes visible
  const statsSection = document.querySelector(".stats-section");
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;
          statsSection.classList.add("visible");
          startCounting();
          observer.disconnect(); // Stop observing once animation starts
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(statsSection);
});
