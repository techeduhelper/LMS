import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminGetAllSubject } from "../redux/action/adminAction";

const AdminGetAllSubject = () => {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(adminGetAllSubject({ department, year }));
  };

  useEffect(() => {
    if (store.admin.allSubject.length !== 0) {
      setIsLoading(false);
    }
  }, [store.admin.allSubject.length]);

  useEffect(() => {
    if (store.error || store.admin.allSubject) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [store.error, store.admin.allSubject]);

  return (
    <>
      <div>
        <div>
          {store.admin.isAuthenticated ? (
            <>
              <div className=' bg-gray-900 px-4 py-5 mt-1 min-h-screen'>
                <div className=' w-full'>
                  <div className='flex sm:flex-col lg:flex-row w-full gap-5'>
                    <div className='lg:w-1/3 sm:w-full bg-slate-300 px-4 py-2'>
                      <form noValidate onSubmit={formHandler}>
                        <div className='mb-4'>
                          <label
                            htmlFor='departmentId'
                            className='block text-gray-700'
                          >
                            Department
                          </label>
                          <select
                            onChange={(e) => setDepartment(e.target.value)}
                            className={`${
                              error.department
                                ? "border-red-500"
                                : "border-gray-300"
                            } mt-1 block w-full rounded-md shadow-sm focus:ring py-2 px-2 focus:ring-indigo-200 focus:outline-none sm:text-sm`}
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
                            <div className='text-red-500 mt-2 text-sm'>
                              {error.department}
                            </div>
                          )}
                        </div>
                        <div className='mb-4'>
                          <label
                            htmlFor='yearId'
                            className='block text-gray-700'
                          >
                            Year
                          </label>
                          <select
                            onChange={(e) => setYear(e.target.value)}
                            className={`${
                              error.year ? "border-red-500" : "border-gray-300"
                            } mt-1 block w-full rounded-md shadow-sm focus:ring py-2 px-2 focus:ring-indigo-200 focus:outline-none sm:text-sm`}
                            id='yearId'
                          >
                            <option>Select</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                          </select>
                          {error.year && (
                            <div className='text-red-500 mt-2 text-sm'>
                              {error.year}
                            </div>
                          )}
                        </div>
                        <div className='flex justify-center mb-4'>
                          <div className='mb-4'>
                            {isLoading && (
                              <div className='inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500'></div>
                            )}
                          </div>
                          {!isLoading && (
                            <button
                              type='submit'
                              className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-full focus:outline-none focus:ring focus:ring-blue-200 w-full'
                            >
                              Search
                            </button>
                          )}
                        </div>
                      </form>
                    </div>
                    <div className='lg:w-2/3 sm:w-full lg:overflow-hidden sm:overflow-x-auto'>
                      {store.admin.allSubject.length !== 0 && (
                        <table className='table-auto border-collapse border border-gray-400 w-full bg-gray-300'>
                          <thead>
                            <tr>
                              <th className='p-2 border'>S.No</th>
                              <th className='p-2 border'>Subject Code</th>
                              <th className='p-2 border'>Subject Name</th>
                              <th className='p-2 border'>Total Lectures</th>
                              <th className='p-2 border'>Department</th>
                            </tr>
                          </thead>
                          <tbody className='text-center bg-white'>
                            {store.admin.allSubject.map((res, index) => (
                              <tr key={index}>
                                <td className='p-2 border'>{index + 1}</td>
                                <td className='p-2 border'>
                                  {res.subjectCode}
                                </td>
                                <td className='p-2 border'>
                                  {res.subjectName}
                                </td>
                                <td className='p-2 border'>
                                  {res.totalLectures}
                                </td>
                                <td className='p-2 border'>{res.department}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            navigate("/")
          )}
        </div>
      </div>
    </>
  );
};

export default AdminGetAllSubject;
