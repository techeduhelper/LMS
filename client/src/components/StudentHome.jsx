import React, { useState, useEffect } from "react";
import { Link, useNavigate, Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  studentLogout,
  newerChats,
  previousChats,
} from "../redux/action/studentAction";
import toast from "react-hot-toast";
import { GiSplitCross } from "react-icons/gi";

const StudentHome = () => {
  const [dropd, setDropd] = useState(false);
  const navigate = useNavigate();
  const store = useSelector((store) => store);
  const [name, setName] = useState("");
  const [togglenav, setTogglenav] = useState(true);

  useEffect(() => {
    if (store.student.student.student.name) {
      setName(store.student.student.student.name);
    }
  }, [store.student.student.student.name]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(newerChats(store.student.student.student.name));
    dispatch(previousChats(store.student.student.student.name));
  }, [store.student.newerChats.length]);
  const logoutHandler = () => {
    dispatch(studentLogout());
    toast.success("Logout Successfully");
    navigate("/student-login");
  };

  const handledropd = () => {
    setDropd(!dropd);
  };

  const handleToggle = () => {
    setTogglenav(!togglenav);
  };

  return (
    <>
      {store.student.isAuthenticated ? (
        <div>
          <div className="student-nav sticky top-0">
            <nav className="bg-light">
              <div className="lg:container mx-auto p-4 flex justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleToggle}
                    className="lg:hidden text-xl"
                    type="button"
                  >
                    ☰
                  </button>
                  <Link
                    to="/student"
                    className="text-2xl font-extrabold sm:text-center text-white"
                  >
                    SEACOM LMS{" "}
                    <span className="text-sm outline outline-white ml-1 px-1 py-1 drop-shadow-2xl text-green-400">
                      Student Dashboard
                    </span>
                  </Link>
                  <div className="w-[0.2rem] bg-white h-full mx-4"></div>
                  <div
                    className={`lg:flex sm:absolute lg:static sm:top-0 sm:left-0 lg:left-auto lg:top-auto sm:h-[100vh] lg:h-auto sm:bg-slate-200 lg:bg-inherit sm:w-2/3 lg:w-auto sm:text-black lg:text-white sm:px-2 lg:px-0 z-50 ${
                      togglenav ? "hidden space-x-2" : "flex flex-col"
                    }`}
                  >
                    <button
                      onClick={handleToggle}
                      className="lg:hidden flex justify-end mt-2 mb-2"
                    >
                      <GiSplitCross size={30} />
                    </button>
                    <ul className="flex lg:flex-row sm:flex-col space-x-6 sm:gap-4 lg:gap-0 sm:left-0 sm:w-full sm:bg-slate-50 lg:bg-inherit sm:py-4 lg:py-0">
                      <li className="nav-item">
                        <button
                          onClick={
                            window.innerWidth <= 1024 ? handleToggle : null
                          }
                          type="button"
                          className="btn"
                        >
                          <Link className="pl-5" to="/student">
                            {name?.toUpperCase()}
                          </Link>
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          onClick={
                            window.innerWidth <= 1024 ? handleToggle : null
                          }
                          type="button"
                          className="btn"
                        >
                          <Link to="/student/updateProfile">
                            UPDATE PROFILE
                          </Link>
                        </button>
                      </li>
                      <li className="nav-item dropdown relative group">
                        <button
                          onClick={handledropd}
                          className="sm:text-black lg:text-white group-hover:text-blue-300"
                        >
                          ACADEMIC
                        </button>
                        {dropd && (
                          <div className="absolute  mt-2 space-y-2 bg-slate-100 border border-gray-200 w-48 left-0 block text-black">
                            <Link
                              onClick={handledropd}
                              to="/student/testPerformance"
                              className="block px-4 py-2 hover:bg-gray-200"
                            >
                              Test Performance
                            </Link>
                            <Link
                              onClick={handledropd}
                              to="/student/attendence"
                              className="block px-4 py-2 hover:bg-gray-200"
                            >
                              Attendance
                            </Link>
                            <Link
                              onClick={handledropd}
                              to="/student/getAllSubjects"
                              className="block px-4 py-2 hover:bg-gray-200"
                            >
                              Student Subject List
                            </Link>
                          </div>
                        )}
                      </li>
                      <li className="nav-item">
                        <button
                          onClick={
                            window.innerWidth <= 1024 ? handleToggle : null
                          }
                          type="button"
                          className="btn"
                        >
                          <Link to="/student/studentDetails">STUDENTS</Link>
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          onClick={
                            window.innerWidth <= 1024 ? handleToggle : null
                          }
                          type="button"
                          className="btn"
                        >
                          <Link to="/student/updatePassword">
                            UPDATE PASSWORD
                          </Link>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <button
                    style={{ listStyle: "None" }}
                    onClick={logoutHandler}
                    type="button"
                    className="btn text-white font-semibold"
                  >
                    LOGOUT
                  </button>
                </div>
              </div>
            </nav>
          </div>
          <div className="h-full">
            <Outlet />
          </div>
        </div>
      ) : (
        <Navigate to="/student-login" />
      )}
    </>
  );
};

export default StudentHome;
