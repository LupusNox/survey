package com.mediafarm.surveys.repository;

import com.mediafarm.surveys.model.UserAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepository extends JpaRepository<UserAnswer, Long> {
}
