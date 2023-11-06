import React, { useState, useEffect } from "react";
import poster from "../assets/sec1.jpg";
import { GoUnmute } from "react-icons/go";
import { IoVolumeMuteOutline } from "react-icons/io5";

const HomeAbout = () => {
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    const video = document.getElementById("backgroundVideo");
    video.muted = !muted;
    setMuted(!muted);
  };
  useEffect(() => {
    const video = document.getElementById("backgroundVideo");
    video.play();
  }, []);

  return (
    <>
      <div className='hero min-h-[60vh] bg-slate-50 drop-shadow-sm'>
        <div className='hero-content flex-col lg:flex-row gap-8 max-w-[90rem] lg:px-0 px-4'>
          <div className='w-full relative'>
            <video
              loop
              id='backgroundVideo'
              muted={muted}
              playsInline
              className='w-full object-fill brightness-90'
              poster={poster}
            >
              <source
                className='left-0 w-full'
                type='video/mp4'
                src='https://www.seacomengineering.org/images/VID-20200909-WA0011.mp4'
              />
            </video>
            <button
              onClick={toggleMute}
              className='absolute top-2 left-2 hover:bg-slate-500 p-1 rounded-full'
            >
              {muted ? (
                <IoVolumeMuteOutline size={36} />
              ) : (
                <GoUnmute size={36} />
              )}
            </button>
          </div>
          <div className='w-full'>
            <h1 className='text-md font-bold'>Who we are</h1>
            <h1 className='text-5xl font-bold accent-content'>About Seacom</h1>
            <p className='py-6 base-content text-[1.1rem]'>
              Seacom Engineering College is one of the well known and finest
              technical institution at Kolkata West Bengal, India and is among
              the top colleges in Kolkata. It is located at Sankrail,30 km away
              from the heart of Kolkata city by the side of national highway 6
              connected by the Sankrail railway station and bus from Kolkata
              city on the 11.5 acres of campus. Seacom offers education of the
              highest quality with its curriculum through a broad array of
              offerings in engineering and technological studies. A
              diverse,talented community united by a passion for learning and
              quest for more challenges students to be moulded to a different
              category in the state, country and world at Seacom.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeAbout;
