(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("nav-menu");
  var navLinks = document.querySelectorAll(".nav__link");

  function setHeaderScrolled() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  setHeaderScrolled();
  window.addEventListener("scroll", setHeaderScrolled, { passive: true });

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      menu.classList.toggle("is-open", !open);
      document.body.style.overflow = !open ? "hidden" : "";
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        menu.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        toggle.setAttribute("aria-expanded", "false");
        menu.classList.remove("is-open");
        document.body.style.overflow = "";
      }
    });
  }

  var sections = document.querySelectorAll("main section[id]");
  var linkById = {};
  navLinks.forEach(function (link) {
    var href = link.getAttribute("href");
    if (href && href.charAt(0) === "#") {
      linkById[href.slice(1)] = link;
    }
  });

  function updateActiveNav() {
    var navH = 80;
    var activeId = null;
    sections.forEach(function (sec) {
      var top = sec.getBoundingClientRect().top;
      if (top <= navH) {
        activeId = sec.id;
      }
    });
    navLinks.forEach(function (link) {
      link.classList.remove("is-active");
    });
    if (activeId && linkById[activeId]) {
      linkById[activeId].classList.add("is-active");
    }
  }

  updateActiveNav();
  window.addEventListener("scroll", updateActiveNav, { passive: true });

  var revealEls = document.querySelectorAll(
    ".section__head, .about__grid, .skills__wrap, .timeline, .project-grid, .cert-list, .coco-grid, .resume-block__panel"
  );
  revealEls.forEach(function (el) {
    el.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      obs.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
