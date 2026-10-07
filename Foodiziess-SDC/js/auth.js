// ===============================
// SIGNUP
// ===============================

const signupForm = document.getElementById("signup-form");

if (signupForm) {

    signupForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Get existing users from Local Storage
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if email already exists
        const existingUser = users.find(function(user) {
            return user.email === email;
        });

        if (existingUser) {

            document.getElementById("signup-message").textContent =
                "An account with this email already exists.";

            return;
        }

        // Create new user
        const newUser = {
            name: name,
            email: email,
            password: password
        };

        // Add user to users array
        users.push(newUser);

        // Save users in Local Storage
        localStorage.setItem("users", JSON.stringify(users));

        document.getElementById("signup-message").textContent =
            "Account created successfully!";

        // Clear form
        signupForm.reset();

    });
}
const loginForm = document.getElementById("login-form");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Get registered users from Local Storage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if email and password match
        const user = users.find(function(user) {
            return user.email === email && user.password === password;
        });

        if (user) {

            // Store the currently logged-in user
            localStorage.setItem("currentUser", JSON.stringify(user));

            document.getElementById("login-message").textContent =
                "Login successful!";

            // Go to home page
           window.location.href = "index.html";

        } else {

            document.getElementById("login-message").textContent =
                "Invalid email or password.";

        }

    });

}
// Change navbar based on login status

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const navButtons = document.getElementById("nav-buttons");

if (currentUser && navButtons) {

    navButtons.innerHTML = `
        <span>👋 ${currentUser.name}</span>
        <button id="logout-button">Logout</button>
    `;

    const logoutButton = document.getElementById("logout-button");

    logoutButton.addEventListener("click", function() {

        localStorage.removeItem("currentUser");

        window.location.href = "index.html";

    });

}
// Admin Login

const adminLoginForm = document.getElementById("admin-login-form");

if (adminLoginForm) {

    adminLoginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = document.getElementById("admin-email").value;
        const password = document.getElementById("admin-password").value;

        // Demo admin credentials
        const adminEmail = "admin@foodiziess.com";
        const adminPassword = "admin123";

        if (email === adminEmail && password === adminPassword) {

            localStorage.setItem("adminLoggedIn", "true");

            window.location.href = "dashboard.html";

        } else {

            document.getElementById("admin-login-message").textContent =
                "Invalid admin email or password.";

        }

    });

}
// Admin Dashboard

const isAdminPage = document.getElementById("admin-logout");

if (isAdminPage) {

    // Check if admin is logged in
    const adminLoggedIn = localStorage.getItem("adminLoggedIn");

    if (adminLoggedIn !== "true") {

        window.location.href = "admin-login.html";

    }


    // Admin logout
    const adminLogout = document.getElementById("admin-logout");

    adminLogout.addEventListener("click", function() {

        localStorage.removeItem("adminLoggedIn");

        window.location.href = "admin-login.html";

    });


    // Manage Recipes
    const manageRecipes = document.getElementById("manage-recipes");

    manageRecipes.addEventListener("click", function() {

        window.location.href = "manage-recipes.html";

    });


    // View Users
    const viewUsers = document.getElementById("view-users");

    viewUsers.addEventListener("click", function() {

        window.location.href = "users.html";

    });

}