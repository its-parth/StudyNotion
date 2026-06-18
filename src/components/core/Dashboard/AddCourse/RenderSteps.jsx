import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import PublishCourse from "./PublishCourse"
import { toast } from "react-toastify"

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course)

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ]

  return (
    <>
      <div className="relative mb-2 flex w-full">
        {steps.map((item) => (
          <div key={item.id} className={`flex ${item.id !== steps.length && "flex-1"}`}>
              <button
                className={`grid cursor-default aspect-square w-8.5 place-items-center rounded-full border ${
                  step === item.id
                    ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                } ${step > item.id && "bg-yellow-50 text-yellow-50"}} `}
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-richblack-900" />
                ) : (
                  item.id
                )}
              </button>
              {item.id !== steps.length && (
                <div
                  className={`flex-1 h-4.25  border-dashed border-b-2 ${
                  step > item.id  ? "border-yellow-50" : "border-richblack-500"
                } `}
                ></div>
            )}
            
          </div>
        ))}
      </div>
      
      <div className="flex w-full">
  {steps.map((item, index) => (
    <div
      key={item.id}
      className={`${
        item.id !== 2 ? "flex-1" : ""
      } mx-2`}
    >
      <p
        className={`
          ${
                  step >= item.id ? "text-richblack-5" : "text-richblack-500"
          }
          text-sm
          ${index === 0 ? "text-left" : ""}
          ${index === 1 ? "text-center" : ""}
          ${index === 2 ? "text-right" : ""}
        `}
      >
        {item.title}
      </p>
    </div>
  ))}
</div>
      {/* Render specific component based on current step */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  )
}
