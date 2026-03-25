const express = require('express');
const router = express.Router();

const { getCourseDetails, createCourse, getAllCourses } = require('../controllers/courseController');

const { getCategoryPageDetails, getAllCategories, createCategory } = require('../controllers/categoryController');

const { createRatingAndReview, getAverageRating, getAllRatingsAndReviews } = require('../controllers/RatingAndReview');

const { createSection, updateSection, deleteSection } = require('../controllers/Section');

const { createSubSection, updateSubSection, deleteSubSection } = require('../controllers/SubSection');

// importing middlewares
const { isAuth, isInstructor, isStudent, isAdmin } = require('../middlewares/auth');


// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// // courses can only be created by instructors
router.post('/createCourse', isAuth, isInstructor, createCourse);
// //Add a Section to a Course
router.post("/addSection", isAuth, isInstructor, createSection)
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

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
router.post("/createCategory", isAuth, isAdmin, createCategory)
router.get("/showAllCategories",isAuth, isAdmin, getAllCategories)
// doubt why?? 
router.post("/categoryPageDetails", isAuth, isAdmin, getCategoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", isAuth, isStudent, createRatingAndReview) 
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRatingsAndReviews)

module.exports = router;