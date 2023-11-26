import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { studentUpdate, studentLogout } from "../redux/action/studentAction";
import { useNavigate } from "react-router-dom";

const StudentUpdateProfile = () => {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [gender, setGender] = useState("");
  const [studentMobileNumber, setContactNumber] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [fatherMobileNumber, setFatherContactNumber] = useState("");
  const [aadharCard, setAadharCard] = useState("");
  const [error, setError] = useState({});
  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const imagehandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setAvatar(img);
    }
  };

  useEffect(() => {
    if (store.error) {
      setError(store.error);
      setIsLoading(false);
    }
  }, [store.error]);

  const formHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("gender", gender);
    formData.append("studentMobileNumber", studentMobileNumber);
    formData.append("fatherName", fatherName);
    formData.append("fatherMobileNumber", fatherMobileNumber);
    formData.append("aadharCard", aadharCard);
    formData.append("avatar", avatar);
    formData.append("email", store.student.student.student.email);
    dispatch(studentUpdate(formData, navigate));
    setModal(true);
    alert("Kindly login again to see updates");
    dispatch(studentLogout());
    navigate("/student-login");
  };

  return (
    <>
      <div className='bg-gray-800'>
        {store.student.isAuthenticated ? (
          <>
            <div className='min-h-screen'>
              <div className='flex justify-center'>
                <div className='w-full max-w-2xl pt-4 px-2'>
                  <form
                    onSubmit={formHandler}
                    className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
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
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
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
                        htmlFor='fatherId'
                        className='block text-gray-700 text-sm font-bold mb-2'
                      >
                        Father Name
                      </label>
                      <input
                        onChange={(e) => setFatherName(e.target.value)}
                        type='text'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='fatherId'
                      />
                    </div>
                    <div className='mb-4'>
                      <label
                        htmlFor='fathercnId'
                        className='block text-gray-700 text-sm font-bold mb-2'
                      >
                        Father Contact Number
                      </label>
                      <input
                        onChange={(e) => setFatherContactNumber(e.target.value)}
                        type='number'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='fathercnId'
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
                    <div className='flex items-center justify-between'>
                      <button
                        type='submit'
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                      >
                        {isLoading ? "Updating" : "Update"}
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

export default StudentUpdateProfile;
