import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import Lectures from "./components/Lectures";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import StudentChat from "./components/StudentChat";
import About from "./pages/About";
import Courses from "./pages/Courses";
import LifeSeacom from "./pages/LifeSeacom";
import Contact from "./pages/Contact";
import "react-multi-carousel/lib/styles.css";
import FacultyNotices from "./components/FacultyNotices";
import RecieverUserDetails from "./components/RecieverUserDetails";
import HomeApplication from "./components/HomeApplication";
import NotFound from "./pages/NotFound";
import axios from "axios";

function App() {
  const store = useSelector((store) => store);

  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/about-us' element={<About />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/life-seacom' element={<LifeSeacom />} />
            <Route path='/Contact-us' element={<Contact />} />
            <Route path='/application' element={<HomeApplication />} />
            <Route path='*' element={<NotFound />} />

            <Route
              path='/admin-login'
              element={
                store.admin.isAuthenticated ? (
                  <Navigate to={"/admin"} />
                ) : (
                  <AdminLogin />
                )
              }
            />
            <Route path='/student-login' element={<StudentLogin />} />
            <Route path='/faculty-login' element={<FacultyLogin />} />
            <Route path='/lectures' element={<Lectures />} />
          </Route>

          {/* For Admin Route */}

          <Route
            path='/admin'
            element={
              store.admin.isAuthenticated ? (
                <AdminHome />
              ) : (
                <Navigate to='/admin-login' />
              )
            }
          >
            <Route
              index
              element={
                store.admin.isAuthenticated ? (
                  <AdminProfile />
                ) : (
                  <Navigate to='/admin-login' />
                )
              }
            />
            <Route
              path='addFaculty'
              element={
                store.admin.isAuthenticated ? (
                  <AdminAddFaculty />
                ) : (
                  <Navigate to='/admin-login' />
                )
              }
            />
            <Route
              path='addStudent'
              element={
                store.admin.isAuthenticated ? (
                  <AdminAddStudent />
                ) : (
                  <Navigate to='/admin-login' />
                )
              }
            />
            <Route
              path='addSubject'
              element={
                store.admin.isAuthenticated ? (
                  <AdminAddSubject />
                ) : (
                  <Navigate to='/admin-login' />
                )
              }
            />
            <Route
              path='addAdmin'
              element={
                store.admin.isAuthenticated ? (
                  <AdminAddAdmin />
                ) : (
                  <Navigate to='/admin-login' />
                )
              }
            />
            <Route
              path='allFaculties'
              element={
                store.admin.isAuthenticated ? (
                  <AdminGetAllFaculties />
                ) : (
                  <Navigate to='/admin-login' />
                )
              }
            />
            <Route
              path='allStudents'
              element={
                store.admin.isAuthenticated ? (
                  <AdminGetAllStudent />
                ) : (
                  <Navigate to='/admin-login' />
                )
              }
            />
            <Route
              path='allSubject'
              element={
                store.admin.isAuthenticated ? (
                  <AdminGetAllSubject />
                ) : (
                  <Navigate to='/admin-login' />
                )
              }
            />
          </Route>

          {/* For Faculty route */}

          <Route
            path='/faculty'
            element={
              store.faculty.isAuthenticated ? (
                <FacultyHome />
              ) : (
                <Navigate to='/faculty-login' />
              )
            }
          >
            <Route
              index
              element={
                store.faculty.isAuthenticated ? (
                  <FacultyProfile />
                ) : (
                  <Navigate to='/faculty-login' />
                )
              }
            />
            <Route
              path='updateProfile'
              element={
                store.faculty.isAuthenticated ? (
                  <FacultyUpdateProfile />
                ) : (
                  <Navigate to='/faculty-login' />
                )
              }
            />
            <Route
              path='markAttendence'
              element={
                store.faculty.isAuthenticated ? (
                  <FacultyMarkAttendence />
                ) : (
                  <Navigate to='/faculty-login' />
                )
              }
            />
            <Route
              path='uploadMarks'
              element={
                store.faculty.isAuthenticated ? (
                  <FacultyMarksUpload />
                ) : (
                  <Navigate to='/faculty-login' />
                )
              }
            />
            <Route
              path='notices'
              element={
                store.faculty.isAuthenticated ? (
                  <FacultyNotices />
                ) : (
                  <Navigate to='/faculty-login' />
                )
              }
            />
            <Route
              path='updatePassword'
              element={
                store.faculty.isAuthenticated ? (
                  <FacultyUpdatePassword />
                ) : (
                  <Navigate to='/faculty-login' />
                )
              }
            />
          </Route>

          {/* For Student Route */}

          <Route
            path='/student'
            element={
              store.student.isAuthenticated ? (
                <StudentHome />
              ) : (
                <Navigate to='/student-login' />
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
              path='updateProfile'
              element={
                store.student.isAuthenticated ? (
                  <StudentUpdateProfile />
                ) : (
                  <Navigate to='/student-login' />
                )
              }
            />
            <Route
              path='testPerformance'
              element={
                store.student.isAuthenticated ? (
                  <StudentTestPerformance />
                ) : (
                  <Navigate to='/student-login' />
                )
              }
            />
            <Route
              path='attendence'
              element={
                store.student.isAuthenticated ? (
                  <StudentAttendence />
                ) : (
                  <Navigate to='/student-login' />
                )
              }
            />
            <Route
              path='getAllSubjects'
              element={
                store.student.isAuthenticated ? (
                  <StudentAllSubject />
                ) : (
                  <Navigate to='/student-login' />
                )
              }
            />
            <Route
              path='studentDetails'
              element={
                store.student.isAuthenticated ? (
                  <StudentDetails />
                ) : (
                  <Navigate to='/student-login' />
                )
              }
            />
            <Route
              path='updatePassword'
              element={
                store.student.isAuthenticated ? (
                  <StudentUpdatePassword />
                ) : (
                  <Navigate to='/student-login' />
                )
              }
            />
            <Route
              path=':registrationNumber'
              element={
                store.student.isAuthenticated ? (
                  <RecieverUserDetails />
                ) : (
                  <Navigate to='/student-login' />
                )
              }
            />
            <Route
              path='chat/:room'
              element={
                store.student.isAuthenticated ? (
                  <StudentChat />
                ) : (
                  <Navigate to='/student-login' />
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
