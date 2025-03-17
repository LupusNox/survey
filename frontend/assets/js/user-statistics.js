document.addEventListener("DOMContentLoaded", function () {
    fetchUserStatistics();
});

// Recupera i dati delle statistiche utenti
function fetchUserStatistics() {
    fetch("http://localhost:8081/api/users/statistics")
        .then(response => response.json())
        .then(data => {
            document.getElementById("totalUsers").textContent = data.totalUsers;
            document.getElementById("totalCompletedSurveys").textContent = data.totalCompletedSurveys;
            document.getElementById("totalEarnings").textContent = data.totalEarnings.toFixed(2) + "€";

            renderUserActivityChart(data.userActivity);
            populateUserTable(data.users);
        })
        .catch(error => console.error("Errore nel recupero delle statistiche utenti:", error));
}

// Popola la tabella con i dettagli degli utenti
function populateUserTable(users) {
    const tableBody = document.getElementById("userStatsBody");
    tableBody.innerHTML = "";

    users.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.email}</td>
            <td>${user.completedSurveys}</td>
            <td>${user.totalEarnings.toFixed(2)} €</td>
        `;
        tableBody.appendChild(row);
    });
}

// Funzione per tornare indietro in modo sicuro
function goBack() {
    if (document.referrer.includes("dashboard.html")) {
        history.back();
    } else {
        window.location.href = "dashboard.html"; // Se non esiste una pagina precedente, torna alla dashboard
    }
}


// Grafico dell'attività utenti
function renderUserActivityChart(userActivity) {
    const ctx = document.getElementById("userActivityChart").getContext("2d");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: userActivity.dates,
            datasets: [{
                label: "Utenti Attivi",
                data: userActivity.values,
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

// Filtro utenti
function filterUsers() {
    const searchValue = document.getElementById("searchUser").value.toLowerCase();
    const rows = document.querySelectorAll("#userStatsBody tr");

    rows.forEach(row => {
        const email = row.cells[1].textContent.toLowerCase();
        row.style.display = email.includes(searchValue) ? "" : "none";
    });
}
