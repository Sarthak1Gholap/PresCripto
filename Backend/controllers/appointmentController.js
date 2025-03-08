const Appointment = require('../models/Appointment');
const User = require('../models/User');

// Create a new appointment
const createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, appointmentDate, symptoms, followUp } = req.body;

    // Check if the doctor and patient exist in the system
    const doctor = await User.findById(doctorId);
    const patient = await User.findById(patientId);

    if (!doctor || doctor.role !== 'Doctor') {
      return res.status(400).json({ message: 'Doctor not found or invalid role' });
    }
    if (!patient) {
      return res.status(400).json({ message: 'Patient not found' });
    }

    // Create a new appointment
    const appointment = new Appointment({
      patientId,
      doctorId,
      appointmentDate,
      symptoms,
      followUp,
    });

    await appointment.save();
    res.status(201).json({ message: 'Appointment created successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all appointments for a specific patient
const getPatientAppointments = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Get all appointments for the patient
    const appointments = await Appointment.find({ patientId }).populate('doctorId', 'name role');

    if (appointments.length === 0) {
      return res.status(404).json({ message: 'No appointments found for this patient' });
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all appointments for a specific doctor
const getDoctorAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;

    // Get all appointments for the doctor
    const appointments = await Appointment.find({ doctorId }).populate('patientId', 'name email');

    if (appointments.length === 0) {
      return res.status(404).json({ message: 'No appointments found for this doctor' });
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update appointment status
const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;

    // Check if the status is valid
    const validStatuses = ["Scheduled", "Completed", "Canceled", "No-Show", "Rescheduled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // Find the appointment and update the status
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment status updated', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete an appointment
const deleteAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    // Find and delete the appointment
    const appointment = await Appointment.findByIdAndDelete(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  createAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  deleteAppointment,
};
