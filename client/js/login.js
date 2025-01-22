import { BASE_AUTH_URL } from "./URL.js";

window.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const inputFields = document.querySelectorAll(".form-control");
  inputFields.forEach((field) => {
    field.addEventListener("input", () => {
      document.getElementById("error-message").style.display = "none";
    });
  });

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      try {
        const response = await loginUser(email, password);

        if (!response.error) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("userId", response.data.id);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem(
            "username",
            `${response.data.firstName} ${response.data.lastName}`
          );
          localStorage.setItem("isAdmin", response.data.isAdmin);

          window.location.href = "../client/home.html";
        } else {
          displayError(response.message);
        }
      } catch (error) {
        displayError("An error occurred during login. Please try again.");
        console.error("Login error:", error);
      }
    });
  } else {
    console.error("Login form not found");
  }

  const passwordInput = document.getElementById('password');
  const passwordToggle = document.querySelector('.password-toggle');

  passwordToggle.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordToggle.style.color = 'rgb(111, 0, 255)'; 
    } else {
        passwordInput.type = 'password';
        passwordToggle.style.color = 'rgb(204, 204, 204)'; 
    }
  });
});

async function loginUser(email, password) {
  try {
    const response = await fetch(`${BASE_AUTH_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      return {
        error: true,
        message: data.message || "Invalid login credentials.",
      };
    }
  } catch (error) {
    return { error: true, message: error.message };
  }
}

function displayError(message) {
  const errorMessage = document.getElementById("error-message");
  errorMessage.style.display = "block";
  errorMessage.innerHTML = message;
}
