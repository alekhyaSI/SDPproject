// src/components/FindTutor.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const FindTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState([]);
  const student = JSON.parse(localStorage.getItem("user"));
  const studentId = student?.id;

  useEffect(() => {
    axios.get(`${API_BASE_URL}/tutors/profile/all`)
      .then(res => setTutors(res.data || []))
      .catch(err => { console.error(err); alert("Failed to fetch tutors"); })
      .finally(() => setLoading(false));
  }, []);

  const selectTutor = async (tutorId) => {
    if (!studentId) { alert("Please log in as a student"); return; }
    if (tutorId === studentId) { alert("You can't select yourself"); return; }

    if (requesting.includes(tutorId)) return;
    setRequesting([...requesting, tutorId]);

    try {
      // Create a booking / selection request
      await axios.post(`${API_BASE_URL}/bookings/book`, {
        studentId,
        tutorId,
        subject: "General", // can be enhanced with selection popup
        timeSlot: "TBD",
        status: "pending"
      });
      alert("Tutor selection request sent");
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Failed to send request");
    } finally {
      setRequesting(prev => prev.filter(id => id !== tutorId));
    }
  };

  if (loading) return <p>Loading tutors...</p>;

  return (
    <div className="find-tutors-page">
      <h2>Available Tutors</h2>
      {tutors.length === 0 && <p>No tutors found</p>}

      <div className="tutor-list">
        {tutors.map(t => (
          <div key={t.userId || t.id} className="tutor-card">
            <h3>{t.name}</h3>
            <p>{t.email}</p>
            <p><strong>Experience:</strong> {t.experience || "N/A"} years</p>
            <p><strong>Rate:</strong> ₹{t.hourlyRate || "N/A"}</p>
            <button onClick={() => selectTutor(t.userId || t.id)} disabled={requesting.includes(t.userId || t.id)}>
              {requesting.includes(t.userId || t.id) ? "Requesting..." : "Select / Request Tutor"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindTutors;
