
// Rotating Subtitle Text
// =======================================================================

// Texts that will rotate in the hero section
const rotatingTexts = [
  'Aspiring Cloud Engineer',
  'AWS Certified Cloud Practitioner',
  'Building Cloud & AWS Projects'
];

// Keeps track of current text index
let currentTextIndex = 0;

// Updates the subtitle text every few seconds
function updateSubtitle() {
  const subtitleElement = document.getElementById('subTitle');

  // If element doesn't exist, stop execution
  if (!subtitleElement) return;

  // Set new text
  subtitleElement.textContent = rotatingTexts[currentTextIndex];

  // Move to next text (loop back if needed)
  currentTextIndex = (currentTextIndex + 1) % rotatingTexts.length;
}


// Scroll Animation
// ====================================================================

// Check if an element is visible in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();

  return (
    rect.top < window.innerHeight &&
    rect.bottom > 0
  );
}

// Adds animation class when element enters viewport
function animateOnScroll() {
  const animatedElements = document.querySelectorAll('.reveal-on-scroll');

  animatedElements.forEach((element) => {
    if (
      isInViewport(element) &&
      !element.classList.contains('animate-slide')
    ) {
      element.classList.add('animate-slide');
    }
  });
}


// Performance Optimization (Throttle Scroll)
// ================================================================

// Prevents excessive scroll event firing
function setupScrollAnimation() {
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;

    window.requestAnimationFrame(() => {
      animateOnScroll();
      ticking = false;
    });

    ticking = true;
  });
}


// Initialize Everything
// ===================================================================

window.addEventListener('load', () => {
  // Set initial subtitle text
  updateSubtitle();

  // Run animation check on load
  animateOnScroll();

  // Start rotating text every 2 seconds
  setInterval(updateSubtitle, 2000);

  // Enable scroll animations
  setupScrollAnimation();
});