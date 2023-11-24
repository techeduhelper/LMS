import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { adminGetAllFaculty } from "../redux/action/adminAction";
import { AiFillPrinter } from "react-icons/ai";

const AdminGetAllFaculties = () => {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const [department, setDepartment] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  const formHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(adminGetAllFaculty({ department }));
  };

  useEffect(() => {
    if (store.admin.allFaculty.length !== 0) {
      setIsLoading(false);
    }
  }, [store.admin.allFaculty.length]);

  useEffect(() => {
    if (store.error || store.admin.allFaculty) {
      setError({});
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [store.error, store.admin.allFaculty]);

  // for Printing Purpose
  const handlePrintClick = () => {
    const printWindow = window.open("", "_blank");
    const contentToPrint = document.getElementById("contentToPrint");
    if (contentToPrint) {
      printWindow.document.write(`
      <html>
        <head>
          <title>All Faculties</title>
        </head>
        <body>
        <h1 class="fcal">Faculties</h1>
          ${contentToPrint.innerHTML}
        </body>
      </html>
    `);
      printWindow.print();
      printWindow.close();
    } else {
      console.error("Element with ID 'contentToPrint' not found.");
    }
  };

  // for particullar faculties
  const handleViewClick = (res) => {
    setSelectedFaculty(res);
    document.getElementById("my_modal_1").showModal();
  };

  return (
    <>
      <div>
        {store.admin.isAuthenticated ? (
          <>
            <div className='mx-auto mt-1 py-5 bg-gray-900 min-h-screen'>
              <div className='flex flex-col lg:flex-row sm:flex-col justify-center'>
                <div className='w-full md:w-1/3 px-4 mb-8'>
                  <form
                    className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
                    noValidate
                    onSubmit={formHandler}
                  >
                    <div className='mb-4'>
                      <label
                        htmlFor='departmentId'
                        className='block text-gray-700 text-sm font-bold mb-2'
                      >
                        Department
                      </label>
                      <select
                        onChange={(e) => setDepartment(e.target.value)}
                        className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='departmentId'
                      >
                        <option>Select</option>
                        <option value='E.C.E'>E.C.E</option>
                        <option value='C.S.E'>C.S.E</option>
                        <option value='E.E.E'>E.E.E</option>
                        <option value='I.T'>I.T</option>
                        <option value='Mechanical'>Mechanical</option>
                        <option value='Civil'>Civil</option>
                      </select>
                      {error.department && (
                        <p className='text-red-500 text-xs italic'>
                          {error.department}
                        </p>
                      )}
                    </div>

                    <button
                      type='submit'
                      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full'
                    >
                      {isLoading ? "Searching.." : "Search"}
                    </button>
                  </form>
                </div>
                <div className='w-full md:w-2/3 px-4'>
                  {store.admin.allFaculty.length !== 0 && (
                    <>
                      <div className='w-full flex justify-end px-3 mb-2 text-gray-600 '>
                        <AiFillPrinter
                          size={40}
                          className='hover:bg-slate-200 hover:rounded-full p-1 active:bg-slate-100'
                          onClick={handlePrintClick}
                        />
                      </div>
                      <div
                        id='contentToPrint'
                        className='lg:overflow-hidden sm:overflow-x-auto'
                      >
                        <table className='printfacultie table-auto w-full border bg-slate-300 '>
                          <thead>
                            <tr>
                              <th className='border px-4 py-2'>S.No</th>
                              <th className='border px-4 py-2'>
                                Registration Number
                              </th>
                              <th className='border px-4 py-2'>Name</th>
                              <th className='border px-4 py-2'>Email</th>
                              <th className='border px-4 py-2'>Joining Year</th>
                              <th className='border px-4 py-2'></th>
                            </tr>
                          </thead>
                          <tbody className='bg-white font-medium text-gray-600'>
                            {store.admin.allFaculty.map((res, index) => (
                              <tr
                                key={index}
                                className={`${
                                  index % 2 === 0
                                    ? "bg-white hover:bg-gray-100"
                                    : "bg-gray-50 hover:bg-slate-200"
                                }`}
                              >
                                <td className='border px-4 py-2'>
                                  {index + 1}
                                </td>
                                <td className='border px-4 py-2'>
                                  {res.registrationNumber}
                                </td>
                                <td className='border px-4 py-2'>{res.name}</td>
                                <td className='border px-4 py-2'>
                                  {res.email}
                                </td>
                                <td className='border px-4 py-2'>
                                  {res.joiningYear}
                                </td>
                                <td className='border px-4 py-2'>
                                  <Link
                                    onClick={() => handleViewClick(res)}
                                    className='text-blue-600 hover:text-blue-800'
                                  >
                                    View
                                  </Link>
                                </td>
                                <dialog
                                  id='my_modal_1'
                                  className='modal min-w-[80%]  overflow-y-visible'
                                >
                                  <div className='modal-box max-w-[80%] min-h-[80%] '>
                                    {selectedFaculty && (
                                      <div className='grid grid-cols-1 lg:grid-cols-3 sm:gap-4 w-full'>
                                        <div className='lg:col-span-1 sm:w-full'>
                                          <div className='w-full'>
                                            <div className='bg-white rounded-lg flex flex-col justify-center items-center w-full'>
                                              <img
                                                className='w-full lg:h-[28rem] h-[16rem] px-2'
                                                src={selectedFaculty.avatar}
                                                alt='Faculty Avatar'
                                              />
                                              <div className='flex flex-col justify-center items-center py-4'>
                                                <h5 className='text-xl font-bold mb-2'>
                                                  {selectedFaculty.name}
                                                </h5>
                                                <h5 className='text-xl font-bold mb-2'>
                                                  {
                                                    selectedFaculty.registrationNumber
                                                  }
                                                </h5>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className='relative -z-10 col-span-2 mb-4 flex justify-center items-start'>
                                          <table className='w-full border-collapse border border-gray-300 bg-slate-50 p-4'>
                                            <tbody>
                                              <tr>
                                                <td className='w-1/4 px-4 py-2 font-semibold'>
                                                  Name
                                                </td>
                                                <td className='px-4 py-2 '>
                                                  {selectedFaculty.name}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className='w-1/4 px-4 py-2 font-semibold'>
                                                  Email
                                                </td>
                                                <td className='px-4 py-2'>
                                                  {selectedFaculty.email}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className='w-1/4 px-4 py-2 font-semibold'>
                                                  Employee Id
                                                </td>
                                                <td className='px-4 py-2'>
                                                  {
                                                    selectedFaculty.registrationNumber
                                                  }
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className='w-1/4 px-4 py-2 font-semibold'>
                                                  Date Of Birth
                                                </td>
                                                <td className='px-4 py-2'>
                                                  {selectedFaculty.dob}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className='w-1/4 px-4 py-2 font-semibold'>
                                                  Designation
                                                </td>
                                                <td className='px-4 py-2'>
                                                  {selectedFaculty.designation}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className='w-1/4 px-4 py-2 font-semibold'>
                                                  Joining Year
                                                </td>
                                                <td className='px-4 py-2'>
                                                  {selectedFaculty.joiningYear}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className='w-1/4 px-4 py-2 font-semibold'>
                                                  Department
                                                </td>
                                                <td className='px-4 py-2'>
                                                  {selectedFaculty.department}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className='w-1/4 px-4 py-2 font-semibold'>
                                                  Gender
                                                </td>
                                                <td className='px-4 py-2'>
                                                  {selectedFaculty.gender
                                                    ? selectedFaculty.gender
                                                    : "NA"}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className='w-1/4 px-4 py-2 font-semibold'>
                                                  Contact Number
                                                </td>
                                                <td className='px-4 py-2'>
                                                  {selectedFaculty.facultyMobileNumber
                                                    ? selectedFaculty.facultyMobileNumber
                                                    : "NA"}
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    )}
                                    <div className='modal-action'>
                                      <form method='dialog'>
                                        <button className='btn'>Close</button>
                                      </form>
                                    </div>
                                  </div>
                                </dialog>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
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

export default AdminGetAllFaculties;
