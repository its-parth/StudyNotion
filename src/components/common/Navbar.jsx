import React from 'react'
import CTAButton from './CTAButton'
import { NavbarLinks } from '../../../data/navbar-links'
import { Link } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
const Navbar = () => {
  return (
    <div className='w-full border-b border-richblack-700 flex justify-center'>
        <div className='text-white bg-richblack-900 w-11/12 max-w-maxContent'>
            <nav className='w-full flex justify-between items-center py-2'>
                    <div>
                        <img className='w-40' src={logo} alt="logo" />
                    </div>
                    <div className='flex gap-7 text-richblack-25'>
                        {
                            NavbarLinks.map((link) => {
                                return link.title === "Catalog" ? (<div>{link.title}</div>)
                                :
                                (<Link to={link.path}>{link.title}</Link>)
                            })
                        }
                    </div>
                    <div className='flex gap-3'>
                        <CTAButton linkTo={"/login"} text={"Log in"} />
                        <CTAButton linkTo={"/signup"} text={"Sign up"} />
                    </div>
            </nav>
        </div>
    </div>
  )
}

export default Navbar