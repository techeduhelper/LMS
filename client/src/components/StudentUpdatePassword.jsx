import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import {
  studentLogout,
  studentUpdatePassword,
} from "../redux/action/studentAction";

const StudentUpdatePassword = () => {
  const store = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (store.errorHelper) {
      setError(store.errorHelper);
      setIsLoading(false);
    }
  }, [store.errorHelper]);

  const formHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(
      studentUpdatePassword({
        registrationNumber: store.student.student.student.registrationNumber,
        oldPassword,
        newPassword,
        confirmNewPassword,
      })
    );
  };

  return (
    <>
      <div className='bg-gray-800'>
        {store.student.isAuthenticated ? (
          <>
            <div className='min-h-screen '>
              <div className='flex justify-center items-center h-[80vh]'>
                <form
                  noValidate
                  onSubmit={formHandler}
                  className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96'
                >
                  <div className='mb-4'>
                    <label
                      htmlFor='emailId'
                      className='block text-gray-700 text-sm font-bold mb-2'
                    >
                      Old Password
                    </label>
                    <input
                      onChange={(e) => setOldPassword(e.target.value)}
                      value={oldPassword}
                      className={classnames(
                        "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                        {
                          "border-red-500": error.oldPassword,
                        }
                      )}
                      id='emailId'
                      type='password'
                    />
                    {error.oldPassword && (
                      <p className='text-red-500 text-xs italic'>
                        {error.oldPassword}
                      </p>
                    )}
                  </div>
                  <div className='mb-4'>
                    <label
                      htmlFor='passwordId'
                      className='block text-gray-700 text-sm font-bold mb-2'
                    >
                      New Password
                    </label>
                    <input
                      onChange={(e) => setNewPassword(e.target.value)}
                      value={newPassword}
                      className={classnames(
                        "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                        {
                          "border-red-500": error.newPassword,
                        }
                      )}
                      id='passwordId'
                      type='password'
                    />
                    {error.newPassword && (
                      <p className='text-red-500 text-xs italic'>
                        {error.newPassword}
                      </p>
                    )}
                  </div>
                  <div className='mb-4'>
                    <label
                      htmlFor='passwordCId'
                      className='block text-gray-700 text-sm font-bold mb-2'
                    >
                      Confirm New Password
                    </label>
                    <input
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      value={confirmNewPassword}
                      className={classnames(
                        "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                        {
                          "border-red-500": error.confirmNewPassword,
                        }
                      )}
                      id='passwordCId'
                      type='password'
                    />
                    {error.confirmNewPassword && (
                      <p className='text-red-500 text-xs italic'>
                        {error.confirmNewPassword}
                      </p>
                    )}
                  </div>
                  <div>
                    <button
                      type='submit'
                      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline '
                    >
                      Update Password
                    </button>
                  </div>
                </form>
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

export default StudentUpdatePassword;
