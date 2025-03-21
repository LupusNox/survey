document.addEventListener("DOMContentLoaded", async function () {
    console.log("Mediafarm Ready!");

    // Configurazione API base
    const API_BASE_URL = "http://localhost:8081/api";
    const pathPrefix = window.location.pathname.includes("/pages/") ? "../" : "";

    // Aggiornamento dinamico del titolo della pagina
    document.title = document.title.replace(" - Mediafarm", "") + " - Mediafarm";

    // Recupero dati utente
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("userEmail"); // Evitiamo di ridefinirla
    const userRole = localStorage.getItem("userRole"); // "USER", "ADMIN" o null

    const navMenu = document.querySelector("nav ul");

    // Gestione del menu di navigazione dinamico
    if (token) {
        let dashboardPath = userRole === "ADMIN" ? "dashboard-admin.html" : "dashboard-user.html";
        
        if (!document.querySelector(`nav ul li a[href='pages/${dashboardPath}']`)) {
            navMenu.innerHTML += `<li><a href="pages/${dashboardPath}">Dashboard</a></li>`;
        }
    } else {
        if (!document.querySelector(`nav ul li a[href='pages/dashboard-guest.html']`)) {
            navMenu.innerHTML += `<li><a href="pages/dashboard-guest.html">Dashboard</a></li>`;
        }
    }

    // Evidenzia la pagina attuale nella navbar
    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll("nav ul li a").forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

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
                    <p>Partita IVA: 12345678901</p>
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

   // **RECUPERO SONDAGGI**
   async function fetchSurveys(endpoint, containerId) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) throw new Error("Errore nel recupero dei sondaggi");
        const surveys = await response.json();
        displaySurveys(surveys, containerId);
    } catch (error) {
        console.error(`Errore (${endpoint}):`, error);
    }
}

function displaySurveys(surveys, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = surveys.length === 0 ? "<p>Nessun sondaggio disponibile.</p>" :
        surveys.map(survey => `
            <div class="survey-item">
                <h3>${survey.title}</h3>
                <p>${survey.description}</p>
                <button onclick="viewSurvey(${survey.id})">Partecipa</button>
            </div>
        `).join("");
}

async function viewSurvey(surveyId) {
    window.location.href = `survey_detail.html?surveyId=${surveyId}`;
}

if (document.getElementById("availableSurveysContainer")) {
    fetchSurveys(userRole === "ADMIN" ? "/surveys/all" : `/surveys/available?userEmail=${userEmail}`, "availableSurveysContainer");
}

if (document.getElementById("answeredSurveysContainer") && userRole !== "ADMIN") {
    fetchSurveys(`/surveys/answered?userEmail=${userEmail}`, "answeredSurveysContainer");
}

// **INVIO RISPOSTE UTENTE**
    async function submitUserAnswers(userAnswers) {
        try {
            const response = await fetch(`${API_BASE_URL}/user-answers/submit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userAnswers)
            });
            const data = await response.json();
            console.log("Risposte inviate con successo:", data);
        } catch (error) {
            console.error("Errore nell'invio delle risposte:", error);
        }
    }

// Caricamento sondaggi in base al ruolo
if (document.getElementById("availableSurveysContainer")) {
    if (userRole === "ADMIN") {
        fetchSurveys("/surveys/all", "availableSurveysContainer");
    } else {
        fetchSurveys(`/surveys/available?userEmail=${userEmail}`, "availableSurveysContainer");
    }
}

if (document.getElementById("answeredSurveysContainer") && userRole !== "ADMIN") {
    fetchSurveys(`/surveys/answered?userEmail=${userEmail}`, "answeredSurveysContainer");
}



// Funzione per visualizzare i sondaggi nella pagina
function displaySurveys(surveys, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    if (surveys.length === 0) {
        container.innerHTML = "<p>Nessun sondaggio disponibile.</p>";
        return;
    }

    surveys.forEach(survey => {
        const surveyElement = document.createElement("div");
        surveyElement.classList.add("survey-item");
        surveyElement.innerHTML = `
            <h3>${survey.title}</h3>
            <p>${survey.description}</p>
            <button onclick="viewSurvey(${survey.id})">Partecipa</button>
        `;
        container.appendChild(surveyElement);
    });
}

// 🔹 Caricamento sondaggi
if (document.getElementById("availableSurveysContainer")) {
    if (userRole === "ADMIN") {
        fetchSurveys("/surveys/all", "availableSurveysContainer");
    } else if (userEmail) {
        fetchSurveys(`/surveys/available?userEmail=${userEmail}`, "availableSurveysContainer");
    }
}

if (document.getElementById("answeredSurveysContainer") && userRole !== "ADMIN") {
    if (userEmail) {
        fetchSurveys(`/surveys/answered?userEmail=${userEmail}`, "answeredSurveysContainer");
    }
}


     // 🔹 Caricamento dati dashboard
     if (window.location.pathname.includes("dashboard-")) {
        let dashboardEndpoint = userRole === "ADMIN" ? "/dashboard/admin-data" : "/dashboard/user-data";

        try {
            const response = await fetch(`${API_BASE_URL}${dashboardEndpoint}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (!response.ok) throw new Error("Errore nel recupero dati");

            const dashboardData = await response.json();
            document.getElementById("total-surveys").innerText = dashboardData.totalSurveys;
            document.getElementById("total-users").innerText = dashboardData.totalUsers;
            document.getElementById("total-answers").innerText = dashboardData.totalAnswers;
            document.getElementById("unique-visitors").innerText = dashboardData.uniqueVisitors;
        } catch (error) {
            console.error("Errore nel recupero dati della dashboard:", error);
        }
    }
});
