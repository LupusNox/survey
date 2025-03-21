package com.mediafarm.surveys.service;

import com.mediafarm.surveys.model.UserAnswer;
import com.mediafarm.surveys.repository.UserAnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserAnswerService {

    @Autowired
    private UserAnswerRepository userAnswerRepository;

 // ✅ Metodo per salvare le risposte dell'utente
    public void saveUserAnswers(List<UserAnswer> userAnswers) {
        for (UserAnswer userAnswer : userAnswers) {
            userAnswer.setUpdatedAt(LocalDateTime.now()); // Aggiorna il timestamp
            userAnswerRepository.save(userAnswer);
        }
    }
    
    // Recuperare le risposte di un utente
    public List<UserAnswer> getUserAnswers(Long userId) {
        return userAnswerRepository.findByUserId(userId);
    }
}
