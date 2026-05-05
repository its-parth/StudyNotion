import React, { useState } from 'react'
import CTAButton from '../components/common/CTAButton';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { updatePassword } from '../services/operations/authAPI';

const UpdatePassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { resetPassToken } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const changePasswordHandler = (e) => {
        setPassword(e.target.value);
    }
    const changeConfirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value);
    }

    const resetPassHandler = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            toast.error("Password Didn't Match")
            return;
        }
        if(password.length < 8) {
            toast.error("Password Length Must Be Atleast 8")
            return;
        }

        const result = await dispatch(updatePassword(password, confirmPassword, resetPassToken));

        if(result) {
            navigate('/login');
        }
    }
  return (
    <div className='flex justify-center'>
        <div className='text-richblack-100 flex-1 flex flex-col gap-2 justify-center mx-4 max-w-sm md:max-w-md lg:max-w-lg'>
            <h2 className='text-3xl font-semibold text-richblack-5'>Choose new password</h2>
            <p className='mb-3'>Almost done. Enter your new password and you are all set.</p>
            <div className='flex flex-col gap-1'>
                <label htmlFor="password">New Password<span className='text-red-400'>*</span></label>
                <input required name='password' value={password} onChange={changePasswordHandler} className='bg-richblack-800 w-full rounded-lg p-3' type="password" id="password" placeholder='Enter new password'/>
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="confirmPassword">Confirm new password<span className='text-red-400'>*</span></label>
                <input required name='confirmPassword' value={confirmPassword} onChange={changeConfirmPasswordHandler} className='bg-richblack-800 w-full rounded-lg p-3' type="password" id="confirmPassword" placeholder='Enter confirm password'/>
            </div>
            <CTAButton text="Reset Password" variant='secondary' className="w-full mt-4" onClick={resetPassHandler}/>
                        
            <Link to={'/login'} className='flex gap-2 items-center text-richblack-5 text-sm mt-4'><FaArrowLeft />Back To Login</Link>
        </div>
    </div>
  )
}

export default UpdatePassword