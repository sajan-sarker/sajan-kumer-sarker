document.addEventListener("DOMContentLoaded", () => {
  // Contact Form Submission
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      await fetch("/send-email", {
        method: "POST",
        body: formData,
      });
      window.location.href = "/";
    });
  }

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Mobile Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Image Modal
  window.openModal = function (src) {
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("modalImage");
    modal.style.display = "flex";
    modalImg.src = src;
  };

  document.getElementById("modalClose").addEventListener("click", () => {
    document.getElementById("imgModal").style.display = "none";
  });

  // Close Modal on Outside Click
  document.getElementById("imgModal").addEventListener("click", (e) => {
    if (e.target.id === "imgModal") {
      e.target.style.display = "none";
    }
  });

  // Scrollspy (Active Nav Highlight)
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function activateLink() {
    let scrollY = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120; // adjust for navbar height
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.dataset.section === sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", activateLink);
});
