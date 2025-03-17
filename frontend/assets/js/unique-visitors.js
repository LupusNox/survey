document.addEventListener("DOMContentLoaded", function () {
    const userRole = localStorage.getItem("userRole") || "guest";

    fetchVisitorData();
    setupAdminStats(userRole);
});

// Ottieni dati visitatori
function fetchVisitorData() {
    fetch("http://localhost:8081/api/visitors")
        .then(response => response.json())
        .then(data => {
            document.getElementById("visitorCount").textContent = `Visitatori Unici: ${data.totalVisitors}`;
            renderVisitorChart(data.dailyVisitors);
            populateAdminTable(data.visitorDetails);
        })
        .catch(error => console.error("Errore nel caricamento dei visitatori:", error));
}

// Crea il grafico visitatori
function renderVisitorChart(dailyVisitors) {
    if (!dailyVisitors || Object.keys(dailyVisitors).length === 0) return;

    const ctx = document.getElementById("visitorChart").getContext("2d");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: Object.keys(dailyVisitors),
            datasets: [{
                label: "Visitatori Giornalieri",
                data: Object.values(dailyVisitors),
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

// Popola la tabella admin
function populateAdminTable(visitorDetails) {
    const tableBody = document.getElementById("visitorTable").querySelector("tbody");
    tableBody.innerHTML = "";

    visitorDetails.forEach(visitor => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${visitor.date}</td>
            <td>${visitor.country}</td>
            <td>${visitor.count}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Mostra dati admin
function setupAdminStats(role) {
    if (role === "ADMIN") {
        document.getElementById("adminStats").classList.remove("hidden");
    }
}
