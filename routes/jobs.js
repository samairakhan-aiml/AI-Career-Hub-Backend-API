const express = require("express");
const router = express.Router();

const jobs = require("../data/jobs");

// GET all jobs
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: jobs.length,
    data: jobs
  });
});

module.exports = router;

// GET a single job by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const job = jobs.find(job => job.id === id);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found"
    });
  }

  res.status(200).json({
    success: true,
    data: job
  });
});
// POST a new job
router.post("/", (req, res) => {
  const { title, company, location, type, salary } = req.body;

  if (!title || !company || !location || !type || !salary) {
    return res.status(400).json({
      success: false,
      message: "Please fill all fields"
    });
  }

  const newJob = {
    id: jobs.length + 1,
    title,
    company,
    location,
    type,
    salary,
  };

  jobs.push(newJob);

  res.status(201).json({
    success: true,
    message: "Job added successfully",
    data: newJob,
  });
});
// UPDATE a job
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const job = jobs.find((job) => job.id === id);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found",
    });
  }

  job.title = req.body.title || job.title;
  job.company = req.body.company || job.company;
  job.location = req.body.location || job.location;
  job.type = req.body.type || job.type;
  job.salary = req.body.salary || job.salary;

  res.json({
    success: true,
    message: "Job updated successfully",
    data: job,
  });
});

// DELETE a job
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = jobs.findIndex((job) => job.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Job not found",
    });
  }

  jobs.splice(index, 1);

  res.json({
    success: true,
    message: "Job deleted successfully",
  });
});