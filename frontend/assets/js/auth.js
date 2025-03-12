document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    const API_BASE_URL = "http://localhost:8081/api/users";

    // Funzione per gestire la risposta JSON
    async function handleResponse(response) {
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Errore sconosciuto!");
        }
        return response.json();
    }

    // ✅ Login
    if (loginForm) {
        loginForm.addEventListener("submit", async function(event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch(`${API_BASE_URL}/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await handleResponse(response);

                alert("Login effettuato con successo!");

                // ✅ Salva i dati nel localStorage
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.id);
                localStorage.setItem("userEmail", data.email);
                localStorage.setItem("userRole", data.role);

                // ✅ Reindirizza alla dashboard
                window.location.href = "dashboard.html";

            } catch (error) {
                alert(error.message);
                console.error("Errore durante il login:", error);
            }
        });
    }

    // ✅ Registrazione
    if (registerForm) {
        registerForm.addEventListener("submit", async function(event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch(`${API_BASE_URL}/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await handleResponse(response);

                alert("Registrazione completata! Ora puoi effettuare il login.");
                window.location.href = "login.html"; 

            } catch (error) {
                alert("Errore durante la registrazione: " + error.message);
                console.error("Errore durante la registrazione:", error);
            }
        });
    }

    // ✅ Logout
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", function() {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userRole");

            alert("Logout effettuato!");
            window.location.href = "index.html";
        });
    }
});
