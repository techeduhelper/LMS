import React from "react";
import bgImg from "../assets/sec1.jpg";

const Contact = () => {
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
              Contact Us
            </h1>
            <div className='bg-yellow-500 h-2 w-[3rem] lg:w-[10rem]'></div>
          </div>
        </div>
        <div>
          <div className='icon-section min-h-[50vh] bg-white flex items-center flex-col justify-center'>
            <div className='pt-6'>
              <h1 className='text-2xl font-bold text-black'>
                Have any Questions?
              </h1>
            </div>
            <div className=' flex lg:flex-row flex-col gap-10 items-center justify-between w-full lg:px-52 mt-16'>
              <div className='flex flex-col items-center justify-center gap-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='w-8 h-8'
                >
                  <path
                    fillRule='evenodd'
                    d='M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z'
                    clipRule='evenodd'
                  />
                </svg>
                <div className='flex flex-col items-center justify-center gap-2'>
                  <h1 className='text-lg font-semibold text-black'>Call Us</h1>
                  <span>Phone: 7605050242 / 7605050243</span>
                </div>
              </div>
              <div className='flex flex-col items-center justify-center gap-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='w-8 h-8'
                >
                  <path
                    fillRule='evenodd'
                    d='M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z'
                    clipRule='evenodd'
                  />
                </svg>
                <div className='flex flex-col items-center justify-center gap-2'>
                  <h1 className='text-lg font-semibold text-black'>Address</h1>
                  <span className='text-center'>
                    JL-Jaladhulagori(via Andul Mouri) ,Sankrail District :
                    <br />
                    Howrah (West Bengal) Pin :711302
                  </span>
                </div>
              </div>
              <div className='flex flex-col items-center justify-center gap-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='w-8 h-8'
                >
                  <path d='M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z' />
                  <path d='M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z' />
                </svg>
                <div className='flex flex-col items-center justify-center gap-2'>
                  <h1 className='text-lg font-semibold text-black'>Email</h1>
                  <span className='text-center'>
                    admission@seacomengineering.org <br />
                    seacomengineering@rediffmail.com
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='form-section px-4 py-4 bg-slate-200 mt-4'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14736.860782281545!2d88.1972356!3d22.5710534!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x4bc940700da19104!2sSeacom%20Engineering%20College!5e0!3m2!1sen!2sin!4v1597394864424!5m2!1sen!2sin'
              width='100%'
              height='450'
              frameborder='0'
              allowfullscreen=''
              aria-hidden='false'
              tabindex='0'
            ></iframe>
          </div>
          <div className='map-section'></div>
        </div>
      </div>
    </>
  );
};

export default Contact;
