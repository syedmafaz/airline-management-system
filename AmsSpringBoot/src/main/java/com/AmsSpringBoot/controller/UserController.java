package com.AmsSpringBoot.controller;

import com.AmsSpringBoot.bean.User;
import com.AmsSpringBoot.dao.UserDAO;
import com.AmsSpringBoot.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200") // Angular dev server
@RestController
@RequestMapping("/api/user")

public class UserController {

    @Autowired
    private UserService userService;
    private UserDAO userDAO;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) throws SQLException {
        boolean success = userService.register(user);
		if (success) {
		    return ResponseEntity.ok(Map.of("success", true, "message", "User registered successfully"));
		} else {
		    return ResponseEntity.status(500).body(Map.of("success", false, "message", "User registration failed"));
		}
    }

//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody User loginRequest) {
//        User user = userService.login(loginRequest.getUserName(), loginRequest.getPassword());
//        if (user != null) {
//        	System.out.println("User login successful");
//            return ResponseEntity.ok(user);
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
//        }
//    }
    
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody User loginRequest) {
//        User user = userService.login(loginRequest.getUserName(), loginRequest.getPassword());
//        if (user != null) {
//            Map<String, Object> response = new HashMap<>();
//            response.put("token", "dummy-token-" + user.getUserId()); // 🔐 Use JWT in production
//            response.put("role", user.getRole());
//            response.put("message", "Login successful");
//            System.out.println("User login successful");
//            return ResponseEntity.ok(response);
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                                 .body(Map.of("message", "Invalid credentials"));
//        }
//        
//    }
    
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody User loginRequest) {
//        User user = userService.login(loginRequest.getUserName(), loginRequest.getPassword());
//        if (user != null) {
//            Map<String, Object> response = new HashMap<>();
//            response.put("token", "dummy-token-" + user.getUserId());
//            response.put("role", user.getRole());
//            response.put("user", user); // 🔥 include full user info
//            response.put("userId", user.getUserId()); // 🔥 include userId separately
//            response.put("message", "Login successful");
//            System.out.println("User login successful");
//            return ResponseEntity.ok(response);
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                                 .body(Map.of("message", "Invalid credentials"));
//        }
//    }

    
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody Map<String, String> loginData) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            String emailId = loginData.get("emailId");  // Changed from userName
            String password = loginData.get("password");
            
            User user = userDAO.authenticateByEmail(emailId, password);  // New method
            
            if (user != null) {
                response.put("success", true);
                response.put("message", "Login successful");
                response.put("userId", user.getUserId());
                response.put("role", user.getRole());
                response.put("user", user);
                response.put("token", "dummy-token-" + user.getUserId()); // Replace with actual JWT
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "Invalid email or password");
                return ResponseEntity.status(401).body(response);
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Login failed: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    
    
    
    
    @GetMapping("/search/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        User user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable int id, @RequestBody User updatedUser) {
        updatedUser.setUserId(id); // Ensure ID is set
        boolean success = userService.updateUser(updatedUser);
        if (success) {
            return ResponseEntity.ok(Map.of("message", "User updated successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(Map.of("message", "User update failed"));
        }
    }
    
    
    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int id) {
        boolean deleted = userService.deleteUserById(id);
        if (deleted) {
            return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "User not found"));
        }
    }
    
    
    @GetMapping("/validate-email/{email}")
    public ResponseEntity<Boolean> validateEmail(@PathVariable String email) {
        try {
            boolean exists = userDAO.emailExists(email);
            return ResponseEntity.ok(exists);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(false);
        }
    }


}
