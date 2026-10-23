
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const backButton = document.getElementById("errorBackButton");

  const homeLinks = document.querySelectorAll(
    "[data-loader-navigation]"
  );

  // Homepage is one level above the assets folder.
  const homeUrl = new URL("../index.html", window.location.href);
  /* =========================================
   1. GO BACK BUTTON
   Safe navigation with Home fallback
========================================= */

if (backButton) {
  backButton.addEventListener("click", (event) => {
    event.preventDefault();

    if (backButton.dataset.navigating === "true") {
      return;
    }

    backButton.dataset.navigating = "true";
    backButton.disabled = true;

    const fallbackHome = () => {
      window.location.replace(homeUrl.href);
    };

    // Check whether a previous page is available.
    
// Restore the exact page and scroll position saved before opening 404.
const savedPage = sessionStorage.getItem("stacklyPreviousPage");
const savedScrollY = sessionStorage.getItem("stacklyPreviousScrollY");

if (savedPage && savedScrollY !== null) {
  const previousPage = new URL(savedPage, window.location.href);

  if (previousPage.origin === window.location.origin) {
    sessionStorage.setItem("stacklyRestoreScrollY", savedScrollY);
    window.location.href = previousPage.href;
    return;
  }
}


    // If no usable previous page exists, go Home.
    fallbackHome();
  });
}

  /* =========================================
     2. HOME NAVIGATION
  ========================================= */

  function navigateToHome() {
    window.location.href = homeUrl.href;
  }

  /* =========================================
     3. HOME LINKS
     Preserve normal browser navigation.
     Do not start a loader on the 404 page.
  ========================================= */

  homeLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const destination = link.getAttribute("href");

      if (!destination) {
        return;
      }

      // Preserve opening links in a new tab/window.
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      ) {
        return;
      }

      const targetUrl = new URL(destination, window.location.href);

      // Only handle links that point to the homepage.
      if (targetUrl.pathname === homeUrl.pathname) {
        event.preventDefault();
        navigateToHome();
      }
    });
  });

  /* =========================================
     4. ACCESSIBILITY
  ========================================= */

  if (backButton) {
    backButton.addEventListener("keydown", (event) => {
      if (
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();
        backButton.click();
      }
    });
  }

  /* =========================================
     5. SHOW 404 PAGE CONTENT
  ========================================= */

  const errorContent = document.getElementById("errorSiteContent");

  if (errorContent) {
    errorContent.classList.add("error-page-ready");
  }
});

