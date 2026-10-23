
/* ==========================================
   STACKLY TECHNOLOGIES
   ENQUIRY FORM
   - Dynamic service fields
   - Service tab selection
   - Form validation
   - Session storage
   - Confirmation page navigation
========================================== */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /* ======================================
     COMMON ELEMENTS
  ====================================== */

  const form = document.getElementById("enquiryForm");
  const tabs = Array.from(document.querySelectorAll(".enquiry-tab"));

  const fieldsHost = document.getElementById("serviceFields");
  const title = document.getElementById("formServiceTitle");
  const description = document.getElementById("formServiceDescription");
  const error = document.getElementById("formError");

  /* Stop safely if the enquiry form is not present. */

  if (!form || !fieldsHost || !title || !description || !error) {
    return;
  }

  /* ======================================
     SERVICE CONFIGURATIONS
  ====================================== */

  const configs = {
    managed: {
      title: "Managed IT Enquiry",
      description:
        "Tell us about your IT support and infrastructure needs.",

      fields: [
        {
          name: "companySize",
          label: "Company Size",
          type: "select",
          required: true,
          options: [
            "Select company size",
            "1–10 employees",
            "11–50 employees",
            "51–200 employees",
            "201+ employees"
          ]
        },
        {
          name: "managedNeeds",
          label: "Managed IT Services Required",
          type: "select",
          required: true,
          options: [
            "Choose a service",
            "IT Helpdesk & Support",
            "Network Management",
            "IT Maintenance",
            "Infrastructure Management",
            "Backup & Recovery"
          ]
        },
        {
          name: "currentInfrastructure",
          label: "Current IT Infrastructure",
          type: "select",
          required: true,
          options: [
            "Choose current setup",
            "Mostly on-premises",
            "Mostly cloud-based",
            "Hybrid environment",
            "Need guidance"
          ]
        },
        {
          name: "supportCoverage",
          label: "Support Coverage Needed",
          type: "select",
          required: true,
          options: [
            "Choose coverage",
            "Business hours",
            "Extended hours",
            "24/7 support"
          ]
        }
      ]
    },

    cybersecurity: {
      title: "Cybersecurity Enquiry",
      description:
        "Share your security priorities so we can understand your risk and protection needs.",

      fields: [
        {
          name: "securityNeeds",
          label: "Security Services Required",
          type: "select",
          required: true,
          options: [
            "Choose a service",
            "Vulnerability Assessment",
            "Penetration Testing",
            "Security Audit",
            "Network Security",
            "Cloud Security",
            "Incident Response"
          ]
        },
        {
          name: "targetSystem",
          label: "System to Assess",
          type: "select",
          required: true,
          options: [
            "Choose target",
            "Website / Web Application",
            "Internal Network",
            "Cloud Environment",
            "Endpoints / Devices",
            "Multiple Systems"
          ]
        },
        {
          name: "securityStatus",
          label: "Current Security Status",
          type: "select",
          required: true,
          options: [
            "Choose current status",
            "No formal solution",
            "Basic security in place",
            "Advanced security in place",
            "Not sure"
          ]
        },
        {
          name: "urgency",
          label: "Priority",
          type: "select",
          required: true,
          options: [
            "Choose priority",
            "General enquiry",
            "High priority",
            "Urgent - active concern"
          ]
        }
      ]
    },

    cloud: {
      title: "Cloud Solutions Enquiry",
      description:
        "Tell us about your cloud platform, migration plans, and infrastructure goals.",

      fields: [
        {
          name: "cloudPlatform",
          label: "Preferred Cloud Platform",
          type: "select",
          required: true,
          options: [
            "Choose platform",
            "Amazon Web Services (AWS)",
            "Microsoft Azure",
            "Google Cloud",
            "Private Cloud",
            "Not sure yet"
          ]
        },
        {
          name: "cloudNeeds",
          label: "Cloud Services Required",
          type: "select",
          required: true,
          options: [
            "Choose a service",
            "Cloud Migration",
            "Cloud Hosting",
            "Cloud Infrastructure Setup",
            "Cloud Cost Optimization",
            "Cloud Security & Backup"
          ]
        },
        {
          name: "currentSetup",
          label: "Current Infrastructure",
          type: "select",
          required: true,
          options: [
            "Choose current setup",
            "On-premises servers",
            "Already using cloud",
            "Hybrid environment",
            "Starting from scratch"
          ]
        },
        {
          name: "timeline",
          label: "Expected Timeline",
          type: "select",
          required: true,
          options: [
            "Choose timeline",
            "Immediately",
            "Within 1 month",
            "Within 3 months",
            "Researching options"
          ]
        }
      ]
    },

    consulting: {
      title: "IT Consulting Enquiry",
      description:
        "Describe your business goals and the technology guidance you are looking for.",

      fields: [
        {
          name: "consultingArea",
          label: "Consulting Area",
          type: "select",
          required: true,
          options: [
            "Choose an area",
            "IT Strategy & Roadmap",
            "Digital Transformation",
            "Software Architecture",
            "Technology Assessment",
            "Process Automation"
          ]
        },
        {
          name: "projectStage",
          label: "Project Stage",
          type: "select",
          required: true,
          options: [
            "Choose project stage",
            "Planning stage",
            "Project in progress",
            "Improving an existing system",
            "Exploring possibilities"
          ]
        },
        {
          name: "budget",
          label: "Estimated Budget (optional)",
          type: "select",
          required: false,
          options: [
            "Prefer not to say",
            "Under ₹1 lakh",
            "₹1–5 lakhs",
            "₹5–15 lakhs",
            "₹15 lakhs+"
          ]
        },
        {
          name: "timeline",
          label: "Expected Timeline",
          type: "select",
          required: true,
          options: [
            "Choose timeline",
            "Within 1 month",
            "Within 3 months",
            "Within 6 months",
            "Flexible"
          ]
        }
      ]
    }
  };

  /* ======================================
     CURRENT SELECTED SERVICE
  ====================================== */

  let selectedService = "managed";

  /* ======================================
     HTML ESCAPE HELPER
     Safely renders labels and option values.
  ====================================== */

  function escapeHtml(value) {
    const characters = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return String(value).replace(/[&<>"']/g, function (character) {
      return characters[character];
    });
  }

  /* ======================================
     RENDER SERVICE FIELDS
  ====================================== */

  function renderService(service) {
    const config = configs[service];

    if (!config) {
      return;
    }

    selectedService = service;

    /* Update the form heading. */

    title.textContent = config.title;
    description.textContent = config.description;

    /* Generate the selected service fields. */

    fieldsHost.innerHTML = config.fields
      .map(function (field) {
        const required = field.required ? " required" : "";

        const star = field.required
          ? ' <span>*</span>'
          : "";

        const options = field.options
          .map(function (option, index) {
            const isPlaceholder =
              index === 0 &&
              (
                option.startsWith("Choose") ||
                option.startsWith("Select")
              );

            const value = isPlaceholder ? "" : option;

            return (
              '<option value="' +
              escapeHtml(value) +
              '">' +
              escapeHtml(option) +
              "</option>"
            );
          })
          .join("");

        return (
          '<div class="form-field">' +
            '<label for="' +
              escapeHtml(field.name) +
            '">' +
              escapeHtml(field.label) +
              star +
            "</label>" +

            '<select id="' +
              escapeHtml(field.name) +
              '" name="' +
              escapeHtml(field.name) +
              '"' +
              required +
            ">" +
              options +
            "</select>" +
          "</div>"
        );
      })
      .join("");

    /* Update the active service tab. */

    tabs.forEach(function (tab) {
      const isActive = tab.dataset.service === service;

      tab.classList.toggle("active", isActive);

      tab.setAttribute("aria-selected", String(isActive));
    });

    /* Clear previous validation messages. */

    error.textContent = "";
  }

  /* ======================================
     SERVICE TAB EVENTS
  ====================================== */

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      renderService(tab.dataset.service);
    });
  });

  /* ======================================
     FORM SUBMISSION
  ====================================== */

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    error.textContent = "";

    /* Validate required form fields. */

    if (!form.checkValidity()) {
      form.reportValidity();

      error.textContent =
        "Please complete all required fields before submitting.";

      return;
    }

    /* Collect submitted form data. */

    const data = Object.fromEntries(
      new FormData(form).entries()
    );

    data.service = selectedService;

    data.serviceName = configs[selectedService].title.replace(
      " Enquiry",
      ""
    );

    data.enquiryNumber =
      "NX-" +
      new Date().getFullYear() +
      "-" +
      String(Date.now()).slice(-6);

    data.submittedAt = new Date().toISOString();

    /* Save enquiry details for the confirmation page. */

    try {
      sessionStorage.setItem(
        "stacklyLatestEnquiry",
        JSON.stringify(data)
      );
    } catch (storageError) {
      error.textContent =
        "Your browser could not save this enquiry for the confirmation screen. Please allow session storage and try again.";

      return;
    }

    /* Navigate to the confirmation page. */

    window.location.href = "enquiry-confirmation.html";
  });

  /* ======================================
     INITIALIZE DEFAULT SERVICE
  ====================================== */

  renderService("managed");
});

