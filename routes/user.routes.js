const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const verifyToken = require("../middlewares/verifyToken");

router.post("/register", userController.userRegister); //used by auth-service
router.get("/profile", verifyToken, userController.getUserProfile);
router.put("/profile", verifyToken, userController.updateUserProfile);
router.get("/email/:email", userController.getUserByEmail); //used by auth-service

module.exports = router;
