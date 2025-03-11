package com.mediafarm.surveys.controller;

import com.mediafarm.surveys.model.Question;
import com.mediafarm.surveys.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "http://localhost:8081")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    // Aggiungere una domanda a un sondaggio
    @PostMapping("/add")
    public ResponseEntity<Question> addQuestion(@RequestBody Question question) {
        return ResponseEntity.ok(questionService.addQuestion(question));
    }

    // Recuperare tutte le domande di un sondaggio
    @GetMapping("/survey/{surveyId}")
    public ResponseEntity<List<Question>> getQuestionsBySurvey(@PathVariable Long surveyId) {
        return ResponseEntity.ok(questionService.getQuestionsBySurvey(surveyId));
    }
}
