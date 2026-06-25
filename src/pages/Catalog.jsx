import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import Footer from "../components/Common/Footer"
import CourseCard from "../components/core/Catalog/CourseCard"
import CourseSlider from "../components/core/Catalog/CourseSlider"
import { apiConnector } from "../services/apiConnector"
import { categories } from "../services/apis"
import { getCatalogPageData } from "../services/operations/catalogDetailsAPI"
import Error from "./Error"
import Loader from '../components/common/Loader'
function Catalog() {
  const [loading, setLoading] = useState(false);
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryId, setCategoryId] = useState("")
  // Fetch All Categories
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        const category_id = res?.data?.data?.filter(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        )[0]._id
        setCategoryId(category_id)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
    })()
  }, [catalogName])
  useEffect(() => {
    if (categoryId) {
      (async () => {
        try {
          const res = await getCatalogPageData(categoryId)
          setCatalogPageData(res)
        } catch (error) {
          console.log(error)
        }
      })()
      setLoading(false);
    }
  }, [categoryId])

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-66px)] place-items-center">
        <Loader />
      </div>
    )
  }
  if (!loading && !catalogPageData.success) {
    return <Error />
  }

  return (
    <div className="flex-col w-full">
      {/* Hero Section */}
      <div className="bg-richblack-800 px-15 lg:px-20 xl:px-30">
        <div className="mx-auto flex min-h-65 flex-col justify-center gap-4">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5 font-semibold">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-217.5 text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div className=" mx-auto w-full max-w-maxContentTab px-8 py-12 lg:max-w-maxContent">
        <div className="section_heading">Courses to get you started</div>
        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          <p
            className={`px-4 py-2 ${
              active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Populer
          </p>
          <p
            className={`px-4 py-2 ${
              active === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div className="pt-3">
          <CourseSlider
            Courses={catalogPageData?.data?.selectedCategory?.courses}
          />
        </div>
      </div>
      {/* Section 2 */}
      <div className=" mx-auto w-full max-w-maxContentTab px-8 py-12 lg:max-w-maxContent">
        <div className="section_heading">
          Our Top Courses
        </div>
        <div className="pt-4">
            <CourseSlider
            Courses={catalogPageData?.data?.mostSellingCourses}
          />
          
        </div>
      </div>

      {/* Section 3 */}
      <div className=" mx-auto w-full max-w-maxContentTab px-8 py-12 lg:max-w-maxContent">
        <div className="section_heading">Related Courses</div>
        <div className="pt-4">
            <CourseSlider
            Courses={catalogPageData?.data?.differentCategory}
          />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Catalog
