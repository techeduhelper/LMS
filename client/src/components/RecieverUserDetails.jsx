import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getStudentByRegName } from "../redux/action/studentAction";

const RecieverUserDetails = (props) => {
  const store = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { registrationNumber } = useParams();

  useEffect(() => {
    if (registrationNumber) {
      dispatch(getStudentByRegName(registrationNumber));
    }
  }, [registrationNumber, dispatch]);

  return (
    <div className='bg-gray-800'>
      {store.student.isAuthenticated ? (
        <>
          <div className='mx-auto pt-6'>
            <div className='flex'>
              <div className='w-1/12'></div>
              <div className='lg:w-8/12 w-full px-2 mx-auto text-white'>
                <div className='flex lg:flex-row flex-col lg:gap-2'>
                  <div className='lg:w-1/2 w-full'>
                    <div className='card lg:max-w-xs mx-auto'>
                      <img
                        className='card-img-top rounded-md'
                        src={store.student.regNumStudent.avatar}
                        alt='Progfile image'
                      />
                      <div className='card-body w-full flex'>
                        <h5 className='text-center font-semibold text-2xl'>
                          {store.student.regNumStudent.name}
                        </h5>
                        <Link
                          to={`/student/chat/${store.student.regNumStudent?.registrationNumber}.${store.student.student.student?.registrationNumber}`}
                          className='bg-green-500 text-white py-3 px-4 rounded inline-block mt-2 font-semibold w-full text-center'
                        >
                          CHAT NOW
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className='w-full mb-4'>
                    <table className='table border'>
                      <tbody>
                        <tr>
                          <td className=' text-lg'>Name</td>
                          <td className='font-semibold text-lg'>
                            {store.student.regNumStudent.name}
                          </td>
                        </tr>
                        <tr>
                          <td>Email</td>
                          <td className='font-semibold'>
                            {store.student.regNumStudent.email}
                          </td>
                        </tr>
                        <tr>
                          <td>Registration Number</td>
                          <td>
                            {store.student.regNumStudent.registrationNumber}
                          </td>
                        </tr>
                        <tr>
                          <td>Year</td>
                          <td>{store.student.regNumStudent.year}</td>
                        </tr>
                        <tr>
                          <td>Department</td>
                          <td>{store.student.regNumStudent.department}</td>
                        </tr>
                        <tr>
                          <td>Section</td>
                          <td>{store.student.regNumStudent.section}</td>
                        </tr>
                        <tr>
                          <td>Batch</td>
                          <td>{store.student.regNumStudent.batch}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className='w-1/12'></div>
            </div>
          </div>
        </>
      ) : (
        navigate("/")
      )}
    </div>
  );
};

export default RecieverUserDetails;
