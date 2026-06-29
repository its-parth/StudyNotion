// Import the required modules
const express = require("express")
const router = express.Router()
const {
  capturePayment,
  verifyPayment,
  sendPaymentSuccessEmail,
} = require("../controllers/paymentController")
const { isAuth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")

router.post("/capturePayment", isAuth, isStudent, capturePayment)
router.post("/verifyPayment", isAuth, isStudent, verifyPayment)
router.post(
  "/sendPaymentSuccessEmail",
  isAuth,
  isStudent,
  sendPaymentSuccessEmail
)

module.exports = router
