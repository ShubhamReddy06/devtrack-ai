const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  title: {
    type: String,
    required: [true, "Task title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Task description is required"],
    trim: true,
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default: "To Do",
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  dueDate: {
    type: String,
    required: [true, "Due date is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
