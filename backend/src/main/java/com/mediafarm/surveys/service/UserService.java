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

    // ✅ Create a new user
    public User createUser(User user) {
        return userRepository.save(user);
    }

    // ✅ Retrieve a user by ID
    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    // ✅ Count total registered users
    public long countUsers() {
        return userRepository.count();
    }

    // ✅ Register a new user (checks for duplicate email)
    public String register(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "Email already in use!";
        }
        user.setRole(Role.USER); // Default role: USER
        userRepository.save(user);
        return "Registration completed!";
    }

    // ✅ Find user by email
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // ✅ Authenticate user manually
    public Optional<User> login(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> user.getPassword().equals(password));
    }

    // ✅ Get all users (only for admins)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ✅ Check if a user is an admin
    public boolean isAdmin(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.map(u -> u.getRole() == Role.ADMIN).orElse(false);
    }
}
