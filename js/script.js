// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

// Initialize all app functionality
function initializeApp() {
  // Header scroll effect
  initHeaderScroll();

  // Mobile navigation
  initMobileNav();

  // Testimonial carousel
  initTestimonialCarousel();

  // Course filtering (for courses page)
  initCourseFiltering();

  // Form validation
  initFormValidation();

  // Smooth scrolling
  initSmoothScrolling();

  // Newsletter form
  initNewsletterForm();

  // FAQ Accordions
  initFAQAccordions();

  // Blog Search
  initBlogSearch();
}

// Header scroll effect
function initHeaderScroll() {
  const header = document.getElementById("header");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)";
      header.style.boxShadow = "0 2px 30px rgba(0, 0, 0, 0.15)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    }
  });
}

// Mobile Navigation Toggle
function initMobileNav() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  }
}

// FAQ Accordions
function initFAQAccordions() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const icon = question.querySelector("i");

    question.addEventListener("click", function () {
      // Close other FAQ items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
          const otherAnswer = otherItem.querySelector(".faq-answer");
          const otherIcon = otherItem.querySelector(".faq-question i");
          otherAnswer.style.maxHeight = null;
          if (otherIcon) otherIcon.style.transform = "rotate(0deg)";
        }
      });

      // Toggle current FAQ item
      item.classList.toggle("active");

      if (item.classList.contains("active")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
        if (icon) icon.style.transform = "rotate(180deg)";
      } else {
        answer.style.maxHeight = null;
        if (icon) icon.style.transform = "rotate(0deg)";
      }
    });
  });
}

// Testimonial Carousel
function initTestimonialCarousel() {
  const slides = document.querySelectorAll(".testimonial-slide");
  const indicators = document.querySelectorAll(".indicator");
  const prevButton = document.querySelector(".carousel-prev");
  const nextButton = document.querySelector(".carousel-next");

  if (slides.length === 0) return;

  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => slide.classList.remove("active"));
    indicators.forEach((indicator) => indicator.classList.remove("active"));

    // Show current slide
    slides[index].classList.add("active");
    if (indicators[index]) {
      indicators[index].classList.add("active");
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  function startAutoPlay() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoPlay() {
    clearInterval(slideInterval);
  }

  // Event listeners
  if (nextButton) {
    nextButton.addEventListener("click", function () {
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    });
  }

  if (prevButton) {
    prevButton.addEventListener("click", function () {
      stopAutoPlay();
      prevSlide();
      startAutoPlay();
    });
  }

  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", function () {
      stopAutoPlay();
      currentSlide = index;
      showSlide(currentSlide);
      startAutoPlay();
    });
  });

  // Pause on hover
  const carousel = document.querySelector(".testimonials-carousel");
  if (carousel) {
    carousel.addEventListener("mouseenter", stopAutoPlay);
    carousel.addEventListener("mouseleave", startAutoPlay);
  }

  // Start autoplay
  startAutoPlay();
}

// Course Filtering (for courses page)
function initCourseFiltering() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const courseCards = document.querySelectorAll(".course-card");

  if (filterButtons.length === 0) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Filter courses
      courseCards.forEach((card) => {
        const category = card.getAttribute("data-category");

        if (
          filter === "all" ||
          category === filter ||
          (category && category.includes(filter))
        ) {
          card.style.display = "block";
          card.style.animation = "fadeIn 0.5s ease-in";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// Blog Search
function initBlogSearch() {
  const searchInput = document.getElementById("blog-search");
  const blogPosts = document.querySelectorAll(".blog-post");
  const categoryLinks = document.querySelectorAll(".categories a");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();

      blogPosts.forEach((post) => {
        const title = post.querySelector("h2, h3").textContent.toLowerCase();
        const content = post.querySelector("p").textContent.toLowerCase();

        if (title.includes(searchTerm) || content.includes(searchTerm)) {
          post.style.display = "block";
        } else {
          post.style.display = "none";
        }
      });
    });
  }

  // Category filtering
  categoryLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const category = this.getAttribute("data-category");

      blogPosts.forEach((post) => {
        if (category === "all") {
          post.style.display = "block";
        } else {
          const postCategory = post.querySelector(".post-category");
          if (postCategory && postCategory.classList.contains(category)) {
            post.style.display = "block";
          } else {
            post.style.display = "none";
          }
        }
      });
    });
  });
}

