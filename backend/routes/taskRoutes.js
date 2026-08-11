const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const Project = require("../models/Project");

// Create a task for a project
router.post("/:projectId", async (req, res) => {
  try {
    const { title, description, priority, dueDate, status } = req.body;
    const projectExists = await Project.findById(req.params.projectId);
    if (!projectExists) {
      return res.status(404).json({ message: "Project not found" });
    }

    const newTask = await Task.create({
      projectId: req.params.projectId,
      title,
      description,
      priority: priority || "Medium",
      dueDate,
      status: status || "To Do",
    });

    res.status(201).json({
      id: newTask._id,
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      priority: newTask.priority,
      dueDate: newTask.dueDate,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a task (status, priority, etc.)
router.put("/:taskId", async (req, res) => {
  try {
    const { title, description, priority, dueDate, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      { title, description, priority, dueDate, status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({
      id: updatedTask._id,
      title: updatedTask.title,
      description: updatedTask.description,
      status: updatedTask.status,
      priority: updatedTask.priority,
      dueDate: updatedTask.dueDate,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a task
router.delete("/:taskId", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
