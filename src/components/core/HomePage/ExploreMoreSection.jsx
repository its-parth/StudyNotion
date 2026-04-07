import { useEffect, useState } from 'react';
import HighlightText from '../../common/HighlightText'
import { HomePageExplore } from '../../../../data/homepage-explore';
import { IoMdPeople } from "react-icons/io";
import { TbBinaryTree2Filled } from "react-icons/tb";
const ExploreMoreSection = () => {
    const [selectedTabInd, setSelectedTab] = useState(0);
    const cards = HomePageExplore[selectedTabInd].courses;
    const [selectedCardInd, setSelectedCardInd] = useState(0);
    useEffect(() => {
        setSelectedCardInd(0);
    }, [selectedTabInd]);
    return (
        <div className='w-full max-w-maxContent flex flex-col items-center gap-8'>
            <div className='flex flex-col items-center gap-2'>
                <h2 className='text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-center'>Unlock the <HighlightText>Power of Code</HighlightText></h2>
                <p className='text-center text-base text-richblack-300 font-semibold'>Learn to Build Anything You Can Imagine</p>
            </div>
            <div className='bg-richblack-800 text-richblack-300 flex flex-wrap md:flex-nowrap justify-center rounded-full p-1 gap-2 mx-2'>
                {
                    HomePageExplore.map((item, index) => {
                        return <div onClick={() => {
                            setSelectedTab(index);
                        }} className={`${index == selectedTabInd ? "selectedTab" : ""} px-2 py-1 md:px-4 md:py-2 lg:px-8 lg:py-3 rounded-full cursor-pointer select-none transition-all duration-1000`} key={index}>{item.tag}</div>
                    })
                }
            </div>
            <div className='relative w-full lg:h-45'>
                <div className='lg:absolute w-full text-white flex flex-wrap px-2 md:px-13 gap-12 justify-center'>
                    {
                        cards.map((card, index) => {
                            const isSelected = index === selectedCardInd;
                            return <div onClick={() => {
                                setSelectedCardInd(index);
                            }} key={index} className={`${isSelected ? "bg-white shadow-[12px_12px_0px_#FFD60A]" : "bg-richblack-800"} h-70 md:min-w-62 max-w-70 flex flex-col justify-between flex-1 transition-all duration-300 cursor-pointer select-none`}>
                                <div className='pt-6 px-6 flex flex-col gap-2'>
                                    <p className={`${isSelected ? "text-richblack-800" : "text-white"} text-xl font-semibold`}>{card.heading}</p>
                                    <p className='text-richblack-400'>{card.description}</p>
                                </div>
                                <div className='flex flex-col text-richblack-300'>
                                    <div className='w-full h-0.5 bg-[repeating-linear-gradient(to_right,#6E727F_0px,#6E727F_5px,transparent_5px,transparent_10px)]'></div>
                                    <div className='flex justify-between py-4 px-6'>
                                        <p className='flex items-center gap-2'><IoMdPeople />
                                            {card.level}</p>
                                        <p className='flex items-center gap-2'><TbBinaryTree2Filled />
    {card.lessonNumber} Lession</p>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ExploreMoreSection