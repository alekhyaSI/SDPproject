package com.tutorfinder.controller;

import com.tutorfinder.dto.ApiResponse;
import com.tutorfinder.model.User;
import com.tutorfinder.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    // Get pending tutors
    @GetMapping("/pending/tutors")
    public ResponseEntity<?> pendingTutors() {
        List<User> pending = userRepository.findAll()
                .stream()
                .filter(u -> "tutor".equalsIgnoreCase(u.getRole()) && (u.getApproved() == null || !u.getApproved()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(new ApiResponse<>("Pending tutors fetched", pending));
    }

    // Get pending students
    @GetMapping("/pending/students")
    public ResponseEntity<?> pendingStudents() {
        List<User> pending = userRepository.findAll()
                .stream()
                .filter(u -> "student".equalsIgnoreCase(u.getRole()) && (u.getApproved() == null || !u.getApproved()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(new ApiResponse<>("Pending students fetched", pending));
    }

    // Approve or reject a tutor/student
    // approve=true will approve, false will reject (delete)
    @PostMapping("/approve/{role}/{id}")
    public ResponseEntity<?> approveUser(@PathVariable String role, @PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!role.equalsIgnoreCase(user.getRole())) {
            return ResponseEntity.badRequest().body(new ApiResponse<>("Role mismatch"));
        }
        user.setApproved(true);
        userRepository.save(user);
        return ResponseEntity.ok(new ApiResponse<>("User approved", user));
    }

    @PostMapping("/reject/{role}/{id}")
    public ResponseEntity<?> rejectUser(@PathVariable String role, @PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!role.equalsIgnoreCase(user.getRole())) {
            return ResponseEntity.badRequest().body(new ApiResponse<>("Role mismatch"));
        }
        // Option 1: delete user
        userRepository.delete(user);
        // Option 2: mark rejected (optional)
        // user.setApproved(false);
        // userRepository.save(user);
        return ResponseEntity.ok(new ApiResponse<>("User rejected"));
    }

}
