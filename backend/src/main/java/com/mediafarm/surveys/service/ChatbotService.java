package com.mediafarm.surveys.service;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mediafarm.surveys.repository.QuestionRepository;
import com.mediafarm.surveys.repository.AnswerRepository;
import com.mediafarm.surveys.repository.UserAnswerRepository;
import com.mediafarm.surveys.model.Question;
import com.mediafarm.surveys.model.Answer;
import com.mediafarm.surveys.model.UserAnswer;

@Service
public class ChatbotService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private UserAnswerRepository userAnswerRepository;

    // Mappa delle risposte predefinite
    private Map<String, String> chatbotResponses;

    // Costruttore con domande generali
    public ChatbotService() {
        chatbotResponses = new HashMap<>();

        // Domande generali
        chatbotResponses.put("ciao", "Ciao! Come posso aiutarti?");
        chatbotResponses.put("come stai", "Sto bene, grazie! E tu?");
        chatbotResponses.put("a cosa serve questo sito", "Questo sito ti permette di partecipare a sondaggi e guadagnare premi.");
        chatbotResponses.put("chi sei", "Sono un assistente virtuale che può aiutarti con i sondaggi.");
        chatbotResponses.put("come partecipare ai sondaggi", "Puoi registrarti nel nostro sito e iniziare a partecipare ai sondaggi.");
        chatbotResponses.put("come posso guadagnare", "Puoi guadagnare rispondendo ai sondaggi e accumulando punti.");
        
        // Domande sul sito
        chatbotResponses.put("come funziona questo sito", "Questo sito ti consente di rispondere a sondaggi personalizzati e guadagnare premi.");
        chatbotResponses.put("come posso iscrivermi", "Puoi registrarti direttamente sulla nostra pagina di registrazione.");
        chatbotResponses.put("quanto tempo ci vuole per completare un sondaggio", "Ogni sondaggio richiede circa 5-10 minuti per essere completato.");
        chatbotResponses.put("quanto guadagno per ogni sondaggio", "Il guadagno dipende dal sondaggio, ma di solito ricevi tra 1 e 5 euro per sondaggio.");
        
        // Domande sui premi
        chatbotResponses.put("come posso ritirare i miei premi", "Puoi ritirare i tuoi premi una volta accumulati abbastanza punti. Visita il tuo profilo per maggiori dettagli.");
        chatbotResponses.put("quando arrivano i premi", "I premi vengono inviati dopo aver completato un certo numero di sondaggi.");
        chatbotResponses.put("quali sono i premi disponibili", "I premi includono buoni regalo, denaro, carte prepagate e altri regali.");
        
        // Domande sui sondaggi
        chatbotResponses.put("quanto tempo posso impiegare per rispondere ai sondaggi", "Ogni sondaggio ha un limite di tempo specifico, generalmente tra 5 e 15 minuti.");
        chatbotResponses.put("quanti sondaggi posso fare al giorno", "Puoi partecipare a tutti i sondaggi disponibili ogni giorno, a seconda delle tue preferenze.");
        chatbotResponses.put("quali categorie di sondaggi ci sono", "Le categorie includono tecnologia, salute, alimentazione, moda, e altro ancora.");
        
        // Domande di supporto
        chatbotResponses.put("ho dimenticato la password", "Clicca su 'Password dimenticata' nella pagina di login per ripristinarla.");
        chatbotResponses.put("come posso contattare il supporto", "Puoi contattarci via email all'indirizzo support@mediafarm.com o usare il modulo di contatto nel sito.");
        chatbotResponses.put("dove posso vedere i miei guadagni", "I tuoi guadagni sono visibili nel tuo dashboard personale.");
        
        // Domande sul profilo e il login
        chatbotResponses.put("come posso modificare il mio profilo", "Accedi alla tua area personale e clicca su 'Modifica Profilo' per aggiornare le tue informazioni.");
        chatbotResponses.put("come faccio a loggarmi", "Puoi fare login cliccando su 'Login' nel menu principale e inserendo la tua email e password.");
        chatbotResponses.put("come faccio a registrarmi", "Puoi registrarti cliccando su 'Registrati' nel menu principale e seguendo le istruzioni.");
        
        // Domande sui punti e le ricompense
        chatbotResponses.put("come posso ottenere punti", "Puoi ottenere punti completando i sondaggi disponibili.");
        chatbotResponses.put("quanti punti servono per un premio", "Dipende dal tipo di premio. Di solito sono necessari almeno 1000 punti.");
        chatbotResponses.put("come funzionano i punti", "Ogni sondaggio ti assegna un certo numero di punti che possono essere convertiti in premi.");
        
        // Altre domande generali
        chatbotResponses.put("quando vengono pubblicati nuovi sondaggi", "Nuovi sondaggi vengono aggiunti quotidianamente, quindi torna a trovarci ogni giorno.");
        chatbotResponses.put("che tipo di domande vengono fatte nei sondaggi", "I sondaggi possono riguardare opinioni su prodotti, servizi, abitudini quotidiane e molto altro.");
        chatbotResponses.put("posso fare più di un sondaggio al giorno", "Sì, puoi fare tutti i sondaggi disponibili nel giorno.");
        chatbotResponses.put("cosa succede se non completo un sondaggio", "Se non completi un sondaggio, non ricevi i punti per quel sondaggio.");
    }

    /**
     * Ritorna la risposta del bot per un dato messaggio utente
     */
    public String getBotResponse(String userMessage) {
        // Normalizziamo l'input (minuscolo, rimuove spazi iniziali/finali)
        userMessage = userMessage.toLowerCase().trim();

        // 1) Controlla PRIMA la mappa di risposte predefinite
        String predefinita = chatbotResponses.get(userMessage);
        if (predefinita != null) {
            return predefinita;
        }

        // 2) Se non esiste nella mappa, cerca la domanda corrispondente nel database
        String responseMessage = "Mi dispiace, non ho trovato una risposta adeguata a questa domanda.";

        Optional<Question> questionOpt = questionRepository.findByQuestionTextContainingIgnoreCase(userMessage);
        if (questionOpt.isPresent()) {
            Question question = questionOpt.get();
            
            // Trova tutte le risposte per questa domanda
            List<Answer> answers = answerRepository.findByQuestion(question);
            
            // Se ci sono risposte, prendi la prima
            if (!answers.isEmpty()) {
                responseMessage = answers.get(0).getAnswerText();
            }
        }

        return responseMessage;
    }

    /**
     * Salva una risposta dell'utente (ad esempio se vuoi tracciare i comportamenti)
     */
    public void saveUserAnswer(UserAnswer userAnswer) {
        userAnswerRepository.save(userAnswer);
    }
}
