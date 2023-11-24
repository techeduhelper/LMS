import PropTypes from "prop-types";
import React from "react";
import { MdOutlineMailOutline, MdCall } from "react-icons/md";
import { Link } from "react-router-dom";

const NavsItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About us",
    href: "/about-us",
  },
  {
    label: "Courses",
    href: "/courses",
  },
  {
    label: "Ask to AI",
    href: "/life-seacom",
  },
  {
    label: "Contact us",
    href: "/Contact-us",
  },
];

const courses = [
  {
    label: "Computer Science & Engineering",
    href: "/cse",
  },
  {
    label: "Information Technology",
    href: "/it",
  },
  {
    label: "Mechanical Engineering",
    href: "/me",
  },
  {
    label: "Civil Engineering",
    href: "/cse",
  },
  {
    label: "Electrical Engineering",
    href: "/cse",
  },
];

const CmsAreas = [
  {
    label: "Admin",
    href: "/admin-login",
  },
  {
    label: "Faculty",
    href: "/faculty-login",
  },
  {
    label: "Student",
    href: "/student-login",
  },
  {
    label: "Lectures",
    href: "/lectures",
  },
  {
    label: "Downloads",
    href: "/downloads",
  },
];

const Contacts = [
  {
    label: "7605050242 / 7605050243",
    photo: MdCall,
  },
  {
    label: "admission@seacomengineering.org",
    photo: MdOutlineMailOutline,
  },
  {
    label: " seacomengineering@rediffmail.com",
    photo: MdOutlineMailOutline,
  },
];

const Footer = () => {
  return (
    <footer className='bg-black w-full flex items-center lg:justify-center py-10'>
      <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4'>
        <div className='flex flex-col gap-2 font-medium px-4'>
          <div className='flex flex-col space-y-2 mb-4'>
            <h1 className='text-2xl text-white font-bold'>INFO</h1>
            <div className='bg-red-600 w-16 h-[5px] rounded-md'></div>
          </div>
          {NavsItems &&
            NavsItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className='text-white text-base active:text-yellow-400'
              >
                {item.label}
              </Link>
            ))}
        </div>
        <div>
          <div className='flex flex-col gap-2 font-medium px-4'>
            <div className='flex flex-col space-y-2 mb-4'>
              <h1 className='text-2xl text-white font-bold'>COURSES</h1>
              <div className='bg-red-600 w-16 h-[5px] rounded-md'></div>
            </div>
            {courses &&
              courses.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className='text-white text-base active:text-yellow-400'
                >
                  {item.label}
                </Link>
              ))}
          </div>
        </div>
        <div>
          <div className='flex flex-col gap-2 font-medium px-4'>
            <div className='flex flex-col space-y-2 mb-4'>
              <h1 className='text-2xl text-white font-bold'>LMS AREAS</h1>
              <div className='bg-red-600 w-16 h-[5px] rounded-md'></div>
            </div>
            {CmsAreas &&
              CmsAreas.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className='text-white text-base active:text-yellow-400'
                >
                  {item.label}
                </Link>
              ))}
          </div>
        </div>
        <div>
          <div className='flex flex-col gap-2 font-medium px-4'>
            <div className='flex flex-col space-y-2 mb-4'>
              <h1 className='text-2xl text-white font-bold'>CONTACTS</h1>
              <div className='bg-red-600 w-16 h-[5px] rounded-md'></div>
            </div>
            {Contacts &&
              Contacts.map((item, index) => (
                <div className='flex gap-2 items-center' key={index}>
                  <item.photo size={20} className='text-white' />
                  <h1 className='text-white text-base'>{item.label}</h1>
                </div>
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