// Form Validation
function initFormValidation() {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      if (!validateForm(this)) {
        e.preventDefault();
      }
    });

    // Real-time validation
    const inputs = form.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateField(this);
      });
    });
  });
}

function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll(
    "input[required], textarea[required], select[required]"
  );

  inputs.forEach((input) => {
    if (!validateField(input)) {
      isValid = false;
    }
  });

  return isValid;
}

function validateField(field) {
  const value = field.value.trim();
  const type = field.type;
  let isValid = true;
  let errorMessage = "";

  // Remove existing error styling
  field.classList.remove("error");
  removeErrorMessage(field);

  // Required field validation
  if (field.hasAttribute("required") && !value) {
    isValid = false;
    errorMessage = "এই ঘরটি পূরণ করা আবশ্যক।";
  }
  // Email validation
  else if (type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = "সঠিক ইমেইল ঠিকানা দিন।";
    }
  }
  // Phone validation
  else if (type === "tel" && value) {
    const phoneRegex = /^[\+]?[0-9]{10,14}$/;
    if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ""))) {
      isValid = false;
      errorMessage = "সঠিক ফোন নম্বর দিন।";
    }
  }

  if (!isValid) {
    field.classList.add("error");
    showErrorMessage(field, errorMessage);
  }

  return isValid;
}

function showErrorMessage(field, message) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;
  errorDiv.style.color = "#dc2626";
  errorDiv.style.fontSize = "0.875rem";
  errorDiv.style.marginTop = "0.25rem";

  field.parentNode.appendChild(errorDiv);
}

function removeErrorMessage(field) {
  const existingError = field.parentNode.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }
}

// Smooth Scrolling for anchor links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Newsletter Form
function initNewsletterForm() {
  const newsletterForms = document.querySelectorAll(".newsletter-form");

  newsletterForms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = this.querySelector('input[type="email"]').value;

      if (email) {
        // Show success message
        showNotification("নিউজলেটার সাবস্ক্রিপশনের জন্য ধন্যবাদ!", "success");
        this.reset();
      } else {
        showNotification("সঠিক ইমেইল ঠিকানা দিন।", "error");
      }
    });
  });
}

// Contact Form Specific Handling
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (validateForm(this)) {
        // Show success message
        showNotification(
          "আপনার বার্তা পাঠানো হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।",
          "success"
        );
        this.reset();
      }
    });
  }
});

// Notification System
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Styling
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "1rem 1.5rem",
    borderRadius: "8px",
    color: "white",
    zIndex: "10000",
    maxWidth: "400px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease-in-out",
    backgroundColor:
      type === "success" ? "#10b981" : type === "error" ? "#dc2626" : "#3b82f6",
  });

  // Add to DOM
  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Close button functionality
  const closeButton = notification.querySelector(".notification-close");
  closeButton.addEventListener("click", function () {
    removeNotification(notification);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      removeNotification(notification);
    }
  }, 5000);
}

function removeNotification(notification) {
  notification.style.transform = "translateX(100%)";
  setTimeout(() => {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification);
    }
  }, 300);
}

// Add CSS for error styling and notifications
function addErrorStyles() {
  const style = document.createElement("style");
  style.textContent = `
        .error {
            border-color: #dc2626 !important;
            box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        
        .notification-close:hover {
            opacity: 0.8;
        }

        @media (max-width: 768px) {
            .notification {
                left: 20px !important;
                right: 20px !important;
                max-width: none !important;
            }
        }
    `;
  document.head.appendChild(style);
}

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  addErrorStyles();

  // Add loading animation completion
  document.body.classList.add("loaded");
});

// Handle page visibility change (pause/resume animations)
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    // Pause animations when tab is not visible
    document.body.style.animationPlayState = "paused";
  } else {
    // Resume animations when tab becomes visible
    document.body.style.animationPlayState = "running";
  }
});
Validation();

// Smooth scrolling
initSmoothScrolling();

// Newsletter form
initNewsletterForm();

// Header scroll effect
function initHeaderScroll() {
  const header = document.getElementById("header");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)";
      header.style.boxShadow = "0 2px 30px rgba(0, 0, 0, 0.15)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    }
  });
}

// Mobile Navigation Toggle
function initMobileNav() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  }
}

