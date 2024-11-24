// app.js

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    alert("Login Successful!");
    window.location.href = "catalog.html";
}

// Handle Registration
function handleRegister(event) {
    event.preventDefault();
    alert("Registration Successful!");
    window.location.href = "login.html";
}

// Attach Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector('.login-form')) {
        document.querySelector('.login-form').addEventListener('submit', handleLogin);
    }
    if (document.querySelector('.register-form')) {
        document.querySelector('.register-form').addEventListener('submit', handleRegister);
    }
});
