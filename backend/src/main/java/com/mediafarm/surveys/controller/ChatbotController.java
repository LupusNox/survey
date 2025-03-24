package com.mediafarm.surveys.controller;

import com.mediafarm.surveys.service.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/chatbot")
@CrossOrigin(origins = "*", allowedHeaders = "*") // CORS per il frontend
public class ChatbotController {


    @Autowired
    private ChatbotService chatbotService;

    // Endpoint per la chat
    @GetMapping("/api/chatbot")
    public Map<String, String> chatWithBot(@RequestParam String message) {
        // Ottieni la risposta del bot tramite il servizio
        String responseMessage = chatbotService.getBotResponse(message);

        return Map.of("response", responseMessage);
    }
    
    @PostMapping("/response")
    public ResponseEntity<Map<String, String>> getChatbotResponse(@RequestBody Map<String, String> request) {
        String userMessage = request.get("message");
        String botResponse = chatbotService.getBotResponse(userMessage);

        Map<String, String> response = new HashMap<>();
        response.put("response", botResponse);

        return ResponseEntity.ok(response);
    }
}
