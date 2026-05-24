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
import UpdatePassword from './pages/UpdatePassword'
import VerfiyEmail from './pages/VerfiyEmail'
import DashboardDefaultPage from './components/core/Dashboard/DashboardDefaultPage'
import MyProfile from './components/core/Dashboard/MyProfile'
import Wishlist from './components/core/Dashboard/Wishlist'
import PurchaseHistory from './components/core/Dashboard/PurchaseHistory'
import Settings from './components/core/Dashboard/Settings'

// todo create open route and private route 
function App() {
  return (
    <div className='w-full min-h-screen bg-richblack-900 flex flex-col font-inter items-center'>
      <Navbar />
      <div className="flex-1 w-full flex justify-center">
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<AboutUs />} />
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/dashboard' element={<div className='h-[calc(100vh-66px)] w-full overflow-hidden'><Dashboard /></div>}>
            <Route index element={<DashboardDefaultPage />}></Route>
            <Route path='my-profile' element={<MyProfile />}></Route>
            <Route path='wishlist' element={<Wishlist />}></Route>
            <Route path='purchase-history' element={<PurchaseHistory />}></Route>
            <Route path='settings' element={<Settings />}></Route>
          </Route>
          <Route path='/forgot-password' element={<ForgotPassword />}></Route>
          <Route path='/update-password/:resetPassToken' element={<UpdatePassword />}></Route>
          <Route path='/verify-email' element={<VerfiyEmail />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App