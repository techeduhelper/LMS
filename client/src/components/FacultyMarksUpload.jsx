import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents, uploadMarks } from "../redux/action/facultyAction";
import { useNavigate } from "react-router-dom";

const FacultyMarksUpload = () => {
  const store = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [marks, setMarks] = useState([]);
  const [section, setSection] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [totalMarks, setTotalMarks] = useState();
  const [exam, setExam] = useState("");
  const [error, setError] = useState({});
  const [errorHelper, setErrorHelper] = useState({});
  const [isLoading, setIsLoading] = useState();

  const handleInputChange = (value, _id) => {
    const newMarks = [...marks];
    let index = newMarks.findIndex((m) => m._id === _id);
    if (index === -1) {
      newMarks.push({ _id, value });
    } else {
      newMarks[index].value = value;
    }
    setMarks(newMarks);
  };

  useEffect(() => {
    if (store.error) {
      setError(store.error);
      setIsLoading(false);
    }
  }, [store.error]);

  useEffect(() => {
    if (store.errorHelper) {
      setErrorHelper(store.errorHelper);
      setIsLoading(false);
    }
  }, [store.errorHelper]);

  const formHandlerMarks = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(fetchStudents(department, year, section));
  };

  const secondFormHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(
      uploadMarks(subjectCode, exam, totalMarks, marks, department, section)
    );
  };

  useEffect(() => {
    if (store.faculty.fetchedStudentsHelper.length !== 0) {
      setIsLoading(false);
    }
  }, [store.faculty.fetchedStudentsHelper]);

  return (
    <>
      <div>
        {store.faculty.isAuthenticated ? (
          <>
            {store.faculty.fetchedStudentsHelper && (
              <div className='flex justify-center items-center mt-4 px-3 min-h-[80vh]'>
                <div className='lg:w-2/4 sm:w-full rounded-md bg-slate-100 px-4 py-4'>
                  <h1 className='text-center bg-slate-300 py-2 text-2xl mb-4 font-semibold rounded-md text-gray-500'>
                    Upload Marks
                  </h1>
                  <form noValidate onSubmit={formHandlerMarks}>
                    <div className='mb-4'>
                      <label htmlFor='branchId' className='block text-gray-700'>
                        Department
                      </label>
                      <select
                        onChange={(e) => setDepartment(e.target.value)}
                        className='form-select w-full mt-2 px-2 py-2'
                        id='bramchId'
                      >
                        <option>Select</option>
                        <option
                          value={store.faculty.faculty.faculty.department}
                        >
                          {store.faculty.faculty.faculty.department}
                        </option>
                      </select>
                      {error.department && (
                        <div className='text-red-500'>{error.department}</div>
                      )}
                    </div>
                    <div className='mb-4'>
                      <label htmlFor='yearId' className='block text-gray-700'>
                        Year
                      </label>
                      <select
                        onChange={(e) => setYear(e.target.value)}
                        className='form-select w-full px-2 mt-2 py-2'
                        id='yearId'
                      >
                        <option>Select</option>
                        <option value='1'>1st Year</option>
                        <option value='2'>2nd Year</option>
                        <option value='3'>3rd Year</option>
                        <option value='4'>4th Year</option>
                      </select>
                      {error.year && (
                        <div className='text-red-500'>{error.year}</div>
                      )}
                    </div>
                    <div className='mb-4'>
                      <label
                        htmlFor='sectionId'
                        className='block text-gray-700'
                      >
                        Section
                      </label>
                      <select
                        onChange={(e) => setSection(e.target.value)}
                        className='form-select w-full px-2 py-2 mt-2'
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
                        <div className='text-red-500'>{error.section}</div>
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
              <div className='flex justify-center mt-4 px-3 mb-2'>
                <div className='lg:w-3/4 sm:w-full bg-slate-100 px-4 py-6'>
                  <form onSubmit={secondFormHandler}>
                    <div className='mb-4'>
                      <label
                        htmlFor='subjectId'
                        className='block text-gray-700'
                      >
                        Subject Code
                      </label>
                      <select
                        onChange={(e) => setSubjectCode(e.target.value)}
                        className='form-select w-full px-2 py-2 mt-2'
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
                      {errorHelper.subjectCode && (
                        <div className='text-red-500'>
                          {errorHelper.subjectCode}
                        </div>
                      )}
                    </div>
                    <div className='mb-4'>
                      <label htmlFor='examId' className='block text-gray-700'>
                        Exam
                      </label>
                      <select
                        onChange={(e) => setExam(e.target.value)}
                        value={exam}
                        className='form-select w-full px-2 py-2 mt-2'
                        id='examId'
                      >
                        <option>Select</option>
                        <option value='CA-I'>CA-I</option>
                        <option value='CA-II'>CA-II</option>
                        <option value='CA-III'>CA-III</option>
                        <option value='CA-IV'>CA-IV</option>
                        <option value='Semester'>SEMESTER</option>
                      </select>
                      {errorHelper.exam && (
                        <div className='text-red-500'>{errorHelper.exam}</div>
                      )}
                    </div>
                    <div className='mb-8'>
                      <label htmlFor='marksId' className='block text-gray-700'>
                        Total Marks
                      </label>
                      <input
                        type='number'
                        className='form-input py-2 px-2 mt-2'
                        id='marksId'
                        value={totalMarks}
                        onChange={(e) => setTotalMarks(e.target.value)}
                      />
                      {errorHelper.totalMarks && (
                        <div className='text-red-500'>
                          {errorHelper.totalMarks}
                        </div>
                      )}
                    </div>
                    <table className='table-auto w-full text-left'>
                      <thead>
                        <tr>
                          <th className='px-4 py-2'>Registration Number:</th>
                          <th className='px-4 py-2'>Student Name:</th>
                          <th className='px-4 py-2'>Marks:</th>
                        </tr>
                      </thead>
                      <tbody>
                        {store.faculty.fetchedStudents.map((obj, index) => (
                          <tr
                            key={index}
                            className={index % 2 === 0 ? "bg-gray-100" : ""}
                          >
                            <td className='px-4 py-2'>
                              {obj.registrationNumber}
                            </td>
                            <td className='px-4 py-2'>{obj.name}</td>
                            <td className='px-4 py-2'>
                              <input
                                className='form-input w-full px-2 py-2'
                                required
                                type='number'
                                value={obj.marks}
                                onChange={(e) =>
                                  handleInputChange(e.target.value, obj._id)
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button
                      type='submit'
                      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            )}
          </>
        ) : (
          navigate("/")
        )}
      </div>
    </>
  );
};

export default FacultyMarksUpload;
