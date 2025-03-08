const mongoose = require("mongoose");
const { Schema } = mongoose;

const patientSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    bloodType: { type: String, required: true },
    address: { type: String, required: true },
    preferredLanguage: { type: String, required: true },
    medicalHistory: { type: String, required: true },
    allergies: { type: String, required: true },
    currentMedications: { type: String, required: true },
    emergencyContacts: [
      {
        name: { type: String, required: true },
        phone: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema, "patients");
