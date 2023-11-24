import { useRef } from "react";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { studentLogin } from "../redux/action/studentAction";
import toast from "react-hot-toast";

const StudentLogin = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const [studentRegNum, setStudentRegNum] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [errorsHelper, setErrorsHelper] = useState({});
  const [isStudentLoading, setIsStudentLoading] = useState(false);
  const navigate = useNavigate();
  const loginStart = useRef();

  useEffect(() => {
    loginStart.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (store.student.isAuthenticated) {
      toast.success("Login Successfully");
      navigate("/student");
    }
  }, [store.student.isAuthenticated]);

  // For error Storing
  useEffect(() => {
    if (store.errorHelper) {
      setErrorsHelper(store.errorHelper);
    } else {
      setErrorsHelper({});
    }
  }, [store.errorHelper]);

  // for login
  const studentFormHandler = (e) => {
    e.preventDefault();
    setIsStudentLoading(true);
    dispatch(
      studentLogin({
        registrationNumber: studentRegNum,
        password: studentPassword,
      })
    );
  };

  useEffect(() => {
    if (store.errorHelper || store.student.isAuthenticated) {
      setIsStudentLoading(false);
    } else {
      setIsStudentLoading(false);
    }
  }, [store.errorHelper, store.student.isAuthenticated]);

  return (
    <>
      <div className='lg:w-full sm:w-screen lg:h-[85vh]'>
        <div ref={loginStart} className='mb-4'></div>
        <div className='p-8 w-full  h-full flex justify-center items-center '>
          <div className='student-login rounded-lg py-12 px-4 lg:px-36 flex flex-col items-center justify-center lg:w-4/5 w-full '>
            <p className='text-center text-4xl text-white font-semibold'>
              Student Login 🖐
            </p>

            <form
              className='mt-6 lg:w-2/4 w-full lg:px-0 px-6'
              onSubmit={studentFormHandler}
            >
              <div className='relative'>
                <input
                  className='appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline'
                  id='username'
                  type='text'
                  value={studentRegNum}
                  onChange={(e) => setStudentRegNum(e.target.value)}
                  placeholder='Registration Number'
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
              {errorsHelper.registrationNumber && (
                <div className='invalid-feedback text-red-700'>
                  {errorsHelper.registrationNumber}
                </div>
              )}
              <div className='relative mt-3'>
                <input
                  className='appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline'
                  id='password'
                  type='password'
                  value={studentPassword}
                  onChange={(e) => setStudentPassword(e.target.value)}
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
              {errorsHelper.password && (
                <div className='invalid-feedback text-red-600'>
                  {errorsHelper.password}
                </div>
              )}
              <div className='mt-4 flex items-center text-white'>
                <input
                  type='checkbox'
                  id='remember'
                  name='remember'
                  className='mr-3'
                />
                <label htmlFor='remember'>Remember me</label>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <button
                  type='submit'
                  className='text-white py-2 px-4 uppercase rounded-full bg-yellow-500 hover:bg-yellow-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 w-full '
                >
                  {isStudentLoading ? (
                    <div className='loader'>loading</div>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentLogin;
