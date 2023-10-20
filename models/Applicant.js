import mongoose, { model } from "mongoose";

// Job schema
const ApplicantSchema = new mongoose.Schema(
  {
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Rejected"],
      default: "Pending",
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Applicant =
  mongoose.models.applicant || model("applicant", ApplicantSchema);

export default Applicant;
