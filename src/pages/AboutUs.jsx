import React from 'react'
import HighlightText from '../components/common/HighlightText'
import CTAButton from '../components/common/CTAButton'
import About1 from '../assets/Images/aboutus1.webp'
import About2 from '../assets/Images/aboutus2.webp'
import About3 from '../assets/Images/aboutus3.webp'
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className='w-full bg-richblack-900'>
      {/* first section */}
      <div>
        {/* Top Section */}
        <div className='relative bg-richblack-800 flex flex-col items-center'>
          <div className='w-[90%] lg:w-[70%] p-4 flex flex-col items-center mt-5 mb-2 md:mt-10 md:mb-7 max-w-maxContent'>
            <p className='font-base font-inter font-medium text-richblack-200 mb-10'>About us</p>
            <h1 className='text-3xl md:text-4xl text-center font-bold text-white mb-5 lg:my-2'>Driving Innovation in Online Education for a <HighlightText>Brighter Future</HighlightText></h1>
            <p className='font-inter text-center text-richblack-300'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
          </div>
          <div className='relative w-full lg:h-60 flex justify-center'>
            {/* glow effect */}
            <div className='inset-0 absolute  lg:top-5 z-0'>
              <div className='w-[20%] md:w-[50%] h-[10%] lg:w-[25%] lg:h-[25%] bg-orange-400 opacity-90 blur-3xl rounded-full mx-auto'></div>
            </div>
            <div className='z-10 lg:absolute grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-7 lg:left-1/2 lg:-translate-x-1/2 lg:w-[80%] mb-5 lg:mb-0 mx-4 max-w-maxContent'>
              <img className='md:max-w-85 lg:max-w-full w-full' src={About1} alt='about1'></img>
              <img className='md:max-w-85 lg:max-w-full w-full' src={About2} alt='about2'></img>
              <img className='md:max-w-85 lg:max-w-full w-full col-span-1 md:col-span-2 md:justify-self-center lg:col-span-1' src={About3} alt='about3'></img>
            </div>
          </div>
        </div>
        {/* Bottom section */}
        <div className='bg-richblack-900 py-12 min-[1350px]:pt-25 md:w-[80%] mx-4 md:mx-auto max-w-maxContent'>
          <h2 className=" font-semibold font-inter text-richblack-100 text-2xl md:text-3xl lg:text-4xl leading-normal text-center"><FaQuoteLeft className='text-richblack-600 inline text-xl md:text-2xl mr-2 mb-6'/>We are passionate about revolutionizing the way we learn. Our innovative platform <span className='bg-linear-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text'>combines technology</span>, <span className='bg-linear-to-r from-[#FF512F] to-[#F09819] text-transparent bg-clip-text'>expertise</span>, and community to create an <span className='bg-linear-to-r from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text'>unparalleled educational experience.</span><FaQuoteRight className='inline text-xl md:text-2xl mr-2 mb-6 text-richblack-600'/></h2>
        </div>
      </div>
      {/* second section */}
      <div>

      </div>
    </div>
  )
}

export default AboutUs