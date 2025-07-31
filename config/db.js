const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewurlParser: true,
    });
    console.log("Connected to user_profile DB");
  } catch (e) {
    console.log("error connecting DB", e);
    process.exit(1);
  }
};
module.exports = connectDB;
