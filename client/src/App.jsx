import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./components/AdminLogin";
import StudentLogin from "./components/StudentLogin";
import FacultyLogin from "./components/FacultyLogin";
import AdminHome from "./components/AdminHome";
import AdminAddFaculty from "./components/AdminAddFaculty";
import AdminAddStudent from "./components/AdminAddStudent";
import AdminAddSubject from "./components/AdminAddSubject";
import AdminAddAdmin from "./components/AdminAddAdmin";
import StudentHome from "./components/StudentHome";
import AdminGetAllFaculties from "./components/AdminGetAllFaculties";
import AdminProfile from "./components/AdminProfile";
import AdminGetAllStudent from "./components/AdminGetAllStudent";
import AdminGetAllSubject from "./components/AdminGetAllSubject";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}>
            <Route path="/" element={<AdminLogin />} />
            <Route path="student-login" element={<StudentLogin />} />

            <Route path="faculty-login" element={<FacultyLogin />} />
          </Route>
          <Route path="/admin" element={<AdminHome />}>
            <Route index element={<AdminProfile />} />
            <Route path="addFaculty" element={<AdminAddFaculty />} />
            <Route path="addStudent" element={<AdminAddStudent />} />
            <Route path="addSubject" element={<AdminAddSubject />} />
            <Route path="addAdmin" element={<AdminAddAdmin />} />
            <Route path="allFaculties" element={<AdminGetAllFaculties />} />
            <Route path="allStudents" element={<AdminGetAllStudent />} />
            <Route path="allSubject" element={<AdminGetAllSubject />} />
          </Route>
          <Route path="/student" element={<StudentHome />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
