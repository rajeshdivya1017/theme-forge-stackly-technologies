
/* ==========================================
   STACKLY TECHNOLOGIES
   ENQUIRY CONFIRMATION PAGE
   - Retrieve enquiry details
   - Display enquiry number
   - Display selected service
   - Copy enquiry number
========================================== */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /* ======================================
     COMMON ELEMENTS
  ====================================== */

  const number = document.getElementById("confirmationNumber");
  const service = document.getElementById("confirmationService");
  const copyButton = document.getElementById("copyEnquiryNumber");
  const copyMessage = document.getElementById("copyMessage");

  /* Stop if the required HTML elements are missing. */

  if (!number || !service || !copyButton || !copyMessage) {
    return;
  }

  /* ======================================
     RETRIEVE SAVED ENQUIRY
  ====================================== */

  let enquiry = null;

  try {
    enquiry = JSON.parse(
      sessionStorage.getItem("stacklyLatestEnquiry") || "null"
    );
  } catch (error) {
    enquiry = null;
  }

  /* ======================================
     DISPLAY ENQUIRY DETAILS
  ====================================== */

  if (enquiry) {
    number.textContent =
      enquiry.enquiryNumber ||
      "NX-" + new Date().getFullYear() + "-000000";

    service.textContent =
      "Service selected: " +
      (enquiry.serviceName || "your enquiry");
  }

  /* ======================================
     COPY ENQUIRY NUMBER
  ====================================== */

  copyButton.addEventListener("click", async function () {
    const enquiryNumber = number.textContent.trim();

    try {
      await navigator.clipboard.writeText(enquiryNumber);

      copyMessage.textContent = "Enquiry number copied.";
    } catch (error) {
      /* Fallback when clipboard access is unavailable. */

      const range = document.createRange();

      range.selectNodeContents(number);

      const selection = window.getSelection();

      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }

      copyMessage.textContent =
        "Select and copy your enquiry number.";
    }
  });
});

