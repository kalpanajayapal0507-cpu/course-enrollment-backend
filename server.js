const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/courseDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Import model
const Course = require("./models/Course");
const User = require("./models/user");


// 👇 👉 INSERT YOUR API ROUTES HERE 👇

// GET courses
app.get("/courses", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// POST course
app.post("/courses", async (req, res) => {
  const{title, description, duration } = req.body;
  const course = new Course({title, description, duration });
  await course.save();
  res.json({message: "Course added scucessfuly"});
});

// DELETE course
app.delete("/courses/:id", async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// PUT enroll course
app.put("/courses/:id/enroll", async (req, res) => {
  await Course.findByIdAndUpdate(req.params.id, { enrolled: true });
  res.json({ message: "Enrolled successfully" });
});

// POST signup
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.json({ message: "User signed up successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Signup failed" });
  }
});


// 👇 Start server (always last)
app.listen(5000, () => {
  console.log("Server running on port 5000");
});