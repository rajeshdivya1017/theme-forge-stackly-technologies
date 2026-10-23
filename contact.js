"use strict";

(() => {
const form = document.getElementById("contactForm");
const successOverlay = document.getElementById("contactSuccess");
const closeButton = document.getElementById("successClose");


if (!form || !successOverlay || !closeButton) {
    return;
}

// Reset the form and close the success popup.
function resetContactForm() {
    form.reset();

    successOverlay.classList.remove("is-visible");
    successOverlay.setAttribute("aria-hidden", "true");
}

// Start with an empty form when the page loads.
resetContactForm();

// Reset the form when returning through browser Back/Forward.
window.addEventListener("pageshow", () => {
    resetContactForm();
});

// Handle form submission.
form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
        return;
    }

    /*
     * Frontend-only demo:
     * This displays a success message but does not send or save
     * the enquiry to the company.
     */

    successOverlay.classList.add("is-visible");
    successOverlay.setAttribute("aria-hidden", "false");

    closeButton.focus();
});

// Close popup and clear all entered details.
function closeSuccessMessage() {
    resetContactForm();

    // Return focus to the name field.
    const nameField = document.getElementById("contactName");

    if (nameField) {
        nameField.focus();
    }
}

// Back to Contact Page button.
closeButton.addEventListener("click", closeSuccessMessage);

// Close popup when clicking outside the success card.
successOverlay.addEventListener("click", (event) => {
    if (event.target === successOverlay) {
        closeSuccessMessage();
    }
});

// Close popup using Escape key.
document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        successOverlay.classList.contains("is-visible")
    ) {
        closeSuccessMessage();
    }
});


})();
