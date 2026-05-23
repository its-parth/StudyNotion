import React from 'react'
import Sidebar from '../components/common/Sidebar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='flex-1 bg-red-500 w-full flex'>
      <div className='w-64'>
        <Sidebar />
      </div>
      <div className='flex-1 h-2500 flex justify-center'>
        <div className='bg-yellow-50 w-full max-w-250'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard