import React, { useEffect, useState } from "react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const StudentViewTutor= () => {
  const [bookings, setBookings] = useState([]);
  const student = JSON.parse(localStorage.getItem("user"));
  const studentId = student?.id;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/bookings/student/${studentId}/accepted`);
        setBookings(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch bookings");
      }
    };
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.length === 0 && <p>No bookings yet.</p>}
      <ul>
        {bookings.map(b => (
          <li key={b.id}>
            <strong>Tutor:</strong> {b.tutorName} ({b.tutorEmail}, {b.tutorPhone}) <br/>
            <strong>Subject:</strong> {b.subject} <br/>
            <strong>Time:</strong> {b.timeSlot} <br/>
            <strong>Status:</strong> {b.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentViewTutor;
