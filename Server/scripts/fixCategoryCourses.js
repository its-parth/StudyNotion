const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const {connectDB} = require("../config/database");
const Course = require("../models/Course");
const Category = require("../models/Category");

async function fixCategoryCourses() {
  try {
    await connectDB();

    console.log("DB Connected");

    await Category.updateMany(
      {},
      {
        $set: { courses: [] },
      }
    );

    const courses = await Course.find(
      {},
      {
        _id: 1,
        category: 1,
      }
    );

    for (const course of courses) {
      await Category.findByIdAndUpdate(
        course.category,
        {
          $addToSet: {
            courses: course._id,
          },
        }
      );
    }

    console.log("Repair Complete");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

fixCategoryCourses();