// src/components/TutorProfile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./TutorProfile.css";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const TutorProfile = () => {
  const navigate = useNavigate();
  const [tutor, setTutor] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", experience: "", bio: "", hourlyRate: "", location: "" });
  const [subjectsAvailability, setSubjectsAvailability] = useState([{ subject: "", availability: "" }]);
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (!stored?.id) { navigate("/login"); return; }
    setTutor(stored);

    // profile
    axios.get(`${API_BASE_URL}/tutors/profile/${stored.id}`)
      .then(res => {
        const d = res.data || {};
        setFormData({
          name: d.name || stored.name || "",
          email: d.email || stored.email || "",
          phone: d.phone || "",
          experience: d.experience || "",
          bio: d.bio || "",
          hourlyRate: d.hourlyRate || "",
          location: d.location || ""
        });
        setSubjectsAvailability(d.subjectsAvailability?.length ? d.subjectsAvailability : [{ subject: "", availability: "" }]);
      })
      .catch(() => { /* no profile yet */ });

    // fetch accepted bookings for student count
    axios.get(`${API_BASE_URL}/bookings/tutor/${stored.id}/accepted`)
      .then(res => {
        const bookings = res.data || [];
        // count unique students
        const uniqueStudents = new Set(bookings.map(b => b.studentId || b.student_id));
        setStudentCount(uniqueStudents.size);
      })
      .catch(err => console.error("Failed to fetch students count", err));
  }, [navigate]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubjectChange = (idx, field, val) => {
    const arr = [...subjectsAvailability]; arr[idx][field] = val; setSubjectsAvailability(arr);
  };
  const addSubject = () => setSubjectsAvailability([...subjectsAvailability, { subject: "", availability: "" }]);
  const removeSubject = (idx) => setSubjectsAvailability(subjectsAvailability.filter((_, i) => i !== idx));

  const handleSave = async () => {
    try {
      await axios.post(`${API_BASE_URL}/tutors/profile/${tutor.id}`, { ...formData, subjectsAvailability });
      alert("Saved");
    } catch (err) {
      console.error(err); alert("Save failed");
    }
  };

  if (!tutor) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h2>My Tutor Profile</h2>
      <p><strong>Students who selected you:</strong> {studentCount}</p>

      <div className="profile-form">
        {["name","email","phone","experience","bio","hourlyRate","location"].map(field => (
          <label key={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}:
            {field === "bio" ? (
              <textarea name={field} value={formData[field]} onChange={handleChange} />
            ) : (
              <input name={field} type={["experience","hourlyRate"].includes(field) ? "number" : "text"} value={formData[field]} onChange={handleChange} />
            )}
          </label>
        ))}

        <label>Subjects & Availability:</label>
        {subjectsAvailability.map((s, i) => (
          <div key={i} className="subject-entry">
            <input placeholder="Subject" value={s.subject} onChange={e => handleSubjectChange(i, "subject", e.target.value)} />
            <input placeholder="Availability" value={s.availability} onChange={e => handleSubjectChange(i, "availability", e.target.value)} />
            <button type="button" onClick={() => removeSubject(i)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addSubject}>Add Subject</button>

        <div className="profile-actions">
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;
