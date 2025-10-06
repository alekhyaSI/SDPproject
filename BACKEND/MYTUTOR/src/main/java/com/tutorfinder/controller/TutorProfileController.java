package com.tutorfinder.controller;

import com.tutorfinder.dto.ApiResponse;
import com.tutorfinder.dto.TutorProfileDTO;
import com.tutorfinder.service.TutorProfileService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tutors/profile")
@CrossOrigin(origins = "*")
public class TutorProfileController {

    @Autowired
    private TutorProfileService tutorProfileService;

    @PostMapping("/{userId}")
    public ResponseEntity<?> saveOrUpdateProfile(
            @PathVariable Long userId, @RequestBody TutorProfileDTO profileDTO) {
        tutorProfileService.saveOrUpdateProfile(userId, profileDTO);
        TutorProfileDTO dto = tutorProfileService.getProfileWithUserInfo(userId);
        return ResponseEntity.ok(new ApiResponse<>("Profile saved", dto));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getProfile(@PathVariable Long userId) {
        TutorProfileDTO dto = tutorProfileService.getProfileWithUserInfo(userId);
        return ResponseEntity.ok(new ApiResponse<>("Profile fetched", dto));
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllTutors() {
        List<TutorProfileDTO> list = tutorProfileService.getAllProfiles();
        return ResponseEntity.ok(new ApiResponse<>("Tutors fetched", list));
    }
}
