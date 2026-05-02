import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GoTriangleDown } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import useOnClickOutside from '../../../hooks/useOnClickOutside';

const ProfileDropdown = () => {
  const {user} = useSelector((state) => state.profile);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useOnClickOutside(dropdownRef, () => setOpen(false));

  if(!user) return null;

  return (
    <div className='flex gap-1 items-center relative' ref={dropdownRef}>
      <img className='select-none w-8 h-8 rounded-full' src={user.image} alt="user-img" />
      <GoTriangleDown onClick={() => setOpen(prev => !prev)} className='text-richblack-200 cursor-pointer' size={25}/>
      
      <div className={`z-50 mt-2 absolute top-full right-0 select-none transition-all duration-300 bg-richblack-800 border border-richblack-700 overflow-hidden rounded-lg divide-y divide-richblack-700 ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}>
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)} className='flex w-full items-center gap-x-1 py-2.5 px-3 text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25'>
              <VscDashboard className="text-lg" />
              Dashboard
          </Link>
          <div onClick={() => {
            // do logout 
            setOpen(false);
          }} className='flex w-full items-center gap-x-1 py-2.5 px-3 text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25'>
            <VscSignOut className="text-lg" />
            Logout
          </div>
      </div>
    </div>
  )
}

export default ProfileDropdown