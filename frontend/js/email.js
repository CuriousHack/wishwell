document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const apiResponse = document.getElementById("response");

    // Function to show error message for a specific field
    function showError(fieldName, message) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.remove("hidden");
        }
    }

    // Function to clear all errors
    function clearErrors() {
        document.querySelectorAll(".error-message").forEach((el) => {
            el.textContent = "";
            el.classList.add("hidden");
        });
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission
        clearErrors(); // Clear previous errors

        // Get form data
        const formData = new FormData(form);
        const formObject = {};

        formData.forEach((value, key) => {
            formObject[key] = value.trim(); // Trim whitespace
        });

        let isValid = true; // Track validation status

        // ✅ Field Validations
        if (!formObject.username) {
            showError("username", "username is required.");
            isValid = false;
        }
        if (!formObject.email) {
            showError("email", "Email is required.");
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formObject.email)) {
            showError("email", "Invalid email format.");
            isValid = false;
        }
        if (!formObject.dob) {
            showError("dob", "Date of birth is required.");
            isValid = false;
        }

        if (!isValid) return; // Stop form submission if validation fails

        
    });
});
