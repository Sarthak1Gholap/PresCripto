const Patient = require('../models/Patient'); // Import the Patient model
const User = require('../models/User'); // Import the User model

// Create a new patient
const createPatient = async (req, res) => {
  try {
    const { userId, dateOfBirth, bloodType, address, preferredLanguage, medicalHistory, allergies, currentMedications, emergencyContacts } = req.body;

    // Check if the user exists (patient should be linked to a valid user)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        statusCode: 400,
        data: null,
        message: "User not found",
        success: false
      });
    }

    // Create a new patient
    const patient = new Patient({
      userId,
      dateOfBirth,
      bloodType,
      address,
      preferredLanguage,
      medicalHistory,
      allergies,
      currentMedications,
      emergencyContacts
    });

    await patient.save();

    return res.status(201).json({
      statusCode: 201,
      data: patient,
      message: "Patient created successfully",
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

// Get all patients
const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate('userId', 'name email'); // Populate user data (name, email)
    return res.status(200).json({
      statusCode: 200,
      data: patients,
      message: "Patients fetched successfully",
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

// Get a specific patient by ID
const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate('userId', 'name email');
    if (!patient) {
      return res.status(404).json({
        statusCode: 404,
        data: null,
        message: "Patient not found",
        success: false
      });
    }
    return res.status(200).json({
      statusCode: 200,
      data: patient,
      message: "Patient fetched successfully",
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

// Update a patient
const updatePatient = async (req, res) => {
  try {
    const { userId, dateOfBirth, bloodType, address, preferredLanguage, medicalHistory, allergies, currentMedications, emergencyContacts } = req.body;

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

    // Update patient
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      { userId, dateOfBirth, bloodType, address, preferredLanguage, medicalHistory, allergies, currentMedications, emergencyContacts },
      { new: true }
    );

    if (!patient) {
      return res.status(404).json({
        statusCode: 404,
        data: null,
        message: "Patient not found",
        success: false
      });
    }

    return res.status(200).json({
      statusCode: 200,
      data: patient,
      message: "Patient updated successfully",
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

// Delete a patient
const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({
        statusCode: 404,
        data: null,
        message: "Patient not found",
        success: false
      });
    }
    return res.status(200).json({
      statusCode: 200,
      data: null,
      message: "Patient deleted successfully",
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
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient
};
