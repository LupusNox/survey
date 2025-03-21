package com.mediafarm.surveys.service;

import com.mediafarm.surveys.model.Visitor;

import com.mediafarm.surveys.repository.VisitorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VisitorService {

    @Autowired
    private VisitorRepository visitorRepository;

    // Registra un visitatore solo se non esiste già
    public void trackVisitor(String ipAddress) {
        if (!visitorRepository.existsByIpAddress(ipAddress)) {
            visitorRepository.save(new Visitor(ipAddress));
        }
    }

    // Ottieni il numero totale di visitatori unici
    public long getTotalUniqueVisitors() {
        return visitorRepository.count();
    }
}
