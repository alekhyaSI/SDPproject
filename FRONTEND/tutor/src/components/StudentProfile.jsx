import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
import "./StudentDashBoard.css";

const StudentProfile = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: ""
  });

  const [subjectsAvailability, setSubjectsAvailability] = useState([
    { subject: "", availability: "" }
  ]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || !storedUser.id) {
      alert("User not found. Please log in again.");
      navigate("/");
      return;
    }
    setStudent(storedUser);

    axios.get(`${API_BASE_URL}/students/profile/${storedUser.id}`)
      .then(res => {
        const data = res.data;
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          location: data.location || "",
          bio: data.bio || ""
        });
        setSubjectsAvailability(
          data.subjectsAvailability?.length > 0
            ? data.subjectsAvailability
            : [{ subject: "", availability: "" }]
        );
      })
      .catch(err => console.log("No profile yet", err));
  }, [navigate]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubjectChange = (idx, field, value) => {
    const newArr = [...subjectsAvailability];
    newArr[idx][field] = value;
    setSubjectsAvailability(newArr);
  };

  const addSubject = () => {
    setSubjectsAvailability([...subjectsAvailability, { subject: "", availability: "" }]);
  };

  const removeSubject = idx => {
    setSubjectsAvailability(subjectsAvailability.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    try {
      const payload = { ...formData, subjectsAvailability };
      await axios.post(`${API_BASE_URL}/students/profile/${student.id}`, payload);
      alert("Profile saved successfully!");
      navigate("/student-dashboard");
    } catch (err) {
      console.error(err);
      alert("Error saving profile");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await axios.delete(`${API_BASE_URL}/students/${student.id}`);
        alert("Account deleted successfully!");
        localStorage.removeItem("user");
        navigate("/");
      } catch (err) {
        console.error(err);
        alert("Error deleting account");
      }
    }
  };

  if (!student) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-form">
        {["name", "email", "phone", "location", "bio"].map(field => (
          <label key={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}:
            {field === "bio" ? (
              <textarea
                name={field}
                value={formData[field]}
                onChange={handleChange}
              />
            ) : (
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
              />
            )}
          </label>
        ))}

        <label>Subjects & Preferred Time:</label>
        {subjectsAvailability.map((item, idx) => (
          <div key={idx} className="subject-entry">
            <input
              type="text"
              placeholder="Subject"
              value={item.subject}
              onChange={e => handleSubjectChange(idx, "subject", e.target.value)}
            />
            <input
              type="text"
              placeholder="Availability (e.g. Mon 4-6pm)"
              value={item.availability}
              onChange={e => handleSubjectChange(idx, "availability", e.target.value)}
            />
            <button onClick={() => removeSubject(idx)}>Remove</button>
          </div>
        ))}
        <button onClick={addSubject}>Add Subject</button>

        <div className="profile-actions">
          <button onClick={handleSave} className="update-btn">Save / Update</button>
          <button onClick={handleDelete} className="delete-btn">Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;