import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/seacom.png";
import { IoMdArrowDropdown } from "react-icons/io";
import { CgBot } from "react-icons/cg";

const Header = () => {
  return (
    <>
      <div className='drawer w-full top-0 mt-0 sticky z-50'>
        <input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content flex flex-col items-center'>
          {/* Navbar */}
          <div className='w-full navbar h-[100px] bg-white border-b-2 lg:px-28 flex items-center justify-center'>
            <div className='flex-none lg:hidden'>
              <label
                htmlFor='my-drawer-3'
                aria-label='open sidebar'
                className='btn btn-square btn-ghost'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  className='inline-block w-6 h-6 stroke-current'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  ></path>
                </svg>
              </label>
            </div>
            <div className='flex-1 px-2 mx-2'>
              <img src={logo} alt='logo' className='h-14 w-32' />
            </div>
            <div className='flex-none hidden lg:block my-auto'>
              <ul className='menu menu-horizontal text-lg flex items-center space-x-2 text-black font-medium'>
                {/* Navbar menu content here */}
                <li>
                  <NavLink to={"/"} activeclassname='active'>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/about-us"} activeclassname='active'>
                    About us
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/Courses"} activeclassname='active'>
                    Courses
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/life-seacom"} activeclassname='active'>
                    Ask to AI
                    <CgBot size={30} className='text-yellow-600' />
                  </NavLink>
                </li>
                <li className='dropdown'>
                  <li activeclassname='active' tabIndex={0}>
                    We@Manage (CMS)
                  </li>
                  <ul
                    tabIndex={0}
                    className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 text-lg space-y-2'
                  >
                    <NavLink
                      activeclassname='active'
                      to={"/student-login"}
                      className='mr-5 hover:text-gray-900 cursor-pointer hover:border-b-2 border-yellow-400 text-black text-md '
                    >
                      Student
                    </NavLink>
                    <NavLink
                      activeclassname='active'
                      to={"/faculty-login"}
                      className='mr-5 hover:text-gray-900 cursor-pointer hover:border-b-2 text-black text-md border-yellow-400'
                    >
                      Faculty
                    </NavLink>
                    <NavLink
                      to={"/admin-login"}
                      activeclassname='active'
                      className='mr-5 hover:text-gray-900 cursor-pointer hover:border-b-2 text-black text-md border-yellow-400'
                    >
                      Admin
                    </NavLink>
                    <NavLink
                      to={"/lectures"}
                      activeclassname='active'
                      className='mr-5 hover:text-gray-900 cursor-pointer hover:border-b-2 text-black text-md border-yellow-400'
                    >
                      Lectures
                    </NavLink>
                  </ul>
                </li>
                <li>
                  <NavLink to={"/contact-us"} activeclassname='active'>
                    Contact us
                  </NavLink>
                </li>
              </ul>
            </div>
            <Link
              to={"/application"}
              className='btn lg:btn-primary btn-warning font-semibold lg:text-lg'
            >
              Online Application
            </Link>
          </div>
        </div>
        <div className='drawer-side z-50'>
          <label
            htmlFor='my-drawer-3'
            aria-label='close sidebar'
            className='drawer-overlay'
          ></label>
          <ul className='menu p-4 w-80 min-h-full bg-base-200'>
            {/* Sidebar content here */}
            <li>
              <NavLink to={"/"} activeclassname='active'>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={"/about-us"} activeclassname='active'>
                About us
              </NavLink>
            </li>
            <li>
              <NavLink to={"/Courses"} activeclassname='active'>
                Courses
              </NavLink>
            </li>
            <li>
              <NavLink to={"/life-seacom"} activeclassname='active'>
                Life@Seacom
              </NavLink>
            </li>
            <li className='dropdown'>
              <li activeclassname='active' tabIndex={0}>
                We@Manage
              </li>{" "}
              <IoMdArrowDropdown />
              <ul
                tabIndex={0}
                className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 text-lg space-y-2'
              >
                <NavLink
                  activeclassname='active'
                  to={"/student-login"}
                  className='mr-5 hover:text-gray-900 cursor-pointer hover:border-b-2 border-yellow-400 text-black text-md '
                >
                  Student
                </NavLink>
                <NavLink
                  activeclassname='active'
                  to={"/faculty-login"}
                  className='mr-5 hover:text-gray-900 cursor-pointer hover:border-b-2 text-black text-md border-yellow-400'
                >
                  Faculty
                </NavLink>
                <NavLink
                  to={"/admin-login"}
                  activeclassname='active'
                  className='mr-5 hover:text-gray-900 cursor-pointer hover:border-b-2 text-black text-md border-yellow-400'
                >
                  Admin
                </NavLink>
                <NavLink
                  to={"/lectures"}
                  activeclassname='active'
                  className='mr-5 hover:text-gray-900 cursor-pointer hover:border-b-2 text-black text-md border-yellow-400'
                >
                  Lectures
                </NavLink>
              </ul>
            </li>
            <li>
              <NavLink to={"/contact-us"} activeclassname='active'>
                Contact us
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
