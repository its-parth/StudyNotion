import React from 'react'
import EditButton from '../EditButton';
import { useSelector } from 'react-redux';
import EditProfile from './EditProfile';
const Settings = () => {
  const { user } = useSelector((state) => state.profile);
    return (
        <div className='font-inter p-6'>
            <h1 className='text-white text-4xl font-semibold'>Edit Profile</h1>

            <EditProfile />
        </div>
    )
}

export default Settings