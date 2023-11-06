import React from "react";
import img1 from "../assets/sec4.jpg";
import img2 from "../assets/sec1.jpg";

const Carosel = () => {
  return (
    <>
      <div className='carousel w-full h-[40vh] lg:h-[80vh]'>
        <div id='item1' className='carousel-item w-full'>
          <img src={img2} className='w-full' />
        </div>
        <div id='item2' className='carousel-item w-full'>
          <img src={img1} className='w-full' />
        </div>
      </div>
      <div className='flex justify-center w-full py-2 gap-2'>
        <a href='#item1' className='btn btn-xs'>
          1
        </a>
        <a href='#item2' className='btn btn-xs'>
          2
        </a>
      </div>
    </>
  );
};

export default Carosel;
