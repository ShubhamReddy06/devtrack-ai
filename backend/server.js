const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

// Initialize server
const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes Mount
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// Simple health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "DevTrack API Server is running smoothly" });
});

// Start listening
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
