import React, { useState } from 'react'
import { FaEye, FaEyeSlash  } from "react-icons/fa";
import CTAButton from '../../common/CTAButton';
import { Bounce, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const SignupForm = ({setIsLogin}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        role : 'Student',
        firstName: '',
        lastName: '',
        email: '',
        createPass: '',
        confirmPass: ''
    });
    const [showCreatePass, setShowCreatePass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const signupSubmitHandler = (event) => {
        event.preventDefault();
        if(formData.createPass != formData.confirmPass) {
            toast.error('Password Didn\'t Match', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return;
        }
        toast.success('Registered Successfully!', {
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
    const changeHandler = (event) => {
        setFormData(prev => {
            return {
                ...prev,
                [event.target.name] : event.target.value,
            }
        })
    }
    const changeRoleHandler = (event) => {
        setFormData(prev => {
            return {
                ...prev,
                role : event.target.textContent,
            }
        })
    }
  return (
    <div className='select-none'>
        <form onSubmit={signupSubmitHandler} className='text-sm flex flex-col gap-4'>
            <div className='switch-role-tab bg-richblack-800 w-fit flex p-1 rounded-full text-base gap-2'>
                <div onClick={changeRoleHandler} className={`cursor-pointer transition-all duration-300 ease-in-out student-type rounded-full ${formData.role == 'Student' ? 'bg-richblack-900 text-white' : 'text-richblack-200'} py-2 px-5`}>Student</div>
                <div onClick={changeRoleHandler} className={`transition-all duration-300 ease-in-out cursor-pointer instructor-type rounded-full ${formData.role == 'Instructor' ? 'bg-richblack-900 text-white' : 'text-richblack-200'} py-2 px-5`}>Instructor</div>
            </div>
            <div className='flex w-full gap-3'>
                <div className='flex-1 flex flex-col gap-1'>
                    <label htmlFor="firstName">First Name<span className='text-red-400'>*</span></label>
                    <input required name='firstName' value={formData.firstName} onChange={changeHandler} className='bg-richblack-800
     w-full rounded-lg p-3' type="text" id="firstName" placeholder='Enter First Name'/>

                </div>
                <div className='flex-1  flex flex-col gap-1'>
                    <label htmlFor="lastName">Last Name<span className='text-red-400'>*</span></label>
                    <input required name='lastName' value={formData.lastName} onChange={changeHandler} className='bg-richblack-800
     w-full rounded-lg p-3' type="text" id="lastName" placeholder='Enter Last Name'/>
                </div>
            </div>
            <div className=' flex flex-col gap-1'>
                <label htmlFor="emailId">Email Address<span className='text-red-400'>*</span></label>
                <input required name='email' value={formData.email} onChange={changeHandler} className='bg-richblack-800
 w-full rounded-lg p-3' type="email" id='emailId' placeholder='Enter Email Address'/>
            </div>
            <div className='flex gap-3'>
                <div className='flex-1  flex flex-col gap-1'>
                    <label htmlFor="password">Create Password<span className='text-red-400'>*</span></label>
                    <div className='relative flex items-center'>
                        <input required name='createPass' value={formData.createPass} onChange={changeHandler} className='bg-richblack-800
         w-full rounded-lg p-3' type={`${showCreatePass? "text" : "password"}`} id="password" placeholder='Enter Password'/>
                        <span onClick={() => {setShowCreatePass(prev => !prev)}} className='text-richblack-200 absolute right-3 text-lg cursor-pointer'>
                            {
                                showCreatePass ? <FaEyeSlash/> : <FaEye/> 
                            }
                        </span>
                    </div>
                </div>
                <div className='flex-1 flex flex-col gap-1'>
                    <label htmlFor="confirmedPassword">Confirm Password<span className='text-red-400'>*</span></label>
                    <div className='relative flex items-center'>
                        <input required name='confirmPass' value={formData.confirmPass} onChange={changeHandler} className='bg-richblack-800
         w-full rounded-lg p-3' type={`${showConfirmPass? "text" : "password"}`} id="confirmedPassword" placeholder='Confirm Password'/>
                        <span onClick={() => {setShowConfirmPass(prev => !prev)}} className='text-richblack-200 absolute right-3 text-lg cursor-pointer'>
                            {
                                showConfirmPass ? <FaEyeSlash/> : <FaEye/> 
                            }
                        </span>
                    </div>
                </div>
            </div>
            {/* <button className="create-account-btn">Create Account</button> */}
            <CTAButton type={"submit"} className="mt-3 w-full flex justify-center items-center" variant='secondary' text="Create Account" />
        </form>
    </div>
  )
}

export default SignupForm