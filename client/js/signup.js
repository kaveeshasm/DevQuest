document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const passwordField = document.getElementById("password");
  const confirmPasswordField = document.getElementById("confirmPassword");
  const passwordErrors = document.getElementById("passwordErrors");
  const generalErrorMessage = document.getElementById("generalErrorMessage");

  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const password = passwordField.value;
    const confirmPassword = confirmPasswordField.value;
    let isValid = true;

    passwordErrors.innerHTML = "";
    generalErrorMessage.style.display = "none";

    const existingSuccessMessage = document.getElementById("successMessage");
    if (existingSuccessMessage) {
      existingSuccessMessage.remove();
    }

    if (password.length < 8) {
      const error = document.createElement("p");
      error.textContent = "Password must be at least 8 characters long.";
      passwordErrors.appendChild(error);
      isValid = false;
    } else if (password.length > 25) {
      const error = document.createElement("p");
      error.textContent = "Password must not exceed 25 characters.";
      passwordErrors.appendChild(error);
      isValid = false;
    } else if (
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      const error = document.createElement("p");
      error.textContent =
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
      passwordErrors.appendChild(error);
      isValid = false;
    }

    if (password !== confirmPassword) {
      generalErrorMessage.textContent = "Passwords do not match.";
      generalErrorMessage.style.display = "block";
      isValid = false;
    }

    if (isValid) {
      passwordErrors.innerHTML = ""; 

      const successMessage = document.createElement("p");
      successMessage.id = "successMessage";
      successMessage.textContent = "Sign Up Successful!";
      successMessage.style.color = "green";
      successMessage.style.marginTop = "10px";

      const signUpButton = signupForm.querySelector(".singUpButton");
      signUpButton.appendChild(successMessage);

      setTimeout(() => {
        signupForm.reset(); 
      }, 2000);
    }
  });
});
