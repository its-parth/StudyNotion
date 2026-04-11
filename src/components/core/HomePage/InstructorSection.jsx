import Instructor from '../../../assets/Images/Instructor.png'
import CTAButton from '../../common/CTAButton'
import HighlightText from '../../common/HighlightText'
const InstructorSection = () => {
  return (
    <div className='w-full flex flex-col md:flex-row items-center justify-evenly py-15 gap-10 md:gap-0 lg:py-20 lg:px-10'>
        <div className='max-w-120 md:w-[50%] shadow-[-5px_-5px_0px_rgba(255,255,255,1)] sm:shadow-[-10px_-10px_0px_rgba(255,255,255,1)] md:shadow-[-20px_-20px_0px_rgba(255,255,255,1)]'>
            <img className='w-full' src={Instructor} alt="" />
        </div>
        <div className='flex flex-col md:w-[45%] items-center'>
            <div className='w-[85%] lg:w-[70%] flex flex-col gap-10 md:gap-15'>
                <div className='flex flex-col gap-2'>
                    <div className='text-white font-semibold text-3xl lg:text-4xl w-[60%]'>Become an <HighlightText>instructor</HighlightText></div>
                    <p className='text-richblack-300'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                </div>
                <CTAButton arrow variant='secondary' text={"Start Teaching Today"} linkTo={"/signup"}/>
            </div>
        </div>
    </div>
  )
}

export default InstructorSection