package com.mediafarm.surveys.service;

import com.mediafarm.surveys.model.Answer;
import com.mediafarm.surveys.model.Question;
import com.mediafarm.surveys.model.Survey;
import com.mediafarm.surveys.model.User;
import com.mediafarm.surveys.repository.SurveyRepository;
import com.mediafarm.surveys.repository.UserAnswerRepository;
import com.mediafarm.surveys.repository.UserRepository;
import com.mediafarm.surveys.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.Optional;

@Service
public class SurveyService {

	@Autowired
    private SurveyRepository surveyRepository;

    @Autowired
    private VoteRepository voteRepository;  // ✅ Ora useremo questo repository
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private UserAnswerRepository userAnswerRepository;  // ✅ Aggiunto repository per evitare l'errore

    @Transactional // 🔹 Mantiene la sessione aperta per evitare LazyInitializationException
    public Map<String, Long> getSurveyParticipation1() {
        List<Survey> surveys = surveyRepository.findAll();
        
        long completed = surveys.stream()
                .filter(survey -> survey.getUserAnswers().size() > 0) // 🔹 Ora non si rompe
                .count();

        long notCompleted = surveys.size() - completed;

        return Map.of(
            "completed", completed,
            "incomplete", notCompleted
        );
    }
    
    /**
     * ✅ Controlla se un utente ha già votato in un sondaggio
     * @param userId ID dell'utente
     * @param surveyId ID del sondaggio
     * @return true se ha già votato, false altrimenti
     */
    public boolean hasUserVoted(Long userId, Long surveyId) {
        Optional<User> userOpt = userRepository.findById(userId);
        return userOpt.map(user -> user.getVotedSurveys().contains(surveyId)).orElse(false);
    }

    /**
     * ✅ Registra un voto in un sondaggio
     * @param userId ID dell'utente
     * @param surveyId ID del sondaggio
     * @param voteOption Opzione scelta dall'utente
     */
    public void recordVote(Long userId, Long surveyId, String voteOption) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Survey> surveyOpt = surveyRepository.findById(surveyId);

