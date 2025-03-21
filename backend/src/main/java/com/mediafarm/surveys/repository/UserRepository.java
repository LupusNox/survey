package com.mediafarm.surveys.repository;

import com.mediafarm.surveys.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    
 // 🔹 Somma i guadagni di tutti gli utenti (supponendo che ci sia un campo "earnings")
    @Query("SELECT COALESCE(SUM(u.earnings), 0) FROM User u")
    double calculateTotalEarnings();
}
