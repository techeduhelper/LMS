import React from "react";

const StudentLogin = () => {
  return (
    <>
      <div className="lg:w-full sm:w-screen lg:h-[85vh]">
        <div className="p-8 w-full  h-full flex justify-center items-center ">
          <div className="bg-gray-100 rounded-lg py-12 px-4 lg:px-28 flex flex-col items-center justify-center w-full ">
            <p className="text-center text-2xl text-gray-800 font-semibold">
              Student Login
            </p>

            <form className="mt-6">
              <div className="relative">
                <input
                  className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Registration Number"
                />

                <div className="absolute left-0 inset-y-0 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 ml-3 text-gray-400 p-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />

                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              </div>
              <div className="relative mt-3">
                <input
                  className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                />
                <div className="absolute left-0 inset-y-0 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 ml-3 text-gray-400 p-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex items-center text-gray-500">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="mr-3"
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <div className="flex items-center justify-center mt-8">
                <button className="text-white py-2 px-4 uppercase rounded-full bg-yellow-500 hover:bg-yellow-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 w-full ">
                  Sign in
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
