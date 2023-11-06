import React from "react";

const Anouncments = () => {
  return (
    <>
      <div className='flex lg:flex-row flex-col h-[80vh] bg-slate-100 lg:px-36 px-4 justify-between pt-14'>
        <div className='w-full'>
          <div className='flex flex-col space-y-4'>
            <h1 className='text-3xl text-black font-bold'>Announcements</h1>
            <div className='bg-red-600 w-20 h-[7px] rounded-md'></div>
          </div>
          <div></div>
        </div>
        <div className='w-full'>
          <div className='flex flex-col space-y-4'>
            <h1 className='text-3xl text-black font-bold'>News & Events</h1>
            <div className='bg-red-600 w-20 h-[7px] rounded-md'></div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Anouncments;
