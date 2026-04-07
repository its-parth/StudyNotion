import React from 'react'
import TimeLineItem from './TimeLineItem';
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
const TimeLineSection = () => {
    const timeline = [
        {
            logo: Logo1,
            heading: "Leadership",
            description: "Fully committed to the success company"
        },
        {
            logo: Logo2,
            heading: "Responsibility",
            description: "Students will always be our top priority"
        },
        {
            logo: Logo3,
            heading: "Flexibility",
            description: "The ability to switch is an important skills"
        },
        {
            logo: Logo4,
            heading: "Solve the problem",
            description: "Code your way to a solution"
        }
    ]
    return (
        <div className='md:py-2 md:pr-2 lg:py-4 lg:pl-2 lg:pr-18'>
            {timeline.map((item, index) => (
                <TimeLineItem
                    key={index}
                    icon={item.logo}
                    heading={item.heading}
                    description={item.description}
                    isLast={index === timeline.length - 1}
                />
            ))}
        </div>
    )
}

export default TimeLineSection