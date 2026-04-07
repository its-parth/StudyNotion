import React from 'react'
import HighlightText from '../components/common/HighlightText'
import CTAButton from '../components/common/CTAButton'
const AboutUs = () => {
    return (
        <div className='text-white w-full bg-yellow-5 flex flex-col items-center'>
            <div class="bg-[#000814] text-white p-20 min-h-screen">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">

                    <div class="lg:col-span-2 p-8 flex flex-col justify-center items-start gap-4">
                        <h1 class="text-4xl font-bold">
                            World-Class Learning for <br />
                            <span class="text-blue-400">Anyone, Anywhere</span>
                        </h1>
                        <p class="text-gray-400 max-w-md">
                            Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.
                        </p>
                        <button class="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:scale-95 transition-all">
                            Learn More
                        </button>
                    </div>

                    <div class="bg-[#2C333F] p-8 h-[280px]">
                        <h3 class="text-xl font-bold mb-4">Curriculum Based on Industry Needs</h3>
                        <p class="text-gray-400 text-sm">Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.</p>
                    </div>

                    <div class="bg-[#161D29] p-8 h-[280px]">
                        <h3 class="text-xl font-bold mb-4">Our Learning Methods</h3>
                        <p class="text-gray-400 text-sm">The learning process uses the namely online and offline.</p>
                    </div>

                    <div class="lg:col-span-1 hidden lg:block"></div>

                    <div class="bg-[#2C333F] p-8 h-[280px]">
                        <h3 class="text-xl font-bold mb-4">Certification</h3>
                        <p class="text-gray-400 text-sm">You will get a certificate that can be used as a certification during job hunting.</p>
                    </div>

                    <div class="bg-[#161D29] p-8 h-[280px]">
                        <h3 class="text-xl font-bold mb-4">Rating "Auto-grading"</h3>
                        <p class="text-gray-400 text-sm">You will immediately get feedback during the learning process without having to wait for an answer.</p>
                    </div>

                    <div class="bg-[#2C333F] p-8 h-[280px]">
                        <h3 class="text-xl font-bold mb-4">Ready to Work</h3>
                        <p class="text-gray-400 text-sm">Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating.</p>
                    </div>

                </div>
            </div>

            <div className='w-11/12 bg-red-500 min-h-screen'>
                <div className='grid-cols-1 lg:grid-cols-4'>
                    <div>
                        <h1>World-Class Learning for <HighlightText>Anyone, Anywhere</HighlightText></h1>
                        <p>Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.</p>
                        <CTAButton text={"Learn More"} linkTo={"/signup"} variant='secondary'/>
                    </div>
                    <div className='flex flex-col gap-2'>
                       <h3>Curriculum Based on Industry Needs</h3> 
                       <p>Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs