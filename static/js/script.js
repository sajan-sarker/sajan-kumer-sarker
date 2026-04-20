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

  window.addEventListener("scroll", activateLink);
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
  activateLink();
});
