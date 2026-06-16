import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/common/Loader';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { sendOtp, signup } from '../services/operations/authAPI';
import { setLoading } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';

const VerifyEmail = () => {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading, signupData} = useSelector((state) => state.auth);
    
    useEffect(() => {
        if(!signupData) {
            navigate('/signup');
        }
    }, []);

    const handlerVerifyAndSignup = async (event) => {
        event.preventDefault();
        let signupInfo = {
            ...signupData,
            otp: otp
        }
        console.log("signup info: ", signupInfo);
        const result = await dispatch(signup(signupInfo));
        if(result) {
          toast.success("Signup Successfull!");
          navigate('/login');
        }
    }
    return (
    <div className='flex'>
        {loading  ? 
        <div className='flex flex-col justify-center'>
            <Loader />
        </div>
        :
        <div className='max-w-125 p-4 pb-8 flex flex-col justify-center '>
            <h2 className="text-richblack-5 font-semibold text-[1.875rem] leading-9.5]">Verify Email</h2>
            <p className="text-[1.125rem] leading-6.5 my-4 text-richblack-100">A verification code has been sent to you. Enter the code below</p>
            <form onSubmit={handlerVerifyAndSignup}>
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    placeholder='------'
                    renderInput={(props) => <input required {...props}
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className='w-12 lg:w-15 border-0 bg-richblack-800 rounded-lg text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50' />}
                    containerStyle={{
                    justifyContent: "space-between",
                    gap: "0 15px",
                }}
                />
                <button type="submit"
              className="w-full bg-yellow-50 py-3 px-3 rounded-lg mt-6 font-medium text-richblack-900">Verify Email</button>
            </form>
            <div className="mt-6 flex items-center justify-between">
            <Link to="/signup">
              <p className="text-richblack-5 flex items-center gap-x-2">
                <BiArrowBack /> Back To Signup
              </p>
            </Link>
            <button
              className="flex items-center text-blue-100 gap-x-2"
              onClick={() => dispatch(sendOtp(signupData.email))}
            >
              <RxCountdownTimer />
              Resend it
            </button>
          </div>
        </div>
        }
    </div>
  )
}

export default VerifyEmail