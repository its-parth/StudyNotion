import React from 'react'
import { SidebarLinks } from '../../../data/sidebar-links'
import { Link, matchPath, useLocation } from 'react-router-dom';
import { IoMdSettings } from "react-icons/io";
import { VscSignOut } from "react-icons/vsc";

const Sidebar = () => {
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }
    const location = useLocation();
  return (
    <div className='w-full bg-richblack-800 h-full flex flex-col border-r border-richblack-700'>
        {
            SidebarLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                    <Link key={index} className={`flex gap-3 text-md text-richblack-300 items-center px-4 py-3 ${matchRoute(link.path) ? 'border-l-3 border-yellow-50 bg-yellow-800 text-yellow-50' : ''}`} to={link.path}>
                        <Icon />
                        <span>{link.title}</span>
                    </Link>
                )
            })
        }
        <div className='px-2 py-5 w-full'>
            <div className='w-full border border-richblack-600'></div>
        </div>
        <div>
            <Link className={`flex gap-3 text-md text-richblack-300 items-center px-4 py-3 ${matchRoute('/dashboard/settings') ? 'border-l-3 border-yellow-50 bg-yellow-800 text-yellow-50' : ''}`} to={'/dashboard/settings'}><IoMdSettings />Settings</Link>
            <div className={`flex gap-3 text-md text-richblack-300 items-center px-4 py-3 cursor-pointer`}><VscSignOut />Logout</div>
        </div>
    </div>
  )
}

export default Sidebar