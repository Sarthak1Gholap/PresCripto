// Doctor Model with userId
const doctorSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    availability: {
      type: String,
      enum: ["Yes", "No"],
      default: "Yes",
    },
  }, { timestamps: true });
  