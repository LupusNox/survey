document.addEventListener("DOMContentLoaded", function () {
    const surveyList = document.getElementById("survey-list");
    const userRole = localStorage.getItem("userRole"); // Admin o Utente

    fetch("http://localhost:8081/api/surveys/all")
        .then(response => response.json())
        .then(surveys => {
            surveyList.innerHTML = ""; // Svuota la lista

            surveys.forEach(survey => {
                const li = document.createElement("li");
                li.classList.add("survey-item");

                // Verifica se è Admin o Utente e mostra i pulsanti giusti
                if (userRole === "admin") {
                    li.innerHTML = `
                        <span>${survey.title}</span>
                        <div>
                            <button class="btn-edit" onclick="editSurvey(${survey.id})">Modifica</button>
                            <button class="btn-delete" onclick="deleteSurvey(${survey.id})">Elimina</button>
                        </div>
                    `;
                } else {
                    li.innerHTML = `
                        <span>${survey.title}</span>
                        <a href="survey-form.html?surveyId=${survey.id}" class="btn">Compila</a>
                    `;
                }

                surveyList.appendChild(li);
            });
        })
        .catch(error => console.error("Errore nel caricamento dei sondaggi:", error));
});

// Funzione per eliminare un sondaggio (solo per Admin)
function deleteSurvey(surveyId) {
    if (confirm("Sei sicuro di voler eliminare questo sondaggio?")) {
        fetch(`http://localhost:8081/api/surveys/${surveyId}`, {
            method: "DELETE",
        })
        .then(response => {
            if (response.ok) {
                alert("Sondaggio eliminato con successo!");
                location.reload();
            } else {
                alert("Errore durante l'eliminazione del sondaggio.");
            }
        })
        .catch(error => console.error("Errore durante l'eliminazione:", error));
    }
}

// Funzione per modificare un sondaggio (solo per Admin)
function editSurvey(surveyId) {
    window.location.href = `survey-edit.html?surveyId=${surveyId}`;
}
