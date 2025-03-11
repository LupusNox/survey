package com.mediafarm.surveys.controller;

import com.mediafarm.surveys.model.User;
import com.mediafarm.surveys.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:8081") // Abilita CORS solo per questo controller
public class UserController {

    @Autowired
    private UserService userService;

    // Registrazione utente
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        return ResponseEntity.ok(userService.register(user));
    }

    // Login utente
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        User user = userService.login(loginRequest.get("email"), loginRequest.get("password"));
        if (user != null) {
            return ResponseEntity.ok(Map.of("id", user.getId(), "email", user.getEmail(), "role", user.getRole()));
        } else {
            return ResponseEntity.status(401).body("Credenziali errate");
        }
    }

    // Ottenere lista utenti (solo per admin)
    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
}
