import mongoose, { model } from "mongoose";

// Job schema
const ResumeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    Education: [
      {
        SchoolOrCollege: { type: String, default: "" },
        year: { type: String, default: "" },
        description: { type: String, default: "" },
        Company: { type: String, default: "" },
      },
    ],
    WorkOrExperience: [
      {
        jobTitle: { type: String, default: "" },
        year: { type: String, default: "" },
        Company: { type: String, default: "" },
        description: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true }
);

const Resume = mongoose.models.resume || model("resume", ResumeSchema);
export default Resume;
