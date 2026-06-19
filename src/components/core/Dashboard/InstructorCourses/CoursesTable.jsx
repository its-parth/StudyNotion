import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

import { formatDate } from "../../../../services/formatDate"
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI"
import { COURSE_STATUS } from "../../../../utils/constants"
import ConfirmationModal from "../../../Common/ConfirmationModal"

export default function CoursesTable({ courses, setCourses }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 20 // Slightly shorter for tighter spaces

  const handleCourseDelete = async (courseId) => {
    setLoading(true)
    await deleteCourse({ courseId: courseId }, token)
    const result = await fetchInstructorCourses(token)
    if (result) {
      setCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }

  return (
    <>
      <div className="rounded-xl border border-richblack-800 bg-richblack-900 overflow-hidden">
        {/* Table Header - Hidden on Mobile, Visible on Desktop */}
        <div className="hidden md:grid grid-cols-[5fr_1fr_1fr_1fr] border-b border-b-richblack-800 px-6 py-4 bg-richblack-800/50">
          <div className="text-left text-sm font-medium uppercase text-richblack-100">Courses</div>
          <div className="text-left text-sm font-medium uppercase text-richblack-100">Duration</div>
          <div className="text-left text-sm font-medium uppercase text-richblack-100">Price</div>
          <div className="text-left text-sm font-medium uppercase text-richblack-100">Actions</div>
        </div>

        {/* Table Body */}
        <div>
          {courses?.length === 0 ? (
            <div className="py-10 text-center text-2xl font-medium text-richblack-100">
              No courses found
            </div>
          ) : (
            courses?.map((course) => (
              <div
                key={course._id}
                
                className="flex flex-col gap-y-4 md:grid md:grid-cols-[5fr_1fr_1fr_1fr] md:items-center border-b border-richblack-800 last:border-b-0 px-4 py-6 md:px-6 md:py-8 hover:bg-richblack-800/10 transition-all"
              >
                {/* 1. Course Details Column */}
                <div className="flex flex-col sm:flex-row gap-4 min-w-0">
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="h-37 w-full sm:w-55 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex flex-col justify-between py-1 min-w-0">
                    <div>
                      <p className="text-lg font-semibold text-richblack-5 truncate">
                        {course.courseName}
                      </p>
                      <p className="text-xs text-richblack-300 mt-1 line-clamp-2 md:line-clamp-3">
                        {course.courseDescription.split(" ").length > TRUNCATE_LENGTH
                          ? course.courseDescription.split(" ").slice(0, TRUNCATE_LENGTH).join(" ") + "..."
                          : course.courseDescription}
                      </p>
                    </div>
                    
                    <div className="mt-4 md:mt-2 space-y-1.5">
                      <p className="text-[12px] text-richblack-400">
                        Created: {formatDate(course.createdAt)}
                      </p>
                      {course.status === COURSE_STATUS.DRAFT ? (
                        <span className="inline-flex items-center gap-2 rounded-full bg-richblack-700 px-2 py-0.5 text-[12px] font-medium text-pink-100 w-fit">
                          <HiClock size={14} />
                          Drafted
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 rounded-full bg-richblack-700 px-2 py-0.5 text-[12px] font-medium text-yellow-100 w-fit">
                          <span className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                            <FaCheck size={8} />
                          </span>
                          Published
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. Duration Column */}
                <div className="flex justify-between md:block text-sm font-medium text-richblack-100 border-t border-richblack-800 pt-3 md:border-t-0 md:pt-0">
                  <span className="md:hidden text-xs text-richblack-400 uppercase font-normal">Duration</span>
                  <span>2hr 30min</span>
                </div>

                {/* 3. Price Column */}
                <div className="flex justify-between md:block text-sm font-medium text-richblack-100 border-t border-richblack-800 pt-3 md:border-t-0 md:pt-0">
                  <span className="md:hidden text-xs text-richblack-400 uppercase font-normal">Price</span>
                  <span className="text-caribbeangreen-300 md:text-richblack-100">₹{course.price}</span>
                </div>

                {/* 4. Actions Column */}
                <div className="flex justify-between items-center md:block text-sm font-medium text-richblack-100 border-t border-richblack-800 pt-3 md:border-t-0 md:pt-0">
                  <span className="md:hidden text-xs text-richblack-400 uppercase font-normal">Actions</span>
                  <div className="flex gap-x-3">
                    <button
                      disabled={loading}
                      onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                      title="Edit"
                      className="p-1 text-richblack-100 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                    >
                      <FiEdit2 size={20} />
                    </button>
                    <button
                      disabled={loading}
                      onClick={() => {
                        setConfirmationModal({
                          text1: "Do you want to delete this course?",
                          text2: "All the data related to this course will be deleted",
                          btn1Text: !loading ? "Delete" : "Loading...",
                          btn2Text: "Cancel",
                          btn1Handler: !loading ? () => handleCourseDelete(course._id) : () => {},
                          btn2Handler: !loading ? () => setConfirmationModal(null) : () => {},
                        })
                      }}
                      title="Delete"
                      className="p-1 text-richblack-100 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                    >
                      <RiDeleteBin6Line size={20} />
                    </button>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}