import React from "react";
import Carousel from "react-multi-carousel";
import cse from "../assets/cse.jpg";
import it from "../assets/it.jpg";
import me from "../assets/me.jpg";
import civil from "../assets/civil.jpg";
import ece from "../assets/ece.jpg";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const courses = [
  {
    label: "Computer Science & Engineering",
    duration: "4 Years",
    photo: cse,
    href: "/cse",
  },
  {
    label: "Information Technology",
    duration: "4 Years",
    photo: it,
    href: "/it",
  },
  {
    label: "Mechanical Engineering",
    duration: "4 Years",
    photo: me,
    href: "/me",
  },
  {
    label: "Civil Engineering",
    duration: "4 Years",
    photo: civil,
    href: "/cse",
  },
  {
    label: "Electrical Engineering",
    duration: "4 Years",
    photo: ece,
    href: "/cse",
  },
];

const HomeCourse = () => {
  return (
    <>
      <h1 className='lg:mt-10 mt-6 px-4 lg:px-40 text-3xl font-bold'>
        CURRENT <span className='text-red-600'>OFFERS</span>
      </h1>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition='all 1s'
        transitionDuration={500}
        containerClass='carousel-container'
        removeArrowOnDeviceType={[
          "tablet",
          "mobile",
          "desktop",
          "superLargeDesktop",
        ]}
        className='bg-white h-[50vh] lg:px-30 flex gap-10 lg:w-5/6 items-center mx-auto  '
      >
        {courses.map((course, index) => (
          <div
            key={course.label}
            className='flex flex-col items-start gap-4 mx-4 h-full bg-slate-50 p-2'
          >
            <div className='w-full'>
              <img
                src={course.photo}
                alt={course.label}
                className='h-52 w-full'
              />
            </div>
            <div className='w-full h-full flex flex-col justify-between gap-2'>
              <h2 className='text-2xl font-bold'>{course.label}</h2>
              <p className='text-sm'>{course.duration}</p>
              <a
                href={course.href}
                className='btn btn-primary flex justify-center bottom-0'
              >
                View Course
              </a>
            </div>
          </div>
        ))}
      </Carousel>
      ;
    </>
  );
};

export default HomeCourse;
