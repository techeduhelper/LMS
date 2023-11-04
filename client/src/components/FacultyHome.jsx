import React, { useState, useEffect } from "react";
import { NavLink, Link, Outlet, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { facultyLogout } from "../redux/action/facultyAction";
import { GiSplitCross } from "react-icons/gi";
import { BsBoxArrowRight } from "react-icons/bs";

const FacultyHome = () => {
  const store = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [togglenav, setTogglenav] = useState(true);
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    if (store.faculty.faculty.faculty.name) {
      setName(store.faculty.faculty.faculty.name);
    } else {
      setName("");
    }
  }, [store.faculty.faculty.faculty.name]);

  useEffect(() => {
    if (store.faculty.faculty.faculty.avatar) {
      setAvatar(store.faculty.faculty.faculty.avatar);
    } else {
      setAvatar("");
    }
  }, [store.faculty.faculty.faculty.avatar]);

  const logoutHandler = () => {
    dispatch(facultyLogout());
    navigate("/faculty-login");
  };

  const handleToggle = () => {
    setTogglenav(!togglenav);
  };

  return (
    <>
      {store.faculty.isAuthenticated ? (
        <div>
          <div className='adminfaculty sticky top-0'>
            <nav className='bg-light'>
              <div className='mx-auto p-4 flex justify-between'>
                <div className='flex items-center gap-3'>
                  <button
                    onClick={handleToggle}
                    className='lg:hidden text-xl'
                    type='button'
                  >
                    ☰
                  </button>
                  <Link
                    to='/faculty'
                    className='text-2xl font-extrabold sm:text-center'
                  >
                    SEACOM LMS{" "}
                    <span className='text-sm outline outline-black ml-1 px-1 py-1 drop-shadow-2xl text-black'>
                      Faculty Panel
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
                      <li className='nav-item'>
                        <button
                          onClick={
                            window.innerWidth <= 1024 ? handleToggle : null
                          }
                          type='button'
                          className='btn'
                        >
                          <Link to='/faculty'>{name?.toUpperCase()}</Link>
                        </button>
                      </li>
                      <li className='nav-item'>
                        <button
                          onClick={
                            window.innerWidth <= 1024 ? handleToggle : null
                          }
                          type='button'
                          className='btn'
                        >
                          <NavLink
                            activeClassName='active'
                            to='/faculty/updateProfile'
                          >
                            UPDATE PROFILE
                          </NavLink>
                        </button>
                      </li>
                      <li className='nav-item'>
                        <button
                          onClick={
                            window.innerWidth <= 1024 ? handleToggle : null
                          }
                          type='button'
                          className='btn'
                        >
                          <NavLink
                            activeClassName='active'
                            to='/faculty/markAttendence'
                          >
                            MARK ATTENDANCE
                          </NavLink>
                        </button>
                      </li>
                      <li className='nav-item'>
                        <button
                          onClick={
                            window.innerWidth <= 1024 ? handleToggle : null
                          }
                          type='button'
                          className='btn'
                        >
                          <NavLink
                            activeClassName='active'
                            to='/faculty/uploadMarks'
                          >
                            UPLOAD MARKS
                          </NavLink>
                        </button>
                      </li>
                      <li className='nav-item'>
                        <button
                          onClick={
                            window.innerWidth <= 1024 ? handleToggle : null
                          }
                          type='button'
                          className='btn'
                        >
                          <NavLink
                            activeClassName='active'
                            to='/faculty/updatePassword'
                          >
                            UPDATE PASSWORD
                          </NavLink>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <button
                    style={{ listStyle: "None" }}
                    onClick={logoutHandler}
                    type='button'
                    className='btn text-white font-semibold bg-slate-500 px-4 py-2 rounded-full hover:bg-slate-600 active:bg-pink-600 flex items-center justify-center gap-2'
                  >
                    LOGOUT
                    <BsBoxArrowRight size={25} />
                  </button>
                </div>
              </div>
            </nav>
          </div>
          <div className='h-full'>
            <Outlet />
          </div>
        </div>
      ) : (
        <Navigate to='/faculty-login' />
      )}
    </>
  );
};

export default FacultyHome;
