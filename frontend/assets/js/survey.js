document.addEventListener("DOMContentLoaded", function () {
    loadSurveys();
});

// Carica i sondaggi
function loadSurveys() {
    fetch("http://localhost:8081/api/surveys/available")
        .then(response => response.json())
        .then(data => {
            displaySurveys(data, "survey-list", true);
        })
        .catch(error => console.error("Errore nei sondaggi disponibili:", error));

    fetch("http://localhost:8081/api/surveys/answered")
        .then(response => response.json())
        .then(data => {
            displaySurveys(data, "answered-list", false);
            renderResultsChart(data);
        })
        .catch(error => console.error("Errore nei sondaggi risposti:", error));
}

// Mostra i sondaggi
function displaySurveys(surveys, listId, isAvailable) {
    const list = document.getElementById(listId);
    list.innerHTML = ""; 

    surveys.forEach(survey => {
        const item = document.createElement("li");
        item.classList.add("survey-item");
        item.innerHTML = `
            <h3>${survey.title}</h3>
            <p>${survey.description}</p>
            <p><strong>Creato il:</strong> ${survey.createdAt}</p>
            ${isAvailable ? `<button class="vote-button" onclick="voteSurvey(${survey.id})">Vota</button>` 
                          : `<a href="survey-results.html?id=${survey.id}" class="view-results">Visualizza Risultati</a>`}
        `;
        list.appendChild(item);
    });
}

// Funzione di voto
function voteSurvey(surveyId) {
    const userEmail = localStorage.getItem("userEmail");

    fetch(`http://localhost:8081/api/surveys/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ surveyId, userEmail })
    })
    .then(response => response.json())
    .then(data => {
        alert("Voto registrato!");
        loadSurveys();
    })
    .catch(error => console.error("Errore nel voto:", error));
}

// Grafico dei risultati
function renderResultsChart(data) {
    if (!data.length) return;

    const ctx = document.getElementById("resultsChart").getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: data.map(s => s.title),
            datasets: [{
                label: "Voti ricevuti",
                data: data.map(s => s.votes),
                backgroundColor: ["#3498db", "#2ecc71", "#f1c40f", "#e74c3c"],
                borderColor: "#ffffff",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
        }
    });
}

// Cambia Tab
function showTab(tab) {
    document.getElementById("available-surveys").classList.toggle("hidden", tab !== "available");
    document.getElementById("answered-surveys").classList.toggle("hidden", tab !== "answered");

    document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
    document.querySelector(`button[onclick="showTab('${tab}')"]`).classList.add("active");
}
