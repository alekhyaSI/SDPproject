import React, { useEffect, useState } from "react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
import "./AdminDashBoard.css";

const AdminDashBoard = () => {
  const [students, setStudents] = useState([]);
  const [tutorsMap, setTutorsMap] = useState({}); // studentId -> matching tutors
  const [assignments, setAssignments] = useState({}); // studentId -> selected tutorId

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      // 1️⃣ Fetch all students
      const res = await axios.get(`${API_BASE_URL}/students/profile/all`);
      const studentsData = res.data.map((s) => ({
        ...s,
        subjectsAvailability:
          s.subjectsAvailability || JSON.parse(s.subjectsAvailabilityJson || "[]"),
      }));
      setStudents(studentsData);

      // 2️⃣ Fetch matching tutors for each student
      studentsData.forEach(async (student) => {
        const studentId = student.userId; // Use userId from DTO
        if (!studentId) {
          console.warn("Student userId is undefined:", student);
          return;
        }

        try {
          const tutorsRes = await axios.get(
            `${API_BASE_URL}/admin/mappings/students/${studentId}/matching-tutors`
          );
          const tutorsData = tutorsRes.data.map((t) => ({
            ...t,
            subjectsAvailability:
              t.subjectsAvailability || JSON.parse(t.subjectsAvailabilityJson || "[]"),
          }));
          setTutorsMap((prev) => ({ ...prev, [studentId]: tutorsData }));
        } catch (err) {
          console.error(`Failed to fetch tutors for student ${studentId}:`, err);
        }
      });
    } catch (err) {
      console.error(err);
      alert("Failed to fetch students or tutors");
    }
  };

  // 👉 Dummy assign handler (only frontend effect, no API call)
  const handleAssign = (studentId) => {
    const tutorId = assignments[studentId];
    if (!tutorId) {
      alert("Select a tutor first!");
      return;
    }
    alert(`Tutor ${tutorId} assigned to student ${studentId}`);
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Subjects / Availability</th>
            <th>Assign Tutor</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.userId}>
              <td>{s.name}</td>
              <td>
                {s.subjectsAvailability.map((sub, idx) => (
                  <div key={idx}>
                    {sub.subject} - {sub.availability}
                  </div>
                ))}
              </td>
              <td>
                <select
                  value={assignments[s.userId] || ""}
                  onChange={(e) =>
                    setAssignments({ ...assignments, [s.userId]: e.target.value })
                  }
                >
                  <option value="">Select Tutor</option>
                  {(tutorsMap[s.userId] || []).map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} (
                      {t.subjectsAvailability
                        .map((sub) => `${sub.subject} - ${sub.availability}`)
                        .join(", ")}
                      )
                    </option>
                  ))}
                </select>
                <button onClick={() => handleAssign(s.userId)}>Assign</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashBoard;
