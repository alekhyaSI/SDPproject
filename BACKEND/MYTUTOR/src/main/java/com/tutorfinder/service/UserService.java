package com.tutorfinder.service;

import com.tutorfinder.model.User;
import com.tutorfinder.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // ✅ Register user (avoids null values)
 // inside UserService.registerUser
    public User registerUser(User user) {
        if (user.getPhone() == null) user.setPhone("");
        if (user.getQualification() == null) user.setQualification("");
        if (user.getAdminCode() == null) user.setAdminCode("");

        // By default users are not approved (admin approves later).
        // Admin role: only allow if correct adminCode; mark approved true for admin accounts.
        if ("admin".equalsIgnoreCase(user.getRole())) {
            if (!"426".equals(user.getAdminCode())) {
                throw new RuntimeException("Invalid admin code");
            }
            user.setApproved(true);
        } else {
            user.setApproved(false);
        }
        return userRepository.save(user);
    }


    // ✅ Login user
    public User loginUser(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user.get();
        }
        return null;
    }

    // ✅ Update user (only update non-null fields)
    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id)
                .map(existingUser -> {
                    if (updatedUser.getName() != null) existingUser.setName(updatedUser.getName());
                    if (updatedUser.getEmail() != null) existingUser.setEmail(updatedUser.getEmail());
                    if (updatedUser.getPassword() != null) existingUser.setPassword(updatedUser.getPassword());
                    if (updatedUser.getRole() != null) existingUser.setRole(updatedUser.getRole());
                    if (updatedUser.getPhone() != null) existingUser.setPhone(updatedUser.getPhone());
                    if (updatedUser.getQualification() != null) existingUser.setQualification(updatedUser.getQualification());
                    if (updatedUser.getAdminCode() != null) existingUser.setAdminCode(updatedUser.getAdminCode());
                    return userRepository.save(existingUser);
                })
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    // ✅ Delete user
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    
 // ✅ Fetch all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ✅ Fetch all students
    public List<User> getAllStudents() {
        return userRepository.findAll()
                .stream()
                .filter(user -> "student".equalsIgnoreCase(user.getRole()))
                .toList();
    }
    
 // ✅ Fetch all tutors
    public List<User> getAllTutors() {
        return userRepository.findAll()
                .stream()
                .filter(user -> "tutor".equalsIgnoreCase(user.getRole()))
                .toList();
    }
    public void approveOrRejectUser(Long id, String type, boolean approve) {
        User u = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        if (!u.getRole().equalsIgnoreCase(type)) throw new RuntimeException("Role mismatch");
        u.setApproved(approve);
        userRepository.save(u);
    }


}