document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    // Login
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            fetch("http://localhost:8081/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Credenziali errate!");
                }
                return response.json();
            })
            .then(data => {
                alert("Login effettuato con successo!");

                // Salva i dati nel localStorage
                localStorage.setItem("userId", data.id);
                localStorage.setItem("userEmail", data.email);
                localStorage.setItem("userRole", data.role);

                // Reindirizza alla dashboard
                window.location.href = "dashboard.html";
            })
            .catch(error => {
                alert(error.message);
                console.error("Errore durante il login:", error);
            });
        });
    }

    // Registrazione
    if (registerForm) {
        registerForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            fetch("http://localhost:8081/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Referrer-Policy": "unsafe-url" },
                mode:"no-cors",
                body: JSON.stringify({ email, password })
            })
            .then(response => response.text())
            .then(message => {
                alert(message);
                if (message === "Registrazione completata!") {
                    window.location.href = "login.html";
                }
            })
            .catch(error => {
                alert("Errore durante la registrazione, riprova.");
                console.error("Errore durante la registrazione:", error);
            });
        });
    }
});
