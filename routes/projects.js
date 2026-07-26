const express = require("express");
const router = express.Router();

const projects = require("../data/projects");

// GET ALL
router.get("/", (req, res) => {
    res.json({
        success: true,
        count: projects.length,
        data: projects
    });
});

// GET BY ID
router.get("/:id", (req, res) => {

    const project = projects.find(
        p => p.id == req.params.id
    );

    if (!project)
        return res.status(404).json({
            success: false,
            message: "Project not found"
        });

    res.json({
        success: true,
        data: project
    });
});

// POST
router.post("/", (req, res) => {

    const project = {
        id: projects.length + 1,
        ...req.body
    };

    projects.push(project);

    res.status(201).json({
        success: true,
        data: project
    });

});

// PUT
router.put("/:id", (req, res) => {

    const project = projects.find(
        p => p.id == req.params.id
    );

    if (!project)
        return res.status(404).json({
            success: false,
            message: "Project not found"
        });

    Object.assign(project, req.body);

    res.json({
        success: true,
        data: project
    });

});

// DELETE
router.delete("/:id", (req, res) => {

    const index = projects.findIndex(
        p => p.id == req.params.id
    );

    if (index === -1)
        return res.status(404).json({
            success: false,
            message: "Project not found"
        });

    projects.splice(index, 1);

    res.json({
        success: true,
        message: "Project deleted successfully"
    });

});

module.exports = router;