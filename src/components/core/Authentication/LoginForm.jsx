import React, { useState } from 'react'
import CTAButton from '../../common/CTAButton';
import { Bounce, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({setIsLogin}) => {
    const navigate = useNavigate();
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
    const loginSubmitHandler = (event) => {
        event.preventDefault();
        toast.success('Login Successfully!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce
        });
        console.log(formData);
        setIsLogin(true);
        navigate('/dashboard');
    }
  return (
    <div>
        <form onSubmit={loginSubmitHandler} className='flex flex-col gap-2 text-sm'>
            <div className='flex flex-col gap-1'>
                <label htmlFor="emailId">Email Address<span className='text-red-400'>*</span></label>
                <input onChange={changeHandler} value={formData.email} required name='email' className='bg-(--richblack-800) w-full rounded-lg p-3' id="emailId" type="email" placeholder='Enter Email Address' />
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="emailPass">Password<span className='text-red-400'>*</span></label>
                <input onChange={changeHandler} value={formData.password} required name='password' className='bg-(--richblack-800) w-full rounded-lg p-3' id='emailPass' type="password" placeholder='Enter Your Password' />
            </div>
            <CTAButton className="mt-4" text={"Sign In"}/>
        </form>
    </div>
  )
}

export default LoginForm