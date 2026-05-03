import React, { useState } from 'react'
import CTAButton from '../../common/CTAButton';
import { Bounce, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../services/operations/authAPI';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email : '',
        password : '',
    })
    const changeHandler = (event) => {
        setFormData(prev => {
            return {
                ...prev, 
                [event.target.name] : event.target.value,
            }
        })
    }
    const loginSubmitHandler = async (event) => {
        event.preventDefault();
        const result = await dispatch(login(formData.email, formData.password));
        if(result) {
            setFormData({
                email: '',
                password: '',
            });
            toast.success("Login Successfull")
            navigate('/dashboard');
        } else {
            toast.error(result);
        }
    }
  return (
    <div>
        <form onSubmit={loginSubmitHandler} className='flex flex-col gap-2 text-sm'>
            <div className='flex flex-col gap-1'>
                <label htmlFor="emailId">Email Address<span className='text-red-400'>*</span></label>
                <input onChange={changeHandler} value={formData.email} required name='email' className='bg-richblack-800 w-full rounded-lg p-3' id="emailId" type="email" placeholder='Enter Email Address' />
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="emailPass">Password<span className='text-red-400'>*</span></label>
                <input onChange={changeHandler} value={formData.password} required name='password' className='bg-richblack-800 w-full rounded-lg p-3' id='emailPass' type="password" placeholder='Enter Your Password' />
            </div>
            <Link className='ml-auto max-w-max text-blue-100 text-sm' to='/forgot-password'>Forgot Password</Link>
            <CTAButton type={"submit"} variant='secondary' className="mt-4 flex items-center justify-center w-full" text={"Sign In"}/>
        </form>
    </div>
  )
}

export default LoginForm