package com.mediafarm.surveys.repository;

import com.mediafarm.surveys.model.Survey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SurveyRepository extends JpaRepository<Survey, Long> {

    List<Survey> findByCreatedById(Long userId);

    List<Survey> findByCompensoGreaterThan(double compenso);

    @Query("SELECT DISTINCT s FROM Survey s LEFT JOIN FETCH s.userAnswers")
    List<Survey> findAllWithUserAnswers();
}

