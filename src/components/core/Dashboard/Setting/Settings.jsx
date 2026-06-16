import React from 'react'
import EditButton from '../EditButton';
import { useSelector } from 'react-redux';
import EditProfile from './EditProfile';
import ChangeProfilePicture from './ChangeProfilePicture'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount';
const Settings = () => {
  const { user } = useSelector((state) => state.profile);
    return (
        <div className='font-inter p-6'>
            <h1 className='text-white text-4xl font-semibold'>Edit Profile</h1>
            
            <ChangeProfilePicture />
            <EditProfile />
            <UpdatePassword />
            <DeleteAccount />
        </div>
    )
}

export default Settings