// Testimonial Carousel
function initTestimonialCarousel() {
  const slides = document.querySelectorAll(".testimonial-slide");
  const indicators = document.querySelectorAll(".indicator");
  const prevButton = document.querySelector(".carousel-prev");
  const nextButton = document.querySelector(".carousel-next");

  if (slides.length === 0) return;

  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => slide.classList.remove("active"));
    indicators.forEach((indicator) => indicator.classList.remove("active"));

    // Show current slide
    slides[index].classList.add("active");
    if (indicators[index]) {
      indicators[index].classList.add("active");
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  function startAutoPlay() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoPlay() {
    clearInterval(slideInterval);
  }

  // Event listeners
  if (nextButton) {
    nextButton.addEventListener("click", function () {
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    });
  }

  if (prevButton) {
    prevButton.addEventListener("click", function () {
      stopAutoPlay();
      prevSlide();
      startAutoPlay();
    });
  }

  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", function () {
      stopAutoPlay();
      currentSlide = index;
      showSlide(currentSlide);
      startAutoPlay();
    });
  });

  // Pause on hover
  const carousel = document.querySelector(".testimonials-carousel");
  if (carousel) {
    carousel.addEventListener("mouseenter", stopAutoPlay);
    carousel.addEventListener("mouseleave", startAutoPlay);
  }

  // Start autoplay
  startAutoPlay();
}

// Course Filtering (for courses page)
function initCourseFiltering() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const courseCards = document.querySelectorAll(".course-card");

  if (filterButtons.length === 0) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Filter courses
      courseCards.forEach((card) => {
        const category = card.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          card.style.display = "block";
          card.style.animation = "fadeIn 0.5s ease-in";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// Form Validation
function initFormValidation() {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      if (!validateForm(this)) {
        e.preventDefault();
      }
    });

    // Real-time validation
    const inputs = form.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateField(this);
      });
    });
  });
}

function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll(
    "input[required], textarea[required], select[required]"
  );

  inputs.forEach((input) => {
    if (!validateField(input)) {
      isValid = false;
    }
  });

  return isValid;
}

function validateField(field) {
  const value = field.value.trim();
  const type = field.type;
  let isValid = true;
  let errorMessage = "";

  // Remove existing error styling
  field.classList.remove("error");
  removeErrorMessage(field);

  // Required field validation
  if (field.hasAttribute("required") && !value) {
    isValid = false;
    errorMessage = "This field is required.";
  }
  // Email validation
  else if (type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = "Please enter a valid email address.";
    }
  }
  // Phone validation
  else if (type === "tel" && value) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ""))) {
      isValid = false;
      errorMessage = "Please enter a valid phone number.";
    }
  }

  if (!isValid) {
    field.classList.add("error");
    showErrorMessage(field, errorMessage);
  }

  return isValid;
}

function showErrorMessage(field, message) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;
  errorDiv.style.color = "#dc2626";
  errorDiv.style.fontSize = "0.875rem";
  errorDiv.style.marginTop = "0.25rem";

  field.parentNode.appendChild(errorDiv);
}

function removeErrorMessage(field) {
  const existingError = field.parentNode.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }
}

// Smooth Scrolling for anchor links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Newsletter Form
function initNewsletterForm() {
  const newsletterForm = document.getElementById("newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = this.querySelector('input[type="email"]').value;

      if (email) {
        // Show success message
        showNotification(
          "Thank you for subscribing to our newsletter!",
          "success"
        );
        this.reset();
      } else {
        showNotification("Please enter a valid email address.", "error");
      }
    });
  }
}

// Contact Form Specific Handling
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (validateForm(this)) {
        // Show success message
        showNotification(
          "Thank you for your message! We will get back to you soon.",
          "success"
        );
        this.reset();
      }
    });
  }
});

// Notification System
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Styling
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "1rem 1.5rem",
    borderRadius: "8px",
    color: "white",
    zIndex: "10000",
    maxWidth: "400px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease-in-out",
    backgroundColor:
      type === "success" ? "#10b981" : type === "error" ? "#dc2626" : "#3b82f6",
  });

  // Add to DOM
  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Close button functionality
  const closeButton = notification.querySelector(".notification-close");
  closeButton.addEventListener("click", function () {
    removeNotification(notification);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      removeNotification(notification);
    }
  }, 5000);
}

function removeNotification(notification) {
  notification.style.transform = "translateX(100%)";
  setTimeout(() => {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification);
    }
  }, 300);
}

// Image Lazy Loading (for better performance)
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach((img) => {
      img.src = img.dataset.src;
    });
  }
}

