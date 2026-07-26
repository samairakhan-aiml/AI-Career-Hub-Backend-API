const express = require("express");
const cors = require("cors");
require("dotenv").config();

const jobRoutes = require("./routes/jobs");
const internshipRoutes=require("./routes/internships");
const toolRoutes=require("./routes/tools");
const roadmapRoutes=require("./routes/roadmaps");
const projectRoutes=require("./routes/projects");
const contactRoutes=require("./routes/contact");
const authRoutes=require("./routes/auth");


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/jobs",jobRoutes);
app.use("/api/internships",internshipRoutes);
app.use("/api/tools",toolRoutes);
app.use("/api/roadmaps",roadmapRoutes);
app.use("/api/projects",projectRoutes);
app.use("/api/contact",contactRoutes);
app.use("/api/auth",authRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message:"AI Career Hub Backend is Running 🚀"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});