package com.tutorfinder.controller;

import com.tutorfinder.dto.ApiResponse;
import com.tutorfinder.model.User;
import com.tutorfinder.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    // Register user
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        // Admin auto-approved, others pending
        user.setApproved(user.getRole() != null && user.getRole().equalsIgnoreCase("admin"));
        userService.registerUser(user);
        return ResponseEntity.ok(new ApiResponse<>("Registered successfully. Pending admin approval.", user));
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        User user = userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());
        if (user == null) {
            return ResponseEntity.badRequest().body(new ApiResponse<>("Invalid email or password"));
        }

        // Check approval
        if (user.getApproved() == null || Boolean.FALSE.equals(user.getApproved())) {
            return ResponseEntity.ok(new ApiResponse<>("Account pending admin approval", user));
        }

        return ResponseEntity.ok(new ApiResponse<>("Login successful", user));
    }

    // Update user
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable("id") Long id,
                                        @RequestBody User updatedUser) {
        try {
            User u = userService.updateUser(id, updatedUser);
            return ResponseEntity.ok(new ApiResponse<>("User updated", u));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(e.getMessage()));
        }
    }

    // Delete user
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(new ApiResponse<>("User deleted successfully"));
    }

    // Get all students
    @GetMapping("/students")
    public ResponseEntity<?> getStudents(@RequestParam(required = false) Boolean pending) {
        List<User> students = userService.getAllUsers()
            .stream()
            .filter(u -> "student".equalsIgnoreCase(u.getRole()))
            .filter(u -> pending == null || (pending && Boolean.FALSE.equals(u.getApproved())))
            .toList();
        return ResponseEntity.ok(new ApiResponse<>("Students fetched", students));
    }

    // Get all tutors
    @GetMapping("/tutors")
    public ResponseEntity<?> getTutors(@RequestParam(required = false) Boolean pending) {
        List<User> tutors = userService.getAllUsers()
            .stream()
            .filter(u -> "tutor".equalsIgnoreCase(u.getRole()))
            .filter(u -> pending == null || (pending && Boolean.FALSE.equals(u.getApproved())))
            .toList();
        return ResponseEntity.ok(new ApiResponse<>("Tutors fetched", tutors));
    }

    @GetMapping("/")
    public ResponseEntity<?> hello() {
        return ResponseEntity.ok(new ApiResponse<>("API is running"));
    }
    @PostMapping("/admin/{action}/{type}/{id}")
    public ResponseEntity<?> approveOrReject(
            @PathVariable String action,
            @PathVariable String type,
            @PathVariable Long id
    ) {
        boolean approve = action.equalsIgnoreCase("approve");
        userService.approveOrRejectUser(id, type, approve);
        return ResponseEntity.ok(new ApiResponse<>(type + " " + (approve ? "approved" : "rejected")));
    }
}
