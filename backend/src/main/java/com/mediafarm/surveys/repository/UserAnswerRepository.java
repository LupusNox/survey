package com.mediafarm.surveys.repository;

import com.mediafarm.surveys.model.Answer;

import com.mediafarm.surveys.model.User;
import com.mediafarm.surveys.model.UserAnswer;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserAnswerRepository extends JpaRepository<UserAnswer, Long> {
    List<UserAnswer> findByUserId(Long userId);
    List<UserAnswer> findByAnswerId(Long answerId);
    // Conta quante volte una risposta è stata scelta dagli utenti
    long countByAnswer(Answer answer);
 // 🔹 Trova gli ID dei sondaggi a cui un utente ha risposto
    @Query("SELECT DISTINCT ua.survey.id FROM UserAnswer ua WHERE ua.user.email = :userEmail")
    List<Long> findSurveyIdsByUserEmail(String userEmail);

    // 🔹 Conta il numero di risposte date da un utente
    @Query("SELECT COUNT(ua) FROM UserAnswer ua WHERE ua.user = :user")
    long countByUser(User user);

    // 🔹 Conta il numero totale di sondaggi completati da tutti gli utenti
    @Query("SELECT COUNT(DISTINCT ua.survey.id) FROM UserAnswer ua")
    long countDistinctSurveyByUser();
}
