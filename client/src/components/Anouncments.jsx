import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import logo from "../assets/seacomlogo.png";
import { CgBot } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const Announcements = () => {
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState(null);
  const url = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(`${url}/api/faculty/getNotice`);
        setNotices(response.data);
      } catch (error) {
        console.error("Error in getting notices", error.message);
        setError("Error in getting notices. Please try again.");
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className='flex flex-col bg-slate-100 py-2 lg:px-36 px-4 justify-center items-center pt-14'>
      <NoticeSection title='Announcements, News & Events' notices={notices} />
    </div>
  );
};

const NoticeSection = ({ title, notices }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const navigate = useNavigate();

  const handleCopyPaste = (title, content) => {
    const copiedText = `${title}\n${content}\n"briefly describe the notice in a few words, and if any date please must be mention in table format like "Commencement of Academic Programs (Odd Semester) >> 15.07.2023 " so that the student can easily understand the notice and can easily access it."`;
    navigator.clipboard.writeText(copiedText).then(() => {
      navigate("/life-seacom", { state: { copiedText } });
    });
  };

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <div className='flex flex-col space-y-4'>
        <h1 className='text-3xl text-black font-bold text-center'>{title}</h1>
        <div className='bg-red-600 w-md h-[7px] rounded-md'></div>
      </div>
      <div className='w-full mt-5 flex justify-center'>
        {notices.length > 0 ? (
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={true}
            infinite={true}
            autoPlay={true}
            arrows={true}
            autoPlaySpeed={4000}
            keyBoardControl={true}
            customTransition='all 1s'
            transitionDuration={500}
            className=' flex gap-10 items-center w-full bg-slate-100 py-4'
          >
            {notices.map((notice) => (
              <div
                key={notice._id}
                className='overflow-y-hidden px-8 py-8 rounded-md shadow-md h-[70vh] border-[30px] bg-yellow-400 border-gray-800'
              >
                <div className='flex items-end justify-end w-full'>
                  <Link>
                    <CgBot
                      title='Summarize Notice'
                      size={50}
                      className='px-2 drop-shadow-2xl shadow-lg py-2 bg-gray-800 text-white rounded-full active:bg-gray-600 hover:bg-slate-700 m-1 cursor-pointer'
                      onClick={() =>
                        handleCopyPaste(notice.title, notice.content)
                      }
                    />
                  </Link>
                </div>
                <div className='border-2 border-red-600 px-2 py-2 bg-[#F9F9F9] text-xl text-center rounded-lg'>
                  {formatDate(notice.createdAt)}
                </div>
                <div className='flex items-center gap-2 mt-4'>
                  <img src={logo} alt='logo' className='w-10 h-10' />
                  <h1 className='text-xl font-semibold mb-2 '>
                    Notice by {notice.publisherName}
                  </h1>
                </div>

                <h2 className='text-2xl font-bold mb-2 mt-4'>
                  Subject: {notice.title}
                </h2>
                <p className='text-gray-700 mt-4 hover:text-clip'>
                  {notice.content}
                </p>
              </div>
            ))}
          </Carousel>
        ) : (
          <p>{notices.length === 0 ? "No notices available." : "Loading..."}</p>
        )}
      </div>
    </div>
  );
};

export default Announcements;
