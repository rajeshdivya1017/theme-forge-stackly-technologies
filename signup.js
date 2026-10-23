document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    const form = document.getElementById("signinForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const forgotPassword = document.getElementById("forgotPassword");
    const submitButton = document.getElementById("signinButton");
    const buttonText = document.getElementById("buttonText");
    const message = document.getElementById("formMessage");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    function showMessage(text, type) {
        message.textContent = text;
        message.className = "auth-message show " + type;
    }

    function clearMessage() {
        message.textContent = "";
        message.className = "auth-message";
    }

    function clearErrors() {
        emailError.textContent = "";
        passwordError.textContent = "";
        clearMessage();
    }

    function validEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    if (togglePassword) {
        togglePassword.addEventListener("click", function () {
            const show = passwordInput.type === "password";
            passwordInput.type = show ? "text" : "password";
            togglePassword.textContent = show ? "Hide" : "Show";
            togglePassword.setAttribute(
                "aria-label",
                show ? "Hide password" : "Show password"
            );
        });
    }

    emailInput.addEventListener("input", clearErrors);
    passwordInput.addEventListener("input", clearErrors);

    if (forgotPassword) {
        forgotPassword.addEventListener("click", function (event) {
            event.preventDefault();
            clearErrors();

            const email = emailInput.value.trim();

            if (!email || !validEmail(email)) {
                emailError.textContent =
                    "Enter a valid email address first.";
                emailInput.focus();
                return;
            }

            showMessage(
                "Password recovery is not connected yet. Please contact STACKLY Technologies.",
                "info"
            );
        });
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        clearErrors();

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        let valid = true;

        if (!email || !validEmail(email)) {
            emailError.textContent = "Enter a valid email address.";
            valid = false;
        }

        if (!password.trim()) {
            passwordError.textContent = "Enter your password.";
            valid = false;
        }

        if (!valid) {
            showMessage(
                "Please correct the highlighted fields.",
                "error"
            );
            return;
        }

        showMessage(
            "The form is valid, but real account verification requires a backend authentication API.",
            "info"
        );
    });
});