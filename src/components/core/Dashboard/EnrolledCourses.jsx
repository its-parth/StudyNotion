import { useEffect, useState } from "react"
import ProgressBar from '../../common/ProgressBar.jsx'
import { BiDotsVerticalRounded } from "react-icons/bi"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Loader from '../../common/Loader.jsx'
import { formatDuration } from '../../../utils/formatDuration.js'
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"

export default function EnrolledCourses() {
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const [enrolledCourses, setEnrolledCourses] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const res = await getUserEnrolledCourses(token) // Getting all the published and the drafted courses

                // Filtering the published course out
                const filterPublishCourse = res.filter((ele) => ele.status !== "Draft")
                // console.log(
                //   "Viewing all the couse that is Published",
                //   filterPublishCourse
                // )

                setEnrolledCourses(filterPublishCourse)
            } catch (error) {
                console.log("Could not fetch enrolled courses.")
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className="text-3xl text-richblack-50">Enrolled Courses</div>
            {!enrolledCourses ? (
                <div className="grid place-items-center">
                    <Loader />
                </div>
            ) : !enrolledCourses.length ? (
                <div className="mt-5 flex min-h-[40vh] flex-col items-center justify-center gap-3 rounded-lg border border-richblack-700 bg-richblack-800 p-8">
                    <h2 className="text-2xl font-semibold text-richblack-5">
                        No Courses Enrolled
                    </h2>
                    <p className="text-center text-richblack-300">
                        You haven't enrolled in any courses yet.
                    </p>
                    <p className="text-center text-sm text-richblack-400">
                        Explore our catalog and start your learning journey today.
                    </p>
                </div>
            ) : (
                <div className="my-8 text-richblack-5">
                    {/* Headings */}
                    <div className="flex rounded-t-lg bg-richblack-500 ">
                        <p className="w-[45%] px-5 py-3">Course Name</p>
                        <p className="w-1/4 px-2 py-3">Duration</p>
                        <p className="flex-1 px-2 py-3">Progress</p>
                    </div>
                    {/* Course Names */}
                    {enrolledCourses.map((course, i, arr) => {
                        return <div
                            className={`flex items-center border border-richblack-700 ${i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                                }`}
                            key={i}
                        >
                            <div
                                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                                onClick={() => {
                                    navigate(
                                        `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSections?.[0]?._id}`
                                    )
                                }}
                            >
                                <img
                                    src={course.thumbnail}
                                    alt="course_img"
                                    className="h-14 w-14 rounded-lg object-cover"
                                />
                                <div className="flex max-w-xs flex-col gap-2">
                                    <p className="font-semibold">{course.courseName}</p>
                                    <p className="text-xs text-richblack-300">
                                        {course.courseDescription.length > 50
                                            ? `${course.courseDescription.slice(0, 50)}...`
                                            : course.courseDescription}
                                    </p>
                                </div>
                            </div>
                            <div className="w-1/4 px-2 py-3">{formatDuration(course?.totalDuration)}</div>
                            <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                                <p>Progress: {course.progressPercentage || 0}%</p>
                                <ProgressBar value={course.progressPercentage} />
                            </div>
                        </div>
                })}
                </div>
            )}
        </>
    )
}
