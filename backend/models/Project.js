const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Project title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Project description is required"],
    trim: true,
  },
  status: {
    type: String,
    enum: ["Planning", "In Progress", "Completed"],
    default: "Planning",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
