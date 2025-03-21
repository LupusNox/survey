package com.mediafarm.surveys.controller;

import com.mediafarm.surveys.service.VisitorService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/visitors")
@CrossOrigin(origins = "http://localhost:8081")
public class VisitorController {

    @Autowired
    private VisitorService visitorService;

    // Traccia un nuovo visitatore
    @PostMapping("/track")
    public ResponseEntity<Map<String, String>> trackVisitor(HttpServletRequest request) {
        String ipAddress = request.getRemoteAddr();
        visitorService.trackVisitor(ipAddress);
        return ResponseEntity.ok(Map.of("message", "Visitatore registrato con successo"));
    }

    // Restituisce il numero totale di visitatori unici
    @GetMapping("/count")
    public ResponseEntity<Map<String, Long>> getTotalVisitors() {
        return ResponseEntity.ok(Map.of("totalUniqueVisitors", visitorService.getTotalUniqueVisitors()));
    }
}
