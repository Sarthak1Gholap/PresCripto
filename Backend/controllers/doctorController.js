const Doctor = require('../models/Doctor'); // Import the Doctor model
const User = require('../models/User'); // Import the User model

// Create a new doctor
const createDoctor = async (req, res) => {
  try {
    const { userId, specialization, experience, availability } = req.body;

    // Check if the user exists (doctor should be linked to a valid user)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        statusCode: 400,
        data: null,
        message: "User not found",
        success: false
      });
    }

    // Create a new doctor
    const doctor = new Doctor({
      userId,
      specialization,
      experience,
      availability
    });

    await doctor.save();

    return res.status(201).json({
      statusCode: 201,
      data: doctor,
      message: "Doctor created successfully",
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

// Get all doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('userId', 'name email'); // Populate user data (name, email)
    return res.status(200).json({
      statusCode: 200,
      data: doctors,
      message: "Doctors fetched successfully",
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

// Get a specific doctor by ID
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('userId', 'name email');
    if (!doctor) {
      return res.status(404).json({
        statusCode: 404,
        data: null,
        message: "Doctor not found",
        success: false
      });
    }
    return res.status(200).json({
      statusCode: 200,
      data: doctor,
      message: "Doctor fetched successfully",
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

// Update a doctor
const updateDoctor = async (req, res) => {
  try {
    const { userId, specialization, experience, availability } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        statusCode: 400,
        data: null,
        message: "User not found",
        success: false
      });
    }

    // Update doctor
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { userId, specialization, experience, availability },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({
        statusCode: 404,
        data: null,
        message: "Doctor not found",
        success: false
      });
    }

    return res.status(200).json({
      statusCode: 200,
      data: doctor,
      message: "Doctor updated successfully",
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

// Delete a doctor
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({
        statusCode: 404,
        data: null,
        message: "Doctor not found",
        success: false
      });
    }
    return res.status(200).json({
      statusCode: 200,
      data: null,
      message: "Doctor deleted successfully",
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
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor
};
