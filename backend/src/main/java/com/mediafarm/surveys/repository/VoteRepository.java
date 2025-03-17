package com.mediafarm.surveys.repository;

import com.mediafarm.surveys.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteRepository extends JpaRepository<Vote, Long> {
    boolean existsBySurveyIdAndUserEmail(Long surveyId, String userEmail);
}
