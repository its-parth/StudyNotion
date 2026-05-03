import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import { useState } from 'react'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Navbar from './components/common/Navbar'
import ForgotPassword from './pages/ForgotPassword'
function App() {
  return (
    <div className='w-full min-h-screen bg-richblack-900 flex flex-col font-inter items-center'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<AboutUs />} />
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/forgot-password' element={<ForgotPassword />}></Route>
      </Routes>
    </div>
  )
}

export default App