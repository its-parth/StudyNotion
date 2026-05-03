import React, { useState } from 'react'
import { HiBellSnooze } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';

const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.auth);
  return (
    <div className='flex-1 max-w-sm md:max-w-md lg:max-w-lg bg-red-500 mx-4'>
        {loading ? 
            <div>HiBellSnooze</div> : 
            <div>
            <h2>
                {emailSent ? "Check Your Email" : "Reset Your Password"}
            </h2>
            <p>
                {emailSent ? `We have sent the reset email to ${email}` : "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"}
            </p>
        </div>
        }
    </div>
  )
}

export default ForgotPassword