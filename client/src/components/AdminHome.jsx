import { NavLink, Link, Outlet, useNavigate, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { adminLogout } from "../redux/action/adminAction";
import { BsBoxArrowRight } from "react-icons/bs";

const AdminHome = () => {
  const store = useSelector((store) => store);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [togglenav, setTogglenav] = useState(true);

  useEffect(() => {
    if (store.admin.admin.name) {
      setName(store.admin.admin.name);
    }
  }, [store.admin.admin.name]);

  const logoutHandler = () => {
    dispatch(adminLogout());
    navigate("/admin-login");
  };

  const handleToggle = () => {
    setTogglenav(!togglenav);
  };
  return (
    <>
      {store.admin.admin.name ? (
        <div>
          <div className='adminhome sticky top-0 w-full'>
            <nav className='bg-light w-full'>
              <div className='p-4 flex justify-between items-center w-full'>
                <div className='flex items-center gap-3'>
                  <button
                    onClick={handleToggle}
                    className='lg:hidden text-xl'
                    type='button'
                  >
                    ☰
                  </button>
                  <Link
                    to='/admin'
                    activeClassName=''
                    className='text-2xl font-extrabold sm:text-center'
                  >
                    SEACOM CMS{" "}
                    <span className='text-sm outline outline-black ml-1 px-1 py-1 drop-shadow-2xl text-black'>
                      Admin Panel
                    </span>
                  </Link>
                  <div className='w-[0.2rem] bg-white h-full mx-4'></div>
                  <div
                    className={`lg:flex sm:absolute lg:static sm:top-0 sm:left-0 lg:left-auto lg:top-auto sm:h-[100vh] lg:h-auto sm:bg-slate-200 lg:bg-inherit sm:w-2/3 lg:w-auto sm:text-black lg:text-white sm:px-2 lg:px-0 ${
                      togglenav ? "hidden space-x-2" : "flex flex-col"
                    }`}
                  >
                    <button onClick={handleToggle} className='lg:hidden'>
                      Close
                    </button>
                    <ul className='flex lg:flex-row sm:flex-col space-x-3 sm:gap-4 lg:gap-0'>
                      <li className='nav-item'>
                        <button
                          onClick={
                            window.innerWidth <= 1024 ? handleToggle : null
                          }
                          type='button'
                          className='btn'
                        >
                          <Link to='/admin'>{name.toUpperCase()}</Link>
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
                          <NavLink to='/admin/addFaculty'>ADD FACULTY</NavLink>
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
                          <NavLink to='/admin/addStudent'>ADD STUDENT</NavLink>
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
                          <NavLink to='/admin/addSubject'>ADD SUBJECT</NavLink>
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
                          <NavLink to='/admin/addAdmin'>ADD ADMIN</NavLink>
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
                          <NavLink to='/admin/allFaculties'>
                            OUR FACULTIES
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
                          <NavLink to='/admin/allStudents'>
                            OUR STUDENTS
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
                          <NavLink to='/admin/allSubject'>SUBJECTS</NavLink>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <button
                    onClick={logoutHandler}
                    type='button'
                    className='btn bg-slate-200 px-4 py-2 rounded-full text-black font-semibold active:to-blue-500 hover:bg-slate-100 flex justify-center items-center gap-2'
                  >
                    <div className='flex gap-2 items-center'>
                      LOGOUT <BsBoxArrowRight size={22} />
                    </div>
                  </button>
                </div>
              </div>
            </nav>
          </div>
          <div className='h-full w-full'>
            <Outlet />
          </div>
        </div>
      ) : (
        <Navigate to='/' />
      )}
    </>
  );
};

export default AdminHome;
