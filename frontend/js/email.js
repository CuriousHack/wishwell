document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const apiResponse = document.getElementById('response')
    const wrapper = document.getElementById("wrapper");
    const popup = document.getElementById("popup");
    const okButton = document.getElementById("okbutton");
    const resultText = document.getElementById("result-text");
    // Function to show error message for a specific field
    function showError(fieldName, message) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.remove("hidden");
        }
    }

    function clickOkButton(){
        okButton.addEventListener("click", function () {
            popup.classList.add("hidden");
            wrapper.classList.remove("hidden");
            // clearErrors()
            form.reset();
            // location.reload();
          });
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

        try {
            const response = await fetch("http://localhost:3005/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formObject),
            });

            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error("Too many requests, please try again later!");
                }
                throw new Error(`${response.statusText}`);
            }

            const result = await response.json();
            resultText.innerHTML = result.message;
            wrapper.classList.add("hidden");
            popup.classList.remove("hidden");
            clickOkButton();

            form.reset(); // Clear the form after successful submission
        } catch (error) {
            apiResponse.innerHTML = error.message;
            apiResponse.classList.remove("success-message");
            apiResponse.classList.add("error-message");
        }
    });
});
