// models/Appointment.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const appointmentSchema = new Schema(
  {
    patientId: { type: Schema.Types.ObjectId, ref: "User", required: true },  // patient as User
    doctorId: { type: Schema.Types.ObjectId, ref: "User", required: true },   // doctor as User
    appointmentDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Canceled", "No-Show", "Rescheduled"],
      default: "Scheduled",
    },
    symptoms: [{ type: String }],
    followUp: { type: Date, default: null },  // Only if a follow-up appointment is needed
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema, "appointments");
