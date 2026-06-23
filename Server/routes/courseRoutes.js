const express = require('express');
const router = express.Router();

const { getCourseDetails, createCourse, getAllCourses, getFullCourseDetails, getInstructorCourses, deleteCourse, editCourse } = require('../controllers/courseController');

const { getCategoryPageDetails, getAllCategories, createCategory } = require('../controllers/categoryController');

const { createRatingAndReview, getAverageRating, getAllRatingsAndReviews } = require('../controllers/ratingAndReviewController');

const { createSection, updateSection, deleteSection } = require('../controllers/sectionController');

const { createSubSection, updateSubSection, deleteSubSection } = require('../controllers/subSectionController');

// importing middlewares
const { isAuth, isInstructor, isStudent, isAdmin } = require('../middlewares/auth');


// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// // courses can only be created by instructors
router.post('/createCourse', isAuth, isInstructor, createCourse);
// //Add a Section to a Course
router.post("/addSection", isAuth, isInstructor, createSection)
// Edit Course routes
router.post("/editCourse", isAuth, isInstructor, editCourse)
// // Update a Section
router.post("/updateSection", isAuth, isInstructor, updateSection)
// // Delete a Section
router.post("/deleteSection", isAuth, isInstructor, deleteSection)
// // Edit Sub Section
router.post("/updateSubSection", isAuth, isInstructor, updateSubSection)
// // Delete Sub Section
router.post("/deleteSubSection", isAuth, isInstructor, deleteSubSection)
// // Add a Sub Section to a Section
router.post("/addSubSection", isAuth, isInstructor, createSubSection)
// // Get all Registered Courses
router.get("/getAllCourses", getAllCourses)
// // Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)
// Get Details for a Specific Courses
router.post("/getFullCourseDetails", isAuth, getFullCourseDetails)
// To Update Course Progress
// router.post("/updateCourseProgress", isAuth, isStudent, updateCourseProgress)
// To get Course Progress
// router.post("/getProgressPercentage", isAuth, isStudent, getProgressPercentage)
// Delete a Course
router.delete("/deleteCourse", isAuth, isInstructor, deleteCourse)
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", isAuth, isInstructor, getInstructorCourses)

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
router.post("/createCategory", isAuth, isAdmin, createCategory)
router.get("/showAllCategories", getAllCategories)
router.get("/categoryPageDetails/:categoryId", getCategoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", isAuth, isStudent, createRatingAndReview) 
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRatingsAndReviews)

module.exports = router;