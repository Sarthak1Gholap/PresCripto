const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model

// Register a new user
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();

    // Generate JWT token with 7 days expiration
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d", // Token expires in 7 days
    });

    // Respond with the token and user data
    res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token with 7 days expiration, including user id and role
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Include role in the token payload
      process.env.JWT_SECRET,
      {
        expiresIn: "7d", // Token expires in 7 days
      }
    );

    // Respond with the token, user data, and role
    res.status(200).json({ token, user, role: user.role });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


// Logout user (client side deletion of token recommended)
const logout = (req, res) => {
  // In a typical JWT-based authentication system, logout is handled on the client-side by deleting the token (from localStorage or cookies).
  // Server-side doesn't need to perform any action unless using a token blacklist strategy.
  res.status(200).json({ message: "Logout successful" });
};

module.exports = {
  register,
  login,
  logout,
};
