package com.mediafarm.surveys.repository;

import com.mediafarm.surveys.model.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitorRepository extends JpaRepository<Visitor, Long> {
    boolean existsByIpAddress(String ipAddress);
    long count();
}
