
/* ========================================
   STACKLY TECHNOLOGIES
   NAVIGATION + PRELOADER + HOMEPAGE
   REPEATING SCROLL REVEALS
   ACTIVITY CHART + CONTACT TYPEWRITER
   MOBILE MENU SCROLL LOCK FIX
   REUSABLE 404 PAGE TRANSITION
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    /* ======================================
     PRESERVE BROWSER SCROLL POSITION
  ====================================== */

  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "auto";
  }
  "use strict";

  /* ======================================
     COMMON ELEMENTS
  ====================================== */

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-link");
  const signupButton = document.querySelector(".signup-button");
  const currentYear = document.getElementById("currentYear");

  const preloader = document.getElementById("sitePreloader");
  const laptop = document.getElementById("laptop3D");
  const percentText = document.getElementById("loadingPercent");
  const progressBar = document.getElementById("loadingProgress");
  const loadingMessage = document.getElementById("loadingMessage");

  const contactCommentCard = document.getElementById(
    "contactCommentCard"
  );

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let isPageTransitioning = false;

  /* ======================================
     CURRENT YEAR
  ====================================== */

  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }

  /* ======================================
     INJECT TARGETED ANIMATION STYLES
  ====================================== */

  function addHomepageAnimationStyles() {
    if (document.getElementById("stackly-home-animation-styles")) {
      return;
    }

    const style = document.createElement("style");

    style.id = "stackly-home-animation-styles";

    style.textContent = `
      /* HERO SEQUENCE */

      body.is-loading .hero-visual,
      body.is-loading .hero-content {
        opacity: 0;
        animation: none !important;
      }

      body.stackly-loader-complete .hero-visual {
        animation: stacklyHeroGraphReveal 0.9s ease both !important;
        animation-delay: 0s !important;
      }

      body.stackly-loader-complete .hero-content {
        animation: stacklyHeroTextReveal 0.9s ease both !important;
        animation-delay: 3s !important;
      }

      @keyframes stacklyHeroGraphReveal {
        from {
          opacity: 0;
          transform: translate3d(0, 24px, 0) scale(0.98);
        }

        to {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
        }
      }

      @keyframes stacklyHeroTextReveal {
        from {
          opacity: 0;
          transform: translate3d(0, 22px, 0);
        }

        to {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }

      /* ACTIVITY GRAPH BORDER GLITTER */

      .activity-card {
        position: relative;
        isolation: isolate;
        --stackly-glitter-position: -150%;
      }

      .activity-card::after {
        content: "";
        position: absolute;
        inset: -1px;
        padding: 1px;
        border-radius: inherit;
        pointer-events: none;
        z-index: 2;

        background: linear-gradient(
          110deg,
          transparent 0%,
          transparent 35%,
          rgba(101, 212, 183, 0.12) 43%,
          rgba(138, 243, 255, 0.72) 49%,
          rgba(101, 212, 183, 0.24) 54%,
          transparent 65%,
          transparent 100%
        );

        background-size: 250% 100%;
        background-position: var(--stackly-glitter-position) 0;

        -webkit-mask:
          linear-gradient(#fff 0 0) content-box,
          linear-gradient(#fff 0 0);

        -webkit-mask-composite: xor;
        mask-composite: exclude;

        animation: stacklyGraphBorderGlitter 7s ease-in-out infinite;
      }

      @keyframes stacklyGraphBorderGlitter {
        0% {
          background-position: -150% 0;
          opacity: 0;
        }

        12% {
          opacity: 0.8;
        }

        45% {
          background-position: 150% 0;
          opacity: 0.7;
        }

        55%,
        100% {
          background-position: 150% 0;
          opacity: 0;
        }
      }

      /* GRAPH BAR ALIGNMENT */

      .activity-chart {
        align-items: stretch;
      }

      .activity-chart .chart-month {
        position: relative;
        min-width: 0;
        height: 100%;
      }

      .activity-chart .bar-area {
        display: flex;
        align-items: flex-end;
        min-height: 0;
      }

      .activity-chart .chart-bar {
        display: block;
        flex-shrink: 0;
        height: var(--bar-height);
        transform-origin: center bottom;
      }

      .activity-chart .chart-month-current .june-growth {
        position: absolute;
        top: 0;
        left: 50%;
        z-index: 1;
        transform: translateX(-50%);
        white-space: nowrap;
      }

      .activity-chart .chart-month-current .bar-area {
        position: relative;
      }

      /* REPEATING SCROLL REVEALS */

      .features-list .feature-row,
      .information-cards .information-card {
        transition:
          opacity 0.65s ease,
          transform 0.65s ease,
          filter 0.65s ease;
      }

      .features-list .feature-row:not(.is-visible),
      .information-cards .information-card:not(.is-visible) {
        opacity: 0;
        filter: blur(2px);
      }

      .features-list .feature-row.reveal-left:not(.is-visible) {
        transform: translate3d(-45px, 0, 0);
      }

      .features-list .feature-row.reveal-right:not(.is-visible) {
        transform: translate3d(45px, 0, 0);
      }

      .information-cards .information-card.reveal-up:not(.is-visible) {
        transform: translate3d(0, 30px, 0);
      }

      .features-list .feature-row.is-visible,
      .information-cards .information-card.is-visible {
        opacity: 1;
        filter: blur(0);
        transform: translate3d(0, 0, 0);
      }

      /* CONTACT CARD INITIAL STATE */

      .contact-comment-card {
        opacity: 0;
        visibility: visible;
        pointer-events: auto;
        transform: translate3d(0, 24px, 0);
        transition:
          opacity 0.55s ease,
          transform 0.55s ease;
      }

      .contact-comment-card.is-contact-revealed {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }

      .contact-comment-card:not(.is-contact-revealed) .contact-cta-button {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transform: translate3d(0, 12px, 0);
      }

      .contact-comment-card.is-contact-revealed .contact-cta-button {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: translate3d(0, 0, 0);
        transition:
          opacity 0.45s ease,
          transform 0.45s ease,
          background-color 0.3s ease;
      }

      .contact-comment-card.is-contact-revealed .comment-card-body {
        opacity: 1;
      }

      .contact-comment-card:focus-visible {
        outline: 2px solid rgba(101, 212, 183, 0.85);
        outline-offset: 5px;
      }

      /* ACCESSIBILITY */

      @media (prefers-reduced-motion: reduce) {
        .activity-card::after {
          animation: none !important;
        }

        body.stackly-loader-complete .hero-visual,
        body.stackly-loader-complete .hero-content {
          animation: none !important;
          opacity: 1;
          transform: none;
        }

        .features-list .feature-row,
        .information-cards .information-card,
        .contact-comment-card,
        .contact-comment-card .contact-cta-button {
          transition-duration: 0.01ms !important;
        }
      }

      @media (max-width: 480px) {
        .activity-chart .chart-month-current .june-growth {
          font-size: 10px;
        }
      }
    `;

    document.head.appendChild(style);
  }

  addHomepageAnimationStyles();

  /* ======================================
     WAIT HELPER
  ====================================== */

  function wait(milliseconds) {
    return new Promise((resolve) => {
      window.setTimeout(resolve, milliseconds);
    });
  }

  /* ======================================
     EXISTING 3D LAPTOP PRELOADER

     Reuses the original laptop loader.
     Keeps its HTML in the DOM so it can
     be displayed again for page navigation.
  ====================================== */
  
  async function runPreloader(destination = null) {
  if (!preloader || !laptop || !percentText || !progressBar) {
    document.body.classList.remove("is-loading");
    document.body.classList.add("stackly-loader-complete");

    if (destination) {
      window.location.href = destination;
    }

    return;
  }

  // Reset the existing 3D laptop loader.
  preloader.classList.remove("is-finished", "is-rotating");

  document.body.classList.add("is-loading");
  document.body.classList.remove("stackly-loader-complete");

  percentText.textContent = "0%";
  progressBar.style.width = "0%";

  if (loadingMessage) {
    loadingMessage.textContent = "PREPARING YOUR EXPERIENCE";
  }

  // Restart the original laptop animation.
  void preloader.offsetWidth;

  await wait(1000);

  preloader.classList.add("is-rotating");

  await wait(1950);

  if (loadingMessage) {
    loadingMessage.textContent = "LOADING YOUR EXPERIENCE";
  }

  // Animate the progress percentage.
  const duration = 2200;
  const startTime = performance.now();

  await new Promise((resolve) => {
    function updateProgress(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const percentage = Math.round(easedProgress * 100);

      percentText.textContent = `${percentage}%`;
      progressBar.style.width = `${percentage}%`;

      if (progress < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        resolve();
      }
    }

    requestAnimationFrame(updateProgress);
  });

  if (loadingMessage) {
    loadingMessage.textContent = "WELCOME TO STACKLY TECHNOLOGY";
  }

  await wait(350);

  // Keep the loader visible until navigation starts.
  if (destination) {
    window.location.href = destination;
    return;
  }

  // Finish the loader only when staying on this page.
  preloader.classList.add("is-finished");

  document.body.classList.remove("is-loading");
  document.body.classList.add("stackly-loader-complete");

  isPageTransitioning = false;
}

