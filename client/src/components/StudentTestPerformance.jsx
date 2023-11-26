import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMarks } from "../redux/action/studentAction";
import { useNavigate } from "react-router-dom";
import { ImSad } from "react-icons/im";

const StudentTestPerformance = () => {
  const store = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getMarks());
    setIsLoading(false);
  }, []);
  return (
    <>
      {store.student.isAuthenticated ? (
        <div className='bg-gray-800 pb-6'>
          {isLoading ? (
            <div>
              <h1>Searching...</h1>
            </div>
          ) : (
            <div className='min-h-screen px-4'>
              {Object.values(store.student.allMarks).some(
                (marksArray) => marksArray.length > 0
              ) ? (
                <div>
                  {store.student.allMarks.CA1 && (
                    <div>
                      <div className='mx-auto'>
                        {store.student.allMarks.CA1.length !== 0 ? (
                          <>
                            <h4 className='text-xl font-semibold text-center py-2 text-white'>
                              CA-I
                            </h4>
                            <div className='overflow-x-auto'>
                              <table className='min-w-full divide-y divide-gray-200 text-center'>
                                <thead className='bg-gray-50'>
                                  <tr>
                                    <th
                                      scope='col'
                                      className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                      S.No
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                      Subject Code
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                      Subject Name
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                      Obtained Marks
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                      Total Marks
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                      Percentage
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-gray-200'>
                                  {store.student.allMarks.CA1.map(
                                    (res, index) => (
                                      <tr key={index}>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                          {index + 1}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                          {res.subject.subjectCode}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                          {res.subject.subjectName}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                          {res.marks}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                          {res.totalMarks}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                          {(
                                            (res.marks / res.totalMarks) *
                                            100
                                          ).toFixed(2)}
                                          %
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  )}

                  {store.student.allMarks.CA2 && (
                    <div className='mt-2'>
                      <div className='mx-auto'>
                        {store.student.allMarks.CA2.length !== 0 ? (
                          <>
                            <h4 className='text-xl font-semibold text-center py-2 text-white'>
                              CA-II
                            </h4>
                            <div className='overflow-x-auto'>
                              <table className='min-w-full divide-y divide-gray-200 text-center'>
                                <thead className='bg-gray-50'>
                                  <tr>
                                    <th
                                      scope='col'
                                      className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                      S.No
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                      Subject Code
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                      Subject Name
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                      Obtained Marks
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                      Total Marks
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                      Percentage
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-gray-200'>
                                  {store.student.allMarks.CA2.map(
                                    (res, index) => (
                                      <tr key={index}>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                          {index + 1}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                          {res.subject.subjectCode}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                          {res.subject.subjectName}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                          {res.marks}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                          {res.totalMarks}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                          {(
                                            (res.marks / res.totalMarks) *
                                            100
                                          ).toFixed(2)}
                                          %
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  )}

                  {store.student.allMarks.CA3 && (
                    <div className='mt-2'>
                      <div className='mx-auto'>
                        {store.student.allMarks.CA3.length !== 0 ? (
                          <>
                            <h4 className='text-xl font-semibold text-center py-2 text-white'>
                              CA-III
                            </h4>
                            <div className='overflow-x-auto'>
                              <table className='min-w-full divide-y divide-gray-200 text-center'>
                                <thead className='bg-gray-50'>
                                  <tr>
                                    <th
                                      scope='col'
                                      className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                      S.No
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                      Subject Code
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                      Subject Name
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                      Obtained Marks
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                      Total Marks
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                      Percentage
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-gray-200'>
                                  {store.student.allMarks.CA3.map(
                                    (res, index) => (
                                      <tr key={index}>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                          {index + 1}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                          {res.subject.subjectCode}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                          {res.subject.subjectName}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                          {res.marks}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                          {res.totalMarks}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                          {(
                                            (res.marks / res.totalMarks) *
                                            100
                                          ).toFixed(2)}
                                          %
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  )}

                  {store.student.allMarks.CA4 && (
                    <div className='mt-2'>
                      <div className='mx-auto'>
                        {store.student.allMarks.CA4.length !== 0 ? (
                          <>
                            <h4 className='text-xl font-semibold text-center py-2 text-white'>
                              CA-IV
                            </h4>
                            <div className='overflow-x-auto'>
                              <table className='min-w-full divide-y divide-gray-200 text-center'>
                                <thead className='bg-gray-100 '>
                                  <tr>
                                    <th
                                      scope='col'
                                      className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                      S.No
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                      Subject Code
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                      Subject Name
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                      Obtained Marks
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                      Total Marks
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                      Percentage
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-gray-200'>
                                  {store.student.allMarks.CA4.map(
                                    (res, index) => (
                                      <tr key={index}>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                          {index + 1}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                          {res.subject.subjectCode}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                          {res.subject.subjectName}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                          {res.marks}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                          {res.totalMarks}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                          {(
                                            (res.marks / res.totalMarks) *
                                            100
                                          ).toFixed(2)}
                                          %
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  )}

                  {store.student.allMarks.Semester && (
                    <div className='mt-2'>
                      <div className='mx-auto'>
                        {store.student.allMarks.Semester.length !== 0 ? (
                          <>
                            <h4 className='text-xl font-semibold text-center py-2 text-white'>
                              SEMESTER
                            </h4>
                            <div className='overflow-x-auto'>
                              <table className='min-w-full divide-y divide-gray-200 text-center'>
                                <thead className='bg-gray-50'>
                                  <tr>
                                    <th
                                      scope='col'
                                      className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                      S.No
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                      Subject Code
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                      Subject Name
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                      Obtained Marks
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                      Total Marks
                                    </th>
                                    <th
                                      scope='col'
                                      className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                      Percentage
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-gray-200'>
                                  {store.student.allMarks.Semester.map(
                                    (res, index) => (
                                      <tr key={index}>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                          {index + 1}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                          {res.subject.subjectCode}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                          {res.subject.subjectName}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                          {res.marks}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                          {res.totalMarks}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                          {(
                                            (res.marks / res.totalMarks) *
                                            100
                                          ).toFixed(2)}
                                          %
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className='pt-6 flex flex-col justify-center items-center'>
                  <h1 className='text-3xl text-center text-gray-400'>
                    Your marks is not assigned are all exams
                  </h1>
                  <ImSad size={80} className='text-gray-400 mt-5' />
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
};

export default StudentTestPerformance;
