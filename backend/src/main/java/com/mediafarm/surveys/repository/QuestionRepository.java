package com.mediafarm.surveys.repository;

import com.mediafarm.surveys.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {
	// Trova tutte le domande di un determinato sondaggio
    List<Question> findBySurveyId(Long surveyId);

 // Trova una domanda che contiene una determinata stringa nel testo
    Optional<Question> findByQuestionTextContainingIgnoreCase(String questionText);
}
