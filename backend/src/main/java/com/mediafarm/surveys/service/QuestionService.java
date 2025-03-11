package com.mediafarm.surveys.service;

import com.mediafarm.surveys.model.Question;
import com.mediafarm.surveys.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    // Aggiungere una domanda a un sondaggio
    public Question addQuestion(Question question) {
        return questionRepository.save(question);
    }

    // Recuperare tutte le domande di un sondaggio
    public List<Question> getQuestionsBySurvey(Long surveyId) {
        return questionRepository.findBySurveyId(surveyId);
    }
}
