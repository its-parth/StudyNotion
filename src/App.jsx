import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import { useEffect, useState } from 'react'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Navbar from './components/common/Navbar'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'
import VerifyEmail from './pages/VerifyEmail'
import DashboardDefaultPage from './components/core/Dashboard/DashboardDefaultPage'
import MyProfile from './components/core/Dashboard/MyProfile'

import Settings from './components/core/Dashboard/Setting/Settings'
import OpenRoute from './components/core/Authentication/OpenRoute'
import PrivateRoute from './components/core/Authentication/PrivateRoute'
import { useDispatch, useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from './utils/constants'
import { getUserDetails } from './services/operations/profileAPI'
import AddCourse from './components/core/Dashboard/AddCourse/index'
// todo create open route and private route 
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token")
      console.log("token: ", token);
      dispatch(getUserDetails(token, navigate))
    }
  }, [])

  return (
    <div className='w-full min-h-screen bg-richblack-900 flex flex-col font-inter items-center'>
      <Navbar />
      <div className="flex-1 w-full flex justify-center">
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<AboutUs />} />
          <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:resetPassToken"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

          <Route path='/dashboard' element={<PrivateRoute><div className='h-[calc(100vh-66px)] w-full overflow-hidden'><Dashboard /></div></PrivateRoute>}>
            <Route index element={<DashboardDefaultPage />}></Route>
            {/* Route for all users */}
            <Route path='my-profile' element={<MyProfile />}></Route>
            <Route path='settings' element={<Settings />}></Route>
            {/* Route only for Students */}
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route
                  path="enrolled-courses"
                  element={<EnrolledCourses />}
                />
                <Route path="/cart" element={<Cart />} />
              </>
            )}
            {/* Route only for Instructors */}
            {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                {/* <Route path="instructor" element={<Instructor />} /> */}
                {/* <Route path="my-courses" element={<MyCourses />} /> */}
                <Route path="add-course" element={<AddCourse />} />
                {/* <Route
                  path="edit-course/:courseId"
                  element={<EditCourse />}
                /> */}
              </>
            )}
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<Error />} />
        </Routes>
        
      </div>
    </div>
  )
}

export default App