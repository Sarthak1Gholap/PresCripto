const MedicalReport = require('../models/MedicalReport');
const Appointment = require('../models/Appointment');
const User = require('../models/User');

// Create a new medical report
const createMedicalReport = async (req, res) => {
  try {
    const {
      appointmentId,
      doctorId,
      patientId,
      diagnosis,
      treatmentPlan,
      prescribedMedications,
      labTests,
      medicalHistory,
      followUp,
      notes,
    } = req.body;

    // Validate appointment
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Validate doctor and patient
    const doctor = await User.findById(doctorId);
    const patient = await User.findById(patientId);
    if (!doctor || doctor.role !== 'Doctor') {
      return res.status(400).json({ message: 'Doctor not found or invalid role' });
    }
    if (!patient) {
      return res.status(400).json({ message: 'Patient not found' });
    }

    // Create the medical report
    const medicalReport = new MedicalReport({
      appointmentId,
      doctorId,
      patientId,
      diagnosis,
      treatmentPlan,
      prescribedMedications,
      labTests,
      medicalHistory,
      followUp,
      notes,
      createdBy: doctorId,
    });

    await medicalReport.save();
    res.status(201).json({ message: 'Medical report created successfully', medicalReport });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all medical reports for a patient
const getPatientReports = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Get all reports for the patient
    const reports = await MedicalReport.find({ patientId })
      .populate('doctorId', 'name role')
      .populate('appointmentId', 'appointmentDate status');

    if (reports.length === 0) {
      return res.status(404).json({ message: 'No medical reports found for this patient' });
    }

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all medical reports for a doctor
const getDoctorReports = async (req, res) => {
  try {
    const { doctorId } = req.params;

    // Get all reports for the doctor
    const reports = await MedicalReport.find({ doctorId })
      .populate('patientId', 'name email')
      .populate('appointmentId', 'appointmentDate status');

    if (reports.length === 0) {
      return res.status(404).json({ message: 'No medical reports found for this doctor' });
    }

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a medical report
const updateMedicalReport = async (req, res) => {
  try {
    const { reportId } = req.params;
    const updateData = req.body;

    // Find and update the medical report
    const updatedReport = await MedicalReport.findByIdAndUpdate(reportId, updateData, {
      new: true,
    });

    if (!updatedReport) {
      return res.status(404).json({ message: 'Medical report not found' });
    }

    res.status(200).json({ message: 'Medical report updated successfully', updatedReport });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a medical report
const deleteMedicalReport = async (req, res) => {
  try {
    const { reportId } = req.params;

    // Find and delete the medical report
    const report = await MedicalReport.findByIdAndDelete(reportId);

    if (!report) {
      return res.status(404).json({ message: 'Medical report not found' });
    }

    res.status(200).json({ message: 'Medical report deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  createMedicalReport,
  getPatientReports,
  getDoctorReports,
  updateMedicalReport,
  deleteMedicalReport,
};
