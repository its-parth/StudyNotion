import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import Button from '../components/Button'
const Home = () => {
  return (
    <div>
        {/* Section 1 */}
        <div className='bg-richblack-900 flex flex-col py-4 px-4 items-center gap-5'>
            <div className='w-fit border-b border-gray-700 text-gray-400 text-lg font-semibold flex items-center gap-1 bg-richblack-800 px-8 py-1 rounded-full '>Become an Instructor <FaArrowRight />
</div>
            <h2 className='text-white font-semibold text-3xl'>Empower Your Future with <span className='font-bold bg-linear-to-r from-blue-500 via-blue-400 to-blue-600 bg-clip-text text-transparent'>Coding Skills</span>
            </h2>
            <p className='text-gray-500 text-center text-lg font-bold max-w-6xl mx-4'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </p>
            <div className='flex gap-7 mt-7'>
                <Button text="Learn More" classes="text-black bg-yellow-50 text-lg border-r-2 border-b-2 border-yellow-50"/>
                <Button text="Book a Demo" classes="text-white bg-richblack-800 text-lg border-r-2 border-b-2 border-pure-greys-500"/>
            </div>
        </div>
        {/* Section 2 */}
        
        {/* Section 3 */}
        
        {/* Section 4 */}
    </div>
  )
}

export default Home