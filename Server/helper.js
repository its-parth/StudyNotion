const mongoose = require('mongoose');
const Profile = require('./models/Profile');
const { connectDB } = require('./config/database');
require('dotenv').config();

const deleteField = async () => {
  try {
    await connectDB();

    console.log("DB Name:", mongoose.connection.name); // 🔥 verify

    const result = await Profile.updateMany(
      {},
      { $unset: { extra: "" } }, // ✅ correct field,
        {strict: false}
    );

    console.log("Result:", result);

    const data = await Profile.find();
    console.log("After:", data);

    await mongoose.connection.close();

  } catch (err) {
    console.error(err);
  }
};

deleteField();