// Run the original loader on initial page load.
const isAuthPage =
  document.body.classList.contains("signin-page") ||
  document.body.classList.contains("register-page");

const skipAuthLoader =
  isAuthPage &&
  sessionStorage.getItem("stacklySkipNextAuthLoader") === "true";

if (skipAuthLoader) {
  sessionStorage.removeItem("stacklySkipNextAuthLoader");

  if (preloader) {
    preloader.classList.add("is-finished");
    preloader.classList.remove("is-rotating");
  }

  document.body.classList.remove("is-loading");
  document.body.classList.add("stackly-loader-complete");
} else {
  runPreloader();
}

/* ======================================
RESTORE SCROLL POSITION AFTER 404
====================================== */

window.addEventListener("pageshow", () => {
const savedScrollY = sessionStorage.getItem(
"stacklyRestoreScrollY"
);

if (savedScrollY === null) {
  return;
}

sessionStorage.removeItem("stacklyRestoreScrollY");

// Wait until the page layout is ready.
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    window.scrollTo({
      top: Number(savedScrollY),
      left: 0,
      behavior: "auto"
    });
  });
});


});


/* ======================================
BROWSER BACK / FORWARD RESTORE FIX
====================================== */

window.addEventListener("pageshow", (event) => {
// Reset the loader when the browser restores this page.
if (event.persisted) {
if (preloader) {
preloader.classList.add("is-finished");
preloader.classList.remove("is-rotating");
}


  document.body.classList.remove("is-loading");
  document.body.classList.add("stackly-loader-complete");

  isPageTransitioning = false;

  // Close any previously opened mobile navigation.
  if (navLinks) {
    navLinks.classList.remove("is-open");
  }

  if (menuToggle) {
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }

  document.body.classList.remove("menu-open");
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";

  delete document.body.dataset.menuScrollLocked;
}


});


  /* ======================================
     MOBILE NAVIGATION + SCROLL LOCK

     1. Background cannot scroll while
        mobile menu is open.
     2. Original scroll position is restored
        when the menu closes.
     3. Escape and outside clicks close it.
     4. Navigation and Sign Up clicks close it.
     5. Resizing to desktop closes it.
  ====================================== */

  let savedScrollPosition = 0;
  let menuScrollLocked = false;

  function isMobileNavigation() {
    return window.matchMedia("(max-width: 760px)").matches;
  }

  function lockBackgroundScroll() {
    if (menuScrollLocked || !isMobileNavigation()) {
      return;
    }

    savedScrollPosition =
      window.scrollY || document.documentElement.scrollTop || 0;

    document.body.dataset.menuScrollLocked = "true";

    document.body.style.position = "fixed";
    document.body.style.top = `-${savedScrollPosition}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    menuScrollLocked = true;
  }

  function unlockBackgroundScroll() {
    if (!menuScrollLocked) {
      document.body.classList.remove("menu-open");
      return;
    }

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";

    delete document.body.dataset.menuScrollLocked;

    menuScrollLocked = false;

    window.scrollTo({
      top: savedScrollPosition,
      left: 0,
      behavior: "auto"
    });

    document.body.classList.remove("menu-open");
  }

  function openMenu() {
    if (!navLinks || !menuToggle) {
      return;
    }

    navLinks.classList.add("is-open");
    menuToggle.classList.add("is-open");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");

    if (isMobileNavigation()) {
      document.body.classList.add("menu-open");
      lockBackgroundScroll();
    }
  }

  function closeMenu() {
    if (navLinks) {
      navLinks.classList.remove("is-open");
    }

    if (menuToggle) {
      menuToggle.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

    unlockBackgroundScroll();
  }

  if (menuToggle && navLinks) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-controls", "navLinks");
    menuToggle.setAttribute("aria-label", "Open navigation menu");

    menuToggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const isOpen = navLinks.classList.contains("is-open");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    /* Close menu after clicking a navigation link. */

    navItems.forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    /* Close menu after clicking Sign Up. */

    if (signupButton) {
      signupButton.addEventListener("click", () => {
        closeMenu();
      });
    }

    /* Close menu when clicking outside it. */

    document.addEventListener("click", (event) => {
      if (!navLinks.classList.contains("is-open")) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      const clickedInsideMenu = navLinks.contains(target);
      const clickedToggle = menuToggle.contains(target);

      if (!clickedInsideMenu && !clickedToggle) {
        closeMenu();
      }
    });

    /* Close menu with Escape. */

    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        navLinks.classList.contains("is-open")
      ) {
        closeMenu();
        menuToggle.focus();
      }
    });

    /* Close menu when switching to desktop. */

    window.addEventListener("resize", () => {
      if (!isMobileNavigation()) {
        closeMenu();
      } else if (navLinks.classList.contains("is-open")) {
        lockBackgroundScroll();
        document.body.classList.add("menu-open");
      }
    });
  }

  
  /* ======================================
     ACTIVE NAV LINK
  ====================================== */

  function updateActiveLink() {
    const currentPage =
      window.location.pathname.split("/").pop().toLowerCase() ||
      "index.html";

    const currentHash = window.location.hash.toLowerCase();

    navItems.forEach((link) => {
      const href = link.getAttribute("href");

      if (!href) {
        link.classList.remove("active");
        return;
      }

      const linkUrl = new URL(href, window.location.href);

      const linkPage = linkUrl.pathname
        .split("/")
        .pop()
        .toLowerCase();

      let isActive = linkPage === currentPage;

      if (currentPage === "index.html" && linkUrl.hash) {
        isActive =
          linkPage === currentPage &&
          linkUrl.hash.toLowerCase() === (currentHash || "#home");
      }

      link.classList.toggle("active", isActive);
    });
  }

  window.addEventListener("hashchange", updateActiveLink);

  updateActiveLink();

  if (signupButton) {
    signupButton.addEventListener("click", closeMenu);
  }



  /* ======================================
     SMOOTH INTERNAL NAVIGATION
  ====================================== */

  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") {
        return;
      }

      let targetElement;

      try {
        targetElement = document.querySelector(href);
      } catch {
        return;
      }

      if (!targetElement) {
        return;
      }

      event.preventDefault();

      closeMenu();

      targetElement.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });

      if (window.location.hash !== href) {
        window.history.replaceState(null, "", href);
        updateActiveLink();
      }
    });
  });


/* ======================================
   404 PAGE NAVIGATION

   Use the existing 3D laptop preloader
   for every link that opens the 404 page.
====================================== */

document.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof Element)) {
    return;
  }

  // Find the clicked link, including links with icons.
  const link = target.closest("a[href]");

  if (!(link instanceof HTMLAnchorElement)) {
    return;
  }

  // Resolve relative and absolute paths correctly.
  const destination = new URL(link.href, window.location.href);

  // Only handle links pointing to the 404 page.
  const is404Page =
    destination.pathname.endsWith("/assets/404.html") ||
    destination.pathname.endsWith("/404.html");

  if (!is404Page) {
    return;
  }

  // Preserve browser shortcuts and middle-click.
  if (
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  ) {
    return;
  }

  event.preventDefault();

  sessionStorage.setItem(
"stacklyPreviousPage",
window.location.href
);

sessionStorage.setItem(
"stacklyPreviousScrollY",
String(window.scrollY)
);


  // Prevent multiple transitions from starting.
  if (isPageTransitioning) {
    return;
  }

  isPageTransitioning = true;

  // Close the mobile menu if it is open.
  if (navLinks && navLinks.classList.contains("is-open")) {
    closeMenu();
  }

  // Reuse the original 3D laptop preloader.
  // Navigate only after the animation completes.
  runPreloader(destination.href);
});



  /* ======================================
     SCROLL REVEAL
  ====================================== */

  const repeatingRevealElements = document.querySelectorAll(
    ".features-list .feature-row, " +
    ".information-cards .information-card"
  );

  const repeatingRevealSet = new Set(repeatingRevealElements);

  const otherRevealElements = document.querySelectorAll(
    ".reveal-left, .reveal-right, .reveal-up"
  );

  if (
    prefersReducedMotion ||
    !("IntersectionObserver" in window)
  ) {
    otherRevealElements.forEach((element) => {
      element.classList.add("is-visible");
    });

    repeatingRevealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  } else {
    /* Repeating observer for feature and information cards. */

    const repeatingRevealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -25px 0px"
      }
    );

    repeatingRevealElements.forEach((element) => {
      repeatingRevealObserver.observe(element);
    });

    /* Existing one-time reveal for other sections. */

    const otherRevealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    otherRevealElements.forEach((element) => {
      if (!repeatingRevealSet.has(element)) {
        otherRevealObserver.observe(element);
      }
    });
  }

  /* ======================================
     ACTIVITY CHART ANIMATION
  ====================================== */

  const activityChart = document.querySelector(".activity-chart");

  function animateChart() {
    if (!activityChart) {
      return;
    }

    const chartBars = activityChart.querySelectorAll(".chart-bar");

    chartBars.forEach((bar) => {
      bar.style.animation = "none";

      /* Force the browser to restart animation. */

      void bar.offsetWidth;

      bar.style.animation = "";
    });
  }

  if (
    activityChart &&
    "IntersectionObserver" in window
  ) {
    const chartObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateChart();
          }
        });
      },
      {
        threshold: 0.2
      }
    );

    chartObserver.observe(activityChart);
  }

    /* ======================================
     CONTACT CARD + AUTOMATIC TYPEWRITER
     Starts when the contact section enters view.
  ====================================== */

  if (contactCommentCard) {
    const typewriterElements = Array.from(
      contactCommentCard.querySelectorAll("[data-typewriter]")
    );

    const originalText = typewriterElements.map((element) => {
      return element.dataset.typewriter || "";
    });

    let typingTimers = [];
    let typingRunId = 0;
    let isTyping = false;
    let hasStarted = false;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function clearTypingTimers() {
      typingTimers.forEach((timerId) => {
        window.clearTimeout(timerId);
      });

      typingTimers = [];
    }

    function stopTyping() {
      typingRunId++;

      clearTypingTimers();

      isTyping = false;

      contactCommentCard.classList.remove("is-typing");
    }

    function startTyping() {
      if (isTyping || hasStarted) {
        return;
      }

      hasStarted = true;
      isTyping = true;

      const currentRunId = ++typingRunId;

      contactCommentCard.classList.add("is-contact-revealed");
      contactCommentCard.classList.add("is-typing");

      typewriterElements.forEach((element) => {
        element.textContent = "";
      });

      let globalDelay = 0;

      typewriterElements.forEach((element, elementIndex) => {
        const text = originalText[elementIndex];
        const characters = Array.from(text);

        characters.forEach((character) => {
          globalDelay += prefersReducedMotion ? 0 : 24;

          const timerId = window.setTimeout(() => {
            if (currentRunId !== typingRunId) {
              return;
            }

            element.textContent += character;
          }, globalDelay);

          typingTimers.push(timerId);
        });

        globalDelay += prefersReducedMotion ? 0 : 250;
      });

      const finishTimer = window.setTimeout(() => {
        if (currentRunId !== typingRunId) {
          return;
        }

        isTyping = false;

        contactCommentCard.classList.remove("is-typing");
      }, globalDelay + 50);

      typingTimers.push(finishTimer);
    }

    if ("IntersectionObserver" in window) {
  const contactObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Contact section screen-kulla varumbodhu
          contactCommentCard.classList.add("is-contact-revealed");

          // Text animation-ai restart panna allow pannuvom
          hasStarted = false;

          typewriterElements.forEach((element, index) => {
            element.textContent = originalText[index];
          });

          startTyping();
        } else {
          // Contact section screen-ai vittu veliya pona
          stopTyping();

          contactCommentCard.classList.remove("is-contact-revealed");

          hasStarted = false;

          typewriterElements.forEach((element) => {
            element.textContent = "";
          });
        }
      });
    },
    {
      threshold: 0.2
    }
  );

  contactObserver.observe(contactCommentCard);
} else {
  startTyping();
}

    contactCommentCard.addEventListener("focusin", () => {
      contactCommentCard.classList.add("is-contact-revealed");
      startTyping();
    });
  }

  /* ======================================
     FOOTER SUBSCRIPTION

     Existing demo behavior is preserved.
  ====================================== */
});