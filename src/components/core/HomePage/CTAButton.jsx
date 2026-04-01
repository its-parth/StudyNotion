import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const CTAButton = ({ text, variant = "primary", arrow, linkTo}) => {
    const baseStyles = "rounded-sm w-fit px-4 py-2 font-bold transition-all duration-75 hover:scale-95 cursor-pointer";
    const variants = {
        primary: "text-white bg-richblack-800 border-r-2 border-b-2 border-pure-greys-500",
        secondary: "text-black bg-yellow-50 border-r-2 border-b-2 border-yellow-500",
    };
    return (
        <Link to={linkTo} className={`${baseStyles} ${variants[variant]} flex items-center gap-2`}>
                {text}
                {
                    arrow && <FaArrowRight />
                }
        </Link>
    )
}

export default CTAButton