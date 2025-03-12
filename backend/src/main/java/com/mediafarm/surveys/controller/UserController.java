package com.mediafarm.surveys.controller;

import com.mediafarm.surveys.model.User;
import com.mediafarm.surveys.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*", allowedHeaders = "*") // ✅ Enables CORS for frontend access
public class UserController {

    @Autowired
    private UserService userService;

    // ✅ User Registration
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            String message = userService.register(user);
            return ResponseEntity.ok(Map.of("message", message));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Registration failed: " + e.getMessage()));
        }
    }

    // ✅ User/Admin Login (without JWT)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        Optional<User> userOptional = userService.findUserByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (user.getPassword().equals(password)) { // ✅ Simple authentication (No JWT)
                boolean isAdmin = "ADMIN".equalsIgnoreCase(user.getRole().toString());

                return ResponseEntity.ok(Map.of(
                    "id", user.getId(),
                    "email", user.getEmail(),
                    "role", user.getRole().toString(),
                    "dashboard", isAdmin ? "/pages/admin-dashboard.html" : "/pages/user-dashboard.html",
                    "message", isAdmin ? "Admin login successful!" : "User login successful!"
                ));
            } else {
                return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
            }
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "User not found"));
        }
    }

    // ✅ Get All Users (Admin Only)
    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers(@RequestParam String email) {
        Optional<User> adminUser = userService.findUserByEmail(email);

        if (adminUser.isPresent() && "ADMIN".equalsIgnoreCase(adminUser.get().getRole().toString())) {
            List<User> users = userService.getAllUsers();
            return ResponseEntity.ok(users);
        } else {
            return ResponseEntity.status(403).body(Map.of("error", "Access denied: only Admins can view users."));
        }
    }
}
