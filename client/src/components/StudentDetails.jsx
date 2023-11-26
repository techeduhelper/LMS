import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { newerChats, previousChats } from "../redux/action/studentAction";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const StudentDetails = () => {
  const store = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = import.meta.env.VITE_URL;

  const filterStudentHelper = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios({
        method: "Post",
        url: `${url}/api/student/getAllStudents`,
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
        url: `${url}/api/student/getStudentByName`,
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

  useEffect(() => {
    const senderName = store.student.student.student.name;
    const receiverName = store.student.student.student.name;

    const fetchNewerChats = () => {
      dispatch(newerChats(receiverName));
    };

    const fetchPreviousChats = () => {
      dispatch(previousChats(senderName));
    };

    const fetchChats = () => {
      fetchNewerChats();
      fetchPreviousChats();
    };

    const interval = setInterval(fetchChats, 10000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const newChats = store.student?.newerChats || [];
  const prevChats = store.student?.previousChats || [];

  return (
    <>
      <>
        {store.student.isAuthenticated ? (
          <>
            <div className='min-h-screen bg-gray-800'>
              {result.length === 0 && (
                <div className='flex sm:flex-col lg:flex-row px-4 gap-2'>
                  <div className='lg:w-1/4 sm:w-full mb-2 md:mb-0 px-2 py-2'>
                    <div className='mb-3'>
                      <form>
                        <div className='mb-2'>
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Search Students by their name'
                            type='text'
                            className='w-full px-3 py-2 border rounded focus:outline-none'
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                formHandler(e);
                              }
                            }}
                          />
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
                                className='w-full px-3 py-2 rounded focus:outline-none'
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
                                className='w-full px-3 py-2 rounded focus:outline-none'
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
                                className='w-full px-3 py-2 rounded focus:outline-none'
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
                      </form>
                    </div>
                  </div>
                  <div className='lg:w-3/4 ml-0 md:mt-0 w-full'>
                    <div className='flex lg:flex-row sm:flex-col sm:gap-5 lg:gap-0 mt-2'>
                      <div className='lg:w-1/2 lg:px-2'>
                        <h4 className='text-center text-lg font-semibold p-3 bg-green-500 '>
                          New Chats
                        </h4>
                        <table className='table bg-slate-300 mt-4 rounded-md text-lg'>
                          <tbody>
                            {newChats?.map((res, index) => (
                              <tr
                                key={index}
                                className='flex justify-between items-center'
                              >
                                <td>{index + 1}</td>
                                <td>{res?.senderName}</td>
                                <td>
                                  <Link
                                    to={`/student/${res?.senderRegistrationNumber}`}
                                    className='btn'
                                  >
                                    See the Message
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className='lg:w-1/2'>
                        <h4 className='text-center text-lg font-semibold p-3 bg-gray-200'>
                          Older Chats
                        </h4>
                        <table className='table bg-slate-200 my-3'>
                          <tbody className='px-3 text-base'>
                            {prevChats?.map((res, index) => (
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
                <div className='md:w-2/3 mx-auto px-2 py-2'>
                  <table className='table w-full bg-slate-100 mt-2 rounded-none text-md'>
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
                        <th scope='col' className='text-right'>
                          Chat
                        </th>
                      </tr>
                    </thead>
                    <tbody className='text-center'>
                      {result.map((obj, index) => (
                        <tr key={index}>
                          <td className='text-left px-2 py-3'>{index + 1}</td>
                          <td>{obj.registrationNumber}</td>
                          <td>{obj.name}</td>
                          <td className='text-right'>
                            <Link
                              to={`/student/${obj.registrationNumber}`}
                              className='lg:px-3 px-2 font-medium py-2 bg-pink-600 rounded-full text-white'
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
