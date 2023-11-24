import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminAddSubject } from "../redux/action/adminAction";

const AdminAddSubject = () => {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [totalLectures, setTotalLectures] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (store.error) {
      setError(store.error);
    }
  }, [store.error]);
  const formHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(
      adminAddSubject({
        subjectCode,
        subjectName,
        totalLectures,
        department,
        year,
      })
    );
  };

  useEffect(() => {
    if (store.admin.adminAddSubjectFlag) {
      setError({});
      setIsLoading(false);
      setDepartment("");
      setSubjectCode("");
      setSubjectName("");
      setTotalLectures("");
      setYear("");
    }
  }, [store.admin.adminAddSubjectFlag]);

  useEffect(() => {
    if (store.error || store.admin.adminAddSubjectFlag) {
      setIsLoading(false);
    }
  }, [store.error, store.admin.adminAddSubjectFlag]);
  return (
    <>
      <div>
        {store.admin.isAuthenticated ? (
          <>
            <div className='mt-1 bg-gray-900 min-h-screen py-5'>
              <div className='flex justify-center'>
                <div className='w-full lg:w-1/2'>
                  <form
                    noValidate
                    onSubmit={formHandler}
                    className='bg-gray-100 shadow-md rounded-lg px-8 py-4 w-full '
                  >
                    <div className='mb-4'>
                      <label
                        htmlFor='snameId'
                        className='block text-gray-700 font-semibold mb-2'
                      >
                        Subject Name
                      </label>
                      <input
                        onChange={(e) => setSubjectName(e.target.value)}
                        type='text'
                        className='form-input w-full py-2 rounded-md pl-2 border'
                        id='snameId'
                      />
                      {error.subjectName && (
                        <div className='text-red-500'>{error.subjectName}</div>
                      )}
                    </div>
                    <div className='mb-4'>
                      <label
                        htmlFor='scodeId'
                        className='block text-gray-700 font-semibold'
                      >
                        Subject Code
                      </label>
                      <input
                        onChange={(e) => setSubjectCode(e.target.value)}
                        type='text'
                        className='form-input w-full py-2 rounded-md pl-2 border'
                        id='scodeId'
                      />
                      {error.subjectCode && (
                        <div className='text-red-500'>{error.subjectCode}</div>
                      )}
                    </div>
                    <div className='mb-4'>
                      <label
                        htmlFor='totalLectures'
                        className='block text-gray-700 font-semibold'
                      >
                        Total Lectures
                      </label>
                      <input
                        onChange={(e) => setTotalLectures(e.target.value)}
                        type='number'
                        className='form-input w-full py-2 rounded-md pl-2 border'
                        id='totalLectures'
                      />
                      {error.totalLectures && (
                        <div className='text-red-500'>
                          {error.totalLectures}
                        </div>
                      )}
                    </div>
                    <div className='mb-4'>
                      <label
                        htmlFor='departmentId'
                        className='block text-gray-700 font-semibold'
                      >
                        Department
                      </label>
                      <select
                        onChange={(e) => setDepartment(e.target.value)}
                        className='form-select w-full py-2 rounded-md pl-2 border'
                        id='departmentId'
                      >
                        <option>Select</option>
                        <option value='E.C.E'>E.C.E</option>
                        <option value='E.E.E'>E.E.E</option>
                        <option value='C.S.E'>C.S.E</option>
                        <option value='I.T'>I.T</option>
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
                        className='form-select w-full py-2 rounded-md pl-2 border'
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
                      {isLoading ? "Please wait" : " Add Subject"}
                    </button>
                  </form>
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

export default AdminAddSubject;
