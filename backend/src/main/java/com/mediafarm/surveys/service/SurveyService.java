package com.mediafarm.surveys.service;

import com.mediafarm.surveys.model.Survey;
import com.mediafarm.surveys.model.User;
import com.mediafarm.surveys.model.Vote;
import com.mediafarm.surveys.repository.SurveyRepository;
import com.mediafarm.surveys.repository.UserRepository;
import com.mediafarm.surveys.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
    private VoteRepository voteRepository;
    
    @Autowired
    private UserRepository userRepository;

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
