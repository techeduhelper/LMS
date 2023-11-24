import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { adminGetAllStudent } from "../redux/action/adminAction";
import { useNavigate, Link } from "react-router-dom";
import { AiFillPrinter } from "react-icons/ai";

const AdminGetAllStudent = () => {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState(null);

  const formHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(adminGetAllStudent({ department, year }));
  };

  useEffect(() => {
    if (store.admin.allStudent.length !== 0) {
      setIsLoading(false);
    }
    setIsLoading(false);
  }, [store.admin.allStudent.length]);

  useEffect(() => {
    if (store.error || store.admin.allStudent) {
      setError({});
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [store.error, store.admin.allStudent]);

  const handlePrintClick = () => {
    const printWindow = window.open("", "_blank");
    const contentToPrint = document.getElementById("student-details");
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

  // for particullar Student
  const handleViewClick = (res) => {
    setSelectedStudent(res);
    document.getElementById("my_modal_1").showModal();
  };

  return (
    <>
      <div>
        {store.admin.isAuthenticated ? (
          <>
            <div className='mx-auto mt-1 bg-gray-900 py-5 p-4 min-h-screen'>
              <div className='lg:flex gap-4'>
                <div className='lg:w-1/3 '>
                  <form
                    noValidate
                    onSubmit={formHandler}
                    className='bg-gray-200 p-4 shadow-md rounded-lg'
                  >
                    <div className='mb-4'>
                      <label
                        htmlFor='departmentId'
                        className='block text-gray-700 font-semibold'
                      >
                        Department
                      </label>
                      <select
                        onChange={(e) => setDepartment(e.target.value)}
                        className='form-select w-full py-2 px-2'
                        id='departmentId'
                      >
                        <option>Select</option>
                        <option value='E.C.E'>E.C.E</option>
                        <option value='C.S.E'>C.S.E</option>
                        <option value='I.T'>I.T</option>
                        <option value='E.E.E'>E.E.E</option>
                        <option value='Mechanical'>Mechanical</option>
                        <option value='Civil'>Civil</option>
                      </select>
                      {error.department && (
                        <div className='text-red-500'>{error.department}</div>
                      )}
                    </div>
                    <div className='mb-4'>
                      <label
                        htmlFor='yearId'
                        className='block text-gray-700 font-semibold'
                      >
                        Year
                      </label>
                      <select
                        onChange={(e) => setYear(e.target.value)}
                        className='form-select w-full py-2 px-2'
                        id='yearId'
                      >
                        <option>Select</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                      </select>
                      {error.year && (
                        <div className='text-red-500'>{error.year}</div>
                      )}
                    </div>

                    <button
                      type='submit'
                      className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full w-full'
                    >
                      {isLoading ? "Searching.." : "Search"}
                    </button>
                  </form>
                </div>
                <div className='lg:w-2/3 mt-4 lg:mt-0'>
                  {store.admin.allStudent.length !== 0 && (
                    <>
                      <div className='w-full flex justify-end px-3 mb-2 text-gray-600 '>
                        <AiFillPrinter
                          size={40}
                          className='hover:bg-slate-200 hover:rounded-full p-1 active:bg-slate-100'
                          onClick={handlePrintClick}
                        />
                      </div>
                      <div
                        id='student-details'
                        className='lg:overflow-hidden sm:overflow-x-auto'
                      >
                        <table className='table-auto bg-white p-4 shadow-md rounded-lg w-full '>
                          <thead className='bg-blue-500 text-white'>
                            <tr>
                              <th scope='col' className='px-4 py-2'>
                                S.No
                              </th>
                              <th scope='col' className='px-4 py-2'>
                                Registration Number
                              </th>
                              <th scope='col' className='px-4 py-2'>
                                Name
                              </th>
                              <th scope='col' className='px-4 py-2'>
                                Email
                              </th>
                              <th scope='col' className='px-4 py-2'>
                                Section
                              </th>
                              <th scope='col' className='px-4 py-2'>
                                Department
                              </th>
                              <th scope='col' className='px-4 py-2'>
                                Details
                              </th>
                            </tr>
                          </thead>
                          <tbody className='bg-gray-100 font-medium text-gray-600'>
                            {store.admin.allStudent.map((res, index) => (
                              <tr
                                key={index}
                                className={`${
                                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
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
                                  {res.section}
                                </td>
                                <td className='border px-4 py-2'>
                                  {res.department}
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
                                  className='modal w-[80%]'
                                >
                                  <div className='modal-box max-w-[80%]'>
                                    {selectedStudent && (
                                      <div className='grid grid-cols-1 lg:grid-cols-3 sm:gap-4 w-full'>
                                        <div className='lg:col-span-1 sm:w-full'>
                                          <div className='w-full'>
                                            <div className='bg-white rounded-lg flex flex-col justify-center items-center w-full'>
                                              <img
                                                className='w-full h-[28rem] px-2'
                                                src={selectedStudent.avatar}
                                                alt='Faculty Avatar'
                                              />
                                              <div className='flex flex-col justify-center items-center py-4'>
                                                <h5 className='text-xl font-bold mb-2'>
                                                  {selectedStudent.name}
                                                </h5>
                                                <h5 className='text-xl font-bold mb-2'>
                                                  {
                                                    selectedStudent.registrationNumber
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
                                                  {selectedStudent.name}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className='w-1/4 px-4 py-2 font-semibold'>
                                                  Email
                                                </td>
                                                <td className='px-4 py-2'>
                                                  {selectedStudent.email}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className='w-1/4 px-4 py-2 font-semibold'>
                                                  Student Id
                                                </td>
                                                <td className='px-4 py-2'>
                                                  {
                                                    selectedStudent.registrationNumber
                                                  }
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className='w-1/4 px-4 py-2 font-semibold'>
                                                  Date Of Birth
                                                </td>
                                                <td className='px-4 py-2'>
                                                  {selectedStudent.dob}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className='w-1/4 px-4 py-2 font-semibold'>
                                                  Year
                                                </td>
                                                <td className='px-4 py-2'>
                                                  {selectedStudent.year}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className='w-1/4 px-4 py-2 font-semibold'>
                                                  Section
                                                </td>
                                                <td className='px-4 py-2'>
                                                  {selectedStudent.section}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className='w-1/4 px-4 py-2 font-semibold'>
                                                  Batch
                                                </td>
                                                <td className='px-4 py-2'>
                                                  {selectedStudent.batch}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className='w-1/4 px-4 py-2 font-semibold'>
                                                  Department
                                                </td>
                                                <td className='px-4 py-2'>
                                                  {selectedStudent.department}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className='w-1/4 px-4 py-2 font-semibold'>
                                                  Gender
                                                </td>
                                                <td className='px-4 py-2'>
                                                  {selectedStudent.gender
                                                    ? selectedStudent.gender
                                                    : "NA"}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className='w-1/4 px-4 py-2 font-semibold'>
                                                  Adhaar Card No.
                                                </td>
                                                <td className='px-4 py-2'>
                                                  {selectedStudent.aadharCard
                                                    ? selectedStudent.aadharCard
                                                    : "NA"}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className='w-1/4 px-4 py-2 font-semibold'>
                                                  Father's Name
                                                </td>
                                                <td className='px-4 py-2'>
                                                  {selectedStudent.fatherName
                                                    ? selectedStudent.fatherName
                                                    : "NA"}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className='w-1/4 px-4 py-2 font-semibold'>
                                                  House Contact No.
                                                </td>
                                                <td className='px-4 py-2'>
                                                  {selectedStudent.fatherMobileNumber
                                                    ? selectedStudent.fatherMobileNumber
                                                    : "NA"}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className='w-1/4 px-4 py-2 font-semibold'>
                                                  Contact No.
                                                </td>
                                                <td className='px-4 py-2'>
                                                  {selectedStudent.studentMobileNumber
                                                    ? selectedStudent.studentMobileNumber
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

export default AdminGetAllStudent;
