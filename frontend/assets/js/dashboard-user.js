document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("user-name").textContent = localStorage.getItem("userEmail") || "Ospite";
    fetchSurveyData();
});

function fetchSurveyData() {
    fetch("http://localhost:8081/api/surveys/available")
        .then(response => response.json())
        .then(data => {
            document.getElementById("available-surveys").textContent = data.length || 0;
        })
        .catch(error => console.error("Errore:", error));
}
