import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { adminGetAllFaculty } from "../redux/action/adminAction";

const AdminGetAllFaculties = () => {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const [department, setDepartment] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(adminGetAllFaculty({ department }));
  };

  useEffect(() => {
    if (store.admin.allFaculty.length !== 0) {
      setIsLoading(false);
    }
  }, [store.admin.allFaculty.length]);

  return (
    <>
      <div>
        {store.admin.isAuthenticated ? (
          <>
            <div className="lg:container mx-auto mt-5">
              <div className="flex flex-col lg:flex-row sm:flex-col justify-center">
                <div className="w-full md:w-1/3 px-4 mb-8">
                  <form
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    noValidate
                    onSubmit={formHandler}
                  >
                    <div className="mb-4">
                      <label
                        htmlFor="departmentId"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Department
                      </label>
                      <select
                        onChange={(e) => setDepartment(e.target.value)}
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="departmentId"
                      >
                        <option>Select</option>
                        <option value="E.C.E">E.C.E</option>
                        <option value="C.S.E">C.S.E</option>
                        <option value="E.E.E">E.E.E</option>
                        <option value="I.T">I.T</option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="Civil">Civil</option>
                      </select>
                      {error.department && (
                        <p className="text-red-500 text-xs italic">
                          {error.department}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
                    >
                      {isLoading ? "Searching.." : "Search"}
                    </button>
                  </form>
                </div>
                <div className="w-full md:w-2/3 px-4">
                  {store.admin.allFaculty.length !== 0 && (
                    <table className="table-auto w-full border bg-slate-300 ">
                      <thead>
                        <tr>
                          <th className="border px-4 py-2">S.No</th>
                          <th className="border px-4 py-2">
                            Registration Number
                          </th>
                          <th className="border px-4 py-2">Name</th>
                          <th className="border px-4 py-2">Email</th>
                          <th className="border px-4 py-2">Joining Year</th>
                          <th className="border px-4 py-2"></th>
                        </tr>
                      </thead>
                      <tbody className="bg-white font-medium text-gray-600">
                        {store.admin.allFaculty.map((res, index) => (
                          <tr
                            key={index}
                            className={`${
                              index % 2 === 0
                                ? "bg-white hover:bg-gray-100"
                                : "bg-gray-50 hover:bg-slate-200"
                            }`}
                          >
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">
                              {res.registrationNumber}
                            </td>
                            <td className="border px-4 py-2">{res.name}</td>
                            <td className="border px-4 py-2">{res.email}</td>
                            <td className="border px-4 py-2">
                              {res.joiningYear}
                            </td>
                            <td className="border px-4 py-2">
                              <Link className="text-blue-600 hover:text-blue-800">
                                View
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default AdminGetAllFaculties;
