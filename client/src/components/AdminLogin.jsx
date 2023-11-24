import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { adminLogin } from "../redux/action/adminAction";
import { Navigate, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const loginStart = useRef();

  useEffect(() => {
    loginStart.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (store.admin.isAuthenticated) {
      navigate("/admin");
    }
  }, [store.admin.isAuthenticated]);
  useEffect(() => {
    if (store.error) {
      setError(store.error);
    } else {
      setError({});
    }
  }, [store.error]);

  const fromHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(adminLogin({ registrationNumber, password }));
  };

  useEffect(() => {
    if (store.error || store.admin.isAuthenticated) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [store.error, store.admin.isAuthenticated]);

  return (
    <>
      {!store.admin.isAuthenticated ? (
        <div className='lg:w-full sm:w-screen lg:h-[85vh]'>
          <div ref={loginStart} className='mb-4'></div>
          <div className='p-8 w-full  h-full flex justify-center items-center '>
            <div className='login-palet rounded-lg py-12 px-4 lg:px-28 flex flex-col items-center justify-center lg:w-4/5 w-full'>
              <p className='text-center text-3xl text-white font-semibold mt-6'>
                Admin Login
              </p>
              <form className='mt-6 lg:w-2/4 w-full '>
                <div className='relative'>
                  <input
                    className='appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline'
                    id='username'
                    type='text'
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    placeholder='Login Id'
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
                {error.registrationNumber && (
                  <div className='invalid-feedback text-white px-1 text-sm absolute'>
                    {error.registrationNumber}
                  </div>
                )}
                <div className='relative mt-8'>
                  <input
                    className='appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline'
                    id='password'
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
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
                {error.password && (
                  <div className='invalid-feedback text-white absolute px-1'>
                    {error.password}
                  </div>
                )}
                <div className='mt-8 flex items-center text-white'>
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
                    onClick={fromHandler}
                    className='text-white py-2 px-4 uppercase rounded-full bg-green-500 hover:bg-green-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 w-full '
                  >
                    {isLoading ? "Loading" : "Sign in"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to={"/admin"} />
      )}
    </>
  );
};

export default AdminLogin;
