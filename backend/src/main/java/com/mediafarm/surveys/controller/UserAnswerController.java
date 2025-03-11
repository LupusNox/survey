package com.mediafarm.surveys.controller;

import com.mediafarm.surveys.model.UserAnswer;
import com.mediafarm.surveys.service.UserAnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-answers")
@CrossOrigin(origins = "http://localhost:8081")
public class UserAnswerController {

    @Autowired
    private UserAnswerService userAnswerService;

    // Salvare le risposte dell'utente
    @PostMapping("/submit")
    public ResponseEntity<String> submitAnswers(@RequestBody List<UserAnswer> userAnswers) {
        userAnswerService.saveUserAnswers(userAnswers);
        return ResponseEntity.ok("Risposte inviate con successo!");
    }

    // Recuperare le risposte di un utente
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserAnswer>> getUserAnswers(@PathVariable Long userId) {
        return ResponseEntity.ok(userAnswerService.getUserAnswers(userId));
    }
}
