import { useRef } from "react";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { facultyLogin } from "../redux/action/facultyAction";

const FacultyLogin = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const [facultyRegNum, setFacultyRegNum] = useState("");
  const [facultyPassword, setFacultyPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isFacultyLoading, setIsFacultyLoading] = useState(false);
  const navigate = useNavigate();
  const loginStart = useRef();

  useEffect(() => {
    loginStart.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (store.faculty.isAuthenticated) {
      navigate("/faculty");
    }
  }, [store.faculty.isAuthenticated]);

  useEffect(() => {
    if (store.error) {
      setErrors(store.error);
      setIsFacultyLoading(false);
    } else {
      setErrors({});
    }
  }, [store.error]);

  const facultyFormHandler = (e) => {
    e.preventDefault();
    setIsFacultyLoading(true);
    dispatch(
      facultyLogin({
        registrationNumber: facultyRegNum,
        password: facultyPassword,
      })
    );
  };

  useEffect(() => {
    if (store.error || store.faculty.isAuthenticated) {
      setIsFacultyLoading(false);
    } else {
      setIsFacultyLoading(true);
    }
  }, [store.error, store.faculty.isAuthenticated]);

  return (
    <>
      <div className='lg:w-full sm:w-screen lg:h-[85vh]'>
        <div ref={loginStart} className='mb-4'></div>
        <div className='p-8 w-full  h-full flex justify-center items-center '>
          <div className='faculty-login rounded-lg py-12 px-4 lg:px-28 flex flex-col items-center justify-center lg:w-4/5 w-full'>
            <p className='text-center text-3xl text-white font-semibold'>
              Faculty Login
            </p>

            <form
              className='mt-6 w-full lg:w-2/4 px-6 lg:px-0'
              onSubmit={facultyFormHandler}
            >
              <div className='relative'>
                <input
                  className='appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline'
                  id='username'
                  type='text'
                  value={facultyRegNum}
                  onChange={(e) => setFacultyRegNum(e.target.value)}
                  placeholder='Employee Id'
                />

                <div className='absolute left-0 inset-y-0 flex items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-7 w-7 ml-3 text-gray-400 p-1'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />

                    <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                  </svg>
                </div>
              </div>
              {errors.registrationNumber && (
                <div className='invalid-feedback text-white px-1 text-sm absolute'>
                  {errors.registrationNumber}
                </div>
              )}
              <div className='relative mt-7'>
                <input
                  className='appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline'
                  id='password'
                  type='password'
                  value={facultyPassword}
                  onChange={(e) => setFacultyPassword(e.target.value)}
                  placeholder='Password'
                />
                <div className='absolute left-0 inset-y-0 flex items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-7 w-7 ml-3 text-gray-400 p-1'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z' />
                  </svg>
                </div>
              </div>
              {errors.password && (
                <div className='invalid-feedback text-white px-1 text-sm absolute'>
                  {errors.password}
                </div>
              )}
              <div className='mt-7 flex items-center text-white'>
                <input
                  type='checkbox'
                  id='remember'
                  name='remember'
                  className='mr-3'
                />
                <label htmlFor='remember'>Remember me</label>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <button className='text-white py-2 px-4 uppercase rounded-full bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 w-full '>
                  {isFacultyLoading ? "Signing In.." : "Sign In"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FacultyLogin;
