document.addEventListener("DOMContentLoaded", function () {
    loadUserSettings();
    setupSettingsForm();
});

// Funzione per caricare i dati utente
function loadUserSettings() {
    const userEmail = localStorage.getItem("userEmail") || "N/A";
    document.getElementById("email").value = userEmail;
}

// Funzione per gestire l'aggiornamento delle impostazioni
function setupSettingsForm() {
    const form = document.getElementById("settingsForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            alert("Le password non coincidono!");
            return;
        }

        fetch("http://localhost:8081/api/users/update-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: localStorage.getItem("userEmail"), password })
        })
        .then(response => response.json())
        .then(data => {
            alert("Password aggiornata con successo!");
        })
        .catch(error => console.error("Errore nell'aggiornamento della password:", error));
    });
}
