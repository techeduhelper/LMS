import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { facultyUpdate, facultyLogout } from "../redux/action/facultyAction";

const FacultyUpdateProfile = () => {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [gender, setGender] = useState("");
  const [facultyMobileNumber, setContactNumber] = useState("");
  const [aadharCard, setAadharCard] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const imagehandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setAvatar(img);
    }
  };

  const formHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("gender", gender);
    formData.append("facultyMobileNumber", facultyMobileNumber);
    formData.append("aadharCard", aadharCard);
    formData.append("avatar", avatar);
    formData.append("email", store.faculty.faculty.faculty.email);
    setIsLoading(true);
    dispatch(facultyUpdate(formData, navigate));
    alert("Kindly login again to see updates");
    dispatch(facultyLogout());
    navigate("/faculty-login");
  };

  useEffect(() => {
    if (store.faculty.updateProfileFlag) {
      setIsLoading(false);
    }
  }, [store.faculty.updateProfileFlag]);

  return (
    <>
      <div>
        {store.faculty.isAuthenticated ? (
          <>
            <div className='sm:px-3 mt-4 min-h-[80vh]'>
              <div className='flex justify-center'>
                <div className='w-full md:w-2/3'>
                  <h1 className='text-center py-2 bg-slate-300 mb-4 rounded-md text-2xl text-gray-600 font-semibold'>
                    Update Your Profile
                  </h1>
                  <form
                    onSubmit={formHandler}
                    className='bg-gray-50 shadow-md rounded px-8 pt-6 pb-8 mb-4'
                  >
                    <div className='mb-4'>
                      <label
                        htmlFor='inputId'
                        className='block text-gray-700 text-sm font-bold mb-2'
                      >
                        Profile Picture
                      </label>
                      <input
                        required
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white'
                        type='file'
                        accept='.jpg,.png,.jpeg'
                        id='inputId'
                        onChange={imagehandler}
                      />
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
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
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
                        onChange={(e) => setContactNumber(e.target.value)}
                        required
                        type='number'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
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
                        type='number'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='aadharId'
                      />
                    </div>
                    <div className='flex justify-center'>
                      <div className='col-md-1'>
                        {isLoading && (
                          <div
                            className='spinner-border text-primary'
                            role='status'
                          >
                            <span className='sr-only'>Loading...</span>
                          </div>
                        )}
                      </div>
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
                          Update
                        </button>
                      )}
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

export default FacultyUpdateProfile;
