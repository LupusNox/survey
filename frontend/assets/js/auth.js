document.addEventListener("DOMContentLoaded", function() {

    // Base URL del tuo backend con i path /api/users
    const API_BASE_URL = "http://localhost:8081/api/users";

    // Utility per gestire la risposta JSON o mostrare errore
    async function handleResponse(response) {
        if (!response.ok) {
            // Se la risposta HTTP è tipo 4xx/5xx, proviamo a leggere l'errore in JSON
            const errorData = await response.json().catch(() => ({}));
            // E mostriamo il messaggio di errore se esiste, altrimenti generico
            throw new Error(errorData.error || errorData.message || "Errore sconosciuto");
        }
        // Se ok, ritorno il JSON
        return response.json();
    }

    // -------------------------------------------------
    // LOGIN
    // -------------------------------------------------
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async function(event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch(`${API_BASE_URL}/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                });

                // Gestione risposta
                const data = await handleResponse(response);

                // Salvataggio dati in localStorage
                localStorage.setItem("userId", data.id);
                localStorage.setItem("userEmail", data.email);
                localStorage.setItem("userRole", data.role);

                alert(data.message || "Login effettuato con successo!");

                // Reindirizzamento in base al ruolo
                // In base al tuo controller, data.role può essere "ADMIN" o "USER"
                if (data.role === "ADMIN") {
                    // l'utente voleva "dashboard-admin.html" 
                    window.location.href = "dashboard-admin.html";
                } else {
                    window.location.href = "dashboard-user.html";
                }

            } catch (error) {
                alert("Errore durante il login: " + error.message);
                console.error("Dettagli:", error);
            }
        });
    }

    // -------------------------------------------------
    // REGISTRAZIONE
    // -------------------------------------------------
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", async function(event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch(`${API_BASE_URL}/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await handleResponse(response);

                alert(data.message || "Registrazione completata!");
                // Rimando alla pagina di login
                window.location.href = "login.html";
                
            } catch (error) {
                alert("Errore durante la registrazione: " + error.message);
                console.error("Dettagli:", error);
            }
        });
    }

    // -------------------------------------------------
    // LOGOUT (opzionale, se hai un bottone #logout)
    // -------------------------------------------------
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", function() {
            // Rimuoviamo eventuali dati su localStorage
            localStorage.removeItem("userId");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userRole");

            alert("Logout effettuato!");
            // Torniamo alla home o dove preferisci
            window.location.href = "index.html";
        });
    }
});