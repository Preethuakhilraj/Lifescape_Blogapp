const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../model/usermodel");

router.use(express.json());

// Login Route
router.post('/login', async (req, res) => {
    try {
        const foundUser = await User.findOne({ email: req.body.email });
        if (!foundUser) {
            return res.status(404).json({ message: "User not found" });
        }
 console.log(foundUser);
        const isPasswordValid =  bcrypt.compare(req.body.password, foundUser.password);
        if (isPasswordValid) {
            const payload = { email: foundUser.email, pwd: req.body.password };
            const token = jwt.sign(payload, 'blog', { expiresIn: '1h' }); // Add token expiration
            res.status(200).json({ message: "Login successful", token });
        } else {
            res.status(401).json({ message: "Invalid password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Signup Route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
