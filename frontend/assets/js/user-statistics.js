document.addEventListener("DOMContentLoaded", function () {
    fetchUserStatistics();
});


  // Funzione per recuperare le statistiche generali degli utenti
  async function fetchUserStatistics() {
    try {
        const response = await fetch("http://localhost:8081/api/users/statistics");
        const data = await response.json();

        // Recupero degli elementi HTML per i box
        const totalUsersElement = document.getElementById("totalUsers");
        const totalEarningsElement = document.getElementById("totalEarnings");
        const completedSurveysElement = document.getElementById("totalCompletedSurveys");
        const availableSurveysElement = document.getElementById("totalAvailableSurveys");

        // Controllo dei dati e aggiornamento dei box
        if (data) {
            totalUsersElement.textContent = data.totalUsers || 0;
            totalEarningsElement.textContent = data.totalEarnings || 0;
            completedSurveysElement.textContent = data.completedSurveys || 0;
            availableSurveysElement.textContent = data.availableSurveys || 0;
        } else {
            // Se non ci sono dati, mostro il messaggio "Dati non disponibili"
            totalUsersElement.textContent = "Dati non disponibili";
            totalEarningsElement.textContent = "Dati non disponibili";
            completedSurveysElement.textContent = "Dati non disponibili";
            availableSurveysElement.textContent = "Dati non disponibili";
        }
    } catch (error) {
        console.error("Errore nel recupero dei dati:", error);
    }
}

// Funzione per popolare la tabella degli utenti
async function fetchUserRanking() {
    try {
        const response = await fetch("http://localhost:8081/api/users/ranking");
        const data = await response.json();
        const tableBody = document.getElementById("userStatsBody");
        tableBody.innerHTML = "";  // Reset della tabella

        if (data.length > 0) {
            data.forEach((user, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${user.email}</td>
                    <td>${user.surveysCompleted}</td>
                    <td>${user.score}</td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td colspan="4">Nessun dato disponibile</td>
            `;
            tableBody.appendChild(row);
        }
    } catch (error) {
        console.error("Errore nel recupero della classifica utenti:", error);
    }
}
// Funzione per tornare indietro in modo sicuro
function goBack() {
    if (document.referrer.includes("dashboard.html")) {
        history.back();
    } else {
        window.location.href = "dashboard.html"; // Se non esiste una pagina precedente, torna alla dashboard
    }
}


// Funzione per creare il grafico dell'attività degli utenti
function createUserActivityChart() {
    const ctx = document.getElementById('userActivityChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar', // Tipo di grafico
        data: {
            labels: ['Utente 1', 'Utente 2', 'Utente 3'], // Aggiungi le etichette dinamicamente
            datasets: [{
                label: 'Attività Utenti',
                data: [10, 20, 15], // Dati per l'attività degli utenti (sostituire con i dati reali)
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Esecuzione delle funzioni
fetchUserStatistics();
fetchUserRanking();
createUserActivityChart();


// Funzione per filtrare gli utenti
function filterUsers() {
    const email = document.getElementById("searchUser").value;
    if (email) {
        fetch(`http://localhost:8081/api/users/search?email=${email}`)
            .then(response => response.json())
            .then(data => {
                const tableBody = document.getElementById("userStatsBody");
                tableBody.innerHTML = "";

                if (data) {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${data.id}</td>
                        <td>${data.email}</td>
                        <td>${data.surveysCompleted}</td>
                        <td>${data.score}</td>
                    `;
                    tableBody.appendChild(row);
                } else {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td colspan="4">Utente non trovato</td>
                    `;
                    tableBody.appendChild(row);
                }
            })
            .catch(error => console.error("Errore nella ricerca dell'utente:", error));
    }
}

