document.addEventListener("DOMContentLoaded", function () {
    fetchSurveyResults();
    loadComments();
    
    document.getElementById("submitComment").addEventListener("click", function () {
        submitComment();
    });
});

// Funzione per ottenere i risultati del sondaggio dal database
function fetchSurveyResults() {
    fetch("http://localhost:8081/api/surveys/results")
        .then(response => response.json())
        .then(data => {
            document.getElementById("resultsData").innerHTML = JSON.stringify(data, null, 2);
        })
        .catch(error => console.error("Errore nel caricamento dei risultati:", error));
}

// Funzione per caricare i commenti
function loadComments() {
    fetch("http://localhost:8081/api/comments")
        .then(response => response.json())
        .then(data => {
            const commentList = document.getElementById("commentItems");
            commentList.innerHTML = "";
            data.forEach(comment => {
                let li = document.createElement("li");
                li.textContent = `${comment.user}: ${comment.text}`;
                commentList.appendChild(li);
            });
        })
        .catch(error => console.error("Errore nel caricamento dei commenti:", error));
}

// Funzione per inviare un commento
function submitComment() {
    const commentText = document.getElementById("commentText").value;

    if (commentText.trim() === "") {
        alert("Inserisci un commento valido.");
        return;
    }

    fetch("http://localhost:8081/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: "Utente", text: commentText })
    })
    .then(response => response.json())
    .then(() => {
        alert("Commento inviato!");
        loadComments(); // Aggiorna la lista
        document.getElementById("commentText").value = "";
    })
    .catch(error => console.error("Errore nell'invio del commento:", error));
}
