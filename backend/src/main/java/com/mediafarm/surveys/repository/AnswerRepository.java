package com.mediafarm.surveys.repository;

import com.mediafarm.surveys.model.Answer;
import com.mediafarm.surveys.model.Question;
import com.mediafarm.surveys.model.UserAnswer;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {

    // Trova tutte le risposte per una determinata domanda
    List<Answer> findByQuestion(Question question);
}