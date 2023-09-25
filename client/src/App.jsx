import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import FacultyHome from "./components/FacultyHome";
import FacultyProfile from "./components/FacultyProfile";
import FacultyUpdateProfile from "./components/FacultyUpdateProfile";
import FacultyMarkAttendence from "./components/FacultyMarkAttendence";
import FacultyMarksUpload from "./components/FacultyMarksUpload";
import FacultyUpdatePassword from "./components/FacultyUpdatePassword";
import StudentUpdateProfile from "./components/StudentUpdateProfile";
import StudentTestPerformance from "./components/StudentTestPerformance";
import StudentAttendence from "./components/StudentAttendence";
import StudentAllSubject from "./components/StudentAllSubject";
import StudentDetails from "./components/StudentDetails";
import StudentUpdatePassword from "./components/StudentUpdatePassword";
import StudentCard from "./components/StudentCard";
import { useSelector } from "react-redux";

function App() {
  const store = useSelector((store) => store);

  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}>
            <Route
              path="/"
              element={
                store.admin.isAuthenticated ? (
                  <Navigate to={"/admin"} />
                ) : (
                  <AdminLogin />
                )
              }
            />
            <Route path="student-login" element={<StudentLogin />} />
            <Route path="faculty-login" element={<FacultyLogin />} />
          </Route>

          {/* For Admin Route */}

          <Route
            path="/admin"
            element={
              store.admin.isAuthenticated ? <AdminHome /> : <Navigate to="/" />
            }
          >
            <Route
              index
              element={
                store.admin.isAuthenticated ? (
                  <AdminProfile />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="addFaculty"
              element={
                store.admin.isAuthenticated ? (
                  <AdminAddFaculty />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="addStudent"
              element={
                store.admin.isAuthenticated ? (
                  <AdminAddStudent />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="addSubject"
              element={
                store.admin.isAuthenticated ? (
                  <AdminAddSubject />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="addAdmin"
              element={
                store.admin.isAuthenticated ? (
                  <AdminAddAdmin />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="allFaculties"
              element={
                store.admin.isAuthenticated ? (
                  <AdminGetAllFaculties />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="allStudents"
              element={
                store.admin.isAuthenticated ? (
                  <AdminGetAllStudent />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="allSubject"
              element={
                store.admin.isAuthenticated ? (
                  <AdminGetAllSubject />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Route>

          {/* For Faculty route */}

          <Route
            path="/faculty"
            element={
              store.faculty.isAuthenticated ? (
                <FacultyHome />
              ) : (
                <Navigate to="/faculty-login" />
              )
            }
          >
            <Route
              index
              element={
                store.faculty.isAuthenticated ? (
                  <FacultyProfile />
                ) : (
                  <Navigate to="/faculty-login" />
                )
              }
            />
            <Route
              path="updateProfile"
              element={
                store.faculty.isAuthenticated ? (
                  <FacultyUpdateProfile />
                ) : (
                  <Navigate to="/faculty-login" />
                )
              }
            />
            <Route
              path="markAttendence"
              element={
                store.faculty.isAuthenticated ? (
                  <FacultyMarkAttendence />
                ) : (
                  <Navigate to="/faculty-login" />
                )
              }
            />
            <Route
              path="uploadMarks"
              element={
                store.faculty.isAuthenticated ? (
                  <FacultyMarksUpload />
                ) : (
                  <Navigate to="/faculty-login" />
                )
              }
            />
            <Route
              path="updatePassword"
              element={
                store.faculty.isAuthenticated ? (
                  <FacultyUpdatePassword />
                ) : (
                  <Navigate to="/faculty-login" />
                )
              }
            />
          </Route>

          {/* For Student Route */}

          <Route
            path="/student"
            element={
              store.student.isAuthenticated ? (
                <StudentHome />
              ) : (
                <Navigate to="/student-login" />
              )
            }
          >
            <Route
              index
              element={
                store.student.isAuthenticated ? (
                  <StudentCard />
                ) : (
                  <Navigate to={"/student-login"} />
                )
              }
            />
            <Route
              path="updateProfile"
              element={
                store.student.isAuthenticated ? (
                  <StudentUpdateProfile />
                ) : (
                  <Navigate to="/student-login" />
                )
              }
            />
            <Route
              path="testPerformance"
              element={
                store.student.isAuthenticated ? (
                  <StudentTestPerformance />
                ) : (
                  <Navigate to="/student-login" />
                )
              }
            />
            <Route
              path="attendence"
              element={
                store.student.isAuthenticated ? (
                  <StudentAttendence />
                ) : (
                  <Navigate to="/student-login" />
                )
              }
            />
            <Route
              path="getAllSubjects"
              element={
                store.student.isAuthenticated ? (
                  <StudentAllSubject />
                ) : (
                  <Navigate to="/student-login" />
                )
              }
            />
            <Route
              path="studentDetails"
              element={
                store.student.isAuthenticated ? (
                  <StudentDetails />
                ) : (
                  <Navigate to="/student-login" />
                )
              }
            />
            <Route
              path="updatePassword"
              element={
                store.student.isAuthenticated ? (
                  <StudentUpdatePassword />
                ) : (
                  <Navigate to="/student-login" />
                )
              }
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
