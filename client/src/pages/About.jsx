import React from "react";
import bgImg from "../assets/sec1.jpg";
import abImg from "../assets/chairman-anish-chakraborty.jpg";

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
        <div className='lg:px-16 px-4'>
          <p className='text-lg text-justify lg:px-10 px-4  text-slate-600 font-bold mt-10'>
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
          <p className='text-lg text-justify lg:px-10 px-4  text-slate-600 font-bold mt-10'>
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
          <p className='text-lg text-justify lg:px-10 px-4  text-slate-600 font-bold mt-10'>
            The idea is to provide a healthy energetic and intellectual climate
            in the premises. Basically the aim is to became a dream institute
            for every aspiring student in the field.
          </p>
          <p className='text-lg text-justify lg:px-10 px-4  text-slate-600 font-bold mt-10'>
            The college has young dynamic academic and industrial background and
            faculty members .Moreover college has guest faculties from renowned
            universities of West Bengal.
          </p>
        </div>
        <div className='lg:px-16 px-4 mt-10 mb-10 text-slate-600'>
          <h1 className='text-2xl lg:px-10 px-4 text-black font-bold'>
            Our Mission
          </h1>

          <p className='text-lg text-justify lg:px-10 px-4 text-slate-600 font-bold mt-10'>
            To improve the quality of individual as well as societal life by
            means of quality education with embedded employable skills.
            Education for the Good Life will be pursued, in every action and
            intent of the University, with an inalienable attitude of respect to
            the interdependence and integration of knowledge and skills at every
            level of engagement.
          </p>
        </div>
        <div className='lg:px-16 px-4 mt-10 mb-10 text-slate-600'>
          <h1 className='text-2xl lg:px-10 px-4 text-black font-bold'>
            Our Mission
          </h1>
          <p className='lg:px-10 px-4 mt-3 text-lg text-slate-600'>
            <span className='font-semibold mr-2'>Quality:</span>Continuous up
            gradation of curricula in response to demands and emerging
            technology.
          </p>
          <p className='lg:px-10 px-4 text-lg text-slate-600'>
            <span className='font-semibold mr-2'>Integrity:</span>Conducting
            business fairly, honestly and with transparency.
          </p>
          <p className='lg:px-10 px-4 text-lg text-slate-600'>
            <span className='font-semibold mr-2'>Commitment:</span>Showing
            respect, compassion and humanity for students, faculty and staff.
          </p>
        </div>
        <div className='lg:px-16 px-4 mt-10 mb-10 text-slate-600 flex flex-col'>
          <h1 className='text-2xl lg:px-10 px-4 text-black font-bold'>
            Our Mission
          </h1>
          <div className='flex lg:flex-row flex-col items-center'>
            <div className='w-full'>
              <p className='text-lg text-justify lg:px-10 px-4 text-slate-600 font-bold mt-10'>
                In a rapidly advancing world around us, new technologies are
                emerging and fast discarding the old ones. People with new
                perceptions are pursuing the goal for better world. We, in
                Seacom Skills University, are aware of this and endeavoring our
                outmost to participate in these changing processes. Our
                dedicated faculty and associates are molding and preparing
                students to face the challenges around us.
              </p>
              <p className='text-lg text-justify lg:px-10 px-4 text-slate-600 font-bold mt-10'>
                In fact, in this dynamic world students’ task is uphill.
                Therefore, our prime task is to ensure all-round development of
                students to become a part and parcel of the rapidly changing
                world. it’s worth to think that our association with students is
                not just for a few years of study but everlasting. You are all
                aware that these four years of student life will be a golden
                period for you all. We welcome you to join our University for a
                successful and rewarding future.
              </p>
            </div>
            <div className='mt-10 text-center text-black'>
              <img src={abImg} className='h-[400px] lg:w-[600px]' />
              <h1 className='text-xl mt-4'>Anish Chakraborty </h1>
              <p className='text-gray-700'>
                Chairman, Seacom Engineering College
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
