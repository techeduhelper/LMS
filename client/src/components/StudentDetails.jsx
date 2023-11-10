import React, { useState } from "react";
import { useSelector } from "react-redux";
import { newerChats, previousChats } from "../redux/action/studentAction";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const StudentDetails = () => {
  const store = useSelector((store) => store);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const filterStudentHelper = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios({
        method: "Post",
        url: "http://localhost:8080/api/student/getAllStudents",
        data: {
          department,
          year,
          section,
        },
      });
      setResult(data.result);
      setIsLoading(false);
    } catch (err) {
      toast.error("Error in fetching Students");
      setIsLoading(false);
    }
  };

  const filterByNameHelper = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios({
        method: "Post",
        url: "http://localhost:8080/api/student/getStudentByName",
        data: {
          name,
        },
      });
      setResult(data.result);
      setIsLoading(false);
    } catch (err) {
      toast.error("Error in fetching Students");
      setIsLoading(false);
    }
  };

  const formHandler = (e) => {
    e.preventDefault();
    if (name) {
      filterByNameHelper();
    } else {
      filterStudentHelper();
    }
  };

  return (
    <>
      <>
        {store.student.isAuthenticated ? (
          <>
            <div>
              {result.length === 0 && (
                <div className='mt-2 flex sm:flex-col lg:flex-row px-4 gap-2'>
                  <div className='lg:w-1/4 sm:w-full border mb-4 md:mb-0 px-2 py-2'>
                    <div className='mb-3'>
                      <form>
                        <div className='mb-2'>
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Search Students by their name'
                            type='text'
                            className='w-full px-3 py-2 border rounded focus:outline-none'
                          />
                        </div>
                      </form>
                    </div>
                    <h1 className='text-center my-2 bg-slate-600 mx-40 py-1 rounded-full text-white font-semibold'>
                      OR
                    </h1>
                    <div className='md:border-t'>
                      <form noValidate>
                        <div className='mb-2'>
                          <label htmlFor='branchId'>Branch</label>
                          <select
                            onChange={(e) => setDepartment(e.target.value)}
                            className='w-full px-3 py-2 border rounded focus:outline-none'
                            id='branchId'
                          >
                            <option>Select</option>
                            <option value='E.C.E'>E.C.E</option>
                            <option value='E.E.E'>E.E.E</option>
                            <option value='Mechanical'>Mechanical</option>
                            <option value='Civil'>Civil</option>
                            <option value='I.T'>I.T</option>
                            <option value='C.S.E'>C.S.E</option>
                          </select>
                        </div>
                        <div className='mb-2'>
                          <label htmlFor='yearId'>Year</label>
                          <select
                            onChange={(e) => setYear(e.target.value)}
                            className='w-full px-3 py-2 border rounded focus:outline-none'
                            id='yearId'
                          >
                            <option>Select</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                          </select>
                        </div>
                        <div className='mb-2'>
                          <label htmlFor='sectionId'>Section</label>
                          <select
                            onChange={(e) => setSection(e.target.value)}
                            className='w-full px-3 py-2 border rounded focus:outline-none'
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
                        </div>
                        <button
                          onClick={formHandler}
                          className='w-full px-3 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none'
                        >
                          {isLoading ? "Searching.." : "Search"}
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className='md:w-3/4 border ml-0 mt-4 md:mt-0'>
                    <div className='flex lg:flex-row sm:flex-col sm:gap-5 lg:gap-0'>
                      <div className='md:w-1/2 border-b'>
                        <h4 className='text-center text-lg font-semibold p-3 bg-gray-200'>
                          New Chats
                        </h4>
                        <table className='table'>
                          <tbody>
                            {store.student.newerChats.map((res, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{res.senderName}</td>
                                <td>
                                  <Link
                                    to={`/student/${res.senderRegistrationNumber}`}
                                  >
                                    Explore
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className='md:w-1/2'>
                        <h4 className='text-center text-lg font-semibold p-3 bg-gray-200'>
                          Recents Chats
                        </h4>
                        <table className='table bg-slate-200 my-3'>
                          <tbody className='px-3 text-base'>
                            {store.student.previousChats.map((res, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{res.receiverName}</td>
                                <td className='text-right'>
                                  <Link
                                    className='btn'
                                    to={`/student/${res.receiverRegistrationNumber}`}
                                  >
                                    See the Message
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {result.length !== 0 && (
                <div className='mt-4 md:w-1/2 mx-auto bg-slate-200 px-2 py-2'>
                  <table className='table w-full bg-slate-100'>
                    <thead className='bg-slate-400'>
                      <tr>
                        <th scope='col' className='text-left py-2 px-2'>
                          S.No
                        </th>
                        <th scope='col' className='text-center'>
                          Registration Number
                        </th>
                        <th scope='col' className='text-center'>
                          Name
                        </th>
                        <th scope='col' className='text-center'>
                          Chat
                        </th>
                      </tr>
                    </thead>
                    <tbody className='text-center'>
                      {result.map((obj, index) => (
                        <tr key={index}>
                          <td className='text-left px-2 py-2'>{index + 1}</td>
                          <td>{obj.registrationNumber}</td>
                          <td>{obj.name}</td>
                          <td>
                            <Link
                              to={`/student/${obj.registrationNumber}`}
                              className='px-3 font-medium py-1 bg-green-600 rounded-full text-white'
                            >
                              Chat Now
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : (
          navigate("/")
        )}
      </>
    </>
  );
};

export default StudentDetails;
