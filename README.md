# Surveys
Progetto realizzato durante uno stage presso **Mediafarm**: permette di gestire e partecipare a sondaggi online, guadagnando punti o premi. È stato sviluppato con un'architettura **full-stack** (Frontend in HTML/CSS/JS e Backend in Spring Boot), integrando un **chatbot di assistenza** per le domande frequenti.

---

## Scheda Tecnica

### Tecnologie Utilizzate

- **Java 17** & **Spring Boot 3+** (backend)
  - Spring Data JPA (accesso al database)
  - Spring Web (API REST)
  - Maven (gestione dipendenze)
- **MySQL** (database relazionale)
- **HTML5, CSS3, JavaScript** (frontend)
- **Tomcat** (embeddato in Spring Boot)

### Funzionamento Principale

- **Autenticazione**  
  Gli utenti si registrano e accedono con credenziali (email/password), ruoli di tipo `ADMIN` e `USER`.

- **Gestione Sondaggi**  
  L’admin può creare/modificare sondaggi e domande; gli utenti completano i sondaggi, ottenendo guadagni.

- **Chatbot di Assistenza**  
  Bottone circolare in basso a destra; fornisce risposte a domande frequenti (FAQ) e cerca corrispondenze nel DB.

- **Dashboard**  
  - **Utente**: Visualizza sondaggi disponibili, guadagni, ecc.  
  - **Admin**: Gestione di statistiche, utenti, e sondaggi.

---

## API Principali

Le API sono fornite dal backend Spring Boot su (ad esempio) [http://localhost:8081/](http://localhost:8081/). Alcune rotte tipiche:

### AuthController
- `POST /api/users/login` – Autenticazione di un utente (`email`, `password`)
- `POST /api/users/register` – Registrazione di un nuovo utente

### SurveyController
- `GET /api/surveys` – Recupera la lista dei sondaggi
- `POST /api/surveys` – Crea un nuovo sondaggio (*ADMIN*)
- `GET /api/surveys/{id}` – Dettagli di un sondaggio specifico
- `POST /api/surveys/{id}/questions` – Aggiunge una domanda a un sondaggio (*ADMIN*)

### ChatbotController
- `POST /chatbot/response` – Riceve un messaggio `{ "message": "testo utente" }` e restituisce `{ "response": "testo bot" }`

### AnswersController (eventuale)
- `POST /api/answers` – Permette di salvare la risposta di un utente
- `GET /api/answers/{id}` – Recupera la risposta

---

## Avvio del Progetto

1. **Avviare il Backend con Maven**:
   ```bash
   mvn spring-boot:run
Apertura pagina web:

http://localhost/surveys/frontend/index.html

L'app sarà disponibile su http://localhost:8081.