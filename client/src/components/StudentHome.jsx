import React from "react";
import { Link } from "react-router-dom";

const StudentHome = () => {
  return (
    <>
      <div className="container mx-auto">
        <div className="bg-blue-500 p-4">
          <nav className="flex items-center justify-between">
            <h4 className="text-2xl font-bold text-white">SRM</h4>
            <button
              className="lg:hidden block text-white text-xl p-2"
              type="button"
            >
              <span className="block">☰</span>
            </button>
            <div className="hidden lg:flex space-x-4">
              <ul className="flex space-x-4">
                <li className="nav-item">
                  <Link to="/home" className="text-white hover:underline">
                    {/* {name.toUpperCase()} */}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/student/updateProfile"
                    className="text-white hover:underline"
                  >
                    UPDATE PROFILE
                  </Link>
                </li>
                <li className="nav-item dropdown relative group">
                  <button className="text-white hover:underline group-hover:text-blue-300">
                    ACADEMIC
                  </button>
                  <div className="absolute hidden mt-2 space-y-2 bg-white border border-gray-200 w-48 left-0 group-hover:block">
                    <Link
                      to="/student/testPerformance"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Test Performance
                    </Link>
                    <Link
                      to="/student/attendence"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Attendance
                    </Link>
                    <Link
                      to="/student/getAllSubjects"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Student Subject List
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <Link
                    to="/studentDetails"
                    className="text-white hover:underline"
                  >
                    STUDENTS
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/studentDetails"
                    className="text-white hover:underline"
                  >
                    {/* NEW CONVERSATION ({store.student.newerChats.length}) */}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/student/updatePassword"
                    className="text-white hover:underline"
                  >
                    UPDATE PASSWORD
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <button
                style={{ listStyle: "none" }}
                // onClick={logoutHandler}
                type="button"
                className="text-white hover:underline"
              >
                LOGOUT
              </button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default StudentHome;
