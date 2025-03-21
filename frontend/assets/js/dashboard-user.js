document.addEventListener("DOMContentLoaded", function () {
    const userEmail = localStorage.getItem("userEmail") || "Ospite";

    // Imposta il nome dell'utente nella dashboard
    document.getElementById("user-email").textContent = userEmail;

    // Recupera e aggiorna il numero di sondaggi disponibili
    fetchAvailableSurveys();

    // Configura il logout
    setupLogout();
});

// Funzione per recuperare il numero di sondaggi disponibili
function fetchAvailableSurveys() {
    fetch("http://localhost:8081/api/surveys/available")
        .then(response => response.json())
        .then(data => {
            document.getElementById("available-surveys").textContent = data.length || 0;
        })
        .catch(error => console.error("Errore nel caricamento dei sondaggi disponibili:", error));
}

// Funzione per gestire il logout
function setupLogout() {
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.clear();
            window.location.href = "../index.html";
        });
    }
}
