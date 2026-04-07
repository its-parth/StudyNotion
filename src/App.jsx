import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
function App() {

  return (
    <div className='w-full min-h-screen bg-richblack-900 flex flex-col font-inter items-center'>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<AboutUs />} />
      </Routes>
    </div>
  )
}

export default App