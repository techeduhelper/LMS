import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/seacomlogo.png";

const FacultyProfile = () => {
  const navigate = useNavigate();
  const store = useSelector((store) => store);
  return (
    <>
      {store.faculty.isAuthenticated ? (
        <>
          <div className='mt-5 px-3 min-h-[80vh]'>
            <div className='grid grid-cols-1 lg:grid-cols-3 sm:gap-4'>
              <div className='lg:col-span-1 sm:w-full'>
                <div className='w-full'>
                  <div className='bg-white shadow-lg rounded-lg flex flex-col justify-center items-center w-full'>
                    <img
                      className='w-full h-[28rem] px-2'
                      src={store.faculty.faculty.faculty.avatar}
                      alt='Faculty Avatar'
                    />
                    <div className='flex flex-col justify-center items-center py-4'>
                      <h5 className='text-xl font-bold mb-2'>
                        {store.faculty.faculty.faculty.name}
                      </h5>
                      <h5 className='text-xl font-bold mb-2'>
                        {store.faculty.faculty.faculty.registrationNumber}
                      </h5>
                      <Link
                        to='/faculty/updateProfile'
                        className='bg-blue-500 text-white py-2 px-4 rounded-full inline-block hover:bg-blue-600 '
                      >
                        UPDATE PROFILE
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className='relative -z-10 col-span-2 mb-4 flex justify-center items-start'>
                <table className='w-full border-collapse border border-gray-300 bg-slate-50 p-4'>
                  <tbody>
                    <tr>
                      <td className='w-1/4 px-4 py-2 font-semibold'>Name</td>
                      <td className='px-4 py-2 '>
                        {store.faculty.faculty.faculty.name}
                      </td>
                    </tr>
                    <tr>
                      <td className='w-1/4 px-4 py-2 font-semibold'>Email</td>
                      <td className='px-4 py-2'>
                        {store.faculty.faculty.faculty.email}
                      </td>
                    </tr>
                    <tr>
                      <td className='w-1/4 px-4 py-2 font-semibold'>
                        Employee Id
                      </td>
                      <td className='px-4 py-2'>
                        {store.faculty.faculty.faculty.registrationNumber}
                      </td>
                    </tr>
                    <tr>
                      <td className='w-1/4 px-4 py-2 font-semibold'>
                        Date Of Birth
                      </td>
                      <td className='px-4 py-2'>
                        {store.faculty.faculty.faculty.dob}
                      </td>
                    </tr>
                    <tr>
                      <td className='w-1/4 px-4 py-2 font-semibold'>
                        Designation
                      </td>
                      <td className='px-4 py-2'>
                        {store.faculty.faculty.faculty.designation}
                      </td>
                    </tr>
                    <tr>
                      <td className='w-1/4 px-4 py-2 font-semibold'>
                        Joining Year
                      </td>
                      <td className='px-4 py-2'>
                        {store.faculty.faculty.faculty.joiningYear}
                      </td>
                    </tr>
                    <tr>
                      <td className='w-1/4 px-4 py-2 font-semibold'>
                        Department
                      </td>
                      <td className='px-4 py-2'>
                        {store.faculty.faculty.faculty.department}
                      </td>
                    </tr>
                    <tr>
                      <td className='w-1/4 px-4 py-2 font-semibold'>Gender</td>
                      <td className='px-4 py-2'>
                        {store.faculty.faculty.faculty.gender
                          ? store.faculty.faculty.faculty.gender
                          : "NA"}
                      </td>
                    </tr>
                    <tr>
                      <td className='w-1/4 px-4 py-2 font-semibold'>
                        Contact Number
                      </td>
                      <td className='px-4 py-2'>
                        {store.faculty.faculty.faculty.facultyMobileNumber
                          ? store.faculty.faculty.faculty.facultyMobileNumber
                          : "NA"}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className='logo absolute right-0 mt-4 lg:mr-16 sm:mr-10 flex justify-center flex-col items-center'>
                  <div className='relative'>
                    <img src={logo} alt='' className='h-24 brightness-60' />
                  </div>
                  <div className='absolute -mt-12 ml-3 text-green-700'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-28 h-28'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M4.5 12.75l6 6 9-13.5'
                      />
                    </svg>
                  </div>
                  <h1 className='text-xl font-bold text-gray-600'>Verified</h1>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        navigate("/")
      )}
    </>
  );
};

export default FacultyProfile;
