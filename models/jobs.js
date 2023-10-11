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
      required: true,
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
    },

    salary: {
      //
      type: String,
      require: true,
    },
    linkedinProfile: {
      //
      type: String,
    },
    featuredUntil: {
      //
      type: Date,
    },

    applicationDeadLine: {
      //
      type: String,
    },
    urgent: {
      //
      type: Boolean,
      require: true,
    },
    gender: {
      //
      type: String,
      require: true,
    },
    status: {
      //
      type: String,
      default: "Active",
    },
    Category: {
      type: String, //
      required: true,
      default: "",
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      default: "",
    },
    location: {
      type: String, //
      required: true,
    },
    isFeatured: {
      //
      type: Boolean,
      default: false,
    },
    jobType: {
      type: String,
    },
    applicants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          default: "",
        },
        applicationStatus: {
          type: String,
          enum: ["Pending", "Reviewed", "Rejected"],
          default: "Pending",
        },
      },
    ],
  },
  { timestamps: true }
);

const Job = mongoose.models.Job || model("Job", JobSchema);
Job.createIndexes({ jobTitle: "text" });
export default Job;
