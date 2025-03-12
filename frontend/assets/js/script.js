document.addEventListener("DOMContentLoaded", async function () {
    console.log("Mediafarm Ready!");

    // Configurazione API base
    const API_BASE_URL = "http://localhost:8081/api";
    const pathPrefix = window.location.pathname.includes("/pages/") ? "../" : "";

    // Aggiornamento dinamico del titolo della pagina
    document.title = document.title.replace(" - Mediafarm", "") + " - Mediafarm";

    // Recupero il token di autenticazione
    const token = localStorage.getItem("token");
    const navMenu = document.querySelector("nav ul");

    // Se l'utente è autenticato, aggiunge la dashboard alla navbar
    if (token && !document.querySelector("nav ul li a[href='pages/dashboard.html']")) {
        navMenu.innerHTML += `<li><a href="${pathPrefix}pages/dashboard.html">Dashboard</a></li>`;
    }

    // Evidenzia la pagina attuale nella navbar
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

    // Bottone di logout
    const logoutButton = document.querySelector("#logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("token");
            window.location.href = pathPrefix + "index.html";
        });
    }

    // Generazione dinamica del footer
    const footerbar = document.querySelector("footer");
    if (footerbar) {
        footerbar.innerHTML = ` 
            <div class="footer-container">
                <div class="footer-column">
                    <h4>Mediafarm</h4>
                    <p>La piattaforma di sondaggi più affidabile.</p>
                </div>
                <div class="footer-column">
                    <h4>Link Utili</h4>
                    <ul>
                        <li><a href="${pathPrefix}pages/login.html">Accedi</a></li>
                        <li><a href="${pathPrefix}pages/register.html">Registrati</a></li>
                        <li><a href="${pathPrefix}pages/dashboard.html">Dashboard</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4>Contatti</h4>
                    <p>Email: support@mediafarm.com</p>
                    <p>Telefono: +39 123 456 789</p>
                </div>
                <div class="footer-column">
                    <h4>Seguici</h4>
                    <div class="social-icons">
                        <a href="https://twitter.com" target="_blank"><img src="${pathPrefix}assets/img/twitter.png" alt="Twitter"></a>
                        <a href="https://t.me" target="_blank"><img src="${pathPrefix}assets/img/telegram.png" alt="Telegram"></a>
                        <a href="https://facebook.com" target="_blank"><img src="${pathPrefix}assets/img/facebook.png" alt="Facebook"></a>
                        <a href="https://instagram.com" target="_blank"><img src="${pathPrefix}assets/img/instagram.png" alt="Instagram"></a>
                    </div>
                </div>
            </div>
            <p class="copyright">© 2025 Mediafarm - Tutti i diritti riservati.</p>`;
    }

    // Gestione del LOGIN
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch(`${API_BASE_URL}/auth/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem("token", data.token);
                    alert("Login riuscito!");
                    window.location.href = "dashboard.html";
                } else {
                    alert(data.message || "Errore di autenticazione.");
                }
            } catch (error) {
                console.error("Errore di login:", error);
                alert("Errore nel login.");
            }
        });
    }

    // Gestione della REGISTRAZIONE
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch(`${API_BASE_URL}/auth/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Registrazione completata! Ora puoi accedere.");
                    window.location.href = "login.html";
                } else {
                    alert(data.message || "Errore durante la registrazione.");
                }
            } catch (error) {
                console.error("Errore di registrazione:", error);
                alert("Errore durante la registrazione.");
            }
        });
    }

    // Recupero dati della DASHBOARD
    if (window.location.pathname.includes("dashboard.html")) {
        try {
            const response = await fetch(`${API_BASE_URL}/dashboard/data`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) throw new Error("Errore nel recupero dati");

            const dashboardData = await response.json();

            // Aggiorna la dashboard con i dati ricevuti
            document.getElementById("total-surveys").innerText = dashboardData.totalSurveys;
            document.getElementById("total-users").innerText = dashboardData.totalUsers;
            document.getElementById("total-answers").innerText = dashboardData.totalAnswers;
            document.getElementById("unique-visitors").innerText = dashboardData.uniqueVisitors;
        } catch (error) {
            console.error("Errore nel recupero dati della dashboard:", error);
        }
    }
});
