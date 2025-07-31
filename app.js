require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("user-profile service is running ");
});
connectDB();

app.use("/users", userRoutes);

module.exports = app;
