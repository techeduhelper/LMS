import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const store = useSelector((store) => store);

  const navigate = useNavigate();
  return (
    <>
      <div>
        {store.admin.isAuthenticated ? (
          <>
            <div className='profile mx-auto mt-1 bg-gray-900 py-5 min-h-screen'>
              <div className=' flex flex-col lg:flex-row  justify-center'>
                <div className='sm:w-full lg:w-1/3 px-4 mb-8'>
                  <div className='bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                    <img
                      className='card-img-top w-full mx-auto'
                      src={store.admin.admin.avatar}
                      alt='Card image cap'
                    />
                    <div className='text-center'>
                      <h5 className='text-3xl font-semibold mt-2 text-gray-800'>
                        {store.admin.admin.name}
                      </h5>
                      <h5 className='font-medium'>
                        {store.admin.admin.registrationNumber}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className='w-full lg:w-2/3 px-4'>
                  <h1 className='text-center mb-4 text-3xl font-bold text-gray-500 bg-slate-200 py-3 rounded-md'>
                    Welcome to Mr. {store.admin.admin.name} (Admin)
                  </h1>
                  <div className='bg-slate-100 shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                    <table className='table-auto w-full'>
                      <tbody>
                        <tr>
                          <td className='px-4 py-2'>Name</td>
                          <td className='px-4 py-2'>
                            {store.admin.admin.name}
                          </td>
                        </tr>
                        <tr>
                          <td className='px-4 py-2'>Email</td>
                          <td className='px-4 py-2'>
                            {store.admin.admin.email}
                          </td>
                        </tr>
                        <tr>
                          <td className='px-4 py-2'>Registration Number</td>
                          <td className='px-4 py-2'>
                            {store.admin.admin.registrationNumber}
                          </td>
                        </tr>
                        <tr>
                          <td className='px-4 py-2'>Joining Year</td>
                          <td className='px-4 py-2'>
                            {store.admin.admin.joiningYear}
                          </td>
                        </tr>
                        <tr>
                          <td className='px-4 py-2'>Department</td>
                          <td className='px-4 py-2'>
                            {store.admin.admin.department}
                          </td>
                        </tr>
                        <tr>
                          <td className='px-4 py-2'>Contact Number</td>
                          <td className='px-4 py-2'>
                            {store.admin.admin.contactNumber || "NA"}
                          </td>
                        </tr>
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
      </div>
    </>
  );
};

export default AdminProfile;
