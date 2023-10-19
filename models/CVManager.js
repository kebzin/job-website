import mongoose, { model } from "mongoose";

// Job schema
const CVSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    jobType: {
      type: String,
    },
    CvUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const CV = mongoose.models.Job || model("CV", CVSchema);
export default CV;
