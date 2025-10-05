package com.tutorfinder.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String adminCode;      // Admin code (optional)
    @Column(nullable = false, unique = true)
    private String email;          // Unique email
    @Column(nullable = false)
    private String name;           // User name
    @Column(nullable = false)
    private String password;       // Password
    private String phone;          // Phone number
    private String qualification;  // Qualification (for tutors/students)
    @Column(nullable = false)
    private String role;           // student / tutor / admin

    // NEW: whether admin approved this user (tutor/student)
    private Boolean approved = false;

    public User() {}

    public User(String adminCode, String email, String name, String password, String phone, String qualification, String role) {
        this.adminCode = adminCode;
        this.email = email;
        this.name = name;
        this.password = password;
        this.phone = phone;
        this.qualification = qualification;
        this.role = role;
        this.approved = false;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAdminCode() { return adminCode; }
    public void setAdminCode(String adminCode) { this.adminCode = adminCode; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getQualification() { return qualification; }
    public void setQualification(String qualification) { this.qualification = qualification; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public Boolean getApproved() { return approved; }
    public void setApproved(Boolean approved) { this.approved = approved; }
}
