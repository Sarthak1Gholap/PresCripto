const User = require('../models/User'); // Import the User model

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        statusCode: 400,
        data: null,
        message: "Email already exists",
        success: false
      });
    }
    
    const user = new User({
      name,
      email,
      password, // You should hash the password before saving
      role
    });

    await user.save();

    return res.status(201).json({
      statusCode: 201,
      data: user,
      message: "User created successfully",
      success: true
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      data: null,
      message: "Server error",
      success: false
    });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      statusCode: 200,
      data: users,
      message: "Users fetched successfully",
      success: true
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      data: null,
      message: "Server error",
      success: false
    });
  }
};

// Get a specific user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        data: null,
        message: "User not found",
        success: false
      });
    }
    return res.status(200).json({
      statusCode: 200,
      data: user,
      message: "User fetched successfully",
      success: true
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      data: null,
      message: "Server error",
      success: false
    });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password, role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        data: null,
        message: "User not found",
        success: false
      });
    }

    return res.status(200).json({
      statusCode: 200,
      data: user,
      message: "User updated successfully",
      success: true
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      data: null,
      message: "Server error",
      success: false
    });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        data: null,
        message: "User not found",
        success: false
      });
    }
    return res.status(200).json({
      statusCode: 200,
      data: null,
      message: "User deleted successfully",
      success: true
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      data: null,
      message: "Server error",
      success: false
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
