import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminAddStudent } from "../redux/action/adminAction";

const AdminAddStudent = () => {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [studentMobileNumber, setContactNumber] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [fatherMobileNumber, setFatherContactNumber] = useState("");
  const [aadharCard, setAadharCard] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (store.error) {
      setError(store.error);
      setIsLoading(false);
    }
  }, [store.error]);

  const formHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);

    dispatch(
      adminAddStudent({
        name,
        email,
        year,
        department,
        fatherName,
        aadharCard,
        gender,
        section: section.toUpperCase(),
        dob: dob.split("-").reverse().join("-"),
        studentMobileNumber,
        fatherMobileNumber,
      })
    ).then(() => {
      setName("");
      setEmail("");
      setYear("");
      setDepartment("");
      setSection("");
      setDob("");
      setGender("");
      setContactNumber("");
      setFatherName("");
      setFatherContactNumber("");
      setAadharCard("");
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (store.admin.adminAddStudentFlag) {
      setError({});
      setIsLoading(false);
    }
  }, [store.admin.adminAddStudentFlag]);

  useEffect(() => {
    if (store.error || store.admin.adminAddStudentFlag) {
      setIsLoading(false);
      setError(store.error);
    }
  }, [store.error, store.admin.adminAddStudentFlag]);

  return (
    <>
      {store.admin.isAuthenticated ? (
        <div className='bg-gray-900 py-5 mt-1 min-h-screen'>
          <h1 className='text-center text-2xl bg-white mx-8 rounded-full py-1 font-bold'>
            Add Student
          </h1>
          <div className='mx-auto mt-5 lg:px-8 px-4'>
            <div className='flex justify-center gap-4 w-full'>
              <div className='w-full flex justify-center items-center'>
                <form
                  noValidate
                  onSubmit={formHandler}
                  className='bg-gray-100 p-6 shadow-md rounded-lg w-full h-full'
                >
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-20 w-full'>
                    <div className='col w-full'>
                      <div className='mb-4 w-full'>
                        <label htmlFor='nameId' className='block text-gray-700'>
                          Student Name
                        </label>
                        <input
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          type='text'
                          className={`form-input w-full py-2 border-2 rounded-md mt-1 px-2 ${
                            error.name ? "border-red-500" : ""
                          }`}
                          id='nameId'
                        />
                        {error.name && (
                          <p className='text-red-500 mt-2'>{error.name}</p>
                        )}
                      </div>
                      <div className='mb-4'>
                        <label
                          htmlFor='emailId'
                          className='block text-gray-700'
                        >
                          Email
                        </label>
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          type='email'
                          className={`form-input w-full py-2 border-2 rounded-md mt-1 px-2 ${
                            error.email ? "border-red-500" : ""
                          }`}
                          id='emailId'
                        />
                        {error.email && (
                          <p className='text-red-500 mt-2'>{error.email}</p>
                        )}
                      </div>
                      <div className='mb-4'>
                        <label
                          htmlFor='departmentId'
                          className='block text-gray-700'
                        >
                          Department
                        </label>
                        <select
                          onChange={(e) => setDepartment(e.target.value)}
                          value={department}
                          className={`form-select w-full py-2 border-2 rounded-md mt-1 px-2 ${
                            error.department ? "border-red-500" : ""
                          }`}
                          id='departmentId'
                        >
                          <option value=''>Select</option>
                          <option value='E.C.E'>E.C.E</option>
                          <option value='C.S.E'>C.S.E</option>
                          <option value='I.T'>I.T</option>
                          <option value='E.E.E'>E.E.E</option>
                          <option value='Mechanical'>Mechanical</option>
                          <option value='Civil'>Civil</option>
                        </select>
                        {error.department && (
                          <p className='text-red-500 mt-2'>
                            {error.department}
                          </p>
                        )}
                      </div>
                      <div className='mb-4'>
                        <label htmlFor='yearId' className='block text-gray-700'>
                          Year
                        </label>
                        <select
                          onChange={(e) => setYear(e.target.value)}
                          value={year}
                          className={`form-select w-full py-2 border-2 rounded-md mt-1 px-2 ${
                            error.year ? "border-red-500" : ""
                          }`}
                          id='yearId'
                        >
                          <option value=''>Select</option>
                          <option value='1'>1</option>
                          <option value='2'>2</option>
                          <option value='3'>3</option>
                          <option value='4'>4</option>
                        </select>
                        {error.year && (
                          <p className='text-red-500 mt-2'>{error.year}</p>
                        )}
                      </div>
                      <div className='mb-4'>
                        <label
                          htmlFor='sectionId'
                          className='block text-gray-700'
                        >
                          Section
                        </label>
                        <input
                          onChange={(e) => setSection(e.target.value)}
                          value={section}
                          type='text'
                          className={`form-input  w-full py-2 border-2 rounded-md mt-1 px-2 ${
                            error.section ? "border-red-500" : ""
                          }`}
                          id='sectionId'
                        />
                        {error.section && (
                          <p className='text-red-500 mt-2'>{error.section}</p>
                        )}
                      </div>
                      <div className='mb-4'>
                        <label htmlFor='dobId' className='block text-gray-700'>
                          DOB
                        </label>
                        <input
                          onChange={(e) => setDob(e.target.value)}
                          value={dob}
                          type='date'
                          className={`form-input w-full py-2 border-2 rounded-md mt-1 px-2 ${
                            error.dob ? "border-red-500" : ""
                          }`}
                          id='dobId'
                        />
                        {error.dob && (
                          <p className='text-red-500 mt-2'>{error.dob}</p>
                        )}
                      </div>
                    </div>
                    <div className='col'>
                      <div className='mb-4'>
                        <label
                          htmlFor='genderId'
                          className='block text-gray-700'
                        >
                          Gender
                        </label>
                        <select
                          onChange={(e) => setGender(e.target.value)}
                          value={gender}
                          className='form-select w-full py-2 border-2 rounded-md mt-1 px-2'
                          id='genderId'
                        >
                          <option value=''>Select</option>
                          <option value='Male'>Male</option>
                          <option value='Female'>Female</option>
                          <option value='Other'>Other</option>
                        </select>
                      </div>
                      <div className='mb-4'>
                        <label
                          htmlFor='numberId'
                          className='block text-gray-700'
                        >
                          Contact Number
                        </label>
                        <input
                          onChange={(e) => setContactNumber(e.target.value)}
                          value={studentMobileNumber}
                          required
                          type='number'
                          className='form-input w-full py-2 border-2 rounded-md mt-1 px-2'
                          id='numberId'
                        />
                      </div>
                      <div className='mb-4'>
                        <label
                          htmlFor='fatherId'
                          className='block text-gray-700'
                        >
                          Father Name
                        </label>
                        <input
                          onChange={(e) => setFatherName(e.target.value)}
                          value={fatherName}
                          type='text'
                          className='form-input w-full py-2 border-2 rounded-md mt-1 px-2'
                          id='fatherId'
                        />
                      </div>
                      <div className='mb-4'>
                        <label
                          htmlFor='fathercnId'
                          className='block text-gray-700'
                        >
                          Father Contact Number
                        </label>
                        <input
                          onChange={(e) =>
                            setFatherContactNumber(e.target.value)
                          }
                          value={fatherMobileNumber}
                          type='number'
                          className='form-input w-full py-2 border-2 rounded-md mt-1 px-2'
                          id='fathercnId'
                        />
                      </div>
                      <div className='mb-4'>
                        <label
                          htmlFor='aadharId'
                          className='block text-gray-700'
                        >
                          Aadhar Card Number
                        </label>
                        <input
                          onChange={(e) => setAadharCard(e.target.value)}
                          value={aadharCard}
                          type='number'
                          className='form-input w-full py-2 border-2 rounded-md mt-1 px-2'
                          id='aadharId'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center justify-center mt-4 mb-4 '>
                    <button
                      type='submit'
                      className='bg-green-500 py-2 w-1/3 rounded-full text-white font-bold'
                    >
                      {isLoading ? "Please wait.." : "Add Student"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
};

export default AdminAddStudent;
