import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAttendence } from "../redux/action/studentAction";
import { useNavigate } from "react-router-dom";

const StudentAttendence = () => {
  const store = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const studentId = store.student.student.student._id;
  useEffect(() => {
    dispatch(fetchAttendence(studentId));
  }, []);

  return (
    <>
      {store.student.isAuthenticated ? (
        <>
          <div className='pt-6 min-h-screen bg-gray-800 text-white'>
            <div className=''>
              <div className='w-full lg:px-6 lg:overflow-hidden sm:overflow-x-auto'>
                <table className='table border w-full'>
                  <thead>
                    <tr className='text-[1rem] text-white'>
                      <th scope='col' className='px-4 py-2'>
                        S.No
                      </th>
                      <th scope='col' className='px-4 py-2'>
                        Subject Code
                      </th>
                      <th scope='col' className='px-4 py-2'>
                        Subject Name
                      </th>
                      <th scope='col' className='px-4 py-2'>
                        Maximum Hours
                      </th>
                      <th scope='col' className='px-4 py-2'>
                        Present Hours
                      </th>
                      <th scope='col' className='px-4 py-2'>
                        Absent Hours
                      </th>
                      <th scope='col' className='px-4 py-2'>
                        Total Hours
                      </th>
                      <th scope='col' className='px-4 py-2'>
                        Attendance
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {store.student.attendence.map((res, index) => (
                      <tr key={index}>
                        <td className='px-4 py-2'>{index + 1}</td>
                        <td className='px-4 py-2'>{res.subjectCode}</td>
                        <td className='px-4 py-2'>{res.subjectName}</td>
                        <td className='px-4 py-2'>{res.maxHours}</td>
                        <td className='px-4 py-2'>{res.lectureAttended}</td>
                        <td className='px-4 py-2'>{res.absentHours}</td>
                        <td className='px-4 py-2'>
                          {res.totalLecturesByFaculty}
                        </td>
                        <td className='px-4 py-2'>{res.attendence}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

export default StudentAttendence;
