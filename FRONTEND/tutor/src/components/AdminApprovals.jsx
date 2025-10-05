import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const AdminApprovals = ({ type }) => {
  const [pendingList, setPendingList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = async () => {
    try {
      const url =
        type === "tutor"
          ? `${API_BASE_URL}/api/user/tutors?pending=true`
          : `${API_BASE_URL}/api/user/students?pending=true`;
      const res = await axios.get(url);
      setPendingList(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load pending approvals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPending(); }, [type]);

  const handleDecision = async (id, approve) => {
    try {
      await axios.post(`${API_BASE_URL}/api/user/admin/${approve ? "approve" : "reject"}/${type}/${id}`);
      fetchPending();
    } catch (err) {
      console.error(err);
      alert("Action failed");
    }
  };

  if (loading) return <p>Loading pending approvals...</p>;

  return (
    <div>
      <h2>Pending {type === "tutor" ? "Tutors" : "Students"}</h2>
      {pendingList.length === 0 ? <p>No pending {type}s</p> : (
        <ul>
          {pendingList.map(u => (
            <li key={u.id}>
              <strong>{u.name}</strong> ({u.email}) {u.qualification ? `- ${u.qualification}` : ""}
              <button onClick={() => handleDecision(u.id, true)}>Approve</button>
              <button onClick={() => handleDecision(u.id, false)}>Reject</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminApprovals;
