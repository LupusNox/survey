document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const surveyId = urlParams.get("surveyId");
    const resultsContainer = document.getElementById("resultsData");

    if (!surveyId) {
        alert("Nessun sondaggio selezionato!");
        window.location.href = "dashboard.html";
        return;
    }

    fetch(`http://localhost:8080/api/user-answers/results/${surveyId}`)
        .then(response => response.json())
        .then(results => {
            resultsContainer.innerHTML = "";
            results.forEach(result => {
                const div = document.createElement("div");
                div.classList.add("result-item");
                div.innerHTML = `<p>${result.answerText}: <strong>${result.count} voti</strong></p>`;
                resultsContainer.appendChild(div);
            });
        })
        .catch(error => console.error("Errore nel caricamento dei risultati:", error));
});
