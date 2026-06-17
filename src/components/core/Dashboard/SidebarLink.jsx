import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"
import { resetCourseState } from "../../../redux/slices/courseSlice"


export default function SidebarLink({ link, iconName }) {
  const Icon = Icons[iconName]
  const location = useLocation()
  const dispatch = useDispatch()

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (

    <NavLink
      to={link.path}
      onClick={() => dispatch(resetCourseState())}
      className={`flex gap-3 text-md text-richblack-300 transition-all duration-200 items-center px-4 py-3 ${matchRoute(link.path) ? 'border-l-3 border-yellow-50 bg-yellow-800 text-yellow-50' : ''}`}
    >
      <div className="flex items-center gap-x-2">
        {/* Icon Goes Here */}
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  )
}
