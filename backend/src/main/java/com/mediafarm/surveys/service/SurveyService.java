package com.mediafarm.surveys.service;

import com.mediafarm.surveys.model.Survey;
import com.mediafarm.surveys.repository.SurveyRepository;
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


    // Creazione di un sondaggio
    public Survey createSurvey(Survey survey) {
        return surveyRepository.save(survey);
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
