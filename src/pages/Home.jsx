import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import CTAButton from '../components/common/CTAButton'
import { Link } from 'react-router-dom';
import Banner from '../assets/Images/banner.mp4'
import HighlightText from '../components/common/HighlightText';
import CodeSection from '../components/core/HomePage/CodeSection';
import BGHome from '../assets/Images/bghome.svg'
import Logo1 from '../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../assets/TimeLineLogo/Logo4.svg'
import TimelineImage from '../assets/Images/TimelineImage.png'
import LearningLanguageSecttion from '../components/core/HomePage/LearningLanguageSecttion';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import TimeLineSection from '../components/core/HomePage/TimeLineSection'
import Footer from '../components/common/Footer';
import RatingAndReview from '../components/common/RatingAndReview';
import ExploreMoreSection from '../components/core/HomePage/ExploreMoreSection';
const Home = () => {
  return (
    <div className='w-full flex flex-col items-center'>
      {/* Section 1 */}
      <div className='bg-richblack-900 flex flex-col py-4 px-4 items-center gap-5 max-w-maxContent'>
        <Link to>
          <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
            <div className="flex flex-row items-center gap-2 rounded-full px-5 py-0.75 lg:px-10 lg:py-1.25 transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
        <h2 className='text-white font-semibold text-3xl mx-4 text-center'>Empower Your Future with <HighlightText>Coding Skills</HighlightText>
        </h2>
        <p className='text-richblack-300 text-center md:text-lg font-bold'>
          With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
        </p>
        <div className='flex gap-7 mt-7'>
          <CTAButton text="Learn More" linkTo={"/signup"} variant="secondary" />
          <CTAButton text="Book a Demo" linkTo={"/signup"} variant="primary" />
        </div>

        <div className='w-[95%] md:w-[80%] mt-10 mb-4 relative'>
          <div className='bg-white w-full h-full absolute top-1 left-1 md:top-4 md:left-4 z-0'></div>
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
        <CodeSection
          codeBlock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a>\n<a href="/two">Two</a>\n</nav>\n</body>`}
          heading={
            [
              { text: "Unlock your", highlight: false },
              { text: "coding potential", highlight: true },
              { text: "with our online courses.", highlight: false },
            ]
          } description={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."} ctabtn1={{ text: "Try it Yourself", linkTo: "/signup" }} ctabtn2={{ text: "Learn More", linkTo: "/signup" }} ellipseColor={"blue"} />
        {/* Code section 2 */}
        <CodeSection reverse codeColor='#F5D242'
          codeBlock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
          heading={
            [
              { text: "Start", highlight: false },
              { text: "coding in seconds", highlight: true }
            ]
          } description={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."} ctabtn1={{ text: "Continue Lesson", linkTo: "/signup" }} ctabtn2={{ text: "Learn More", linkTo: "/signup" }} ellipseColor={"yellow"} />


        <ExploreMoreSection />
      </div>
      {/* Section 2 */}
      <div className='w-full bg-pure-greys-5 text-richblack-900'>
        <div className='section2-content w-full flex flex-col items-center'>
          <div className='w-full'>
            <div className='w-full h-45 md:h-60 lg:h-80 bg-center bg-contain bg-repeat flex flex-col sm:flex-row justify-center items-center gap-6 lg:pt-10' style={{ backgroundImage: `url(${BGHome})` }}>
              <CTAButton variant='secondary' arrow text={"Explore Full Catalog"} linkTo={"/parth"}/>
              <CTAButton variant='primary' text={"Learn More"} linkTo={"/signup"}/>
            </div>
          </div>
          <div className='py-15 w-11/12 max-w-maxContent'>
            <div className='flex flex-col md:flex-row'>
              <div className='font-semibold text-3xl lg:text-4xl md:w-[50%] p-2'>Get the skills you need for a <HighlightText>job that is in demand.</HighlightText></div>
              <div className='flex flex-col gap-9 md:w-[50%] p-2'>
                <p className='text-richblack-700'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                <CTAButton variant='secondary' text="Learn More" linkTo={"/signup"}/>
              </div>
            </div>
            <div className='flex flex-col md:flex-row gap-4 lg:gap-8 my-5 lg:my-14 items-center justify-center'>
              <TimeLineSection />
              <div className='relative flex items-center px-2 py-4 md:py-0'>
                  {/* blur glow background */}
                  <div className='absolute blur-2xl w-[98%] h-[50%] bg-linear-to-r from-[#9CECFB] via-[#65C7F7] to-[#0052D4]'></div>
                  <img className='z-10 md:mx-0 w-full max-w-140 md:max-w-178 shadow-[20px_20px_0px_rgba(255,255,255,1)]' src={TimelineImage} alt="timeline_img" />
                  <div className='hidden z-20 w-[80%] absolute left-[10%] -bottom-10 bg-caribbeangreen-700 text-caribbeangreen-300 md:flex flex-row justify-evenly lg:justify-between p-6'>
                    <div className='flex items-center gap-4 lg:gap-6'>
                      <p className='text-white font-bold text-2xl lg:text-4xl'>10</p>
                      <p className='text-xs lg:text-sm uppercase w-30'>years experiences</p>
                    </div>
                    <div className='hidden lg:block flex-1'>
                      <div className='bg-caribbeangreen-500 h-full w-0.5 mx-auto'></div>
                    </div>
                    <div className='flex items-center gap-4 lg:gap-6'>
                      <p className='text-white font-bold text-2xl lg:text-4xl'>250</p>
                      <p className='text-xs lg:text-sm uppercase w-30'>types of courses</p>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          {/* <LearningLanguageSecttion /> */}
        </div>
      </div>
      {/* Section 3 */}
      {/* <div className='flex flex-col items-center'>
        <InstructorSection />
        <RatingAndReview />
      </div> */}
      {/* Section 4 */}
      <Footer />
    </div>
  )
}

export default Home