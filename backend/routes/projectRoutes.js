const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const Task = require("../models/Task");

// Get all projects with tasks mapped to match frontend structure
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    const formattedProjects = await Promise.all(
      projects.map(async (project) => {
        const tasks = await Task.find({ projectId: project._id });
        return {
          id: project._id,
          title: project.title,
          description: project.description,
          status: project.status,
          tasks: tasks.map(t => ({
            id: t._id,
            title: t.title,
            description: t.description,
            status: t.status,
            priority: t.priority,
            dueDate: t.dueDate,
          })),
        };
      })
    );
    res.json(formattedProjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a project
router.post("/", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const newProject = await Project.create({
      title,
      description,
      status: status || "Planning",
    });
    res.status(201).json({
      id: newProject._id,
      title: newProject.title,
      description: newProject.description,
      status: newProject.status,
      tasks: [],
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a project
router.put("/:id", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({
      id: updatedProject._id,
      title: updatedProject.title,
      description: updatedProject.description,
      status: updatedProject.status,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a project and its tasks
router.delete("/:id", async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    // Delete associated tasks
    await Task.deleteMany({ projectId: req.params.id });
    res.json({ message: "Project and associated tasks deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
