import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMarks } from "../redux/action/studentAction";
import { useNavigate } from "react-router-dom";

const StudentTestPerformance = () => {
  const store = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMarks());
  }, []);

  return (
    <>
      {store.student.isAuthenticated ? (
        <>
          <div className="lg:container">
            {store.student.allMarks.CA1 && (
              <div className="mt-3">
                <div className="mx-auto">
                  {store.student.allMarks.CA1.length !== 0 ? (
                    <>
                      <h4 className="text-xl font-semibold">CA-I</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                S.No
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Subject Code
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Subject Name
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Obtained Marks
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Total Marks
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Percentage
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {store.student.allMarks.CA1.map((res, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {index + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {res.subject.subjectCode}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {res.subject.subjectName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {res.marks}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {res.totalMarks}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {((res.marks / res.totalMarks) * 100).toFixed(
                                    2
                                  )}
                                  %
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            )}

            {store.student.allMarks.CA2 && (
              <div className="mt-3">
                <div className="mx-auto">
                  {store.student.allMarks.CA2.length !== 0 ? (
                    <>
                      <h4 className="text-xl font-semibold">CA-II</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                S.No
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Subject Code
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Subject Name
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Obtained Marks
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Total Marks
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Percentage
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {store.student.allMarks.CA2.map((res, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {index + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {res.subject.subjectCode}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {res.subject.subjectName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {res.marks}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {res.totalMarks}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {((res.marks / res.totalMarks) * 100).toFixed(
                                    2
                                  )}
                                  %
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            )}

            {store.student.allMarks.CA3 && (
              <div className="mt-3">
                <div className="mx-auto">
                  {store.student.allMarks.CA3.length !== 0 ? (
                    <>
                      <h4 className="text-xl font-semibold">CA-III</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-center">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                S.No
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Subject Code
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Subject Name
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Obtained Marks
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Total Marks
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Percentage
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {store.student.allMarks.CA3.map((res, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {index + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {res.subject.subjectCode}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {res.subject.subjectName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {res.marks}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {res.totalMarks}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {((res.marks / res.totalMarks) * 100).toFixed(
                                    2
                                  )}
                                  %
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            )}

            {store.student.allMarks.CA4 && (
              <div className="mt-3 text-center">
                <div className="mx-auto">
                  {store.student.allMarks.CA4.length !== 0 ? (
                    <>
                      <h4 className="text-xl font-semibold">CA-IV</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-center">
                          <thead className="bg-gray-100 ">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                S.No
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Subject Code
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Subject Name
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Obtained Marks
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Total Marks
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Percentage
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {store.student.allMarks.CA4.map((res, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {index + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {res.subject.subjectCode}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {res.subject.subjectName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {res.marks}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {res.totalMarks}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {((res.marks / res.totalMarks) * 100).toFixed(
                                    2
                                  )}
                                  %
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            )}

            {store.student.allMarks.Semester && (
              <div className="mt-3 text-center">
                <div className="mx-auto">
                  {store.student.allMarks.Semester.length !== 0 ? (
                    <>
                      <h4 className="text-xl font-semibold">Semester</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-center">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                S.No
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Subject Code
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Subject Name
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Obtained Marks
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Total Marks
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Percentage
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {store.student.allMarks.Semester.map(
                              (res, index) => (
                                <tr key={index}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {index + 1}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {res.subject.subjectCode}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {res.subject.subjectName}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {res.marks}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {res.totalMarks}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
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
        </>
      ) : (
        navigate("/")
      )}
    </>
  );
};

export default StudentTestPerformance;
