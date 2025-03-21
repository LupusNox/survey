document.addEventListener("DOMContentLoaded", function () {
    const adminName = localStorage.getItem("userEmail") || "Admin";

    // Imposta il nome dell'admin
    document.getElementById("admin-name").textContent = `${adminName}`;

    // Recupero e aggiornamento dati della dashboard
    fetchDashboardData();

    // Setup logout
    setupLogout();
});

// Funzione per recuperare i dati della dashboard
function fetchDashboardData() {
    fetch("http://localhost:8081/api/statistics")
        .then(response => response.json())
        .then(data => {
            document.getElementById("total-surveys").textContent = data.totalSurveys || 0;
            document.getElementById("total-users").textContent = data.totalUsers || 0;
            document.getElementById("total-answers").textContent = data.totalAnswers || 0;
            document.getElementById("unique-visitors").textContent = data.uniqueVisitors || 0;
        })
        .catch(error => console.error("Errore nel caricamento delle statistiche:", error));
}

// Funzione per il logout
function setupLogout() {
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.clear();
            window.location.href = "../index.html";
        });
    }
}
