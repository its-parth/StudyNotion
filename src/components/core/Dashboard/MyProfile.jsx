import React from 'react'
import EditButton from './EditButton';
import { useSelector } from 'react-redux';
// todo make routes private route and open route bcoz suppose user open this page directly without login and we don't have user so it will display error thats why hw is to create private and open route and if non login user tries to access private route it may be directed to login page
const MyProfile = () => {
    const { user } = useSelector((state) => state.profile);
    return (
        <div className='font-inter p-6'>
            <h1 className='text-white text-4xl font-semibold'>My Profile</h1>

            {/* section1 */}
            <section className='w-full bg-richblack-800 border-2 border-richblack-700 mt-10 flex rounded-md px-6 py-6 items-center justify-between'>
                <div className='flex gap-6 items-center'>
                    <div className='w-20 h-20 rounded-full overflow-hidden'>
                        <img className='w-full h-full object-cover' src={user?.image} alt="profile-img" />
                    </div>
                    <div>
                        <div className='text-richblack-5 text-lg font-semibold'>{user?.firstName} {user?.lastName}</div>
                        <div className='text-richblack-300'>{user?.email}</div>
                    </div>
                </div>
                <div>
                    <EditButton to={'/dashboard/settings'} />
                </div>
            </section>

            {/* section 2 */}
            <section className='w-full bg-richblack-800 border-2 border-richblack-700 mt-10 flex flex-col gap-2 rounded-md px-6 py-6'>
                <div className='flex items-center justify-between w-full pt-2 pb-6'>
                    <div className='text-richblack-5 text-lg font-semibold'>About</div>
                    <div>
                        <EditButton to={'/dashboard/settings'} />
                    </div>
                </div>
                <div className='text-richblack-300 text-base'>
                    {
                        user?.additionalDetails?.about || 'Write Something About Yourself'
                    }
                </div>
            </section>

            {/* section 3 */}
            <section className='w-full bg-richblack-800 border-2 border-richblack-700 mt-10 flex flex-col gap-2 rounded-md px-6 py-6'>
                <div className='flex items-center justify-between w-full pt-2 pb-7'>
                    <div className='text-richblack-5 text-lg font-semibold'>Personal Details</div>
                    <div>
                        <EditButton to={'/dashboard/settings'} />
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-wrap gap-3'>
                        <div className='flex-1 flex flex-col gap-1 min-w-65'>
                            <div className='text-richblack-500 text-sm'>First Name</div>
                            <div className='text-richblack-5'>{user.firstName}</div>
                        </div>
                        <div className='flex-1 flex flex-col gap-1 min-w-65'>
                            <div className='text-richblack-500 text-sm'>Last Name</div>
                            <div className='text-richblack-5'>{user.lastName}</div>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-3'>
                        <div className='flex-1 flex flex-col gap-1 min-w-65'>
                            <div className='text-richblack-500 text-sm'>Email</div>
                            <div className='text-richblack-300'>{user.email}</div>
                        </div>
                        <div className='flex-1 flex flex-col gap-1 min-w-65'>
                            <div className='text-richblack-500 text-sm'>Phone Number</div>
                            <div className={`${(user?.additionalDetails?.contactNumber) ? 'text-richblack-5' : 'text-richblack-300'}`}>
                                {user?.additionalDetails?.contactNumber || 'Add Contact Number'}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-3'>
                        <div className='flex-1 flex flex-col gap-1 min-w-65'>
                            <div className='text-richblack-500 text-sm'>Gender</div>
                            <div className={`${(user?.additionalDetails?.gender) ? 'text-richblack-5' : 'text-richblack-300'}`}>
                                {user?.additionalDetails?.gender || 'Add Gender'}
                            </div>
                        </div>
                        <div className='flex-1 flex flex-col gap-1 min-w-65'>
                            <div className='text-richblack-500 text-sm'>Date Of Birth</div>
                            <div
                                className={`${user?.additionalDetails?.dateOfBirth
                                        ? "text-richblack-5"
                                        : "text-richblack-300"
                                    }`}
                            >
                                {user?.additionalDetails?.dateOfBirth ? (
                                    new Date(
                                        user?.additionalDetails?.dateOfBirth
                                    ).toLocaleDateString("en-GB", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })
                                ) : (
                                    "Add Date Of Birth"
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default MyProfile