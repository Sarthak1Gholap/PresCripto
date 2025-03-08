// models/MedicalReport.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const medicalReportSchema = new Schema(
  {
    appointmentId: { 
      type: Schema.Types.ObjectId, 
      ref: "Appointment", 
      required: true,
    },
    doctorId: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true,
    },
    patientId: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true,
    },
    diagnosis: { 
      type: String, 
      required: true,
    },
    treatmentPlan: { 
      type: String, 
      required: true,
    },
    prescribedMedications: [
      {
        medicationName: { type: String, required: true },
        dosage: { type: String, required: true },
        frequency: { type: String, required: true }, // e.g., "Twice a day"
        duration: { type: String, required: true },  // e.g., "7 days"
      }
    ],
    labTests: [
      {
        testName: { type: String, required: true },
        testDate: { type: Date, required: true },
        testResult: { type: String, default: null },  // Default null until test result is received
        comments: { type: String, default: null },   // Optional comments for the test result
      }
    ],
    medicalHistory: [
      {
        condition: { type: String, required: true }, 
        diagnosisDate: { type: Date, required: true },
        treatment: { type: String, required: true },
      }
    ],
    followUp: { 
      type: Date, 
      required: true, 
    },
    notes: { 
      type: String, 
      default: null, // Any additional information the doctor may want to add
    },
    createdBy: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true,  // Refers to the doctor who created the report
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MedicalReport", medicalReportSchema, "medicalReports");
