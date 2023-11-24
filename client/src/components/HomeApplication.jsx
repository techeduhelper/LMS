import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const HomeApplication = () => {
  const url = import.meta.env.VITE_URL;
  const loginStart = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    course: "Select Option",
  });

  useEffect(() => {
    loginStart.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${url}/api/applications`, formData);
      toast.success("Application submitted successfully");
      setFormData({
        name: "",
        email: "",
        dob: "",
        course: "Select Option",
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const validateForm = () => {
    const { name, email, dob, course } = formData;
    if (!name || !email || !dob || !course) {
      alert("Please fill in all fields.");
      return false;
    }
    return true;
  };

  return (
    <div className='min-h-[90vh] flex items-center justify-center bg-slate-900'>
      <div className='bg-white p-8 rounded shadow-md lg:w-1/2 w-full px-6 mx-4 drop-shadow-2xl'>
        <div ref={loginStart} className='mb-4'></div>
        <h2 className='text-2xl font-bold mb-6 text-center'>
          College Admission Form
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-600'
            >
              Full Name:
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='mt-1 p-2 w-full border rounded-md'
              required
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-600'
            >
              Email:
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='mt-1 p-2 w-full border rounded-md'
              required
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='dob'
              className='block text-sm font-medium text-gray-600'
            >
              Date of Birth:
            </label>
            <input
              type='date'
              id='dob'
              name='dob'
              value={formData.dob}
              onChange={handleChange}
              className='mt-1 p-2 w-full border rounded-md'
              required
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='course'
              className='block text-sm font-medium text-gray-600'
            >
              Select Course:
            </label>
            <select
              id='course'
              name='course'
              value={formData.course}
              onChange={handleChange}
              className='mt-1 p-2 w-full border rounded-md'
              required
            >
              <option value='none'>Select option</option>
              <option value='Computer Science & Engineering'>
                Computer Science & Engineering
              </option>
              <option value='Mechanical Engineering'>
                Mechanical Engineering
              </option>
              <option value='Information Technology'>
                Information Technology
              </option>
              <option value='Civil Engineering'>Civil Engineering</option>
              <option value='Electrical Engineering'>
                Electrical Engineering
              </option>
            </select>
          </div>

          <button
            type='submit'
            className='bg-green-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600'
          >
            Apply Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomeApplication;
