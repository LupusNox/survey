document.addEventListener("DOMContentLoaded", function() {
    console.log("Mediafarm Ready!");

    // Gestione del percorso delle immagini in base alla pagina
    const pathPrefix = window.location.pathname.includes("/pages/") ? "../" : "";

    // Aggiornamento dinamico del titolo della pagina
    document.title = document.title.replace(" - Mediafarm", "") + " - Mediafarm";

    // Recupero il token di autenticazione
    const token = localStorage.getItem("token");
    const navMenu = document.querySelector("nav ul");

    // Se l'utente è autenticato, aggiunge la dashboard alla navbar
    if (token && !document.querySelector("nav ul li a[href='pages/dashboard.html']")) {
        navMenu.innerHTML += `<li><a href="${pathPrefix}pages/dashboard.html">Dashboard</a></li>`;
    }

    // Evidenzia la pagina attuale nella navbar
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

    // Bottone di logout
    const logoutButton = document.querySelector("#logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", function() {
            localStorage.removeItem("token");
            window.location.href = pathPrefix + "index.html";
        });
    }

    // Generazione dinamica del footer
    const footerbar = document.querySelector("footer");
    if (footerbar) {
        footerbar.innerHTML = ` 
            <div class="footer-container">
                <div class="footer-column">
                    <h4>Mediafarm</h4>
                    <p>La piattaforma di sondaggi più affidabile.</p>
                </div>
                <div class="footer-column">
                    <h4>Link Utili</h4>
                    <ul>
                        <li><a href="${pathPrefix}pages/login.html">Accedi</a></li>
                        <li><a href="${pathPrefix}pages/register.html">Registrati</a></li>
                        <li><a href="${pathPrefix}pages/dashboard.html">Dashboard</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4>Contatti</h4>
                    <p>Email: support@mediafarm.com</p>
                    <p>Telefono: +39 123 456 789</p>
                </div>
                <div class="footer-column">
                    <h4>Seguici</h4>
                    <div class="social-icons">
                        <a href="https://twitter.com" target="_blank"><img src="${pathPrefix}assets/img/twitter.png" alt="Twitter"></a>
                        <a href="https://t.me" target="_blank"><img src="${pathPrefix}assets/img/telegram.png" alt="Telegram"></a>
                        <a href="https://facebook.com" target="_blank"><img src="${pathPrefix}assets/img/facebook.png" alt="Facebook"></a>
                        <a href="https://instagram.com" target="_blank"><img src="${pathPrefix}assets/img/instagram.png" alt="Instagram"></a>
                    </div>
                </div>
            </div>
            <p class="copyright">© 2025 Mediafarm - Tutti i diritti riservati.</p>`;
    }
});
