import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStudents,
  markAttendence,
  updateFetchedStudentsHelper,
} from "../redux/action/facultyAction";
import { Navigate, useNavigate } from "react-router-dom";

const FacultyMarkAttendence = () => {
  const store = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [checkedValue, setCheckedValue] = useState([]);
  const [error, setError] = useState({});
  const [flag, setFlag] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const handleInputChange = (e) => {
    const tempCheck = checkedValue;
    let index;
    if (e.target.checked) {
      tempCheck.push(e.target.value);
    } else {
      index = tempCheck.indexOf(e.target.value);
      tempCheck.splice(index, 1);
    }
    setCheckedValue(tempCheck);
  };

  useEffect(() => {
    if (store.error) {
      setError(store.error);
      setIsLoading(false);
    }
  }, [store.error]);

  const formHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(fetchStudents(department, year, section));
  };

  useEffect(() => {
    if (store.error || !store.faculty.fetchedStudentsHelper) {
      setIsLoading(false);
    }
  }, [store.error, store.faculty.fetchedStudentsHelper]);

  const secondFormHandler = (e) => {
    e.preventDefault();
    setIsLoading2(true);
    dispatch(
      markAttendence(checkedValue, subjectCode, department, year, section)
    );
    setCheckedValue([]);
  };

  useEffect(() => {
    if (store.faculty.fetchedStudentsHelper) {
      setIsLoading2(false);
    }
  }, [store.faculty.fetchedStudentsHelper]);

  // For all check check box
  const handleSelectAllChange = (e) => {
    const checkboxes = document.querySelectorAll(".student-checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = e.target.checked;
    });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    dispatch(updateFetchedStudentsHelper(false));
  };

  return (
    <>
      <div>
        {store?.faculty?.isAuthenticated ? (
          <>
            {store.faculty.fetchedStudentsHelper && (
              <div className='flex justify-center items-center mt-6 min-h-[80vh]'>
                <div className='sm:w-full lg:w-3/5 px-4'>
                  <h1 className='text-gray-500 bg-slate-200 py-2 text-center text-2xl font-semibold rounded-md mb-4'>
                    Mark Attendance
                  </h1>
                  <form noValidate onSubmit={formHandler}>
                    <div className='mb-4'>
                      <label
                        htmlFor='branchId'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Department
                      </label>
                      <select
                        onChange={(e) => setDepartment(e.target.value)}
                        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        id='branchId'
                      >
                        <option>Select</option>
                        <option
                          value={store.faculty.faculty.faculty.department}
                        >
                          {store.faculty.faculty.faculty.department}
                        </option>
                      </select>
                      {error.department && (
                        <p className='mt-2 text-sm text-red-500'>
                          {error.department}
                        </p>
                      )}
                    </div>
                    <div className='mb-4'>
                      <label
                        htmlFor='yearId'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Year
                      </label>
                      <select
                        onChange={(e) => setYear(e.target.value)}
                        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        id='yearId'
                      >
                        <option>Select</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                      </select>
                      {error.year && (
                        <p className='mt-2 text-sm text-red-500'>
                          {error.year}
                        </p>
                      )}
                    </div>
                    <div className='mb-4'>
                      <label
                        htmlFor='sectionId'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Section
                      </label>
                      <select
                        onChange={(e) => setSection(e.target.value)}
                        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        id='sectionId'
                      >
                        <option>Select</option>
                        <option value='A'>A</option>
                        <option value='B'>B</option>
                        <option value='C'>C</option>
                        <option value='D'>D</option>
                        <option value='E'>E</option>
                        <option value='F'>F</option>
                      </select>
                      {error.section && (
                        <p className='mt-2 text-sm text-red-500'>
                          {error.section}
                        </p>
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
              </div>
            )}

            {!store.faculty.fetchedStudentsHelper && (
              <div className='flex justify-center items-center mt-4 min-h-[80vh]'>
                <div className='w-full max-w-2xl px-2'>
                  <form onSubmit={secondFormHandler}>
                    <div className='mb-4'>
                      <label
                        htmlFor='subjectId'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Subject Code
                      </label>
                      <select
                        required
                        onChange={(e) => setSubjectCode(e.target.value)}
                        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        id='subjectId'
                      >
                        <option>Select</option>
                        {store.faculty.allSubjectCodeList.map(
                          (subjectCodeName) => (
                            <option key={subjectCodeName}>
                              {subjectCodeName}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                    <table className='w-full flex flex-col'>
                      <thead className='flex'>
                        <tr className='w-full flex px-2 justify-between mb-3 p-2'>
                          <td>
                            <div className='form-check'>
                              <input
                                className='form-check-input'
                                type='checkbox'
                                value=''
                                id='defaultCheck1'
                                onChange={handleSelectAllChange}
                              />
                            </div>
                          </td>
                          <th>Registration Number</th>
                          <th>Student Name</th>
                        </tr>
                      </thead>
                      <tbody className='px-2'>
                        {store.faculty.fetchedStudents.map((obj, index) => (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0
                                ? "bg-gray-100 flex justify-between w-full p-2"
                                : "bg-gray-200 flex justify-between w-full p-2"
                            }
                          >
                            <td>
                              <div className='form-check'>
                                <input
                                  className='student-checkbox form-check-input'
                                  type='checkbox'
                                  value={obj._id}
                                  onChange={handleInputChange}
                                  id={`studentCheckbox${index}`}
                                />
                              </div>
                            </td>
                            <td>{obj.registrationNumber}</td>
                            <td>{obj.name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className='flex justify-center'>
                      <div className='col-md-1'>
                        {isLoading2 && (
                          <div
                            className='spinner-border text-primary'
                            role='status'
                          >
                            <span className='sr-only'>Loading...</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {!isLoading2 && (
                      <button
                        type='submit'
                        className='w-full bg-indigo-600 py-2 px-4 mt-4 rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      >
                        Submit
                      </button>
                    )}
                    <button onClick={handleCancel}>Cancel</button>
                  </form>
                </div>
              </div>
            )}
          </>
        ) : (
          <Navigate to={"/faculty-login"} />
        )}
      </div>
    </>
  );
};

export default FacultyMarkAttendence;
