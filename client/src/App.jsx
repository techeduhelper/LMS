import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./components/AdminLogin";
import StudentLogin from "./components/StudentLogin";
import FacultyLogin from "./components/FacultyLogin";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}>
            <Route path="admin-login" element={<AdminLogin />} />
            <Route path="student-login" element={<StudentLogin />} />
            <Route path="faculty-login" element={<FacultyLogin />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
