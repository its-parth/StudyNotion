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
import AddCourse from './components/core/Dashboard/AddCourse/index'
import EditCourse from './components/core/Dashboard/EditCourse/index'
import MyCourses from './components/core/Dashboard/MyCourses'
import DashboardDefaultPage from './components/core/Dashboard/DashboardDefaultPage'
import Catalog from './pages/Catalog'
import MyProfile from './components/core/Dashboard/MyProfile'
import Error from './pages/Error'
import Settings from './components/core/Dashboard/Setting/Settings'
import OpenRoute from './components/core/Authentication/OpenRoute'
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses'
import PrivateRoute from './components/core/Authentication/PrivateRoute'
import { useDispatch, useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from './utils/constants'
import { getUserDetails } from './services/operations/profileAPI'
import CourseDetails from './pages/CourseDetails'
import ViewCourse from './pages/ViewCourse'
import VideoDetails from './components/core/ViewCourse/VideoDetails'


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
          <Route path='/courses/:courseId' element={<CourseDetails />} />
          <Route path='/catalog/:catalogName' element={<Catalog />} />
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
        {/* todo create InstructorRoute like PrivateRoute */}
            {/* <Route
            path="add-course"
            element={
              <InstructorRoute>
                <AddCourse />
              </InstructorRoute>
            }
          />
          if (!token)
            return <Navigate to="/login" />;

          if (user.accountType !== ACCOUNT_TYPE.INSTRUCTOR)
            return <Navigate to="/dashboard" />; */}
          <Route path='/dashboard' element={<PrivateRoute><div className='h-[calc(100vh-66px)] w-full overflow-hidden'><Dashboard /></div></PrivateRoute>}>
            <Route index element={<DashboardDefaultPage />}></Route>
            {/* Route for all users */}
            <Route path='my-profile' element={<PrivateRoute><MyProfile /></PrivateRoute>}></Route>
            <Route path='settings' element={<PrivateRoute><Settings /></PrivateRoute>}></Route>
            {/* Route only for Students */}
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route
                  path="enrolled-courses"
                  element={<EnrolledCourses />}
                />
                {/* <Route path="/cart" element={<Cart />} /> */}
              </>
            )}
            {/* Route only for Instructors */}
            {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                {/* <Route path="instructor" element={<Instructor />} /> */}
                <Route path="my-courses" element={<PrivateRoute><MyCourses /></PrivateRoute>} />
                <Route path="add-course" element={<PrivateRoute><AddCourse /></PrivateRoute>} />
                <Route
                  path="edit-course/:courseId"
                  element={<PrivateRoute><EditCourse /></PrivateRoute>}
                />
              </>
            )}
          </Route>

          <Route path='/view-course' element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
          >
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path=':courseId/section/:sectionId/sub-section/:subSectionId' element={<VideoDetails />} />
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