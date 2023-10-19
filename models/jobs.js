import mongoose, { model } from "mongoose";

// Job schema
const JobSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    jobTitle: {
      //
      type: String,
      required: true,
    },
    description: {
      type: String, //
      required: true,
    },
    responsibilities: {
      //
      type: String,
      required: true,
    },
    requirements: {
      //
      type: String,
      default: true,
    },
    applicationStatus: {
      //
      type: String,
      enum: ["Pending", "Reviewed", "Rejected"],
      default: "Pending",
    },
    experienceLevel: {
      //
      type: String,
      default: "",
    },

    salary: {
      //
      type: String,
      default: "",
    },
    linkedinProfile: {
      //
      type: String,
    },
    featuredUntil: {
      //
      type: Date,
      default: "",
    },

    applicationDeadLine: {
      //
      type: String,
    },
    urgent: {
      //
      type: String,
      default: "",
    },
    gender: {
      //
      type: String,
      default: "",
    },
    status: {
      //
      type: String,
      default: "Active",
    },
    Category: {
      type: String, //
      default: "",
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      default: "",
    },
    location: {
      type: String, //
      default: "",
    },
    isFeatured: {
      //
      type: Boolean,
      default: false,
    },
    jobType: {
      type: String,
    },
  },
  { timestamps: true }
);

const Job = mongoose.models.Job || model("Job", JobSchema);
Job.createIndexes({ jobTitle: "text" });
export default Job;
