import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import { adminAddFaculty } from "../redux/action/adminAction";

const AdminAddFaculty = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [facultyMobileNUmber, setFacultyMobileNumber] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
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
      adminAddFaculty({
        name,
        email,
        designation,
        facultyMobileNUmber,
        department,
        aadharCard,
        gender,
        dob: dob.split("-").reverse().join("-"),
      })
    ).then(() => {
      setName("");
      setEmail("");
      setDepartment("");
      setDesignation("");
      setFacultyMobileNumber("");
      setDob("");
      setGender("");
      setAadharCard("");
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (store.admin.adminAddFacultyFlag) {
      setError({});
      setIsLoading(false);
    }
  }, [store.admin.adminAddFacultyFlag]);

  useEffect(() => {
    if (store.error || store.admin.adminAddFacultyFlag) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [store.error, store.admin.adminAddFacultyFlag]);

  return (
    <>
      <div>
        {store.admin.isAuthenticated ? (
          <>
            <div className='mt-1 py-5 bg-gray-900 min-h-screen'>
              <div className='w-full lg:px-10 sm:px-2'>
                <h1 className='text-center text-3xl font-bold text-gray-500 bg-slate-200 py-3 rounded-md'>
                  Add Faculty Here
                </h1>
                <form
                  noValidate
                  onSubmit={formHandler}
                  className='bg-gray-200 shadow-md rounded-md px-8 pt-6 pb-8 mb-4 mt-5 w-full flex flex-col justify-center'
                >
                  <div className='grid lg:grid-cols-2 sm:grid-cols-1 gap-10 w-full'>
                    <div className='w-full'>
                      <div className='mb-4'>
                        <label
                          htmlFor='nameId'
                          className='block text-gray-700 text-sm font-bold mb-2'
                        >
                          Faculty Name
                        </label>
                        <input
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          type='text'
                          className={classnames(
                            "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                            {
                              "border-red-500": error.name,
                            }
                          )}
                          id='nameId'
                        />
                        {error.name && (
                          <p className='text-red-500 text-xs italic'>
                            {error.name}
                          </p>
                        )}
                      </div>
                      <div className='mb-4'>
                        <label
                          htmlFor='emailId'
                          className='block text-gray-700 text-sm font-bold mb-2'
                        >
                          Email
                        </label>
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          type='email'
                          className={classnames(
                            "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                            {
                              "border-red-500": error.email,
                            }
                          )}
                          id='emailId'
                        />
                        {error.email && (
                          <p className='text-red-500 text-xs italic'>
                            {error.email}
                          </p>
                        )}
                      </div>
                      <div className='mb-4'>
                        <label
                          htmlFor='designationId'
                          className='block text-gray-700 text-sm font-bold mb-2'
                        >
                          Designation
                        </label>
                        <select
                          onChange={(e) => setDesignation(e.target.value)}
                          value={designation}
                          className={classnames(
                            "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                            {
                              "border-red-500": error.designation,
                            }
                          )}
                          id='designationId'
                        >
                          <option>Select</option>
                          <option value='Assistant Professor'>
                            Assistant Professor
                          </option>
                          <option value='Senior Professor'>
                            Senior Professor
                          </option>
                        </select>
                        {error.designation && (
                          <p className='text-red-500 text-xs italic'>
                            {error.designation}
                          </p>
                        )}
                      </div>
                      <div className='mb-4'>
                        <label
                          htmlFor='departmentId'
                          className='block text-gray-700 text-sm font-bold mb-2'
                        >
                          Department
                        </label>
                        <select
                          onChange={(e) => setDepartment(e.target.value)}
                          value={department}
                          className={classnames(
                            "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                            {
                              "border-red-500": error.department,
                            }
                          )}
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
                    </div>
                    <div>
                      <div className='mb-4'>
                        <label
                          htmlFor='dobId'
                          className='block text-gray-700 text-sm font-bold mb-2'
                        >
                          DOB
                        </label>
                        <input
                          onChange={(e) => setDob(e.target.value)}
                          value={dob}
                          type='date'
                          className={classnames(
                            "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                            {
                              "border-red-500": error.dob,
                            }
                          )}
                          id='dobId'
                        />
                        {error.dob && (
                          <p className='text-red-500 text-xs italic'>
                            {error.dob}
                          </p>
                        )}
                      </div>
                      <div className='mb-4'>
                        <label
                          htmlFor='genderId'
                          className='block text-gray-700 text-sm font-bold mb-2'
                        >
                          Gender
                        </label>
                        <select
                          onChange={(e) => setGender(e.target.value)}
                          value={gender}
                          className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          id='genderId'
                        >
                          <option>Select</option>
                          <option value='Male'>Male</option>
                          <option value='Female'>Female</option>
                          <option value='Other'>Other</option>
                        </select>
                      </div>
                      <div className='mb-4'>
                        <label
                          htmlFor='numberId'
                          className='block text-gray-700 text-sm font-bold mb-2'
                        >
                          Contact Number
                        </label>
                        <input
                          onChange={(e) =>
                            setFacultyMobileNumber(e.target.value)
                          }
                          value={facultyMobileNUmber}
                          type='number'
                          className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          id='numberId'
                        />
                      </div>
                      <div className='mb-4'>
                        <label
                          htmlFor='aadharId'
                          className='block text-gray-700 text-sm font-bold mb-2'
                        >
                          Aadhar Card Number
                        </label>
                        <input
                          onChange={(e) => setAadharCard(e.target.value)}
                          value={aadharCard}
                          type='number'
                          className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          id='aadharId'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='w-full flex justify-center items-center mt-5'>
                    <button
                      type='submit'
                      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-2/5'
                    >
                      {isLoading ? "Please Wait.." : "Add Faculty"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        ) : (
          history.push("/")
        )}
      </div>
    </>
  );
};

export default AdminAddFaculty;
