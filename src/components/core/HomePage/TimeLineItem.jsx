import React from 'react'
const TimeLineItem = ({icon, heading, description, isLast}) => {
  return (
    <div className='flex flex-row gap-5'>
        {/* left side */}
        <div className='flex flex-col items-center'>
            {/* logo */}
            <div className='h-13 w-13 bg-white flex justify-center items-center rounded-full shadow-[0_0_62px_rgba(0,0,0,0.12)]'>
                <img className='w-6 h-6' src={icon} alt=""/>
            </div>
            {/* line */}
            {!isLast && <div className='timeline-line my-3'></div>}
        </div>
        {/* right side */}
        <div className='flex flex-col'>
            <h3 className='font-bold text-lg'>{heading}</h3>
            <p className='text-sm text-richblack-700'>{description}</p>
        </div>
    </div>
  )
}

export default TimeLineItem