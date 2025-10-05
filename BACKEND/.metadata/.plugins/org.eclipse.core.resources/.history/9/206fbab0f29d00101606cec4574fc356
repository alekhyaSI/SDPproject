package com.tutorfinder.model;

import jakarta.persistence.*;

@Entity
@Table(name = "student_profiles")
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String name;
    private String email;
    private String phone;
    private String location;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(columnDefinition = "TEXT")
    private String subjectsAvailabilityJson; // JSON string like TutorProfile

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getSubjectsAvailabilityJson() { return subjectsAvailabilityJson; }
    public void setSubjectsAvailabilityJson(String subjectsAvailabilityJson) { this.subjectsAvailabilityJson = subjectsAvailabilityJson; }
}