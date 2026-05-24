import { CgProfile } from "react-icons/cg";
import { FaBook } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { MdHistory } from "react-icons/md";
import { SiCoursera } from "react-icons/si";

// todo add type in sidebar links each link to handle instructor and student specific dashboard
export const SidebarLinks = [
  {
    title: "My Profile",
    path: "/dashboard/my-profile",
    icon: CgProfile,
  },
  {
    title: "Enrolled Courses",
    path: "/dashboard/enrolled-courses",
    icon: FaBook,
  },
  {
    title: "Wishlist",
    path: "/dashboard/wishlist",
    icon: AiOutlineHeart,
  },
  {
    title: "Purchase History",
    path: "/dashboard/purchase-history",
    icon: MdHistory,
  },
  {
    title: "Courses",
    path: "/dashboard/courses",
    icon: SiCoursera,
  },
];