const express = require('express');
const router = express.Router();

// importing handlers
const { updateProfile, deleteAccount, getUserAllDetails, updateDisplayPicture, getEnrolledCourses } = require('../controllers/Profile');
const { isAuth } = require('../middlewares/auth');

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", deleteAccount)
router.put("/updateProfile", isAuth, updateProfile)
router.get("/getUserDetails", isAuth, getUserAllDetails)
// // Get Enrolled Courses
router.get("/getEnrolledCourses", isAuth, getEnrolledCourses)
router.put("/updateDisplayPicture", isAuth, updateDisplayPicture)

module.exports = router;