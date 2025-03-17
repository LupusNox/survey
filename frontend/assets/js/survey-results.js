document.addEventListener("DOMContentLoaded", function () {
    const userRole = localStorage.getItem("userRole") || "guest";
    const surveyId = new URLSearchParams(window.location.search).get("id");

    fetchSurveyResults(surveyId);
    setupAdminStats(userRole);
});

// Funzione per ottenere i risultati del sondaggio
function fetchSurveyResults(surveyId) {
    fetch(`http://localhost:8081/api/surveys/${surveyId}/results`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("surveyTitle").textContent = data.title;
            document.getElementById("surveyDescription").textContent = data.description;
            renderSurveyChart(data.results);
            populateAdminTable(data.results);
        })
        .catch(error => console.error("Errore nel caricamento dei risultati:", error));
}

// Funzione per creare il grafico dei risultati
function renderSurveyChart(results) {
    const ctx = document.getElementById("surveyChart").getContext("2d");

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: results.map(r => r.option),
            datasets: [{
                data: results.map(r => r.votes),
                backgroundColor: ["#3498db", "#2ecc71", "#f1c40f", "#e74c3c", "#9b59b6"]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Popola la tabella admin con le statistiche dettagliate
function populateAdminTable(results) {
    const tableBody = document.getElementById("adminTable").querySelector("tbody");
    tableBody.innerHTML = "";

    results.forEach(result => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${result.option}</td>
            <td>${result.votes}</td>
            <td>${((result.votes / results.reduce((a, b) => a + b.votes, 0)) * 100).toFixed(2)}%</td>
        `;
        tableBody.appendChild(row);
    });
}

// Mostra le statistiche avanzate solo agli admin
function setupAdminStats(role) {
    if (role === "admin") {
        document.getElementById("adminStats").classList.remove("hidden");
    }
}document.addEventListener("DOMContentLoaded", function () {
    const userRole = localStorage.getItem("userRole") || "guest";

    fetchSurveyResults();
    setupAdminStats(userRole);
});

// Ottieni i risultati dei sondaggi
function fetchSurveyResults() {
    fetch("http://localhost:8081/api/survey-results")
        .then(response => response.json())
        .then(data => {
            populateSurveyDropdown(data.surveys);
            renderSurveyChart(data.totalResults);
            populateAdminTable(data.surveyDetails);
        })
        .catch(error => console.error("Errore nel caricamento dei risultati:", error));
}

// Popola il filtro dropdown
function populateSurveyDropdown(surveys) {
    const filterSelect = document.getElementById("surveyFilter");

    surveys.forEach(survey => {
        let option = document.createElement("option");
        option.value = survey.id;
        option.textContent = survey.title;
        filterSelect.appendChild(option);
    });

    filterSelect.addEventListener("change", function () {
        updateFilteredResults(this.value);
    });
}

// Crea il grafico risultati
function renderSurveyChart(totalResults) {
    const ctx = document.getElementById("surveyResultsChart").getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.keys(totalResults),
            datasets: [{
                label: "Risposte per Sondaggio",
                data: Object.values(totalResults),
                backgroundColor: ["#3498db", "#2ecc71", "#f1c40f", "#e74c3c"],
                borderColor: "#ffffff",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Popola la tabella admin
function populateAdminTable(surveyDetails) {
    const tableBody = document.getElementById("resultsTable").querySelector("tbody");
    tableBody.innerHTML = "";

    surveyDetails.forEach(result => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${result.survey}</td>
            <td>${result.option}</td>
            <td>${result.responses}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Mostra dati admin
function setupAdminStats(role) {
    if (role === "ADMIN") {
        document.getElementById("adminResults").classList.remove("hidden");
    }
}

