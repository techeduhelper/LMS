import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/seacomlogo.png";

const StudentCard = () => {
  const store = useSelector((store) => store);
  const navigate = useNavigate();

  return (
    <>
      <div className='bg-gray-800 min-h-screen'>
        {store.student.isAuthenticated ? (
          <>
            <div className='sm:w-full py-2 pb-4'>
              <div className='print-card w-full lg:px-6 px-4 flex flex-col justify-center items-center'>
                <h1 className='text-center py-3 bg-slate-500 rounded-tl-md rounded-tr-md text-3xl font-semibold w-full mt-2 text-white'>
                  ID <span className='text-yellow-500'>Card</span>
                </h1>
                <div className='mt-2 mx-auto w-full  flex items-center justify-center flex-col'>
                  <div className='flex lg:flex-row sm:flex-col justify-center pt-2 bg-gray-100 lg:w-full sm:w-full px-2 rounded-tr-md rounded-tl-md sm:gap-3'>
                    <div className='sm:w-full lg:w-2/5'>
                      <div className=''>
                        <img
                          className='h-96 w-full rounded-tl-md rounded-tr-md'
                          src={store.student.student.student.avatar}
                          alt='Card image cap'
                        />
                      </div>
                    </div>
                    <div className='w-full bg-gray-100 text-black px-4 rounded-tr-md'>
                      <table className='table-auto w-full '>
                        <tbody>
                          <tr>
                            <td className='font-semibold'>Name</td>
                            <td>{store.student.student.student.name}</td>
                          </tr>
                          <tr>
                            <td className='font-semibold'>Email</td>
                            <td>{store.student.student.student.email}</td>
                          </tr>
                          <tr>
                            <td className='font-semibold'>
                              Registration Number
                            </td>
                            <td>
                              {store.student.student.student.registrationNumber}
                            </td>
                          </tr>
                          <div className='logo absolute right-0 mt-4 lg:mr-16 sm:mr-10 flex justify-center flex-col items-center'>
                            <div className='relative'>
                              <img
                                src={logo}
                                alt=''
                                className='h-24 brightness-60'
                              />
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
                            <h1 className='text-xl font-bold text-gray-600'>
                              Verified
                            </h1>
                          </div>
                          <tr>
                            <td className='font-semibold'>Date Of Birth</td>
                            <td>{store.student.student.student.dob}</td>
                          </tr>
                          <tr>
                            <td className='font-semibold'>Year</td>
                            <td>{store.student.student.student.year}</td>
                          </tr>
                          <tr>
                            <td className='font-semibold'>Department</td>
                            <td>{store.student.student.student.department}</td>
                          </tr>
                          <tr>
                            <td className='font-semibold'>Section</td>
                            <td>{store.student.student.student.section}</td>
                          </tr>
                          <tr>
                            <td className='font-semibold'>Batch</td>
                            <td>{store.student.student.student.batch}</td>
                          </tr>
                          <tr>
                            <td className='font-semibold'>Gender</td>
                            <td>
                              {store.student.student.student.gender
                                ? store.student.student.student.gender
                                : "NA"}
                            </td>
                          </tr>
                          <tr>
                            <td className='font-semibold'>Contact Number</td>
                            <td>
                              {store.student.student.student.studentMobileNumber
                                ? store.student.student.student
                                    .studentMobileNumber
                                : "NA"}
                            </td>
                          </tr>
                          <tr>
                            <td className='font-semibold'>Aadhar Card</td>
                            <td>
                              {store.student.student.student.aadharCard
                                ? store.student.student.student.aadharCard
                                : "NA"}
                            </td>
                          </tr>
                          <tr>
                            <td className='font-semibold'>Father Name</td>
                            <td>
                              {store.student.student.student.fatherName
                                ? store.student.student.student.fatherName
                                : "NA"}
                            </td>
                          </tr>
                          <tr>
                            <td className='font-semibold'>
                              Father Contact Number
                            </td>
                            <td>
                              {store.student.student.student.fatherMobileNumber
                                ? store.student.student.student
                                    .fatherMobileNumber
                                : "NA"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className='bg-gray-500 dark:bg-gray-800 p-4 lg:w-full sm:w-full flex  flex-col justify-center items-center mt-3 rounded-bl-md rounded-br-md  gap-1'>
                    <h5 className='text-xl font-semibold text-white'>
                      {store.student.student.student.name}
                    </h5>
                    <h5 className='text-xl font-semibold text-white '>
                      {store.student.student.student.registrationNumber}
                    </h5>
                    <Link
                      to='/student/updateProfile'
                      className='bg-green-500 text-white px-4 py-2 hover:bg-green-700 rounded-full'
                    >
                      UPDATE PROFILE
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          navigate("/")
        )}
      </div>
    </>
  );
};

export default StudentCard;
