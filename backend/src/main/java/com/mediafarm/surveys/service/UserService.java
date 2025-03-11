package com.mediafarm.surveys.service;

import com.mediafarm.surveys.model.User;
import com.mediafarm.surveys.model.Role;
import com.mediafarm.surveys.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
 // Creazione di un utente
    public User createUser(User user) {
        return userRepository.save(user);
    }
    

    // Recuperare un utente specifico
    public User getUserById(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.orElse(null);
    }

    // Contare il numero totale di utenti registrati
    public long countUsers() {
        return userRepository.count();
    }

    // Registrazione di un utente
    public String register(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "Email già in uso!";
        }
        user.setRole(Role.USER); // Default role: USER
        userRepository.save(user);
        return "Registrazione completata!";
    }

    // Login manuale
    public User login(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.filter(u -> u.getPassword().equals(password)).orElse(null);
    }

    // Ottenere tutti gli utenti (solo admin)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Controllo se un utente è admin
    public boolean isAdmin(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.map(u -> u.getRole() == Role.ADMIN).orElse(false);
    }
}
