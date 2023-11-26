import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  studentLogout,
  newerChats,
  previousChats,
} from "../redux/action/studentAction";
import toast from "react-hot-toast";
import { GiSplitCross } from "react-icons/gi";
import { BsBoxArrowRight } from "react-icons/bs";
import Footer2 from "./Footer2";

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
          <div className='student-nav sticky top-0 z-50'>
            <nav className='bg-light'>
              <div className='mx-auto p-2 flex justify-between w-full items-center gap-2'>
                <div className='flex items-center gap-3'>
                  <button
                    onClick={handleToggle}
                    className='lg:hidden text-xl'
                    type='button'
                  >
                    ☰
                  </button>
                  <Link
                    to='/student'
                    className='text-2xl font-extrabold sm:text-center text-white flex flex-col'
                  >
                    SEACOM LMS{" "}
                    <span className='text-sm outline outline-white ml-1 mt-1 px-[0.15rem] py-[0.15rem] drop-shadow-2xl text-green-400'>
                      Student Dashboard
                    </span>
                  </Link>
                  <div className='w-[0.2rem] bg-white h-full mx-4'></div>
                  <div
                    className={`lg:flex sm:absolute lg:static sm:top-0 sm:left-0 lg:left-auto lg:top-auto sm:h-[100vh] lg:h-auto sm:bg-slate-200 lg:bg-inherit sm:w-2/3 lg:w-auto sm:text-black lg:text-white sm:px-2 lg:px-0 z-50 ${
                      togglenav ? "hidden space-x-2" : "flex flex-col"
                    }`}
                  >
                    <button
                      onClick={handleToggle}
                      className='lg:hidden flex justify-end mt-2 mb-2'
                    >
                      <GiSplitCross size={30} />
                    </button>
                    <ul className='flex lg:flex-row sm:flex-col space-x-6 sm:gap-4 lg:gap-0 sm:left-0 sm:w-full sm:bg-slate-50 lg:bg-inherit sm:py-4 lg:py-0'>
                      <li className='nav-item lg:ml-0 ml-6'>
                        <button
                          onClick={
                            window.innerWidth <= 1024 ? handleToggle : null
                          }
                          type='button'
                          className='btn text-[0.8rem]'
                        >
                          <Link to='/student'>{name?.toUpperCase()}</Link>
                        </button>
                      </li>
                      <li className='nav-item'>
                        <NavLink
                          onClick={
                            window.innerWidth <= 1024 ? handleToggle : null
                          }
                          type='button'
                          className='btn text-[0.8rem]'
                          activeClassName='active'
                          to='/student/updateProfile'
                        >
                          <h1>UPDATE PROFILE</h1>
                        </NavLink>
                      </li>

                      <li className='nav-item'>
                        <NavLink
                          onClick={
                            window.innerWidth <= 1024 ? handleToggle : null
                          }
                          type='button'
                          className='btn text-[0.8rem]'
                          activeClassName='active'
                          to='/student/studentDetails'
                        >
                          <h1>STUDENTS</h1>
                        </NavLink>
                      </li>
                      <li className='nav-item dropdown relative group'>
                        <button
                          onClick={handledropd}
                          className='sm:text-gray-800 text-[0.8rem] font-medium  group-hover:text-blue-300 bg-white px-3 py-[0.9rem] rounded-md'
                        >
                          ACADEMIC
                        </button>
                        {dropd && (
                          <div className='absolute rounded-sm mt-2 space-y-2 bg-slate-100 border border-gray-200 w-48 left-0 block text-black'>
                            <NavLink
                              activeClassName='active'
                              onClick={handledropd}
                              to='/student/testPerformance'
                              className='block px-4 py-2 hover:bg-yellow-400'
                            >
                              Test Results
                            </NavLink>
                            <NavLink
                              activeClassName='active'
                              onClick={handledropd}
                              to='/student/attendence'
                              className='block px-4 py-2 hover:bg-yellow-400'
                            >
                              Attendance
                            </NavLink>
                            <NavLink
                              activeClassName='active'
                              onClick={handledropd}
                              to='/student/getAllSubjects'
                              className='block px-4 py-2 hover:bg-yellow-400'
                            >
                              Subject List
                            </NavLink>
                          </div>
                        )}
                      </li>
                      <li className='nav-item'>
                        <NavLink
                          onClick={
                            window.innerWidth <= 1024 ? handleToggle : null
                          }
                          type='button'
                          className='btn text-[0.8rem]'
                          activeClassName='active'
                          to='/student/updatePassword'
                        >
                          <h1>UPDATE PASSWORD</h1>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <button
                    style={{ listStyle: "None" }}
                    onClick={logoutHandler}
                    type='button'
                    className='btn text-white font-semibold px-4 py-2 bg-slate-500 rounded-full hover:bg-slate-700 active:bg-yellow-300 flex items-center justify-center gap-2'
                  >
                    <div className='flex items-center gap-2'>
                      LOGOUT <BsBoxArrowRight size={25} />
                    </div>
                  </button>
                </div>
              </div>
            </nav>
          </div>
          <div className='h-full'>
            <div className='h-1 bg-yellow-400'></div>
            <Outlet />
            <div className='h-1 bg-yellow-400'></div>
            <Footer2 />
          </div>
        </div>
      ) : (
        <Navigate to='/student-login' />
      )}
    </>
  );
};

export default StudentHome;
