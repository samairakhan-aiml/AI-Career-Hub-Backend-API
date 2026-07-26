const express = require("express");
const router = express.Router();
const tools = require("../data/tools");

// GET all tools
router.get("/", (req, res) => {
  res.json({
    success: true,
    count: tools.length,
    data: tools,
  });
});

// GET tool by ID
router.get("/:id", (req, res) => {
  const tool = tools.find((t) => t.id == req.params.id);

  if (!tool)
    return res.status(404).json({
      success: false,
      message: "Tool not found",
    });

  res.json({
    success: true,
    data: tool,
  });
});

// POST
router.post("/", (req, res) => {
  const tool = {
    id: tools.length + 1,
    ...req.body,
  };

  tools.push(tool);

  res.status(201).json({
    success: true,
    data: tool,
  });
});

// PUT
router.put("/:id", (req, res) => {
  const tool = tools.find((t) => t.id == req.params.id);

  if (!tool)
    return res.status(404).json({
      success: false,
      message: "Tool not found",
    });

  Object.assign(tool, req.body);

  res.json({
    success: true,
    data: tool,
  });
});

// DELETE
router.delete("/:id", (req, res) => {
  const index = tools.findIndex((t) => t.id == req.params.id);

  if (index === -1)
    return res.status(404).json({
      success: false,
      message: "Tool not found",
    });

  tools.splice(index, 1);

  res.json({
    success: true,
    message: "Deleted successfully",
  });
});

module.exports = router;