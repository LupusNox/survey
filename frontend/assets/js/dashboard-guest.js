document.addEventListener("DOMContentLoaded", function () {
    console.log("Dashboard Guest Caricata");

    const dashboardContent = document.getElementById("dashboard-content");

    // Genera i box della dashboard
    dashboardContent.innerHTML = `
        <div class="dashboard-grid">
            <a href="about.html" class="dashboard-box-item blue-box">Info su Mediafarm</a>
            <a href="contact.html" class="dashboard-box-item green-box">Contattaci</a>
            <a href="survey-results.html" class="dashboard-box-item orange-box">Visualizza Risultati</a>
            <a href="register.html" class="dashboard-box-item cyan-box">Registrati</a>
        </div>
    `;
});
