import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import CTAButton from '../components/HomePage/CTAButton'
import { Link } from 'react-router-dom';
import Banner from '../assets/Images/banner.mp4'
import HighlightText from '../components/HomePage/HighlightText';
import CodeSection from '../components/HomePage/CodeSection';

const Home = () => {
  return (
    <div>
      {/* Section 1 */}
      <div className='bg-richblack-900 flex flex-col py-4 px-4 items-center gap-5 max-w-maxContent'>
        <Link to>
          <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-1.25 transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
        <h2 className='text-white font-semibold text-3xl mx-4 text-center'>Empower Your Future with <HighlightText>Coding Skills</HighlightText>
        </h2>
        <p className='text-richblack-300 text-center text-lg font-bold w-[90%] mx-4'>
          With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
        </p>
        <div className='flex gap-7 mt-7'>
          <CTAButton text="Learn More" linkTo={"/signup"} variant="secondary" />
          <CTAButton text="Book a Demo" linkTo={"/signup"} variant="primary" />
        </div>

        <div className='w-[80%] mt-10 mb-4 relative'>
          <div className='bg-white w-full h-full absolute top-4 left-4 z-0'></div>
          {/* glow effect */}
          <div className='inset-0 absolute -top-7'>
            <div className='w-[80%] h-[40%] bg-blue-300 opacity-90 blur-3xl rounded-full mx-auto mt-10'></div>
          </div>
          <video
            src={Banner}
            autoPlay muted loop
            className="relative w-full h-full"
          />
        </div>

        {/* Code section 1 */}
          <CodeSection heading={
            [
              { text: "Unlock your", highlight: false},
              { text: "coding potential", highlight: true},
              { text: "with our online courses.", highlight: false},
            ]
          } description={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."} ctabtn1={{text:"Try it Yourself",linkTo:"/signup"}} ctabtn2={{text:"Learn More",linkTo:"/signup"}} elipseColor={"blue-300"}/>
        {/* Code section 2 */}
          <CodeSection reverse heading={ 
            [
              { text: "Start", highlight: false},
              { text: "coding in seconds", highlight: true}
            ]
          }  description={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."} ctabtn1={{text:"Continue Lesson",linkTo:"/signup"}} ctabtn2={{text:"Learn More",linkTo:"/signup"}} elipseColor={"[#fabf52]"}/>

      </div>
      {/* Section 2 */}

      {/* Section 3 */}

      {/* Section 4 */}
    </div>
  )
}

export default Home