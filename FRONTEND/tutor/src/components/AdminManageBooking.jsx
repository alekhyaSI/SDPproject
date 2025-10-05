import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminManageBookings.css";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const AdminManageBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingIds, setUpdatingIds] = useState([]);

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/bookings`);
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      alert("Error fetching bookings!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Update booking status
  const updateStatus = async (bookingId, status) => {
    if (updatingIds.includes(bookingId)) return;

    setUpdatingIds([...updatingIds, bookingId]);

    try {
      await axios.put(`${API_BASE_URL}/bookings/${bookingId}`, { status });
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status } : b
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update booking status!");
    } finally {
      setUpdatingIds((prev) => prev.filter((id) => id !== bookingId));
    }
  };

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div className="admin-bookings-page">
      <h2>Manage Bookings</h2>
      <table className="bookings-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Student</th>
            <th>Tutor</th>
            <th>Subject</th>
            <th>Time Slot</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.studentName}</td>
              <td>{b.tutorName}</td>
              <td>{b.subject}</td>
              <td>{b.timeSlot}</td>
              <td>{b.status}</td>
              <td>
                {b.status === "pending" && (
                  <>
                    <button
                      onClick={() => updateStatus(b.id, "accepted")}
                      disabled={updatingIds.includes(b.id)}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateStatus(b.id, "declined")}
                      disabled={updatingIds.includes(b.id)}
                    >
                      Decline
                    </button>
                  </>
                )}
                {b.status !== "pending" && <span>No actions</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminManageBooking;