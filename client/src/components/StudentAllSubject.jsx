import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubjects } from "../redux/action/studentAction";
import { useNavigate } from "react-router-dom";

const StudentAllSubject = () => {
  const store = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSubjects());
  }, []);

  return (
    <>
      {store.student.isAuthenticated ? (
        <>
          <div className='sm:w-full min-h-screen bg-gray-800 pt-6'>
            <div>
              <div className='w-full mx-auto px-4'>
                <div className='text-white shadow-md lg:overflow-hidden sm:overflow-x-auto'>
                  <table className='min-w-full'>
                    <thead>
                      <tr className='bg-white text-black border-b'>
                        <th className='py-2 text-left pl-4'>S.No</th>
                        <th className='py-2'>Subject Code</th>
                        <th className='py-2'>Subject Name</th>
                        <th className='py-2'>Year</th>
                        <th className='py-2'>Total Lectures</th>
                      </tr>
                    </thead>
                    <tbody>
                      {store.student.allSubjects.map((res, index) => (
                        <tr key={index} className='border-b'>
                          <td className='py-2 pl-4'>{index + 1}</td>
                          <td className='py-2 text-center'>
                            {res.subjectCode}
                          </td>
                          <td className='py-2 text-center'>
                            {res.subjectName}
                          </td>
                          <td className='py-2 text-center'>{res.year}</td>
                          <td className='py-2 text-center'>
                            {res.totalLectures}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        navigate("/")
      )}
    </>
  );
};

export default StudentAllSubject;
