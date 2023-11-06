import React from "react";
import bgImg from "../assets/sec1.jpg";
import abImg from "../assets/sec3.png";

const About = () => {
  return (
    <>
      <div>
        <div className='bg-gradient-to-r from-slate-800 to-slate-800 min-h-[20vh] w-full relative px-2 flex justify-center items-center'>
          <div>
            <img
              className='absolute top-0 left-0 w-full h-full object-cover mix-blend-overlay brightness-110'
              src={bgImg}
              alt='bgimage'
            />
          </div>

          <div className='flex justify-center items-center space-x-8 '>
            <div className='bg-yellow-500 h-2  w-[3rem] lg:w-[10rem]'></div>
            <h1 className='text-white text-4xl font-bold tracking-wider'>
              About Us
            </h1>
            <div className='bg-yellow-500 h-2 w-[3rem] lg:w-[10rem]'></div>
          </div>
        </div>
        <div>
          <p className='text-xl text-justify lg:px-10 px-4  text-slate-600 font-bold mt-10'>
            Seacom Engineering College is one of the well known and finest
            technical institution at Kolkata West Bengal, India and is among the
            top colleges in Kolkata. It is located at Sankrail,30 km away from
            the heart of Kolkata city by the side of national highway 6
            connected by the Sankrail railway station and bus from Kolkata city
            on the 11.5 acres of campus. Seacom offers education of the highest
            quality with its curriculum through a broad array of offerings in
            engineering and technological studies. A diverse,talented community
            united by a passion for learning and quest for more challenges
            students to be moulded to a different category in the state, country
            and world at Seacom.
          </p>
          <p className='text-xl text-center text-slate-800 font-bold mt-10'>
            The objectives of any educational institute is to provide the
            country with young and dynamic professionals. The institute aims to
            incorporate those courses in it is academy as are prudent to the
            current scenario existing in the country and the needs of the
            country to reach its desired objective to a developed country. The
            teaching helps to master the students in the subjects. The practical
            sessions are given more importance. The facilities aim to resolve
            doubts and queries via the special knowledge imparting sessions. The
            course material chosen are from the write ups of experts in the
            subject from all over the world. The regular and surprise
            examinations keep the students on alert. Enough motivation is
            required at this level to urge students to give their best, thus
            extra motivating sessions are organized. Apart from knowledge the
            institute aims to provide the students with different sporting
            arenas within the premises to keep themselves fit an energetic. The
            students keep participating in sports other social and cultural
            programs on regular basis. The students take part in various inter
            college academic events are organize social extravaganzas
            themselves.
          </p>
          <p className='text-xl text-center text-slate-800 font-bold mt-10'>
            The idea is to provide a healthy energetic and intellectual climate
            in the premises. Basically the aim is to became a dream institute
            for every aspiring student in the field.
          </p>
          <p className='text-xl text-center text-slate-800 font-bold mt-10'>
            The college has young dynamic academic and industrial background and
            faculty members .Moreover college has guest faculties from renowned
            universities of West Bengal.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
