document.addEventListener("DOMContentLoaded", function () {
    console.log("Pagina Informazioni Caricata");

    const infoContainer = document.querySelector(".info-container");
    
    // Testo dinamico per la pagina
    infoContainer.innerHTML = `
        <h1>Benvenuto su Mediafarm</h1>
        <p>Mediafarm è una piattaforma di sondaggi che ti permette di esprimere la tua opinione e guadagnare premi.</p>
        <p>Registrati ora per iniziare a partecipare ai sondaggi e scoprire nuove opportunità.</p>
        <a href="register.html" class="btn-register">Registrati</a>
    `;
});
