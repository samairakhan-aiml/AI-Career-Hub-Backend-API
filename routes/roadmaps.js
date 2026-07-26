const express = require("express");
const router = express.Router();

const roadmaps = require("../data/roadmaps");

// GET all
router.get("/", (req, res) => {
  res.json({
    success: true,
    count: roadmaps.length,
    data: roadmaps
  });
});

// GET by ID
router.get("/:id", (req, res) => {
  const roadmap = roadmaps.find(r => r.id == req.params.id);

  if (!roadmap)
    return res.status(404).json({
      success: false,
      message: "Roadmap not found"
    });

  res.json({
    success: true,
    data: roadmap
  });
});

// POST
router.post("/", (req, res) => {
  const roadmap = {
    id: roadmaps.length + 1,
    ...req.body
  };

  roadmaps.push(roadmap);

  res.status(201).json({
    success: true,
    data: roadmap
  });
});

// PUT
router.put("/:id", (req, res) => {
  const roadmap = roadmaps.find(r => r.id == req.params.id);

  if (!roadmap)
    return res.status(404).json({
      success: false,
      message: "Roadmap not found"
    });

  Object.assign(roadmap, req.body);

  res.json({
    success: true,
    data: roadmap
  });
});

// DELETE
router.delete("/:id", (req, res) => {
  const index = roadmaps.findIndex(r => r.id == req.params.id);

  if (index === -1)
    return res.status(404).json({
      success: false,
      message: "Roadmap not found"
    });

  roadmaps.splice(index, 1);

  res.json({
    success: true,
    message: "Roadmap deleted successfully"
  });
});

module.exports = router;