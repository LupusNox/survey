document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("admin-name").textContent = "Admin";
    fetchAdminData();
});

function fetchAdminData() {
    fetch("http://localhost:8081/api/statistics")
        .then(response => response.json())
        .then(data => {
            document.getElementById("total-surveys").textContent = data.totalSurveys || 0;
            document.getElementById("total-users").textContent = data.totalUsers || 0;
            document.getElementById("total-answers").textContent = data.totalAnswers || 0;
            document.getElementById("unique-visitors").textContent = data.uniqueVisitors || 0;
        })
        .catch(error => console.error("Errore:", error));
}
