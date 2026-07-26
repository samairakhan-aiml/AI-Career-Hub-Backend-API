const express = require("express");
const router = express.Router();

const users = require("../data/users");

// Register
router.post("/register", (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "User already exists"
        });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email,
        password
    };

    users.push(newUser);

    res.status(201).json({
        success: true,
        message: "Registration successful",
        data: newUser
    });

});

// Login
router.post("/login", (req, res) => {

    const { email, password } = req.body;

    const user = users.find(
        user =>
            user.email === email &&
            user.password === password
    );

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        });
    }

    res.json({
        success: true,
        message: "Login successful",
        user
    });

});

// Profile
router.get("/profile", (req, res) => {

    if (users.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No user found"
        });
    }

    res.json({
        success: true,
        data: users[0]
    });

});

module.exports = router;