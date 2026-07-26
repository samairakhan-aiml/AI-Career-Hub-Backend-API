const express = require("express");
const router = express.Router();

const messages = require("../data/messages");

// GET all messages
router.get("/", (req, res) => {
    res.json({
        success: true,
        count: messages.length,
        data: messages
    });
});

// POST message
router.post("/", (req, res) => {

    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({
            success: false,
            message: "Please fill all fields"
        });
    }

    const newMessage = {
        id: messages.length + 1,
        name,
        email,
        subject,
        message
    };

    messages.push(newMessage);

    res.status(201).json({
        success: true,
        message: "Message sent successfully",
        data: newMessage
    });

});

module.exports = router;