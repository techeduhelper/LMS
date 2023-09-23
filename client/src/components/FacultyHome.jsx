import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { facultyLogout } from "../redux/action/facultyAction";
import toast from "react-hot-toast";

const FacultyHome = () => {
  const store = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  useEffect(() => {
    if (store.faculty.faculty.faculty.name) {
      setName(store.faculty.faculty.faculty.name);
    }
  }, [store.faculty.faculty.faculty.name]);
  const logoutHandler = () => {
    dispatch(facultyLogout());
    toast.success("Logout Successfully");
    navigate("/faculty-login");
  };

  return (
    <>
      <div className="bg-light">
        <nav className="lg:container mx-auto px-4 py-3 flex justify-between items-center bg-slate-100">
          <Link to="/admin" className="text-2xl font-extrabold sm:text-center">
            SEACOM LMS{" "}
            <span className="text-sm outline outline-black ml-1 px-1 py-1 drop-shadow-2xl text-black">
              Faculty Panel
            </span>
          </Link>
          <h4 className="text-xl font-semibold">
            <Link to="/faculty">{name.toUpperCase()}</Link>
          </h4>

          <button
            className="lg:hidden navbar-toggler"
            type="button"
            data-toggle="collapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className=" lg:flex space-x-4">
            <button className="btn">
              <Link to="/faculty/updateProfile">UPDATE PROFILE</Link>
            </button>
            <button className="btn">
              <Link to="/faculty/markAttendence">MARK ATTENDANCE</Link>
            </button>
            <button className="btn">
              <Link to="/faculty/uploadMarks">UPLOAD MARKS</Link>
            </button>
            <button className="btn">
              <Link to="/faculty/updatePassword">UPDATE PASSWORD</Link>
            </button>
          </div>

          <div>
            <button className="btn" onClick={logoutHandler}>
              LOGOUT
            </button>
          </div>
        </nav>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default FacultyHome;
