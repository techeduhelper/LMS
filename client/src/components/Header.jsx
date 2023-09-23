import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="navbar-bg text-gray-600 body-font sticky top-0 z-50 bg-white shadow-md">
        <div className="relative container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-10 h-10 text-white p-2 bg-yellow-800 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="ml-3 text-xl font-bold tracking-wide drop-shadow-sm">
              Seacom LMS
            </span>
          </a>
          <nav className="flex items-center text-lg justify-end right-4 font-semibold absolute w-full h-full sm:mt-2 lg:mt-0 no-underline">
            <Link
              to={"/student-login"}
              className="mr-5 hover:text-gray-900 cursor-pointer hover:border-b-2 border-yellow-400 text-black text-md "
            >
              Student
            </Link>
            <Link
              to={"/faculty-login"}
              className="mr-5 hover:text-gray-900 cursor-pointer hover:border-b-2 text-black text-md border-yellow-400"
            >
              Faculty
            </Link>
            <Link
              to={"/"}
              className="mr-5 hover:text-gray-900 cursor-pointer hover:border-b-2 text-black text-md border-yellow-400"
            >
              Admin
            </Link>
            <Link className="mr-5 hover:text-gray-900 cursor-pointer hover:border-b-2 text-black text-md border-yellow-400">
              Lectures
            </Link>
          </nav>
        </div>
      </nav>
    </>
  );
};

export default Header;
