import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminAddAdmin } from "../redux/action/adminAction";

const AdminAddAdmin = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [dob, setDob] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (store.error) {
      setError(store.error);
    } else {
      setError({});
    }
  }, [store.error]);

  const formHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    dispatch(
      adminAddAdmin({
        name,
        email,
        department,
        contactNumber,
        dob: dob.split("-").reverse().join("/"),
      })
    ).then(() => {
      setName("");
      setEmail("");
      setDepartment("");
      setContactNumber("");
      setDob("");
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (store.admin.adminAddAdminFlag) {
      setError({});
      setIsLoading(false);
    }
  }, [store.admin.adminAddAdminFlag]);

  useEffect(() => {
    if (store.error || store.admin.adminAddAdminFlag) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [store.error, store.admin.adminAddAdminFlag]);

  return (
    <>
      <div>
        {store.admin.isAuthenticated ? (
          <>
            <div className='mx-auto mt-1 bg-gray-900 py-5 min-h-screen'>
              <div className='md:flex md:justify-center'>
                <div className='w-full lg:px-40 sm:px-4 '>
                  <h1 className='bg-gray-300 text-center py-2 text-2xl mb-2 rounded-md text-gray-600 font-semibold'>
                    Add Admin
                  </h1>
                  <form
                    noValidate
                    onSubmit={formHandler}
                    className='bg-gray-200 shadow-md rounded-lg p-6'
                  >
                    <div className='md:flex md:space-x-4'>
                      <div className='md:w-1/2'>
                        <div className='mb-4'>
                          <label
                            htmlFor='nameId'
                            className='block text-gray-700'
                          >
                            Admin Name
                          </label>
                          <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type='text'
                            className={`form-input w-full px-2 py-2 rounded-md mt-1 border-2 ${
                              error.message ? "border-red-500" : ""
                            }`}
                            id='nameId'
                          />
                          {error.message && (
                            <p className='text-red-500 mt-2'>{error.message}</p>
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
                            className={`form-input w-full px-2 py-2 rounded-md mt-1 border-2 ${
                              error.message ? "border-red-500" : ""
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
                            className={`form-select w-full px-2 py-2 rounded-md mt-1 border-2 ${
                              error.department ? "border-red-500" : ""
                            }`}
                            id='departmentId'
                          >
                            <option value=''>Select</option>
                            <option value='E.C.E'>E.C.E</option>
                            <option value='C.S.E'>C.S.E</option>
                            <option value='E.E.E'>E.E.E</option>
                            <option value='I.T'>I.T</option>
                            <option value='Mechanical'>Mechanical</option>
                            <option value='Civil'>Civil</option>
                          </select>
                          {error.department && (
                            <p className='text-red-500 mt-2'>
                              {error.department}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className='md:w-1/2'>
                        <div className='mb-4'>
                          <label
                            htmlFor='dobId'
                            className='block text-gray-700 pl-1'
                          >
                            D.O.B
                          </label>
                          <input
                            onChange={(e) => setDob(e.target.value)}
                            value={dob}
                            type='date'
                            className={`form-input w-full px-2 py-2 rounded-md mt-1 border-2 ${
                              error.dob ? "border-red-500" : ""
                            }`}
                            id='dobId'
                          />
                          {error.dob && (
                            <p className='text-red-500 mt-2'>{error.dob}</p>
                          )}
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
                            value={contactNumber}
                            type='number'
                            className={`form-input w-full px-2 py-2 rounded-md mt-1 border-2 ${
                              error.contactNumber ? "border-red-500" : ""
                            }`}
                            id='numberId'
                          />
                          {error.contactNumber && (
                            <p className='text-red-500 mt-2'>
                              {error.contactNumber}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className='flex justify-center mt-4'>
                      <button
                        type='submit'
                        className='bg-green-500 w-1/3 py-2 rounded-full shadow-md text-white font-bold'
                      >
                        {isLoading ? "Please wait.." : "Add Admin"}
                      </button>
                    </div>
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

export default AdminAddAdmin;