        if (userOpt.isPresent() && surveyOpt.isPresent()) {
            User user = userOpt.get();
            Survey survey = surveyOpt.get();

            // ✅ Controllo: se l'utente ha già votato, non può votare di nuovo
            if (user.getVotedSurveys().contains(surveyId)) {
                throw new IllegalStateException("Hai già votato in questo sondaggio.");
            }

            // ✅ Incrementa il conteggio del voto
            survey.incrementVoteCount(voteOption);
            surveyRepository.save(survey);

            // ✅ Segna il sondaggio come votato
            user.addVotedSurvey(surveyId);
            userRepository.save(user);
        } else {
            throw new IllegalArgumentException("Utente o sondaggio non trovato.");
        }
    }


    // Creazione di un sondaggio
    public Survey createSurvey(Survey survey) {
        return surveyRepository.save(survey);
    }
    
 // ✅ Controlla se l'utente ha già votato in un sondaggio
    public boolean hasUserVoted(Long surveyId, String userEmail) {
        Optional<Survey> surveyOpt = surveyRepository.findById(surveyId);
        Optional<User> userOpt = userRepository.findByEmail(userEmail);

        if (surveyOpt.isPresent() && userOpt.isPresent()) {
            Survey survey = surveyOpt.get();
            User user = userOpt.get();
            return survey.getVotedUsers().contains(user);
        }
        return false;
    }
    
    // Recupera i sondaggi disponibili per l'utente (quelli a cui non ha risposto)
    public List<Survey> getAvailableSurveys(String userEmail) {
        List<Long> answeredSurveyIds = userAnswerRepository.findSurveyIdsByUserEmail(userEmail);
        return surveyRepository.findAll()
                .stream()
                .filter(survey -> !answeredSurveyIds.contains(survey.getId()))
                .collect(Collectors.toList());
    }
    
 // Recupera i sondaggi a cui l'utente ha già risposto
    public List<Survey> getAnsweredSurveys(String userEmail) {
        List<Long> answeredSurveyIds = userAnswerRepository.findSurveyIdsByUserEmail(userEmail);
        return surveyRepository.findByIdIn(answeredSurveyIds);
    }
    
 // ✅ Registra un voto per un sondaggio
    public boolean recordVote(Long surveyId, String userEmail, String selectedOption) {
        Optional<Survey> surveyOpt = surveyRepository.findById(surveyId);
        Optional<User> userOpt = userRepository.findByEmail(userEmail);

        if (surveyOpt.isPresent() && userOpt.isPresent()) {
            Survey survey = surveyOpt.get();
            User user = userOpt.get();

            // Controlla se l'utente ha già votato
            if (survey.getVotedUsers().contains(user)) {
                return false;
            }

            // Registra il voto
            survey.addVotedUser(user);
            survey.incrementVoteCount(selectedOption);
            surveyRepository.save(survey);
            return true;
        }
        return false;
    }

    

    // Recuperare tutti i sondaggi
    public List<Survey> getAllSurveys() {
        return surveyRepository.findAll();
    }

    // Recuperare i sondaggi creati da un utente specifico
    public List<Survey> getSurveysByUserId(Long userId) {
        return surveyRepository.findByCreatedById(userId);
    }

    // Recuperare i sondaggi con compenso maggiore di 0
    public List<Survey> getPaidSurveys() {
        return surveyRepository.findByCompensoGreaterThan(0);
    }

    // Conta il numero di sondaggi per ogni categoria
    public Map<String, Long> getSurveysPerCategory() {
        List<Survey> surveys = surveyRepository.findAll();
        return surveys.stream()
                .collect(Collectors.groupingBy(Survey::getCategory, Collectors.counting()));
    }

    // Conta il numero di sondaggi completati e incompleti
    public Map<String, Long> getSurveyParticipation() {
        List<Survey> surveys = surveyRepository.findAll();
        
        long completed = surveys.stream()
                .filter(survey -> survey.getUserAnswers().size() > 0) // Se ha risposte, è stato completato
                .count();

        long notCompleted = surveys.size() - completed;

        return Map.of(
            "completed", completed,
            "incomplete", notCompleted
        );
    }
    
    
    
 // ✅ Recupera il sondaggio con tutte le domande e risposte
    public Map<String, Object> getSurveyDetails(Long surveyId) {
        Survey survey = surveyRepository.findById(surveyId).orElse(null);
        if (survey == null) {
            return Map.of("error", "Sondaggio non trovato");
        }

        List<Question> questions = survey.getQuestions();
        Map<String, Object> details = new HashMap<>();
        details.put("id", survey.getId());
        details.put("title", survey.getTitle());
        details.put("description", survey.getDescription());
        details.put("questions", questions);

        return details;
    }

 // ✅ Recupera i risultati del sondaggio, incluso il numero totale di voti ricevuti
    public Map<String, Object> getSurveyResults(Long surveyId) {
        Survey survey = surveyRepository.findById(surveyId).orElse(null);
        if (survey == null) {
            return Map.of("error", "Sondaggio non trovato");
        }

        long totalVotes = voteRepository.countBySurvey(survey);  // ✅ Usiamo voteRepository

        List<Question> questions = survey.getQuestions();
        Map<String, Object> results = new HashMap<>();
        results.put("surveyTitle", survey.getTitle());
        results.put("totalVotes", totalVotes);  // ✅ Aggiungiamo il totale voti nel risultato

        List<Map<String, Object>> questionResults = new ArrayList<>();

        for (Question question : questions) {
            Map<String, Object> questionData = new HashMap<>();
            questionData.put("question", question.getQuestionText());

            List<Map<String, Object>> answerStats = new ArrayList<>();

            for (Answer answer : question.getAnswers()) {
                long responseCount = userAnswerRepository.countByAnswer(answer);

                Map<String, Object> answerData = new HashMap<>();
                answerData.put("answer", answer.getAnswerText());
                answerData.put("count", responseCount);

                answerStats.add(answerData);
            }

            questionData.put("answers", answerStats);
            questionResults.add(questionData);
        }

        results.put("questions", questionResults);
        return results;
    }


    // Recuperare un sondaggio specifico
    public Survey getSurveyById(Long surveyId) {
        Optional<Survey> survey = surveyRepository.findById(surveyId);
        return survey.orElse(null);
    }

    // Contare il numero totale di sondaggi
    public long countSurveys() {
        return surveyRepository.count();
    }

    // Modificare un sondaggio esistente
    public Survey updateSurvey(Long id, Survey surveyDetails) {
        Optional<Survey> optionalSurvey = surveyRepository.findById(id);
        if (optionalSurvey.isPresent()) {
            Survey survey = optionalSurvey.get();
            survey.setTitle(surveyDetails.getTitle());
            survey.setCategory(surveyDetails.getCategory());
            survey.setCompenso(surveyDetails.getCompenso()); // Nuovo campo
            return surveyRepository.save(survey);
        }
        return null;
    }

    // Eliminare un sondaggio
    public void deleteSurvey(Long surveyId) {
        surveyRepository.deleteById(surveyId);
    }
}
