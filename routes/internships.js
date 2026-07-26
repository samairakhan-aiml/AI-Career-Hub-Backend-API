const express = require("express");
const router = express.Router();

const internships = require("../data/internships");

// GET all internships
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: internships.length,
    data: internships
  });
});

// GET internship by ID
router.get("/:id", (req, res) => {
  const internship = internships.find(
    (item) => item.id === parseInt(req.params.id)
  );

  if (!internship) {
    return res.status(404).json({
      success: false,
      message: "Internship not found"
    });
  }

  res.json({
    success: true,
    data: internship
  });
});

// POST internship
router.post("/", (req, res) => {
  const newInternship = {
    id: internships.length + 1,
    ...req.body
  };

  internships.push(newInternship);

  res.status(201).json({
    success: true,
    message: "Internship added successfully",
    data: newInternship
  });
});

// PUT internship
router.put("/:id", (req, res) => {
  const internship = internships.find(
    (item) => item.id === parseInt(req.params.id)
  );

  if (!internship) {
    return res.status(404).json({
      success: false,
      message: "Internship not found"
    });
  }

  Object.assign(internship, req.body);

  res.json({
    success: true,
    message: "Internship updated successfully",
    data: internship
  });
});

// DELETE internship
router.delete("/:id", (req, res) => {
  const index = internships.findIndex(
    (item) => item.id === parseInt(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Internship not found"
    });
  }

  internships.splice(index, 1);

  res.json({
    success: true,
    message: "Internship deleted successfully"
  });
});

module.exports = router;