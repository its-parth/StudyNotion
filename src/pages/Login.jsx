import React from 'react'
import loginImage from '../assets/Images/login.webp'
import frame from '../assets/Images/frame.png'
import Template from '../components/core/Authentication/Template'
const Login = ({setIsLogin}) => {
  const heading = "Welcome Back";
  const description1 = "Build skills for today, tomorrow, and beyond.";
  const description2 = "Education to future-proof your career.";
  const type="login";
  return (
    <div className='w-full'>
      <Template setIsLogin={setIsLogin} heading={heading} description1={description1} description2={description2} type={type} img={loginImage} frame={frame}  />
    </div>
  )
}

export default Login