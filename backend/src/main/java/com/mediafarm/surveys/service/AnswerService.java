package com.mediafarm.surveys.service;

import com.mediafarm.surveys.model.UserAnswer;
import com.mediafarm.surveys.repository.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class AnswerService {

	@Autowired
    private AnswerRepository answerRepository;

    // Creazione di una risposta
    public UserAnswer createAnswer(UserAnswer answer) {
        return answerRepository.save(answer);
    }

    // Recuperare tutte le risposte
    public List<UserAnswer> getAllAnswers() {
        return answerRepository.findAll();
    }

    // Recuperare una risposta specifica
    public UserAnswer getAnswerById(Long answerId) {
        return answerRepository.findById(answerId).orElse(null);
    }

    // Contare il numero totale di risposte fornite
    public long countAnswers() {
        return answerRepository.count();
    }

    
}
