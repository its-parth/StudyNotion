import Instructor from '../../../assets/Images/Instructor.png'
import CTAButton from '../../common/CTAButton'
import HighlightText from '../../common/HighlightText'
const InstructorSection = () => {
  return (
    <div className='w-11/12 flex px-10 items-center justify-around py-20'>
        <div className='w-[40%] shadow-[-20px_-20px_0px_rgba(255,255,255,1)]'>
            <img className='w-full' src={Instructor} alt="" />
        </div>
        <div className='flex flex-col w-[50%] items-center'>
            <div className='w-[70%] flex flex-col gap-15'>
                <div className='flex flex-col gap-2'>
                    <div className='text-white font-semibold text-4xl w-[60%]'>Become an <HighlightText>instructor</HighlightText></div>
                    <p className='text-richblack-300'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                </div>
                <CTAButton arrow variant='secondary' text={"Start Teaching Today"} linkTo={"/signup"}/>
            </div>
        </div>
    </div>
  )
}

export default InstructorSection