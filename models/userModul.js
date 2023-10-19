import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      trim: true,
      maxlength: [50, "First name cannot exceed 50 characters."],
    },
    LastName: {
      type: String,
      required: [true, "Last name is required."],
      trim: true,
      maxlength: [50, "Last name cannot exceed 50 characters."],
    },

    Email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      trim: true,
      lowercase: true,
    },
    Password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [6, "Password should be at least 6 characters long."],
    },
    role: {
      type: String,
      default: "Candidate",
    },
    Education_Level: { type: String, default: "" },
    About: { type: String, default: "" },
    regonizein: { type: String },

    age: {
      type: String,
      default: "",
    },
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
    aboutme: { type: String, default: "" },
    Address: { type: String, require: true, default: "" },
    Gender: {
      type: String,
      default: "",
    },

    // Additional fields specific to your job portal can be added here
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
