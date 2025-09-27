package com.tutorfinder.controller;

import com.tutorfinder.dto.StudentProfileDTO;
import com.tutorfinder.service.StudentProfileService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/students/profile")
@CrossOrigin("*")
public class StudentProfileController {

    @Autowired
    private StudentProfileService service;

    @PostMapping("/{userId}")
    public ResponseEntity<StudentProfileDTO> saveOrUpdateProfile(
            @PathVariable Long userId,
            @RequestBody StudentProfileDTO profileDTO) throws Exception {
        service.saveOrUpdateProfile(userId, profileDTO);
        return ResponseEntity.ok(service.getProfileWithUserInfo(userId));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<StudentProfileDTO> getProfile(@PathVariable Long userId) throws Exception {
        return ResponseEntity.ok(service.getProfileWithUserInfo(userId));
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteProfile(@PathVariable Long userId) {
        service.deleteProfile(userId);
        return ResponseEntity.ok("Student profile deleted successfully");
    }
    
 // NEW: Fetch all student profiles
 //all students.
    @GetMapping("/all")
    public ResponseEntity<List<StudentProfileDTO>> getAllProfiles() {
        return ResponseEntity.ok(service.getAllProfiles());
    }

}