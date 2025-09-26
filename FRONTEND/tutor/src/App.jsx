import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import StudentDashBoard from "./components/StudentDashBoard";
import TutorDashBoard from "./components/TutorDashBoard";
import AdminDashBoard from "./components/AdminDashBoard";
import HomePage from "./components/HomePage";
import Navbar from "./components/Nav";
import TutorProfile from "./components/TutorProfile";
import StudentProfile from "./components/StudentProfile";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = [
    "/student-dashboard",
    "/tutor-dashboard",
    "/admin-dashboard",
  ];

  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-dashboard" element={<StudentDashBoard />} />
        <Route path="/tutor-dashboard" element={<TutorDashBoard />} />
        <Route path="/admin-dashboard" element={<AdminDashBoard />} />
        <Route path="/tutor-profile" element={<TutorProfile />} />
        <Route path="/student-profile" element={<StudentProfile />} />
      </Routes>
    </>
  );
}

export default App;