document.addEventListener("DOMContentLoaded", function () {
    const userRole = localStorage.getItem("userRole") || "guest"; // Default a "guest" se non registrato

    // Seleziona il template corretto
    renderDashboardTemplate(userRole);

    // Recupero e aggiornamento dati della dashboard
    fetchDashboardData(userRole);

    // Setup logout
    setupLogout();
});

// Funzione per selezionare e mostrare il template corretto (Admin, Utente o Ospite)
function renderDashboardTemplate(role) {
    const adminTemplate = document.getElementById("admin-dashboard");
    const userTemplate = document.getElementById("user-dashboard");
    const dashboardContent = document.getElementById("dashboard-content");

    if (role === "admin") {
        dashboardContent.innerHTML = adminTemplate.innerHTML;
    } else if (role === "user") {
        dashboardContent.innerHTML = userTemplate.innerHTML;
    } else {
        dashboardContent.innerHTML = `
            <div class="guest-message">
                <h2>Benvenuto nella Dashboard</h2>
                <p>Registrati per partecipare ai sondaggi e guadagnare ricompense.</p>
                <a href="register.html" class="btn-register">Registrati</a>
            </div>
        `;
    }
}

// Funzione per recuperare i dati e aggiornare la dashboard
function fetchDashboardData(role) {
    fetch("http://localhost:8081/api/statistics")
        .then(response => response.json())
        .then(data => {
            if (role === "admin") {
                updateDashboardStats(data);
                renderSurveyChart(data.surveysPerCategory);
                renderUserStatsTable(data.userStats);
            } else if (role === "user") {
                updateUserDashboard(data);
            }
        })
        .catch(error => console.error("Errore nel caricamento delle statistiche:", error));
}

// Funzione per aggiornare i numeri delle statistiche (Admin)
function updateDashboardStats(data) {
    document.getElementById("total-surveys").textContent = data.totalSurveys || 0;
    document.getElementById("total-users").textContent = data.totalUsers || 0;
    document.getElementById("total-answers").textContent = data.totalAnswers || 0;
    document.getElementById("unique-visitors").textContent = data.uniqueVisitors || 0;
}

// Funzione per aggiornare i dati della dashboard per utenti registrati
function updateUserDashboard(data) {
    document.getElementById("answered-surveys").textContent = data.userSurveys || 0;
    document.getElementById("available-surveys").textContent = data.availableSurveys || 0;
    document.getElementById("weekly-earnings").textContent = (data.userEarnings?.weekly || 0).toFixed(2) + "€";
    document.getElementById("total-earnings").textContent = (data.userEarnings?.total || 0).toFixed(2) + "€";

    // Genera il grafico settimanale
    renderUserSurveyChart(data.userSurveyStats);
}

// Funzione per creare il grafico dei sondaggi per categoria (Admin)
function renderSurveyChart(surveysPerCategory) {
    if (!surveysPerCategory || Object.keys(surveysPerCategory).length === 0) return;

    const ctx = document.getElementById("surveyChart").getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.keys(surveysPerCategory),
            datasets: [{
                label: "Numero di Sondaggi",
                data: Object.values(surveysPerCategory),
                backgroundColor: ["#3498db", "#2ecc71", "#f1c40f", "#e74c3c", "#9b59b6"],
                borderColor: "#ffffff",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1 } }
            }
        }
    });
}

// Funzione per creare il grafico settimanale dei sondaggi risposti (Utente)
function renderUserSurveyChart(userSurveyStats) {
    if (!userSurveyStats || !userSurveyStats.dates || userSurveyStats.dates.length === 0) return;

    const ctx = document.getElementById("weeklySurveyChart").getContext("2d");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: userSurveyStats.dates,
            datasets: [{
                label: "Sondaggi Risposti",
                data: userSurveyStats.values,
                backgroundColor: "rgba(52, 152, 219, 0.2)",
                borderColor: "#3498db",
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Funzione per creare la tabella delle statistiche utenti (Admin)
function renderUserStatsTable(userStats) {
    if (!userStats || userStats.length === 0) return;

    const tableBody = document.getElementById("user-stats-table").querySelector("tbody");
    tableBody.innerHTML = "";

    userStats.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.email}</td>
            <td>${user.surveysCompleted}</td>
            <td>${user.totalEarnings} €</td>
        `;
        tableBody.appendChild(row);
    });
}

// Funzione per gestire il logout
function setupLogout() {
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("token");
            localStorage.removeItem("userRole");
            window.location.href = "../index.html";
        });
    }
}

// Inizializzazione della mappa con Leaflet.js
function initMap() {
    var map = L.map("map").setView([41.9028, 12.4964], 6); // Centro su Italia

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Simulazione attività recente
    fetch("http://localhost:8081/api/map-activities")
        .then(response => response.json())
        .then(data => {
            data.forEach(activity => {
                L.marker([activity.lat, activity.lng]).addTo(map)
                    .bindPopup(`Attività recente: ${activity.description}`);
            });
        })
        .catch(error => console.error("Errore nel caricamento della mappa:", error));
}

// Avvia la mappa solo se il container è presente nella pagina
if (document.getElementById("map")) {
    initMap();
}
