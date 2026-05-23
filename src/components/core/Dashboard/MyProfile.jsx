import React, { useState } from 'react'
import EditButton from './EditButton';
// todo make routes private route and open route bcoz suppose user open this page directly without login and we don't have user so it will display error thats why hw is to create private and open route and if non login user tries to access private route it may be directed to login page
const MyProfile = () => {
    const {user} = useState((state) => state.profile);
  return (
    <div className='font-inter p-6'>
        <h1 className='text-white text-4xl font-semibold'>My Profile</h1>

        {/* section1 */}
        <section className='w-full bg-richblack-800 border border-richblack-700'>
            <div>
                <div>
                    <img src={user?.image} alt="profile-img" />
                </div>
                <div>
                    <div>{user?.firstName} {user?.lastName}</div>
                    <div>{user?.email}</div>
                </div>
            </div>
            <div>
                <EditButton /> 
            </div>
        </section>
    </div>
  )
}

export default MyProfile