// Scroll to Top Button
function initScrollToTop() {
  // Create scroll to top button
  const scrollButton = document.createElement("button");
  scrollButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
  scrollButton.className = "scroll-to-top";
  scrollButton.setAttribute("aria-label", "Scroll to top");

  // Styling
  Object.assign(scrollButton.style, {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#1e3a8a",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "1.2rem",
    zIndex: "1000",
    opacity: "0",
    transform: "translateY(100px)",
    transition: "all 0.3s ease",
    boxShadow: "0 5px 15px rgba(30, 58, 138, 0.3)",
  });

  document.body.appendChild(scrollButton);

  // Show/hide button based on scroll position
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      scrollButton.style.opacity = "1";
      scrollButton.style.transform = "translateY(0)";
    } else {
      scrollButton.style.opacity = "0";
      scrollButton.style.transform = "translateY(100px)";
    }
  });

  // Scroll to top functionality
  scrollButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Hover effects
  scrollButton.addEventListener("mouseenter", function () {
    this.style.backgroundColor = "#1e40af";
    this.style.transform = "translateY(-5px) scale(1.1)";
  });

  scrollButton.addEventListener("mouseleave", function () {
    this.style.backgroundColor = "#1e3a8a";
    this.style.transform =
      window.scrollY > 300
        ? "translateY(0) scale(1)"
        : "translateY(100px) scale(1)";
  });
}

// Add CSS for error styling
function addErrorStyles() {
  const style = document.createElement("style");
  style.textContent = `
        .error {
            border-color: #dc2626 !important;
            box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        
        .notification-close:hover {
            opacity: 0.8;
        }

        .lazy {
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .lazy.loaded {
            opacity: 1;
        }

        @media (max-width: 768px) {
            .notification {
                left: 20px !important;
                right: 20px !important;
                max-width: none !important;
            }
            
            .scroll-to-top {
                bottom: 20px !important;
                right: 20px !important;
                width: 45px !important;
                height: 45px !important;
                font-size: 1rem !important;
            }
        }
    `;
  document.head.appendChild(style);
}

// Search functionality for blog page
function initBlogSearch() {
  const searchInput = document.querySelector(".search-box input");
  const blogPosts = document.querySelectorAll(".blog-post");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();

      blogPosts.forEach((post) => {
        const title = post.querySelector("h3").textContent.toLowerCase();
        const content = post.querySelector("p").textContent.toLowerCase();

        if (title.includes(searchTerm) || content.includes(searchTerm)) {
          post.style.display = "block";
        } else {
          post.style.display = "none";
        }
      });
    });
  }
}

// Counter animation for statistics (if needed)
function initCounterAnimation() {
  const counters = document.querySelectorAll("[data-count]");

  const observerOptions = {
    threshold: 0.7,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute("data-count"));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };

        updateCounter();
        observer.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

// Accordion functionality (for FAQ sections)
function initAccordions() {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const accordion = this.parentElement;
      const content = accordion.querySelector(".accordion-content");
      const icon = this.querySelector("i");

      // Close other accordions
      const allAccordions = document.querySelectorAll(".accordion-item");
      allAccordions.forEach((item) => {
        if (item !== accordion) {
          item.classList.remove("active");
          const otherContent = item.querySelector(".accordion-content");
          const otherIcon = item.querySelector(".accordion-header i");
          otherContent.style.maxHeight = null;
          if (otherIcon) otherIcon.style.transform = "rotate(0deg)";
        }
      });

      // Toggle current accordion
      accordion.classList.toggle("active");

      if (accordion.classList.contains("active")) {
        content.style.maxHeight = content.scrollHeight + "px";
        if (icon) icon.style.transform = "rotate(180deg)";
      } else {
        content.style.maxHeight = null;
        if (icon) icon.style.transform = "rotate(0deg)";
      }
    });
  });
}

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
  addErrorStyles();
  initScrollToTop();
  initLazyLoading();
  initBlogSearch();
  initCounterAnimation();
  initAccordions();

  // Add loading animation completion
  document.body.classList.add("loaded");
});

// Handle page visibility change (pause/resume animations)
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    // Pause animations when tab is not visible
    document.body.style.animationPlayState = "paused";
  } else {
    // Resume animations when tab becomes visible
    document.body.style.animationPlayState = "running";
  }
});

// Handle resize events
let resizeTimer;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    // Recalculate layout elements if needed
    const carousel = document.querySelector(".testimonials-carousel");
    if (carousel && window.innerWidth <= 768) {
      // Mobile-specific adjustments
    }
  }, 250);
});
