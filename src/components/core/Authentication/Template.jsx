import React from 'react'
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import { FcGoogle } from "react-icons/fc";

const Template = (props) => {
    const {heading, description1, description2, type, img, frame, setIsLogin} = props;
  return (
    <div className='template-container text-white flex p-6 gap-3 w-full selec-none'>
        <div className="template-left w-3/6 flex justify-center">
            <div className='max-w-lg p-2 lg:p-8 flex flex-col gap-6'>
                <h2 className='text-3xl font-semibold'>{heading}</h2>
                <div>
                    <p className="desc1 text-xl text-(--richblack-200)">{description1}</p>
                    <p className="desc2 text-lg text-(--blue-100) italic">{description2}</p>
                </div>
                {
                    type == 'signup' ?  <SignupForm setIsLogin={setIsLogin} /> : <LoginForm setIsLogin={setIsLogin} />
                }
                <div className='flex justify-between gap-2 items-center text-(--richblack-700)'>
                    <div className='border flex-1'></div>
                    <div>OR</div>
                    <div className='flex-1 border'></div>
                </div>
                <div className='w-full flex items-center justify-center gap-2 border rounded-lg px-4 py-2 border-richblack-700 text-richblack-200 cursor-pointer'><FcGoogle />Sign Up with Google</div>
            </div>
        </div>
        <div className="template-right w-3/6 flex justify-center">
            <div className='relative'>
                <img className='max-w-md w-full relative z-10' src={img} alt="img" />
                <img className='max-w-md w-full absolute top-4 left-4 z-0' src={frame} alt="frame" />
            </div>
        </div>
    </div>
  )
}

export default Template