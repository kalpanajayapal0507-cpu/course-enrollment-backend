const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: String,
  enrolled: { type: Boolean, default: false },
  whyStudy: String,
  scope: String,
  imageUrl: String
});

module.exports = mongoose.model("Course", courseSchema);