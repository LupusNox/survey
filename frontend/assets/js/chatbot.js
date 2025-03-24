// Apre la finestra di chat
document.getElementById("chat-button").addEventListener("click", function () {
    document.getElementById("chat-modal").style.display = "flex";
});

// Chiude la finestra di chat
document.getElementById("close-chat").addEventListener("click", function () {
    document.getElementById("chat-modal").style.display = "none";
});

/**
 * Funzione: Aggiunge un messaggio nella chat.
 * @param {string} sender  - 'user' o 'bot'
 * @param {string} message - testo del messaggio
 */
function displayMessage(sender, message) {
    const chatBody = document.getElementById('chat-body');
    const messageDiv = document.createElement('div');
    // Se il sender è 'bot' usiamo la classe .bot-message, altrimenti .user-message
    messageDiv.classList.add(sender === 'bot' ? 'bot-message' : 'user-message');
    messageDiv.textContent = message;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight; // Scorri fino in fondo
}

/**
 * Funzione: Invia il messaggio dell'utente al backend e gestisce la risposta.
 * @param {string} userMessage - Il messaggio digitato dall'utente
 */
function sendMessageToChatbot(userMessage) {
    // Chiamata al backend per ottenere la risposta del chatbot
    fetch('http://localhost:8081/chatbot/response', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage })
    })
    .then(response => response.json())
    .then(data => {
        // data.response contiene il testo di risposta dal backend
        displayMessage('bot', data.response);
    })
    .catch(error => {
        console.error('Errore nella comunicazione con il backend:', error);
        displayMessage('bot', 'Mi dispiace, c\'è stato un errore nella comunicazione. Riprova!');
    });
}

// Quando clicco su "Invia"
document.getElementById("send-chat").addEventListener("click", function() {
    const userMessage = document.getElementById("chat-input").value.trim();
    if (userMessage) {
        // Mostra il messaggio dell'utente
        displayMessage('user', userMessage);
        // Invia al backend
        sendMessageToChatbot(userMessage);
        // Ripulisce l'input
        document.getElementById("chat-input").value = "";
    }
});
