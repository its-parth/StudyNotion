import React, { useState } from 'react'
import { HiBellSnooze } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import CTAButton from '../components/common/CTAButton';
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Loader from '../components/common/Loader';
import { sendPasswordResetEmail } from '../services/operations/authAPI';

const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.auth);
    function changeHandler(event) {
        setEmail(event.target.value);
    }
    function submitHandler(event) {
        event.preventDefault();
        dispatch(sendPasswordResetEmail(email, setEmailSent))
    }
    console.log("Loading changed: ", loading);
  return (
    <div className='flex-1 flex max-w-sm md:max-w-md lg:max-w-lg mx-4 justify-center'>
        {loading ? 
            <div className='flex items-center justify-center'>
                <Loader />
            </div> : 
            <div className='text-richblack-100 flex-1 flex flex-col gap-2 justify-center'>
                <h2 className='text-3xl font-semibold text-richblack-5'>
                    {emailSent ? "Check Your Email" : "Reset Your Password"}
                </h2>
                <p>
                    {emailSent ? `We have sent the reset email to ${email}` : "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"}
                </p>
                {!emailSent && <div className='flex flex-col gap-1'>
                    <label htmlFor="email">Email<span className='text-red-400'>*</span></label>
                    <input required name='email' value={email} onChange={changeHandler} className='bg-richblack-800 w-full rounded-lg p-3' type="email" id="email" placeholder='Enter email address'/>
                </div>}
                {
                emailSent ? 
                    <CTAButton text="Resend Email" variant='secondary' className="w-full mt-4" onClick={submitHandler}/>
                    :
                    <CTAButton text="Submit" variant='secondary' className="w-full mt-4" onClick={submitHandler}/>
                }
                <Link to={'/login'} className='flex gap-2 items-center text-richblack-5 text-sm mt-4'><FaArrowLeft />Back To Login</Link>
            </div>
        }
    </div>
  )
}

export default ForgotPassword