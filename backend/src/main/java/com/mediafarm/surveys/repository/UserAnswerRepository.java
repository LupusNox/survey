package com.mediafarm.surveys.repository;

import com.mediafarm.surveys.model.UserAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserAnswerRepository extends JpaRepository<UserAnswer, Long> {
    List<UserAnswer> findByUserId(Long userId);
    List<UserAnswer> findByAnswerId(Long answerId);
}
