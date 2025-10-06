package com.tutorfinder.controller;

import com.tutorfinder.dto.ApiResponse;
import com.tutorfinder.dto.BookingResponseDTO;
import com.tutorfinder.model.Booking;
import com.tutorfinder.model.TutorProfile;
import com.tutorfinder.model.User;
import com.tutorfinder.repository.BookingRepository;
import com.tutorfinder.repository.TutorProfileRepository;
import com.tutorfinder.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private TutorProfileRepository tutorProfileRepository;

    @Autowired
    private UserRepository userRepository;

    private BookingResponseDTO convertToDTO(Booking booking) {
        User student = userRepository.findById(booking.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        User tutorUser = userRepository.findById(booking.getTutorId())
                .orElseThrow(() -> new RuntimeException("Tutor not found"));

        TutorProfile tutorProfile = tutorProfileRepository.findByUserId(booking.getTutorId())
                .orElse(null);

        String tutorName = tutorProfile != null ? tutorProfile.getName() : tutorUser.getName();

        return new BookingResponseDTO(
                booking.getId(),
                student.getId(),
                student.getName(),
                student.getEmail(),
                student.getPhone(),
                tutorUser.getId(),
                tutorName,
                booking.getStatus(),
                booking.getSubject(),
                booking.getTimeSlot()
        );
    }

    @PostMapping("/book")
    public ResponseEntity<?> createBooking(@RequestBody Booking booking) {
        if (booking.getStatus() == null) booking.setStatus("pending");

        if (booking.getStudentId() == null || booking.getTutorId() == null) {
            return ResponseEntity.badRequest().body(new ApiResponse<>("studentId and tutorId are required"));
        }
        // Validate student & tutor exist & tutor role
        userRepository.findById(booking.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        User tutorUser = userRepository.findById(booking.getTutorId())
                .orElseThrow(() -> new RuntimeException("Tutor not found"));
        if (!"tutor".equalsIgnoreCase(tutorUser.getRole())) {
            return ResponseEntity.badRequest().body(new ApiResponse<>("Selected user is not a tutor"));
        }
        Booking savedBooking = bookingRepository.save(booking);
        return ResponseEntity.ok(new ApiResponse<>("Booking created", convertToDTO(savedBooking)));
    }

    @GetMapping
    public ResponseEntity<?> getAllBookings() {
        List<BookingResponseDTO> list = bookingRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(new ApiResponse<>("Bookings fetched", list));
    }

    @GetMapping("/tutor/{tutorId}")
    public ResponseEntity<?> getTutorBookings(@PathVariable("tutorId") Long tutorId) {
        List<BookingResponseDTO> list = bookingRepository.findByTutorId(tutorId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(new ApiResponse<>("Tutor bookings fetched", list));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<?> getStudentBookings(@PathVariable("studentId") Long studentId) {
        List<BookingResponseDTO> list = bookingRepository.findByStudentId(studentId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(new ApiResponse<>("Student bookings fetched", list));
    }

    @PutMapping("/{bookingId}")
    public ResponseEntity<?> updateBookingStatus(
            @PathVariable("bookingId") Long bookingId,
            @RequestBody Booking requestBody
    ) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        if (requestBody.getStatus() != null) booking.setStatus(requestBody.getStatus());
        Booking updated = bookingRepository.save(booking);
        return ResponseEntity.ok(new ApiResponse<>("Booking updated", convertToDTO(updated)));
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<?> deleteBooking(@PathVariable("bookingId") Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        bookingRepository.delete(booking);
        return ResponseEntity.ok(new ApiResponse<>("Booking deleted"));
    }

    @GetMapping("/tutor/{tutorId}/accepted")
    public ResponseEntity<?> getTutorAcceptedBookings(@PathVariable Long tutorId) {
        List<BookingResponseDTO> list = bookingRepository.findByTutorId(tutorId)
                .stream()
                .filter(b -> "accepted".equalsIgnoreCase(b.getStatus()))
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(new ApiResponse<>("Accepted tutor bookings fetched", list));
    }

    @GetMapping("/student/{studentId}/accepted")
    public ResponseEntity<?> getStudentAcceptedBookings(@PathVariable Long studentId) {
        List<BookingResponseDTO> list = bookingRepository.findByStudentId(studentId)
                .stream()
                .filter(b -> "accepted".equalsIgnoreCase(b.getStatus()))
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(new ApiResponse<>("Accepted student bookings fetched", list));
    }
}
