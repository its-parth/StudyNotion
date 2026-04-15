import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import { useState } from 'react'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Navbar from './components/common/Navbar'
function App() {
const [isLogin, setIsLogin] = useState(false);
  return (
    <div className='w-full min-h-screen bg-richblack-900 flex flex-col font-inter items-center'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<AboutUs />} />
        <Route path='/login' element={<Login setIsLogin={setIsLogin}/>}></Route>
          <Route path='/signup' element={<Signup setIsLogin={setIsLogin}/>}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
      </Routes>
    </div>
  )
}

export default App