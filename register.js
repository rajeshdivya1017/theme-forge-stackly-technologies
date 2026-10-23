document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    const form = document.getElementById("registerForm");

    const nameInput = document.getElementById("fullName");
    const emailInput = document.getElementById("registerEmail");
    const passwordInput = document.getElementById("registerPassword");
    const confirmInput = document.getElementById("confirmPassword");
    const termsInput = document.getElementById("terms");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("registerEmailError");
    const passwordError = document.getElementById("registerPasswordError");
    const confirmError = document.getElementById("confirmPasswordError");
    const termsError = document.getElementById("termsError");

    const message = document.getElementById("registerMessage");

    function showMessage(text, type) {
        message.textContent = text;
        message.className = "auth-message show " + type;
    }

    function clearMessage() {
        message.textContent = "";
        message.className = "auth-message";
    }

    function validEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function clearErrors() {
        nameError.textContent = "";
        emailError.textContent = "";
        passwordError.textContent = "";
        confirmError.textContent = "";
        termsError.textContent = "";
        clearMessage();
    }

    /* Show / hide passwords */

    document.querySelectorAll(".register-page .auth-toggle-password")
        .forEach(function (button) {

            button.addEventListener("click", function () {
                const input = document.getElementById(
                    button.dataset.password
                );

                const show = input.type === "password";

                input.type = show ? "text" : "password";
                button.textContent = show ? "Hide" : "Show";
                button.setAttribute(
                    "aria-label",
                    show ? "Hide password" : "Show password"
                );
            });

        });

    /* Clear field errors while typing */

    [nameInput, emailInput, passwordInput, confirmInput].forEach(
        function (input) {
            input.addEventListener("input", clearErrors);
        }
    );

    termsInput.addEventListener("change", clearErrors);

    /* Validate form */

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        clearErrors();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmInput.value;

        let valid = true;

        if (name.length < 2) {
            nameError.textContent = "Enter your full name.";
            valid = false;
        }

        if (!validEmail(email)) {
            emailError.textContent = "Enter a valid email address.";
            valid = false;
        }

        if (password.length < 8) {
            passwordError.textContent =
                "Password must contain at least 8 characters.";
            valid = false;
        }

        if (confirmPassword !== password) {
            confirmError.textContent = "Passwords do not match.";
            valid = false;
        }

        if (!termsInput.checked) {
            termsError.textContent =
                "Please agree to the terms and conditions.";
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
            "Your details are valid. Account creation requires a backend registration API, which is not connected yet.",
            "info"
        );
    });
});