document.addEventListener("DOMContentLoaded", function () {
    const dashboardContent = document.getElementById("dashboard-content");
    const userNameElement = document.getElementById("user-name");
    const userRoleElement = document.getElementById("user-role");
    const logoutButton = document.getElementById("logout");

    // Retrieve user data from localStorage
    const userEmail = localStorage.getItem("userEmail") || "Ospite";
    const userRole = localStorage.getItem("userRole") || "guest";

    // Set user profile info
    userNameElement.textContent = userEmail;
    userRoleElement.textContent = `Ruolo: ${userRole === "ADMIN" ? "Amministratore" : "Utente"}`;

    // Load appropriate dashboard template
    renderDashboardTemplate(userRole);

    // Fetch statistics based on role
    fetchDashboardData(userRole);

    // Setup logout
    setupLogout();
});

// ✅ Function to render the correct dashboard template
function renderDashboardTemplate(role) {
    const adminTemplate = document.getElementById("admin-dashboard");
    const userTemplate = document.getElementById("user-dashboard");
    const dashboardContent = document.getElementById("dashboard-content");

    if (role === "ADMIN") {
        dashboardContent.innerHTML = adminTemplate.innerHTML;
    } else if (role === "USER") {
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

// ✅ Fetch and update dashboard data
function fetchDashboardData(role) {
    fetch("http://localhost:8081/api/statistics")
        .then(response => response.json())
        .then(data => {
            if (role === "ADMIN") {
                updateDashboardStats(data);
                renderSurveyChart(data.surveysPerCategory);
                renderUserStatsTable(data.userStats);
            } else if (role === "USER") {
                updateUserDashboard(data);
            }
        })
        .catch(error => console.error("Errore nel caricamento delle statistiche:", error));
}

// ✅ Function to update statistics in admin dashboard
function updateDashboardStats(data) {
    document.getElementById("total-surveys").textContent = data.totalSurveys || 0;
    document.getElementById("total-users").textContent = data.totalUsers || 0;
    document.getElementById("total-answers").textContent = data.totalAnswers || 0;
    document.getElementById("unique-visitors").textContent = data.uniqueVisitors || 0;
}

// ✅ Function to update statistics in user dashboard
function updateUserDashboard(data) {
    document.getElementById("answered-surveys").textContent = data.userSurveys || 0;
    document.getElementById("available-surveys").textContent = data.availableSurveys || 0;
    document.getElementById("weekly-earnings").textContent = (data.userEarnings?.weekly || 0).toFixed(2) + "€";
    document.getElementById("total-earnings").textContent = (data.userEarnings?.total || 0).toFixed(2) + "€";

    // Generate weekly survey chart
    renderUserSurveyChart(data.userSurveyStats);
}

// ✅ Function to create the admin survey chart
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

// ✅ Function to create the user weekly survey chart
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

// ✅ Function to create the user statistics table (Admin)
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

// ✅ Function to handle logout
function setupLogout() {
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.clear();
            window.location.href = "../index.html";
        });
    }
}

// ✅ Initialize map with Leaflet.js
function initMap() {
    var map = L.map("map").setView([41.9028, 12.4964], 6); // Center on Italy

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Simulated recent activity
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

// Start map only if container exists
if (document.getElementById("map")) {
    initMap();
}
