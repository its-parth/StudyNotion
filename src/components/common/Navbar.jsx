import React, { useEffect, useState } from 'react'
import CTAButton from './CTAButton'
import { NavbarLinks } from '../../../data/navbar-links'
import { Link, matchPath, useLocation } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { useSelector } from 'react-redux'
import { categories } from '../../services/apis'
import { apiConnector } from '../../services/apiConnector'
import { ACCOUNT_TYPE } from '../../utils/constants'
import ProfileDropdown from '../core/Authentication/ProfileDropdown'
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const location = useLocation();
    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    // const subLinks = [
    //     {
    //         title: "Python",
    //         link: "/catalog/python",
    //     },
    //     {
    //         title: "javascript",
    //         link: "/catalog/javascript",
    //     },
    //     {
    //         title: "web-development",
    //         link: "/catalog/web-development",
    //     },
    // ];

    useEffect(() => {
        async function fetchCategories() {
            setLoading(true);
            try {
                console.log("categories api: ", categories.CATEGORIES_API);
                await new Promise((resolve) =>
                setTimeout(resolve, 5000)
                );
                const res = await apiConnector("GET", categories.CATEGORIES_API);
                console.log("response: ", res);
                setSubLinks(res?.data?.data);
            } catch (err) {
                console.log("could not fetch categories ", err);
            } finally {
                setLoading(false);
            }
        }
        fetchCategories();
    }, []);

    return (
        <div className='w-full border-b border-richblack-700 flex justify-center'>
            <div className='text-white bg-richblack-900 w-11/12 max-w-maxContent'>
                <nav className='w-full flex justify-between items-center py-2'>
                    <div>
                        <img className='w-40' src={logo} alt="logo" />
                    </div>
                    <div className='hidden md:flex gap-7 text-richblack-25'>
                        {
                            NavbarLinks.map((link, index) => {
                                return link.title === "Catalog" ? (
                                    <div key={index} className={`group relative flex cursor-pointer flex-col gap-1 ${matchRoute("/catalog/:catalogName") ? "text-yellow-25" : "text-richblack-25"} relative`}>
                                        <p>{link.title}</p>
                                        <div className='w-max min-w-55 md:min-w-70 absolute top-full left-1/2 -translate-x-1/2 opacity-0 invisible translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50 mt-1'>
                                            <div className='h-4 w-4 bg-white rotate-45 z-40 mx-auto relative top-2'></div>
                                            <div className='w-full flex bg-white p-4 flex-col rounded-lg'>
                                                {
                                                    loading ? (
                                                        <p className='text-black'>Loading...</p>
                                                    ) : subLinks.length ? subLinks.map((category) => {
                                                        return <Link key={category._id} className='text-black hover:bg-richblack-50 w-full px-3 py-2 rounded-lg' to={`/catalog/${category.name.split(" ").join("-").toLowerCase()}`}>{category.name}</Link>
                                                    }) : <p>No Courses Found</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                                    :
                                    (
                                        <Link key={index} to={link.path}>
                                            <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                {link.title}
                                            </p>
                                        </Link>
                                    )
                            })
                        }
                    </div>
                    <div className='hidden md:flex'>
                        {user === null &&
                            <div className='flex gap-3'>
                                <CTAButton linkTo={"/login"} text={"Log in"} />
                                <CTAButton linkTo={"/signup"} text={"Sign up"} />
                            </div>
                        }
                        {user && user?.accountType == ACCOUNT_TYPE.STUDENT && (
                            <div>
                                <Link to={"/dashboard/cart"} className='relative'>
                                    <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                                    {totalItems > 0 && (
                                        <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                            {totalItems}
                                        </span>
                                    )}
                                </Link>
                                <ProfileDropdown />
                            </div>
                        )}
                    </div>
                    <button className="mr-4 md:hidden">
                        <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
                    </button>
                </nav>
            </div>
        </div>
    )
}

export default Navbar