import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { facultyUpdatePassword } from "../redux/action/facultyAction";

const FacultyUpdatePassword = () => {
  const store = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    if (store.error) {
      setError(store.error);
    }
  }, [store.error]);
  const formHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(
      facultyUpdatePassword({
        registrationNumber: store.faculty.faculty.faculty.registrationNumber,
        oldPassword,
        newPassword,
        confirmNewPassword,
      })
    );
  };
  useEffect(() => {}, [store.faculty]);

  return (
    <>
      <div>
        {store.faculty.isAuthenticated ? (
          <>
            <div className='mx-auto mt-5 px-3 min-h-[80vh]'>
              <div className='flex justify-center items-center'>
                <div className='sm:w-full lg:w-1/3 bg-slate-100 px-4 py-4 rounded-sm'>
                  <form noValidate onSubmit={formHandler}>
                    <div className='mb-4'>
                      <label htmlFor='emailId' className='block text-gray-700'>
                        Old Password
                      </label>
                      <input
                        onChange={(e) => setOldPassword(e.target.value)}
                        type='password'
                        value={oldPassword}
                        className='form-input w-full px-2 py-2 mt-2'
                        id='emailId'
                      />
                      {error.oldPassword && (
                        <div className='text-red-500'>{error.oldPassword}</div>
                      )}
                    </div>
                    <div className='mb-4'>
                      <label
                        htmlFor='passwordId'
                        className='block text-gray-700'
                      >
                        New Password
                      </label>
                      <input
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
                        className='form-input w-full px-2 py-2 mt-2'
                        type='password'
                        id='passwordId'
                      />
                      {error.newPassword && (
                        <div className='text-red-500'>{error.newPassword}</div>
                      )}
                    </div>
                    <div className='mb-4'>
                      <label
                        htmlFor='passwordCId'
                        className='block text-gray-700'
                      >
                        Confirm New Password
                      </label>
                      <input
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        value={confirmNewPassword}
                        className='form-input w-full px-2 py-2 mt-2'
                        type='password'
                        id='passwordCId'
                      />
                      {error.confirmNewPassword && (
                        <div className='text-red-500'>
                          {error.confirmNewPassword}
                        </div>
                      )}
                    </div>
                    <button
                      type='submit'
                      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4'
                    >
                      Update Password
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

export default FacultyUpdatePassword;
