document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:8081/api/users/statistics")
        .then(response => response.json())
        .then(data => {
            renderUserChart(data);
        })
        .catch(error => console.error("Errore nel caricamento delle statistiche utenti:", error));
});

function renderUserChart(userStats) {
    const ctx = document.getElementById("userChart").getContext("2d");

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Utenti Attivi", "Utenti Inattivi"],
            datasets: [{
                data: [userStats.activeUsers, userStats.inactiveUsers],
                backgroundColor: ["#2ecc71", "#e74c3c"]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
