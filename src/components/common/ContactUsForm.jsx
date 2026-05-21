import React, { useEffect, useState } from 'react'
import countryCodes from '../../data/countrycode.json'
import CTAButton from './CTAButton'
import { useForm } from 'react-hook-form'

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful},
    } = useForm();

    const submitContactForm = (data) => {
        setLoading(true);
        console.log("form data: ", data);
        // todo call backend api
        setLoading(false);
    }
    return (
    <div className='w-full'>
        <form onSubmit={handleSubmit(submitContactForm)} className='flex flex-col gap-6'>
            <div className='w-full flex flex-col sm:flex-row gap-4'>
                <div className='flex-1 flex flex-col gap-1'>
                    <label htmlFor="firstName" className='text-richblack-25'>First Name</label>
                    <input type="text" id='firstName' className='bg-richblack-800  w-full rounded-lg p-3 shadow-[0px_2px_0px_rgba(128,128,128,0.3)]' placeholder='Enter first name' {...register("firstName", {required: true})}/>
                    {errors.firstName && (
                        <span className="-mt-1 text-[12px] text-yellow-100">Please enter your first name.</span>
                    )}
                </div>
                <div className='flex-1 flex flex-col gap-1'>
                    <label htmlFor="lastName" className='text-richblack-25'>Last Name</label>
                    <input type="text" id='lastName' className='bg-richblack-800  w-full rounded-lg p-3 shadow-[0px_2px_0px_rgba(128,128,128,0.3)]' placeholder='Enter last name' {...register("lastName", {required: true})}/>
                    {errors.lastName && (
                        <span className="-mt-1 text-[12px] text-yellow-100">Please enter your last name.</span>
                    )}
                </div>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
                <label htmlFor="email" className='text-richblack-25'>Email Address</label>
                <input type="email" id='email' className='bg-richblack-800  w-full rounded-lg p-3 shadow-[0px_2px_0px_rgba(128,128,128,0.3)]' placeholder='Enter email address' {...register("email", {required: true})} />
                {errors.email && (
                    <span className="-mt-1 text-[12px] text-yellow-100">Please enter email address.</span>
                )}
            </div>
            <div className='flex-1 flex flex-col gap-1'>
                <label htmlFor="phoneNo" className='text-richblack-25'>Phone Number</label>
                <div className='w-full flex flex-col sm:flex-row gap-5'>
                    <select name="countryCode" id="countryCode" className='w-full sm:min-w-17 sm:w-[10%] bg-richblack-800 rounded-lg p-3 shadow-[0px_2px_0px_rgba(128,128,128,0.3)]' {...register("countryCode", {required: true})}>
                        {
                            countryCodes.map((code, index) => {
                                return <option key={index} value={code.code}>{code.code} - {code.country}</option>
                            })
                        }
                    </select>
                    <input type="text" id='phoneNo' className='flex-1 bg-richblack-800 rounded-lg p-3 shadow-[0px_2px_0px_rgba(128,128,128,0.3)]' placeholder='12345 67890' {...register("phoneNo", {required: {value: true, message: "Please enter your phone no."}, 
                    maxLength: {value: 12, message: "Invalid phone no."},
                    minLength: {value: 10, message: "Invalid phone no."},
                    })}/>
                </div>
                {errors.phoneNo && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        {errors.phoneNo.message}
                    </span>
                )}
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <label htmlFor="message" className='text-richblack-25'>Message</label>  
              <textarea name="message" id="message" className='h-40 bg-richblack-800  w-full rounded-lg p-3 shadow-[0px_2px_0px_rgba(128,128,128,0.3)]' placeholder='Enter you message...' {...register("message", {required: true})}></textarea>
              {errors.message && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter you Message.
                </span>
              )}
            </div>
            {/* <CTAButton className={"w-full text-center font-semibold"} type="submit" text={"Send Message"} variant='secondary'/> */}
            <button
        type="submit"
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         sm:text-[16px] `}
      >
        Send Message
      </button>
        </form>
    </div>
  )
}

export default ContactUsForm