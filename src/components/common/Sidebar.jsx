import React from 'react'
import { SidebarLinks } from '../../data/sidebar-links'
import { Link, matchPath, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }
    const location = useLocation();
  return (
    <div className='w-full bg-richblack-700 h-full flex flex-col'>
        {
            SidebarLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                    <Link key={index} className={`flex gap-3 text-md text-richblack-300 items-center px-3 py-3 ${matchRoute(link.path) ? 'border-l-2 border-yellow-50 bg-yellow-800 text-yellow-50' : ''}`} to={link.path}>
                        <Icon />
                        <span>{link.title}</span>
                    </Link>
                )
            })
        }
    </div>
  )
}

export default Sidebar