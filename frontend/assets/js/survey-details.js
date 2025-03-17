document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const surveyId = urlParams.get("id");

    if (surveyId) {
        fetchSurveyDetails(surveyId);
    }

    document.getElementById("voteForm").addEventListener("submit", function (event) {
        event.preventDefault();
        submitVote(surveyId);
    });
});

// Funzione per ottenere i dettagli del sondaggio
function fetchSurveyDetails(surveyId) {
    fetch(`http://localhost:8081/api/surveys/${surveyId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("survey-title").textContent = data.title;
            document.getElementById("survey-question").textContent = data.question;
            document.getElementById("survey-category").textContent = data.category;
            document.getElementById("survey-participants").textContent = data.participants;
            renderSurveyChart(data.results);
            populateResponsesTable(data.results);
            generateVoteOptions(data.options);
        })
        .catch(error => console.error("Errore nel caricamento del sondaggio:", error));
}

// Funzione per generare le opzioni di voto dinamicamente
function generateVoteOptions(options) {
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    options.forEach(option => {
        const label = document.createElement("label");
        label.innerHTML = `
            <input type="radio" name="voteOption" value="${option}"> ${option}
        `;
        optionsContainer.appendChild(label);
        optionsContainer.appendChild(document.createElement("br"));
    });
}

// Funzione per inviare il voto
function submitVote(surveyId) {
    const selectedOption = document.querySelector('input[name="voteOption"]:checked');
    if (!selectedOption) {
        alert("Seleziona un'opzione prima di votare!");
        return;
    }

    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
        alert("Devi essere loggato per votare!");
        return;
    }

    const voteData = {
        surveyId: surveyId,
        email: userEmail,
        vote: selectedOption.value
    };

    fetch("http://localhost:8081/api/surveys/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(voteData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchSurveyDetails(surveyId); // Aggiorna i risultati dopo il voto
    })
    .catch(error => console.error("Errore nell'invio del voto:", error));
}

// Funzione per aggiornare il grafico delle risposte
function renderSurveyChart(results) {
    if (!results || Object.keys(results).length === 0) return;

    const ctx = document.getElementById("surveyChart").getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.keys(results),
            datasets: [{
                label: "Numero di Voti",
                data: Object.values(results),
                backgroundColor: ["#3498db", "#2ecc71", "#f1c40f", "#e74c3c"],
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

// Funzione per popolare la tabella delle risposte
function populateResponsesTable(results) {
    const tableBody = document.getElementById("responsesTable").querySelector("tbody");
    tableBody.innerHTML = "";

    let totalVotes = Object.values(results).reduce((acc, val) => acc + val, 0);

    Object.keys(results).forEach(option => {
        const votes = results[option];
        const percentage = totalVotes ? ((votes / totalVotes) * 100).toFixed(2) : 0;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${option}</td>
            <td>${votes}</td>
            <td>${percentage}%</td>
        `;
        tableBody.appendChild(row);
    });
}
