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
          aiReport: project.aiReport || "",
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

// Generate dynamic AI report summary
router.post("/:id/ai-report", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const tasks = await Task.find({ projectId: project._id });
    
    // Calculate statistics
    const total = tasks.length;
    const todo = tasks.filter(t => t.status === "To Do").length;
    const inProgress = tasks.filter(t => t.status === "In Progress").length;
    const done = tasks.filter(t => t.status === "Done").length;
    const highPriority = tasks.filter(t => t.priority === "High").length;
    const highTodo = tasks.filter(t => t.status === "To Do" && t.priority === "High").length;

    const rate = total > 0 ? Math.round((done / total) * 100) : 0;

    // Build smart rule-based AI recommendations
    let risks = "No immediate bottleneck threats detected. The backlog distribution appears stable.";
    let recommendations = [];

    if (highTodo > 0) {
      risks = `🚨 **High-Priority Congestion**: There are ${highTodo} critical tasks marked as High Priority currently stuck in 'To Do'. This could delay key milestones.`;
      
      const urgentTasks = tasks.filter(t => t.status === "To Do" && t.priority === "High");
      urgentTasks.slice(0, 2).forEach(t => {
        recommendations.push(`Assign developer resources to unblock the High priority task: **"${t.title}"**.`);
      });
    } else if (inProgress > todo && done < total * 0.5) {
      risks = "⚠️ **Task Congestion**: High volume of items concurrently marked as 'In Progress'. Team is context-switching heavily; focus on driving items to 'Done'.";
      recommendations.push("Implement a Work-in-Progress (WIP) limit to push active tasks to completion.");
    }

    const inProgressList = tasks.filter(t => t.status === "In Progress");
    if (inProgressList.length > 0) {
      recommendations.push(`Complete active task **"${inProgressList[0].title}"** before pulling new cards into the sprint.`);
    }

    if (recommendations.length === 0) {
      recommendations.push("Workspace is operating at peak efficiency. Plan the next sprint phase backlog items.");
      recommendations.push("Keep current task statuses updated in real-time to maintain report accuracy.");
    }

    // Compose formatted AI report markdown text
    const aiReport = `### 🤖 AI Sprint Report: ${project.title}
*Generated on ${new Date().toLocaleDateString("en-US", { dateStyle: "long" })}*

#### 📈 Sprint Progress
- **Project Completion**: **${rate}%** (${done} of ${total} tasks resolved)
- **Task Breakdown**: \`${todo}\` To Do | \`${inProgress}\` In Progress | \`${done}\` Completed

#### ⚡ Velocity & Risk Analysis
- **Sprint Health**: ${rate > 70 ? "🟢 Excellent Velocity" : rate > 30 ? "🟡 Moderate Velocity" : "🔴 Low Velocity"}
- **Risk Assessment**: ${risks}

#### 🎯 Actionable Recommendations
${recommendations.map((r, i) => `${i + 1}. ${r}`).join("\n")}
`;

    // Persist to MongoDB
    project.aiReport = aiReport;
    await project.save();

    res.json({ aiReport });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
