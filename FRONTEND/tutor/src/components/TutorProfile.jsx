import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
import "./TutorProfile.css";

const TutorProfile = () => {
  const navigate = useNavigate();
  const [tutor, setTutor] = useState(null);
  const [subjectsAvailability, setSubjectsAvailability] = useState([{ subject: "", availability: "" }]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    experience: "",
    bio: "",
    hourlyRate: "",
    location: ""
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || !storedUser.id) {
      alert("User not found. Please log in again.");
      navigate("/");
      return;
    }
    setTutor(storedUser);

    axios.get(`${API_BASE_URL}/tutors/profile/${storedUser.id}`)
      .then((res) => {
        const data = res.data;
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          role: data.role || "",
          experience: data.experience || "",
          bio: data.bio || "",
          hourlyRate: data.hourlyRate || "",
          location: data.location || ""
        });
        setSubjectsAvailability(
          data.subjectsAvailability?.length > 0 ? data.subjectsAvailability : [{ subject: "", availability: "" }]
        );
      })
      .catch((err) => console.log("No profile yet", err));
  }, [navigate]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubjectChange = (idx, field, value) => {
    const newArr = [...subjectsAvailability];
    newArr[idx][field] = value;
    setSubjectsAvailability(newArr);
  };

  const addSubject = () => setSubjectsAvailability([...subjectsAvailability, { subject: "", availability: "" }]);
  const removeSubject = (idx) => setSubjectsAvailability(subjectsAvailability.filter((_, i) => i !== idx));

  const handleSave = async () => {
    try {
      const payload = { ...formData, subjectsAvailability };
      await axios.post(`${API_BASE_URL}/tutors/profile/${tutor.id}`, payload);
      alert("Profile saved successfully!");
      navigate("/tutor-dashboard");
    } catch (err) {
      console.error(err);
      alert("Error saving profile");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your profile?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/tutors/${tutor.id}`); // Optional if you implement delete
      alert("Profile deleted successfully!");
      localStorage.removeItem("user");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error deleting profile");
    }
  };

  if (!tutor) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h2>My Tutor Profile</h2>
      <div className="profile-form">
        {["name","email","phone","role","experience","bio","hourlyRate","location"].map(field => (
          <label key={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}:
            {field === "bio" ? (
              <textarea name={field} value={formData[field]} onChange={handleChange} />
            ) : (
              <input type={["experience","hourlyRate"].includes(field) ? "number" : "text"} name={field} value={formData[field]} onChange={handleChange} />
            )}
          </label>
        ))}

        <label>Subjects & Availability:</label>
        {subjectsAvailability.map((item, idx) => (
          <div key={idx} className="subject-entry">
            <input type="text" placeholder="Subject" value={item.subject} onChange={e => handleSubjectChange(idx,"subject",e.target.value)} />
            <input type="text" placeholder="Availability (e.g. Mon 10-12)" value={item.availability} onChange={e => handleSubjectChange(idx,"availability",e.target.value)} />
            <button type="button" onClick={() => removeSubject(idx)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addSubject}>Add Subject</button>

        <div className="profile-actions">
          <button type="button" onClick={handleSave}>Save / Update</button>
          <button type="button" onClick={handleDelete} className="delete-btn">Delete Profile</button>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;