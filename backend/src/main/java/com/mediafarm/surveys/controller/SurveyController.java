package com.mediafarm.surveys.controller;

import com.mediafarm.surveys.model.Survey;
import com.mediafarm.surveys.service.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/surveys")
@CrossOrigin(origins = "http://localhost:8081")
public class SurveyController {

    @Autowired
    private SurveyService surveyService;

    // Creazione di un sondaggio
    @PostMapping("/create")
    public ResponseEntity<Survey> createSurvey(@RequestBody Survey survey) {
        return ResponseEntity.ok(surveyService.createSurvey(survey));
    }

    // Recuperare tutti i sondaggi
    @GetMapping("/all")
    public ResponseEntity<List<Survey>> getAllSurveys() {
        return ResponseEntity.ok(surveyService.getAllSurveys());
    }

    // Recuperare un singolo sondaggio con domande
    @GetMapping("/{surveyId}")
    public ResponseEntity<Survey> getSurvey(@PathVariable Long surveyId) {
        return ResponseEntity.ok(surveyService.getSurveyById(surveyId));
    }

    // Recuperare i sondaggi creati da un utente specifico
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Survey>> getSurveysByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(surveyService.getSurveysByUserId(userId));
    }

    // Recuperare solo i sondaggi a pagamento
    @GetMapping("/paid")
    public ResponseEntity<List<Survey>> getPaidSurveys() {
        return ResponseEntity.ok(surveyService.getPaidSurveys());
    }

    // Ottenere il numero di sondaggi per categoria
    @GetMapping("/stats/categories")
    public ResponseEntity<Map<String, Long>> getSurveysPerCategory() {
        return ResponseEntity.ok(surveyService.getSurveysPerCategory());
    }

    // Ottenere statistiche sui sondaggi completati e non completati
    @GetMapping("/stats/participation")
    public ResponseEntity<Map<String, Long>> getSurveyParticipation() {
        return ResponseEntity.ok(surveyService.getSurveyParticipation());
    }

    // Modificare un sondaggio
    @PutMapping("/update/{id}")
    public ResponseEntity<Survey> updateSurvey(@PathVariable Long id, @RequestBody Survey surveyDetails) {
        Survey updatedSurvey = surveyService.updateSurvey(id, surveyDetails);
        if (updatedSurvey != null) {
            return ResponseEntity.ok(updatedSurvey);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Eliminare un sondaggio
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteSurvey(@PathVariable Long id) {
        surveyService.deleteSurvey(id);
        return ResponseEntity.noContent().build();
    }
}
