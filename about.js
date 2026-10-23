/* ========================================
STACKLY TECHNOLOGIES
ABOUT PAGE INTERACTIONS

* Reuses the existing 3D laptop loader.
* Preserves existing navigation behaviour.
* Adds About page scroll reveals.
* Keeps footer subscription functional.
  ======================================== */

document.addEventListener("DOMContentLoaded", () => {
"use strict";

/* ======================================
COMMON ELEMENTS
====================================== */

const preloader = document.getElementById("sitePreloader");
const laptop = document.getElementById("laptop3D");
const percentText = document.getElementById("loadingPercent");
const progressBar = document.getElementById("loadingProgress");
const loadingMessage = document.getElementById("loadingMessage");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const currentYear = document.getElementById("currentYear");

const footerSubscribeForm = document.getElementById(
"footerSubscribeForm"
);

const footerEmail = document.getElementById("footerEmail");

const footerFormMessage = document.getElementById(
"footerFormMessage"
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
WAIT HELPER
====================================== */

function wait(milliseconds) {
return new Promise((resolve) => {
window.setTimeout(resolve, milliseconds);
});
}

/* ======================================
EXISTING 3D LAPTOP PRELOADER

```
 The original HTML structure, IDs,
 classes, and animation sequence remain
 compatible with the homepage.
```

====================================== */

async function runPreloader(destination = null) {
if (
!preloader ||
!laptop ||
!percentText ||
!progressBar
) {
document.body.classList.remove("is-loading");
document.body.classList.add("stackly-loader-complete");


  if (destination) {
    window.location.href = destination;
  }

  return;
}

preloader.classList.remove("is-finished", "is-rotating");

document.body.classList.add("is-loading");
document.body.classList.remove("stackly-loader-complete");

percentText.textContent = "0%";
progressBar.style.width = "0%";

if (loadingMessage) {
  loadingMessage.textContent = "PREPARING YOUR EXPERIENCE";
}

void preloader.offsetWidth;

await wait(1000);

preloader.classList.add("is-rotating");

await wait(1950);

if (loadingMessage) {
  loadingMessage.textContent = "LOADING YOUR EXPERIENCE";
}

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

if (destination) {
  window.location.href = destination;
  return;
}

preloader.classList.add("is-finished");

document.body.classList.remove("is-loading");
document.body.classList.add("stackly-loader-complete");

isPageTransitioning = false;


}

/* Start the original loader on page load. */

runPreloader();

/* ======================================
MOBILE NAVIGATION
Handled by script.js
====================================== */

function closeMenu() {
if (navLinks) {
navLinks.classList.remove("is-open");
}

if (menuToggle) {
menuToggle.classList.remove("is-open");
menuToggle.setAttribute("aria-expanded", "false");
menuToggle.setAttribute("aria-label", "Open navigation menu");
}

document.body.classList.remove("menu-open");



}

/* ======================================
SMOOTH INTERNAL NAVIGATION
====================================== */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
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
  }
});


});

/* ======================================
PRELOADER FOR EXISTING 404 LINKS
====================================== */

document.addEventListener("click", (event) => {
const target = event.target;


if (!(target instanceof Element)) {
  return;
}

const link = target.closest("a[href]");

if (!(link instanceof HTMLAnchorElement)) {
  return;
}

const destination = new URL(
  link.href,
  window.location.href
);

const is404Page =
  destination.pathname.endsWith("/assets/404.html") ||
  destination.pathname.endsWith("/404.html");

if (!is404Page) {
  return;
}

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

if (isPageTransitioning) {
  return;
}

isPageTransitioning = true;

closeMenu();

runPreloader(destination.href);


});

/* ======================================
ABOUT PAGE SCROLL REVEALS
====================================== */

const revealElements = document.querySelectorAll(
".about-reveal"
);

if (
prefersReducedMotion ||
!("IntersectionObserver" in window)
) {
revealElements.forEach((element) => {
element.classList.add("about-visible");
});
} else {
const revealObserver = new IntersectionObserver(
(entries) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
entry.target.classList.add("about-visible");
} else {
entry.target.classList.remove("about-visible");
}
});
},
{
threshold: 0.12,
rootMargin: "0px 0px -25px 0px"
}
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});


}

/* ======================================
FOOTER SUBSCRIPTION DEMO
====================================== */

if (
footerSubscribeForm &&
footerEmail &&
footerFormMessage
) {
footerSubscribeForm.addEventListener("submit", (event) => {
event.preventDefault();


  if (!footerEmail.checkValidity()) {
    footerEmail.reportValidity();
    return;
  }

  footerFormMessage.textContent =
    "Thanks! Email subscription needs to be connected to a service.";
});


}

});
