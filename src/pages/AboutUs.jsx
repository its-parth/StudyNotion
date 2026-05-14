import React from 'react'
import HighlightText from '../components/common/HighlightText'
import CTAButton from '../components/common/CTAButton'
import About1 from '../assets/Images/aboutus1.webp'
import About2 from '../assets/Images/aboutus2.webp'
import About3 from '../assets/Images/aboutus3.webp'
import { FaQuoteLeft, FaQuoteRight  } from "react-icons/fa";

const AboutUs = () => {
    return (
        <div className='w-full bg-richblack-900'>
          {/* first section */}
          <div>
          {/* Top Section */}
          <div className='relative bg-richblack-800'>
            <div>
              <p className='font-base font-inter font-medium text-richblack-200'>About us</p>
              <h1>Driving Innovation in Online Education for a Brighter Future</h1>
              <p>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
            </div>
            <div className='relative w-full h-45'>
              <div className='absolute w-[80%] grid grid-cols-3 gap-2 left-1/2 -translate-x-1/2'>
                <img src={About1} alt='about1'></img>
                <img src={About2} alt='about2'></img>
                <img src={About3} alt='about3'></img>
              </div>
            </div>
          </div>
          {/* Bottom section */}
          <div className='bg-richblack-900'>
            <h2><span><FaQuoteLeft/></span>We are passionate about revolutionizing the way we learn. Our innovative platform combines technology, expertise, and community to create an unparalleled educational experience.<span><FaQuoteRight/></span></h2>
          </div>
          </div>
        </div>
    )
}

export default AboutUs