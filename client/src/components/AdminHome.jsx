import { Link, Outlet, useNavigate, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { adminLogout } from "../redux/action/adminAction";

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
    navigate("/");
  };

  const handleToggle = () => {
    setTogglenav(!togglenav);
  };
  return (
    <>
      {store.admin.admin.name ? (
        <div>
          <div className="adminhome sticky top-0">
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
                    to="/admin"
                    className="text-2xl font-extrabold sm:text-center"
                  >
                    SEACOM LMS{" "}
                    <span className="text-sm outline outline-black ml-1 px-1 py-1 drop-shadow-2xl text-black">
                      Admin Panel
                    </span>
                  </Link>
                  <div className="w-[0.2rem] bg-white h-full mx-4"></div>
                  <div
                    className={`lg:flex sm:absolute lg:static sm:top-0 sm:left-0 lg:left-auto lg:top-auto sm:h-[100vh] lg:h-auto sm:bg-slate-200 lg:bg-inherit sm:w-2/3 lg:w-auto sm:text-black lg:text-white ${
                      togglenav ? "hidden space-x-2" : "flex flex-col"
                    }`}
                  >
                    <button onClick={handleToggle} className="lg:hidden">
                      Close
                    </button>
                    <ul className="flex lg:flex-row sm:flex-col space-x-6 sm:gap-4 lg:gap-0">
                      <li className="nav-item">
                        <button
                          onClick={
                            window.innerWidth <= 1024 ? handleToggle : null
                          }
                          type="button"
                          className="btn"
                        >
                          <Link to="/admin">{name.toUpperCase()}</Link>
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
                          <Link to="/admin/addFaculty">ADD FACULTY</Link>
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
                          <Link to="/admin/addStudent">ADD STUDENT</Link>
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
                          <Link to="/admin/addSubject">ADD SUBJECT</Link>
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
                          <Link to="/admin/addAdmin">ADD ADMIN</Link>
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
                          <Link to="/admin/allFaculties">OUR FACULTIES</Link>
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
                          <Link to="/admin/allStudents">OUR STUDENTS</Link>
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
                          <Link to="/admin/allSubject">SUBJECTS</Link>
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
                    className="btn"
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
        <Navigate to="/" />
      )}
    </>
  );
};

export default AdminHome;
