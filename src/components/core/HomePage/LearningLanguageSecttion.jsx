import React from 'react'
import KnowYourProgress from '../../../assets/Images/Know_your_progress.png'
import PlanYourLessons from '../../../assets/Images/Plan_your_lessons.png'
import CompareWithOthers from '../../../assets/Images/Compare_with_others.png'
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
const LearningLanguageSecttion = () => {
    return (
        <div className='flex flex-col items-center pb-8'>
            <div className='mx-2 md:w-[60%]'>
                <p className='text-4xl font-semibold text-center'>Your swiss knife for <HighlightText>learning any language</HighlightText></p>
                <p className='text-richblack-700 text-center p-5'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
            </div>
            {/* <div className='flex flex-col md:flex-row justify-center relative mx-2'>
              <img className='flex-none object-contain max-w-full z-10 -mb-20 md:mb-0 md:-mt-10 md:w-[75%] md:-mr-55 lg:w-[90%] lg:-mr-40 xl:w-full xl:-mr-30' src={KnowYourProgress} />
              <img className='flex-none object-contain max-w-full z-20 md:mb-0 md:w-[75%] lg:w-[90%] xl:w-full' src={CompareWithOthers} />
              <img className='flex-none object-contain max-w-full z-30 -mt-25 md:w-[75%] md:-mt-2 md:-ml-65 lg:w-[90%] lg:-ml-45 xl:-ml-38 xl:w-full ' src={PlanYourLessons} />
            </div> */}
            <div className="relative md:h-95 lg:h-130 flex flex-col md:flex-row justify-center items-center w-full">

                <img
                    className="z-10 -mb-10 md:mb-0 md:absolute w-[75%] md:w-[38%] md:left-5"
                    src={KnowYourProgress}
                />

                <img
                    className="z-20 md:absolute w-[80%] md:w-[42%]"
                    src={CompareWithOthers}
                />

                <img
                    className="z-30 -mt-15 md:mt-0 md:absolute w-[80%] md:w-[42%] md:right-0"
                    src={PlanYourLessons}
                />

            </div>
            <div className='mt-5'>
                <CTAButton text={"Learn More"} variant='secondary' linkTo={'/signup'} />
            </div>
        </div>
    )
}

export default LearningLanguageSecttion