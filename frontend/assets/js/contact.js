document.addEventListener("DOMContentLoaded", function () {
    console.log("Pagina Contatti Caricata");

    const contactContainer = document.querySelector(".contact-container");

    contactContainer.innerHTML = `
        <h1>Contatta Mediafarm</h1>
        <p>Email: <a href="mailto:support@mediafarm.com">support@mediafarm.com</a></p>
        <p>Telefono: +39 123 456 789</p>
        <p>Seguici sui social:</p>
        <div class="social-icons">
            <a href="https://facebook.com" target="_blank">Facebook</a>
            <a href="https://twitter.com" target="_blank">Twitter</a>
            <a href="https://instagram.com" target="_blank">Instagram</a>
        </div>
    `;
});
