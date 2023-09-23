import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { adminGetAllStudent } from "../redux/action/adminAction";
import { useNavigate } from "react-router-dom";
import { AiFillPrinter } from "react-icons/ai";

const AdminGetAllStudent = () => {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const formHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(adminGetAllStudent({ department, year }));
  };

  useEffect(() => {
    if (store.admin.allStudent.length !== 0) {
      setIsLoading(false);
    }
    setIsLoading(false);
  }, [store.admin.allStudent.length]);

  useEffect(() => {
    if (store.error || store.admin.allStudent) {
      setError({});
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [store.error, store.admin.allStudent]);

  const handlePrintClick = () => {
    const printWindow = window.open("", "_blank");
    const contentToPrint = document.getElementById("student-details");
    if (contentToPrint) {
      printWindow.document.write(`
      <html>
        <head>
          <title>All Faculties</title>
        </head>
        <body>
        <h1 class="fcal">Faculties</h1>
          ${contentToPrint.innerHTML}
        </body>
      </html>
    `);
      printWindow.print();
      printWindow.close();
    } else {
      console.error("Element with ID 'contentToPrint' not found.");
    }
  };

  return (
    <>
      <div>
        {store.admin.isAuthenticated ? (
          <>
            <div className="lg:container mx-auto mt-5 p-4">
              <div className="lg:flex gap-4">
                <div className="lg:w-1/3 ">
                  <form
                    noValidate
                    onSubmit={formHandler}
                    className="bg-gray-200 p-4 shadow-md rounded-lg"
                  >
                    <div className="mb-4">
                      <label
                        htmlFor="departmentId"
                        className="block text-gray-700 font-semibold"
                      >
                        Department
                      </label>
                      <select
                        onChange={(e) => setDepartment(e.target.value)}
                        className="form-select w-full py-2 px-2"
                        id="departmentId"
                      >
                        <option>Select</option>
                        <option value="E.C.E">E.C.E</option>
                        <option value="C.S.E">C.S.E</option>
                        <option value="I.T">I.T</option>
                        <option value="E.E.E">E.E.E</option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="Civil">Civil</option>
                      </select>
                      {error.department && (
                        <div className="text-red-500">{error.department}</div>
                      )}
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="yearId"
                        className="block text-gray-700 font-semibold"
                      >
                        Year
                      </label>
                      <select
                        onChange={(e) => setYear(e.target.value)}
                        className="form-select w-full py-2 px-2"
                        id="yearId"
                      >
                        <option>Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                      {error.year && (
                        <div className="text-red-500">{error.year}</div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full w-full"
                    >
                      {isLoading ? "Searching.." : "Search"}
                    </button>
                  </form>
                </div>
                <div className="lg:w-2/3 mt-4 lg:mt-0">
                  {store.admin.allStudent.length !== 0 && (
                    <>
                      <div className="w-full flex justify-end px-3 mb-2 text-gray-600 ">
                        <AiFillPrinter
                          size={40}
                          className="hover:bg-slate-200 hover:rounded-full p-1 active:bg-slate-100"
                          onClick={handlePrintClick}
                        />
                      </div>
                      <div id="student-details">
                        <table className="table-auto bg-white p-4 shadow-md rounded-lg w-full ">
                          <thead className="bg-blue-500 text-white">
                            <tr>
                              <th scope="col" className="px-4 py-2">
                                S.No
                              </th>
                              <th scope="col" className="px-4 py-2">
                                Registration Number
                              </th>
                              <th scope="col" className="px-4 py-2">
                                Name
                              </th>
                              <th scope="col" className="px-4 py-2">
                                Email
                              </th>
                              <th scope="col" className="px-4 py-2">
                                Section
                              </th>
                              <th scope="col" className="px-4 py-2">
                                Department
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-gray-100 font-medium text-gray-600">
                            {store.admin.allStudent.map((res, index) => (
                              <tr
                                key={index}
                                className={`${
                                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                }`}
                              >
                                <td className="border px-4 py-2">
                                  {index + 1}
                                </td>
                                <td className="border px-4 py-2">
                                  {res.registrationNumber}
                                </td>
                                <td className="border px-4 py-2">{res.name}</td>
                                <td className="border px-4 py-2">
                                  {res.email}
                                </td>
                                <td className="border px-4 py-2">
                                  {res.section}
                                </td>
                                <td className="border px-4 py-2">
                                  {res.department}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
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

export default AdminGetAllStudent;
