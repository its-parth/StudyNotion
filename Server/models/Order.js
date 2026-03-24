const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },

  amount: Number,

  orderId: String,     // Razorpay order id
  paymentId: String,

  status: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },
}, { timestamps: true });