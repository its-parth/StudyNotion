import React, { useState } from 'react'
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';
import { IoMdSettings } from "react-icons/io";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from '../../common/ConfirmationModal';
import { logout } from '../../../services/operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import { sidebarLinks } from '../../../data/dashboard-links';
import SidebarLink from './SidebarLink';

const Sidebar = () => {
    const { user, loading: profileLoading } = useSelector(state => state.profile);
    const { loading: authLoading } = useSelector(state => state.auth);
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }
    const dispatch = useDispatch();
    const [confirmationModal, setConfirmationModal] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-55 items-center border-r border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    )
  }
  return (
    <div className='w-full bg-richblack-800 h-full flex flex-col border-r border-richblack-700 font-semibold text-md pt-4'>
        {
            sidebarLinks.map((link) => {
                    if(link.type && user?.accountType !== link.type) return null;
                    return (
                        <SidebarLink key={link.id} link={link} iconName={link.icon} />
                    )
            })
        }
        <div className='px-2 py-5 w-full'>
            <div className='w-full border border-richblack-600'></div>
        </div>
        <div>
            <Link className={`transition-all duration-200 flex gap-3 text-md text-richblack-300 items-center px-4 py-3 ${matchRoute('/dashboard/settings') ? 'border-l-3 border-yellow-50 bg-yellow-800 text-yellow-50' : ''}`} to={'/dashboard/settings'}><IoMdSettings />Settings</Link>
            <div onClick={() => {
               setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => {
                    dispatch(logout());
                    navigate('/login');
                },
                btn2Handler: () => setConfirmationModal(null),
              }) 
            }} className={`flex gap-3 text-md text-richblack-300 items-center px-4 py-3 cursor-pointer`}><VscSignOut />Logout</div>
        </div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        
    </div>
  )
}

export default Sidebar