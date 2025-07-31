//const { default: mongoose } = require("mongoose");
const UserProfile = require("../models/user.model");

//called by auth-service to create new user
exports.userRegister = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await UserProfile.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists!!" });
    const newUser = await UserProfile.create({ email, password });
    console.log(newUser);
    res.status(201).json({ userId: newUser._id });
  } catch (err) {
    console.log("User DB error: ", err.message);
    res.status(500).json({ message: "User creation failure!!" });
  }
};
//Get user-profile by userId (from JWT)

exports.getUserProfile = async (req, res) => {
  try {
    const user = await UserProfile.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "server error " });
  }
};

//update user-profile

exports.updateUserProfile = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(400).json({ message: "Invalid or missing userId" });
    }
    const updated_user = await UserProfile.findByIdAndUpdate(
      req.userId,
      req.body,
      { new: true, upsert: true },
    );
    if (!updated_user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updated_user);
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

//get user email for auth for login

exports.getUserByEmail = async (req, res) => {
  try {
    const user_profile = await UserProfile.findOne({ email: req.params.email });
    if (!user_profile)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json(user_profile);
  } catch (e) {
    res.status(500).json({ message: "Server Error" });
  }
};
