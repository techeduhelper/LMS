import React from "react";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { BiLogoFacebook } from "react-icons/bi";

const Header2 = () => {
  return (
    <div className='py-2 px-28 md:flex flex-column items-center justify-center md:justify-between space-y-2 lg:space-y-0 bg-[#7f3a3e] text-white'>
      <div className='flex items-center justify-center md:justify-start space-x-6'>
        <BiLogoFacebook
          size={24}
          className='cursor-pointer hover:bg-gray-200 hover:p-1 hover:rounded-full transition-all'
        />
        <BsTwitter
          size={24}
          className='cursor-pointer hover:bg-gray-200 hover:p-1 hover:rounded-full transition-all'
        />
        <BsInstagram
          size={24}
          className='cursor-pointer hover:bg-gray-200 hover:p-1 hover:rounded-full transition-all'
        />
      </div>
      <div className='hidden lg:flex-row items-center text-center space-x-6 font-semibold space-y-2 lg:space-y-0 lg:flex'>
        <p>Email: admission@seacomengineering.org</p>
        <div className='lg:w-[4px] w-[20px] bg-white lg:h-4 h-1'></div>
        <p className='text-[0.9rem]'>Contact: 7605050242 / 7605050243</p>
      </div>
    </div>
  );
};

export default Header2;
