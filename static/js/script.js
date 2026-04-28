document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImage");
  const modalClose = document.getElementById("modalClose");
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
  const sections = document.querySelectorAll("section[id]");
  const revealElements = document.querySelectorAll(".reveal");
  const glowTargets = document.querySelectorAll(
    ".card, .content-card, .project-card, .project-card > a, .project-tech span, .skill-tags span, .btn-primary, .btn-secondary, .social-links a[aria-label='GitHub']"
  );

  // Smooth scrolling for in-page anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      const target = targetId ? document.querySelector(targetId) : null;
      if (!target) {
        return;
      }
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
      });
      mobileMenu?.classList.add("hidden");
    });
  });

  // Mobile menu toggle
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Certificate image modal
  window.openModal = function (src) {
    if (!modal || !modalImg) {
      return;
    }
    modalImg.src = src;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  };

  function closeModal() {
    if (modal) {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  }

  modalClose?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => {
    if (e.target.id === "imgModal") {
      closeModal();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  // Scrollspy active section highlighting
  function activateLink() {
    const scrollY = window.scrollY + 140;
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        [...navLinks, ...mobileNavLinks].forEach((link) => {
          link.classList.toggle("active", link.dataset.section === sectionId);
        });
      }
    });
  }

  // Reveal animations on scroll
  function revealOnScroll() {
    revealElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        element.classList.add("is-visible");
      }
    });
  }

  // Cursor-follow glow on cards/chips/buttons
  glowTargets.forEach((element) => {
    element.classList.add("cursor-glow");

    element.addEventListener("mousemove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      element.style.setProperty("--glow-x", `${x}px`);
      element.style.setProperty("--glow-y", `${y}px`);

      if (element.matches(".project-tech span, .skill-tags span, .project-card > a, .social-links a[aria-label='GitHub']")) {
        const hue = Math.round(((x / Math.max(rect.width, 1)) * 320 + (y / Math.max(rect.height, 1)) * 40) % 360);
        element.style.setProperty("--chip-hue", `${hue}`);
      }

      if (element.matches(".btn-primary, .btn-secondary")) {
        const hue = Math.round(210 + (x / Math.max(rect.width, 1)) * 70);
        element.style.setProperty("--chip-hue", `${hue}`);
      }

      element.classList.add("is-glow-active");
    });

    element.addEventListener("mouseleave", () => {
      element.classList.remove("is-glow-active");
    });
  });

  window.addEventListener("scroll", activateLink);
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
  activateLink();
});
