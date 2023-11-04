import React from "react";
import poster from "../assets/sec1.jpg";

const HomeAbout = () => {
  return (
    <>
      <div className='hero min-h-[60vh] bg-slate-50'>
        <div className='hero-content flex-col lg:flex-row gap-8'>
          <div className='w-full'>
            <video
              id='my-video'
              class='video-js'
              controls
              preload='auto'
              poster={poster}
              data-setup='{}'
              className='w-full'
            >
              <source
                src='https://www.seacomengineering.org/images/VID-20200909-WA0011.mp4'
                type='video/mp4'
              />
            </video>
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

      <div className='flex flex-col lg:flex-row w-full'>
        <div></div>
      </div>
    </>
  );
};

export default HomeAbout;
